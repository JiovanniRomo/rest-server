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
exports.buscar = void 0;
const mongoose_1 = require("mongoose");
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const opcionesPermitidas = ['usuarios', 'categorias', 'productos'];
const buscarUsuarios = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoId = (0, mongoose_1.isValidObjectId)(termino);
    if (esMongoId) {
        const usuario = yield Usuario.findById(termino);
        return res.json({
            results: usuario ? [usuario] : [],
        });
    }
    const regex = new RegExp(termino, 'i');
    const usuarios = yield Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }],
    });
    res.json({
        results: usuarios,
    });
});
const buscarCategoria = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = (0, mongoose_1.isValidObjectId)(termino);
    if (objectId) {
        const categoria = yield Categoria.findById(termino);
        return res.json({
            results: categoria ? [categoria] : [],
        });
    }
    const regex = new RegExp(termino, 'i');
    const categorias = yield Categoria.find({
        nombe: regex,
        estado: true,
    });
    res.json({
        results: categorias,
    });
});
const buscarProductos = (termino, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = (0, mongoose_1.isValidObjectId)(termino);
    if (objectId) {
        const producto = yield Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: producto ? [producto] : [],
        });
    }
    const regex = new RegExp(termino, 'i');
    const productos = yield Producto.find({
        nombe: regex,
        estado: true,
    }).populate('categoria', 'nombre');
    res.json({
        results: productos,
    });
});
const buscar = (req, res) => {
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
exports.buscar = buscar;
//# sourceMappingURL=busqueda.js.map