import express from 'express';
import { check } from 'express-validator';
import {
    actualizarRegistroPorId,
    categoriasGet,
    crearCategoria,
    eliminarCategoria,
    obtenerCategoriaId,
} from '../controllers/categorias';
import { existeUnRegistroId } from '../helpers/db-validators';
import { esAdmin, validaCampos } from '../middlewares';
import { validaJWT } from '../middlewares';

export const categoriasRouter = express.Router();

// Para quienes utilicen un id: validar que la categoria exista

//Obtener todas las categorias - paginado - total - populate
categoriasRouter.get('/', categoriasGet);

// Obtener una categoria por id - populate {}
categoriasRouter.get(
    '/:id',
    [
        check('id').isMongoId(),
        check('id').custom(existeUnRegistroId),
        validaCampos,
    ],
    obtenerCategoriaId
);

// Crear una categoria - cualquier persona con un token valido
categoriasRouter.post(
    '/',
    [
        validaJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validaCampos,
    ],
    crearCategoria
);

//Actualizar una categoria mediante ID
categoriasRouter.put(
    '/:id',
    [
        check('id').isMongoId(),
        check('id').custom(existeUnRegistroId),
        validaJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validaCampos,
    ],
    actualizarRegistroPorId
);

//Eliminar una categoria - solo si es administrador - estado: false
categoriasRouter.delete(
    '/:id',
    [
        validaJWT,
        check('id').isMongoId(),
        check('id').custom(existeUnRegistroId),
        esAdmin,
        validaCampos,
    ],
    eliminarCategoria
);
