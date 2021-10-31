import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { ICategoria } from '../models/categoria';
const Categoria: Model<ICategoria> = require('../models/categoria');

export const categoriasGet = async (req: Request, res: Response) => {
    const { desde = 0, limite = 10 } = req.query;

    try {
        const categorias = await Categoria.countDocuments({ estado: true });
        const categoriasNombre = await Categoria.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite));

        res.json({
            msg: 'todo ok',
            totalCategorias: categorias,
            categoriasNombre,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Algo paso, por favor intentalo de nuevo',
        });
    }
};

export const obtenerCategoriaId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const categoriaSeleccionada = await Categoria.findById(id).populate({
        path: 'usuario',
        select: 'nombre',
    });

    if (!categoriaSeleccionada) {
        return res.status(404).json({
            msg: 'No existe la categoria, intenta con otro ID, por favor',
        });
    }

    if(!categoriaSeleccionada.estado){ 
        return res.status(404).json({
            msg: 'La categoria no esta disponible',
        });
    }

    res.json({
        categoriaSeleccionada,
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

export const actualizarRegistroPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const nombreActualizado = req.body.nombre.toUpperCase();

    try {

        const categoriaDB = await Categoria.findById(id);

        if(!categoriaDB?.estado){
            return res.status(400).json({
                msg: 'La categoria que intenta actualizar ha sido eliminada.'
            });
        }

        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            id,
            { nombre: nombreActualizado },
            { new: true }
        )
        .populate({
            path: 'usuario'
        })
        
        res.json({
            categoriaActualizada,
            msg: 'todo ok - actualizar registro por id',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Algo paso! Por favor intentalo de nuevo',
        });
    }
};

export const eliminarCategoria = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const categoriaEliminada = await Categoria.findByIdAndUpdate(
            id,
            { estado: false },
            { new: true }
        );

        res.json({
            categoriaEliminada,
            msg: 'todo ok - eliminar categoria',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se que ha salido mal',
        });
    }
};
