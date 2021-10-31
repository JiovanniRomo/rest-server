import { Model } from 'mongoose';
import { ICategoria } from '../models/categoria';
import { IUser } from '../models/usuario';

const Role = require('../models/role');
const Usuario: Model<IUser> = require('../models/usuario');
const Categoria: Model<ICategoria> = require('../models/categoria');

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
