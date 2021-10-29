import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { IUser } from '../models/usuario';
import { generarJWT } from '../helpers/generar-jwt';
import bcrypt from 'bcryptjs';
import { googleVerify } from '../helpers/google-verify';
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
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};


export const googleSignIn = async (req: Request, res: Response) => {
    const { id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleVerify(id_token);

        //Verificar si el email existe
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true,
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario NO esta activo, no le dejamos loguearse
        if (!usuario.estado) {
            res.status(401).json({
                msg: 'Hable con el administrador: usuario bloqueado',
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no es valido',
        });
    }
};
