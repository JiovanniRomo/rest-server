import express from 'express';
import { check } from 'express-validator';
import { buscar } from '../controllers/busqueda';
import { validarCampos } from '../middlewares/validar-campos';

export const busquedasRouter = express.Router();

// Es un estandar que las busquedas se realicen mediante el GET recibiendo argumentos
busquedasRouter.get('/:coleccion/:termino', [

    check('coleccion')
        .trim()
        .not()
        .isEmpty()
        .withMessage('La coleccion es obligatoria'),
    check('termino')
        .trim()
        .not()
        .isEmpty()
        .withMessage('El termino de busqueda es obligatorio'),
    validarCampos
] ,buscar);
