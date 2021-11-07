import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import { IUser } from '../models/usuario';
import { Model } from 'mongoose';
const Usuario: Model<IUser> = require('../models/usuario');

export const usuariosGet = async (req: Request, res: Response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // request are not dependent on each other, so we fire them at the same time and assign them to a variable
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({
        total,
        usuarios,
    });
};

export const usuariosPost = async (req: Request, res: Response) => {
    const { nombre, correo, password, rol } = req.body;

    const usuario: IUser = new Usuario({ nombre, correo, password, rol });

    //Hashear password
    usuario.encriptarPassword(password);

    // Guardar en DB
    await usuario.save();

    res.json({
        msg: 'post API - Controlador',
        usuario,
    });
};

export const usuariosPut = async (req: Request, res: Response) => {
    const { id } = req.params;

    //Extract the _id to not be able to change it!
    const { _id, password, google, correo, ...rest } = req.body;

    // TODO: validar cotra BD
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    // { new: true } is use to tell mongoose that it has to return the updated document, NOT the original one
    const usuario = await Usuario.findByIdAndUpdate(id, rest, { new: true });

    res.json({
        msg: 'put API - Controlador',
        usuario,
    });
};

export const usuariosDelete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
    );

    res.json({
        usuario,
    });
};
