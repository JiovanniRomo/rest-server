import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { IUser } from '../models/usuario';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt';
const Usuario: Model<IUser> = require('../models/usuario');

export const login = async (req: Request, res: Response) => {
    const { correo, password } = req.body;

    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario o la password no son correctos',
            });
        }

        //El usuario esta activo?
        if (!usuario.estado) {
            res.status(400).json({
                msg: 'Lo siento el usuario ha sido eliminado',
            });
        }

        //Verificar la password
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            res.status(400).json({
                msg: 'Lo siento, el password no coincide',
            });
        }

        //Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};
