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
exports.retornarModeloImagenes = void 0;
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const retornarModeloImagenes = (coleccion, id) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let modelo;
        switch (coleccion) {
            case 'usuarios':
                modelo = yield Usuario.findById(id);
                if (!modelo || modelo.estado === false) {
                    reject('No se encontro el usuario');
                }
                break;
            case 'productos':
                modelo = yield Producto.findById(id);
                if (!modelo || modelo.estado === false) {
                    reject('No se encontro el producto');
                }
                break;
            default:
                reject('Oh no, se me olvido validar eso!');
        }
        resolve(modelo);
    }));
};
exports.retornarModeloImagenes = retornarModeloImagenes;
//# sourceMappingURL=modelo-imagenes.js.map