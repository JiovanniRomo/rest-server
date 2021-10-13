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
exports.usuariosDelete = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const Usuario = require('../models/usuario');
const usuariosGet = (req, res) => {
    const { q, nombre = 'No name', page = 1, limit = 10 } = req.query;
    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        page,
        limit
    });
};
exports.usuariosGet = usuariosGet;
const usuariosPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const usuario = new Usuario(body);
    yield usuario.save();
    res.json({
        msg: "post API - Controlador",
        usuario,
    });
});
exports.usuariosPost = usuariosPost;
const usuariosPut = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "put API - Controlador",
        id,
    });
};
exports.usuariosPut = usuariosPut;
const usuariosDelete = (req, res) => {
    res.json({
        msg: "delete API - Controlador",
    });
};
exports.usuariosDelete = usuariosDelete;
//# sourceMappingURL=usuarios.js.map