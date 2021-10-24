"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No se ha proporcionado un token de acceso'
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRETKEY);
        req.uid = uid;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
    console.log(token);
    next();
};
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-jsonwebtoken.js.map