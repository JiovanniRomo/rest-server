"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriasRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const categorias_1 = require("../controllers/categorias");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares");
const middlewares_2 = require("../middlewares");
exports.categoriasRouter = express_1.default.Router();
exports.categoriasRouter.get('/', categorias_1.categoriasGet);
exports.categoriasRouter.get('/:id', [
    (0, express_validator_1.check)('id', 'El id no es valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUnRegistroId),
    middlewares_1.validaCampos,
], categorias_1.obtenerCategoriaId);
exports.categoriasRouter.post('/', [
    middlewares_2.validaJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    middlewares_1.validaCampos,
], categorias_1.crearCategoria);
exports.categoriasRouter.put('/:id', [
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUnRegistroId),
    middlewares_2.validaJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    middlewares_1.validaCampos,
], categorias_1.actualizarRegistroPorId);
exports.categoriasRouter.delete('/:id', [
    middlewares_2.validaJWT,
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUnRegistroId),
    middlewares_1.esAdmin,
    middlewares_1.validaCampos,
], categorias_1.eliminarCategoria);
//# sourceMappingURL=categorias.js.map