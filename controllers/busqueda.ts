import { Request, Response } from 'express';
import { isValidObjectId, Model } from 'mongoose';
import { IUser } from '../models/usuario';
import { IProducto } from '../models/producto';
import { ICategoria } from '../models/categoria';
const Usuario: Model<IUser> = require('../models/usuario');
const Producto: Model<IProducto> = require('../models/producto');
const Categoria: Model<ICategoria> = require('../models/categoria');

const opcionesPermitidas = ['usuarios', 'categorias', 'productos'];

const buscarUsuarios = async (termino: string, res: Response) => {
    // Returns true if the received string is a valid ObjectId
    const esMongoId = isValidObjectId(termino);

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: usuario ? [usuario] : [],
        });
    }

    //Creamos una expresion regular para que las busquedas del nombre no sean sensibles a las mayusculas o minusculas
    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }],
    });

    res.json({
        results: usuarios,
    });
};

const buscarCategoria = async (termino: string, res: Response) => {
    const objectId = isValidObjectId(termino);
    if (objectId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: categoria ? [categoria] : [],
        });
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({
        nombe: regex,
        estado: true,
    });

    res.json({
        results: categorias,
    });
};

const buscarProductos = async (termino: string, res: Response) => {
    const objectId = isValidObjectId(termino);
    if (objectId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: producto ? [producto] : [],
        });
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({
        nombe: regex,
        estado: true,
    }).populate('categoria', 'nombre')

    res.json({
        results: productos,
    });
};

export const buscar = (req: Request, res: Response) => {
    const { coleccion, termino } = req.params;

    if (!opcionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            ok: false,
            msg: `Las colecciones permitidas son: ${opcionesPermitidas}`,
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        case 'categorias':
            break;

        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Olvide hacer esta busqueda',
            });
    }
};
