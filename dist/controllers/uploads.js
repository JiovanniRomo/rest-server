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
exports.subirImagenCloudinary = exports.mostrarImagen = exports.actualizarImagen = exports.cargarArchivo = void 0;
const fs_1 = __importDefault(require("fs"));
const subir_archivo_1 = require("../helpers/subir-archivo");
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const path = require('path');
const cloudinary_1 = __importDefault(require("cloudinary"));
require('dotenv').config();
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
cloudinary_1.default.v2.config({
    cloud_name: 'dxlflkeah',
    api_key,
    api_secret,
});
const cargarArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const archivo = (_a = req.files) === null || _a === void 0 ? void 0 : _a.archivo;
    try {
        const nombre = yield (0, subir_archivo_1.subirArchivo)(archivo, undefined, 'imgs');
        res.json({
            nombre,
        });
    }
    catch (msg) {
        res.status(400).json({ msg });
    }
});
exports.cargarArchivo = cargarArchivo;
const actualizarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = yield Usuario.findById(id);
            if (!modelo || modelo.estado === false) {
                return res.status(404).json({
                    msg: `No existe el usuario con el identificador: ${id}`,
                });
            }
            break;
        case 'productos':
            modelo = yield Producto.findById(id);
            if (!modelo || modelo.estado === false) {
                return res.status(404).json({
                    msg: `No existe el producto con identificador: ${id}`,
                });
            }
            break;
        default:
            res.status(500).json({ msg: 'Se me olvido validar eso' });
    }
    if (modelo === null || modelo === void 0 ? void 0 : modelo.img) {
        const pathImagen = `./uploads/${coleccion}/${modelo === null || modelo === void 0 ? void 0 : modelo.img}`;
        if (fs_1.default.existsSync(pathImagen)) {
            fs_1.default.unlinkSync(pathImagen);
        }
    }
    const archivo = (_b = req.files) === null || _b === void 0 ? void 0 : _b.archivo;
    let nombre = yield (0, subir_archivo_1.subirArchivo)(archivo, undefined, coleccion);
    if (modelo) {
        modelo.img = nombre;
    }
    yield (modelo === null || modelo === void 0 ? void 0 : modelo.save());
    res.json(modelo);
});
exports.actualizarImagen = actualizarImagen;
const mostrarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = yield Usuario.findById(id);
            if (!modelo || modelo.estado === false) {
                return res.status(404).json({
                    msg: `No existe el usuario con el identificador: ${id}`,
                });
            }
            break;
        case 'productos':
            modelo = yield Producto.findById(id);
            if (!modelo || modelo.estado === false) {
                return res.status(404).json({
                    msg: `No existe el producto con identificador: ${id}`,
                });
            }
            break;
        default:
            res.status(500).json({ msg: 'Se me olvido validar eso' });
    }
    if (modelo === null || modelo === void 0 ? void 0 : modelo.img) {
        const pathImagen = path.join(__dirname, '../../uploads', coleccion, modelo === null || modelo === void 0 ? void 0 : modelo.img);
        if (fs_1.default.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }
    const pathImg = path.join(__dirname, '../../assets/', 'no image.png');
    res.sendFile(pathImg);
});
exports.mostrarImagen = mostrarImagen;
const subirImagenCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = yield Usuario.findById(id);
            if (!modelo || modelo.estado === false) {
                return res.status(404).json({
                    msg: `No existe el usuario con el identificador: ${id}`,
                });
            }
            break;
        case 'productos':
            modelo = yield Producto.findById(id);
            if (!modelo || modelo.estado === false) {
                return res.status(404).json({
                    msg: `No existe el producto con identificador: ${id}`,
                });
            }
            break;
        default:
            res.status(500).json({ msg: 'Se me olvido validar eso' });
    }
    try {
        const { tempFilePath } = (_c = req.files) === null || _c === void 0 ? void 0 : _c.archivo;
        const { secure_url } = yield cloudinary_1.default.v2.uploader.upload(tempFilePath);
        res.json(secure_url);
    }
    catch (error) {
        console.log(error);
    }
});
exports.subirImagenCloudinary = subirImagenCloudinary;
//# sourceMappingURL=uploads.js.map