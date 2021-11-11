"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.busquedasRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const busqueda_1 = require("../controllers/busqueda");
const validar_campos_1 = require("../middlewares/validar-campos");
exports.busquedasRouter = express_1.default.Router();
exports.busquedasRouter.get('/:coleccion/:termino', [
    (0, express_validator_1.check)('coleccion')
        .trim()
        .not()
        .isEmpty()
        .withMessage('La coleccion es obligatoria'),
    (0, express_validator_1.check)('termino')
        .trim()
        .not()
        .isEmpty()
        .withMessage('El termino de busqueda es obligatorio'),
    validar_campos_1.validarCampos
], busqueda_1.buscar);
//# sourceMappingURL=busqueda.js.map