"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const productos_1 = require("../controllers/productos");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jsonwebtoken_1 = require("../middlewares/validar-jsonwebtoken");
exports.productosRouter = express_1.default.Router();
exports.productosRouter.get('/', productos_1.obtenerProductos);
exports.productosRouter.get('/:id', [
    (0, express_validator_1.check)('id', 'El id del producto es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('id', 'El id no es valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeProductoPorId),
    validar_campos_1.validarCampos,
], productos_1.obtenerProductoId);
exports.productosRouter.post('/', [
    validar_jsonwebtoken_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre del producto es obligatorio')
        .not()
        .isEmpty(),
    (0, express_validator_1.check)('categoria', 'La categoria es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('categoria').custom(db_validators_1.esCategoriaValida),
    validar_campos_1.validarCampos,
], productos_1.crearProducto);
exports.productosRouter.delete('/:id', [
    (0, express_validator_1.check)('id', 'El id es requerido').not().isEmpty(),
    (0, express_validator_1.check)('id', 'El id no es valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeProductoPorId),
    validar_jsonwebtoken_1.validarJWT,
    middlewares_1.esAdmin,
    validar_campos_1.validarCampos,
], productos_1.eliminarProducto);
exports.productosRouter.put('/:id', [
    validar_jsonwebtoken_1.validarJWT,
    (0, express_validator_1.check)('id', 'El id es requerido').not().isEmpty(),
    (0, express_validator_1.check)('id', 'El id no es valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeProductoPorId),
    validar_campos_1.validarCampos
], productos_1.actualizarProducto);
//# sourceMappingURL=productos.js.map