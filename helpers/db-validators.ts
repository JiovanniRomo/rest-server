import { Model } from 'mongoose';
import { ICategoria } from '../models/categoria';
import { IProducto } from '../models/producto';
import { IUser } from '../models/usuario';

const Role = require('../models/role');
const Usuario: Model<IUser> = require('../models/usuario');
const Categoria: Model<ICategoria> = require('../models/categoria');
const Producto: Model<IProducto> = require('../models/producto');

export const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(` EL rol ${rol} no esta registrado en la DB`);
    }
};

export const existeEmail = async (correo: string) => {
    const correoExiste = await Usuario.findOne({ correo });
    if (correoExiste) {
        throw new Error(
            `El correo ${correo} ya ha sido registrado en la DB. Intente con algun otro`
        );
    }
};

export const existeUsuarioPorId = async (id: string) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(
            `El id: ${id} id no esta registrado. Intente con algun otro`
        );
    }
};

export const existeUnRegistroId = async (id: string) => {
    const categoriaDB = await Categoria.findById(id);
    if (!categoriaDB) {
        throw new Error(
            `El id: ${id} no tiene un registro. Intenta con algun otro, por favor`
        );
    }
};

export const existeProductoPorId = async (id: string) => {
    const productoDB = await Producto.findById(id);

    if(!productoDB) {
        throw new Error(
            `El id: ${id} no tiene un registro. Intenta con algun otro, por favor`
        );
    }
}

export const esCategoriaValida = async (categoria: string = '') => {
    const nombreQuery = categoria.toUpperCase();

    const existeCategoria = await Categoria.findOne({nombre: nombreQuery});

    if (!existeCategoria) {
        throw new Error(`La categoria: ${nombreQuery} no existe`);
    }
};


export const coleccionesPermitidas = (coleccion: string, colecciones?: string[]) => {

    const incluida = colecciones?.includes(coleccion);
    if(!incluida) {
        throw new Error(`La coleccion: ${coleccion} no esta permitida`);
    }

    return true;
}
