import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface payload {
    uid: string
}

export const validarJWT = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'No se ha proporcionado un token de acceso'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETKEY!) as payload;
        
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

    console.log(token);

    next();
}