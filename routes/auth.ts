import express from 'express';
import { check } from 'express-validator';
import { googleSignIn, login } from '../controllers/auth';
import { validarCampos } from '../middlewares/validar-campos';

export const authRouter = express.Router();

authRouter.post('/login', [
    check('correo', 'EL correo no es valido').isEmail(),
    check('password', 'La passsword es obligatoria').not().isEmpty(),
    validarCampos
] ,login);

authRouter.post('/google', [
    check('id_token', 'El id token es requerido').not().isEmpty(),
    validarCampos
] ,googleSignIn);