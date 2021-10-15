const Role = require('../models/role');

export const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });

    if(!existeRol) {
        throw new Error(` EL rol ${ rol } no esta registrado en la DB`)
    }
}


