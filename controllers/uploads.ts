import fs from 'fs';
import { Request, Response } from 'express';
import { subirArchivo } from '../helpers/subir-archivo';
import { UploadedFile } from 'express-fileupload';
import cloudinary from 'cloudinary';
import { retornarModeloImagenes } from '../helpers/modelo-imagenes';
const path = require('path');
require('dotenv').config();

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.v2.config({
    cloud_name: 'dxlflkeah',
    api_key,
    api_secret,
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
    let modelo = await retornarModeloImagenes(coleccion, id);

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

    let modelo = await retornarModeloImagenes(coleccion, id);

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

    let modelo = await retornarModeloImagenes(coleccion, id);

    try {

        if(modelo?.img) {
            const nombreArr = modelo?.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [ public_id ] = nombre.split('.');

            await cloudinary.v2.uploader.destroy(public_id);
        }

        const { tempFilePath } = req.files?.archivo as UploadedFile;
        const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath);

        if(modelo?.img) {
            modelo.img = secure_url;
        }

        await modelo?.save();

        res.json(modelo);
    } catch (error) {
        console.log(error);
    }
};
