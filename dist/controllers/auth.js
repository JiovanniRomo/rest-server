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
exports.googleSignIn = exports.login = void 0;
const generar_jwt_1 = require("../helpers/generar-jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const google_verify_1 = require("../helpers/google-verify");
const Usuario = require('../models/usuario');
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        const usuario = yield Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario o la password no son correctos',
            });
        }
        if (!usuario.estado) {
            res.status(400).json({
                msg: 'Lo siento el usuario ha sido eliminado',
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            res.status(400).json({
                msg: 'Lo siento, el password no coincide',
            });
        }
        const token = yield (0, generar_jwt_1.generarJWT)(usuario.id);
        res.json({
            usuario,
            token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.login = login;
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { nombre, img, correo } = yield (0, google_verify_1.googleVerify)(id_token);
        let usuario = yield Usuario.findOne({ correo });
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true,
            };
            usuario = new Usuario(data);
            yield usuario.save();
        }
        if (!usuario.estado) {
            res.status(401).json({
                msg: 'Hable con el administrador: usuario bloqueado',
            });
        }
        const token = yield (0, generar_jwt_1.generarJWT)(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no es valido',
        });
    }
});
exports.googleSignIn = googleSignIn;
//# sourceMappingURL=auth.js.map