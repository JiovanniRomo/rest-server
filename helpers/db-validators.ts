const Role = require('../models/role');
const Usuario = require('../models/usuario');


export const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(` EL rol ${rol} no esta registrado en la DB`)
    }
}

export const existeEmail = async (correo: string) => {
    const correoExiste = await Usuario.findOne({ correo });
    if (correoExiste) {
        throw new Error(`El correo ${ correo } ya ha sido registrado en la DB. Intente con algun otro`);
    }
}