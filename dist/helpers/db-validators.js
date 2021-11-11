"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esCategoriaValida = exports.existeProductoPorId = exports.existeUnRegistroId = exports.existeUsuarioPorId = exports.existeEmail = exports.esRoleValido = void 0;
const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const esRoleValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(` EL rol ${rol} no esta registrado en la DB`);
    }
});
exports.esRoleValido = esRoleValido;
const existeEmail = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    const correoExiste = yield Usuario.findOne({ correo });
    if (correoExiste) {
        throw new Error(`El correo ${correo} ya ha sido registrado en la DB. Intente con algun otro`);
    }
});
exports.existeEmail = existeEmail;
const existeUsuarioPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id} id no esta registrado. Intente con algun otro`);
    }
});
exports.existeUsuarioPorId = existeUsuarioPorId;
const existeUnRegistroId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoriaDB = yield Categoria.findById(id);
    if (!categoriaDB) {
        throw new Error(`El id: ${id} no tiene un registro. Intenta con algun otro, por favor`);
    }
});
exports.existeUnRegistroId = existeUnRegistroId;
const existeProductoPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productoDB = yield Producto.findById(id);
    if (!productoDB) {
        throw new Error(`El id: ${id} no tiene un registro. Intenta con algun otro, por favor`);
    }
});
exports.existeProductoPorId = existeProductoPorId;
const esCategoriaValida = (categoria = '') => __awaiter(void 0, void 0, void 0, function* () {
    const nombreQuery = categoria.toUpperCase();
    const existeCategoria = yield Categoria.findOne({ nombre: nombreQuery });
    if (!existeCategoria) {
        throw new Error(`La categoria: ${nombreQuery} no existe`);
    }
});
exports.esCategoriaValida = esCategoriaValida;
//# sourceMappingURL=db-validators.js.map