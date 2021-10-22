import express from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth';
import { validarCampos } from '../middlewares/validar-campos';

export const authRouter = express.Router();

authRouter.post('/login', [
    check('correo', 'EL correo no es valido').isEmail(),
    check('password', 'La passsword es obligatoria').not().isEmpty(),
    validarCampos
] ,login);