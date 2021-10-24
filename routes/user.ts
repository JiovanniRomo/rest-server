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
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jsonwebtoken';

export const router = express.Router();

router.get('/', usuariosGet);

router.put(
    '/:id',
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),
        validarCampos,
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
        validarCampos,
    ],
    usuariosPost
);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
] ,usuariosDelete);
