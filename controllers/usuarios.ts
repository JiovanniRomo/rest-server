import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { IUser } from "../models/usuario";
import { Model } from "mongoose";
const Usuario: Model<IUser> = require("../models/usuario");

export const usuariosGet = (req: Request, res: Response) => {
    const { q, nombre = "No name", page = 1, limit = 10 } = req.query;

    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        page,
        limit,
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
        msg: "post API - Controlador",
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

    // { new: true } means that mongoose has to return the updated document, NOT the original one
    const usuario = await Usuario.findByIdAndUpdate(id, rest, { new: true });

    res.json({
        msg: "put API - Controlador",
        usuario,
    });
};

export const usuariosDelete = (req: Request, res: Response) => {
    res.json({
        msg: "delete API - Controlador",
    });
};
