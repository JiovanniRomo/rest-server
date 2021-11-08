import express from 'express';
import { check } from 'express-validator';
import {
    obtenerProductoId,
    obtenerProductos,
    crearProducto,
    eliminarProducto,
    actualizarProducto,
} from '../controllers/productos';
import {
    esCategoriaValida,
    existeProductoPorId,
} from '../helpers/db-validators';
import { esAdmin } from '../middlewares';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jsonwebtoken';

export const productosRouter = express.Router();

productosRouter.get('/', obtenerProductos);

productosRouter.get(
    '/:id',
    [
        check('id', 'El id del producto es obligatorio').not().isEmpty(),
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarCampos,
    ],
    obtenerProductoId
);

productosRouter.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre del producto es obligatorio')
            .not()
            .isEmpty(),
        check('categoria', 'La categoria es obligatoria').not().isEmpty(),
        check('categoria').custom(esCategoriaValida),
        validarCampos,
    ],
    crearProducto
);

productosRouter.delete(
    '/:id',
    [
        check('id', 'El id es requerido').not().isEmpty(),
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarJWT,
        esAdmin,
        validarCampos,
    ],
    eliminarProducto
);

productosRouter.put('/:id', [
    validarJWT,
    check('id', 'El id es requerido').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
] ,actualizarProducto);
