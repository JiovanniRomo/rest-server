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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDelete = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
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
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    const correoExiste = yield Usuario.findOne({ correo });
    if (correoExiste) {
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        });
    }
    const salt = bcryptjs_1.default.genSaltSync();
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
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