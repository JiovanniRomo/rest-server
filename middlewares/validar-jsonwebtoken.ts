import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { IUser } from '../models/usuario';
const Usuario: Model<IUser> = require('../models/usuario');

interface payload extends JwtPayload {
    uid: string;
}

export const validarJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No se ha proporcionado un token de acceso',
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY!) as payload;

        // leer el usuario correspondiente
        const usuario = await Usuario.findById(uid);

        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - el usuario no existe'
            })
        }

        if(!usuario?.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado eliminado'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido',
        });
    }
};
