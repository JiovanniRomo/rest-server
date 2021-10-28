import express from 'express';
import { check } from 'express-validator';
import {
    usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut,
} from '../controllers/usuarios';
import {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
} from '../helpers/db-validators';
import { esAdmin, tieneUnRole, validaCampos, validaJWT } from '../middlewares';


export const router = express.Router();

router.get('/', usuariosGet);

router.put(
    '/:id',
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),
        validaCampos,
    ],
    usuariosPut
);

router.post(
    '/',
    [
        check('nombre', 'EL nombre es obligatorio')
            .not()
            .isEmpty()
            .trim()
            .escape(),
        check(
            'password',
            'La password es obligatoria y con mas de 6 caracteres'
        )
            .not()
            .isEmpty()
            .isLength({ min: 6 }),
        check('correo', 'EL correo no es valido').isEmail().custom(existeEmail),
        // check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        check('rol').custom(esRoleValido),
        validaCampos,
    ],
    usuariosPost
);

router.delete('/:id', [
    validaJWT,
    tieneUnRole('ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE'),
    // esAdmin,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validaCampos,
] ,usuariosDelete);
