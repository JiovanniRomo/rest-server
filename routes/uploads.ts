import express from 'express';
import { check } from 'express-validator';
import { actualizarImagen, cargarArchivo, mostrarImagen, subirImagenCloudinary } from '../controllers/uploads';
import { coleccionesPermitidas } from '../helpers/db-validators';
import { validarArchivoSubir } from '../middlewares/validar-archivo';
import { validarCampos } from '../middlewares/validar-campos';

export const uploadsRouter = express.Router();

uploadsRouter.post('/', validarArchivoSubir ,cargarArchivo);

uploadsRouter.put('/:coleccion/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarArchivoSubir,
    validarCampos
], subirImagenCloudinary);

uploadsRouter.get('/:coleccion/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);