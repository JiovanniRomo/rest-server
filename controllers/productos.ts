import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { ICategoria } from '../models/categoria';
import { IProducto } from '../models/producto';
const Producto: Model<IProducto> = require('../models/producto');
const Categoria: Model<ICategoria> = require('../models/categoria');

export const obtenerProductos = async (req: Request, res: Response) => {
    const { limite = 5, desde = 0 } = req.query;

    const productos = await Producto.find({ estado: true })
        .populate([
            { path: 'usuario', select: 'nombre' },
            { path: 'categoria', select: 'nombre' },
        ])
        .skip(Number(desde))
        .limit(Number(limite));

    res.json({
        ok: true,
        "total": productos.length,
        productos,
    });
};

export const obtenerProductoId = async (req: Request, res: Response) => {
    const id = req.params.id;

    const productoId = await Producto.findById(id);

    res.json({
        ok: true,
        producto: productoId,
    });
};

export const crearProducto = async (req: Request, res: Response) => {
    const nombre = req.body.nombre.toUpperCase();
    let categoria: string = req.body.categoria;
    categoria = categoria.toUpperCase();

    try {
        let producto = await Producto.findOne({ nombre });
        const categoriaDB = await Categoria.findOne({ nombre: categoria });

        if (producto) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El producto ya existe',
            });
        }

        const data = {
            nombre,
            usuario: req.usuario?._id,
            categoria: categoriaDB?._id,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
        };

        producto = new Producto(data);

        await producto.save();

        res.json({
            ok: true,
            mensaje: 'Todo esta bien, crear producto!!',
            productoDB: producto,
        });
    } catch (error) {
        console.log(error);
    }
};

export const eliminarProducto = async (req: Request, res: Response) => {
    const id = req.params.id;

    const producto = await Producto.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
    );

    res.json({
        ok: true,
        msg: `El producto: ${producto?.nombre} ha sido eliminado`,
        productoDB: producto,
    });
};

export const actualizarProducto = async (req: Request, res: Response) => {
    const id = req.params.id;

    const nuevoNombre = req.body.nombre ? req.body.nombre.toUpperCase() : '';
    const usuarioActualizando = req.usuario?._id;

    const producto = await Producto.findById(id);

    if (!producto?.estado) {
        return res.status(400).json({
            ok: false,
            msg: 'El producto no existe, por favor verifique el producto.',
        });
    }

    const productoActualizado = await Producto.findByIdAndUpdate(
        id,
        {
            nombre: nuevoNombre ? nuevoNombre : producto.nombre,
            descripcion: req.body.descripcion
                ? req.body.descripcion
                : producto.descripcion,
            usuario: usuarioActualizando,
        },
        { new: true }
    ).populate([
        { path: 'usuario', select: 'nombre' },
        { path: 'categoria', select: 'nombre' },
    ]);

    res.json({
        ok: true,
        msg: 'El producto ha sido actualizado con exito',
        productoActualizado,
    });
};
