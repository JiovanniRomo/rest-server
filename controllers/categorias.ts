import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { ICategoria } from '../models/categoria';
const Categoria: Model<ICategoria> = require('../models/categoria');

export const categoriasGet = async (req: Request, res: Response) => {
    const { desde = 0, limite = 10 } = req.query;

    const categorias = await Categoria.countDocuments({ estado: true });
    const categoriasNombre = await Categoria.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limite));

    res.json({
        msg: 'todo ok',
        totalCategorias: categorias,
        categoriasNombre,
    });
};

export const obtenerCategoriaId = (req: Request, res: Response) => {
    res.json({
        msg: 'todo ok - get categoria id',
    });
};

export const crearCategoria = async (req: Request, res: Response) => {
    const nombre = req.body.nombre.toUpperCase();

    try {
        const categoriaDB = await Categoria.findOne({ nombre });
        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre} ya existe`,
            });
        }

        //Generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario ? req.usuario._id : null,
        };

        const categoria = new Categoria(data);

        // Guardar en la base de datos
        await categoria.save();

        res.status(200).json(categoria);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Oh no! Algo ha salido muy mal!',
        });
    }
};

export const actualizarRegistroPorId = (req: Request, res: Response) => {
    res.json({
        msg: 'todo ok - actualizar registro por id',
    });
};

export const eliminarCategoria = (req: Request, res: Response) => {
    res.json({
        msg: 'todo ok - eliminar categoria',
    });
};
