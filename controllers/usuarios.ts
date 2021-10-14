import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import { IUser } from "../models/usuario";
const Usuario = require('../models/usuario');

export const usuariosGet = (req: Request, res: Response) => {
    const { q, nombre = 'No name', page = 1, limit = 10 } = req.query;

    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        page,
        limit
    });
};

export const usuariosPost = async (req: Request, res: Response) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario: IUser = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe
    const correoExiste = await Usuario.findOne({ correo });
    if (correoExiste) {
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        })
    }

    //Hashear password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();

    res.json({
        msg: "post API - Controlador",
        usuario,
    });
};

export const usuariosPut = (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: "put API - Controlador",
        id,
    });
};

export const usuariosDelete = (req: Request, res: Response) => {
    res.json({
        msg: "delete API - Controlador",
    });
};
