import express from 'express';
import { check } from 'express-validator';
import { cargarArchivo } from '../controllers/uploads';
import { validarCampos } from '../middlewares/validar-campos';

export const uploadsRouter = express.Router();

uploadsRouter.post('/', cargarArchivo);