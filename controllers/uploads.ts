import fs from 'fs';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { subirArchivo } from '../helpers/subir-archivo';
import { IProducto } from '../models/producto';
import { IUser } from '../models/usuario';
import { UploadedFile } from 'express-fileupload';
const Usuario: Model<IUser> = require('../models/usuario');
const Producto: Model<IProducto> = require('../models/producto');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dxlflkeah',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const cargarArchivo = async (req: Request, res: Response) => {
    const archivo = req.files?.archivo;

    try {
        const nombre = await subirArchivo(archivo!, undefined, 'imgs');

        res.json({
            nombre,
        });
    } catch (msg) {
        res.status(400).json({ msg });
    }
};

export const actualizarImagen = async (req: Request, res: Response) => {
    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo || modelo.estado === false) {
                return res.status(404).json({
                    msg: `No existe el usuario con el identificador: ${id}`,
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo || modelo.estado === false) {
                return res.status(404).json({
                    msg: `No existe el producto con identificador: ${id}`,
                });
            }
            break;

        default:
            res.status(500).json({ msg: 'Se me olvido validar eso' });
    }

    //Limpieza previa de archivos
    if (modelo?.img) {
        //Borrar imagen de server
        const pathImagen = `./uploads/${coleccion}/${modelo?.img}`;
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    const archivo = req.files?.archivo;
    let nombre = await subirArchivo(archivo!, undefined, coleccion);
    if (modelo) {
        modelo.img = nombre;
    }

    await modelo?.save();

    res.json(modelo);
};

export const mostrarImagen = async (req: Request, res: Response) => {
    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo || modelo.estado === false) {
                return res.status(404).json({
                    msg: `No existe el usuario con el identificador: ${id}`,
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo || modelo.estado === false) {
                return res.status(404).json({
                    msg: `No existe el producto con identificador: ${id}`,
                });
            }
            break;

        default:
            res.status(500).json({ msg: 'Se me olvido validar eso' });
    }

    //Limpieza previa de archivos
    if (modelo?.img) {
        //Borrar imagen de server
        const pathImagen = path.join(
            __dirname,
            '../../uploads',
            coleccion,
            modelo?.img
        );
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    const pathImg = path.join(__dirname, '../../assets/', 'no image.png');

    res.sendFile(pathImg);
};

export const subirImagenCloudinary = async (req: Request, res: Response) => {
    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo || modelo.estado === false) {
                return res.status(404).json({
                    msg: `No existe el usuario con el identificador: ${id}`,
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo || modelo.estado === false) {
                return res.status(404).json({
                    msg: `No existe el producto con identificador: ${id}`,
                });
            }
            break;

        default:
            res.status(500).json({ msg: 'Se me olvido validar eso' });
    }

    try {
        const { tempFilePath } = req.files?.archivo as UploadedFile;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

        res.json(secure_url);
    } catch (error) {
        console.log(error);
    }
};
