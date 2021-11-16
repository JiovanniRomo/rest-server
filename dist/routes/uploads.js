"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const uploads_1 = require("../controllers/uploads");
const db_validators_1 = require("../helpers/db-validators");
const validar_archivo_1 = require("../middlewares/validar-archivo");
const validar_campos_1 = require("../middlewares/validar-campos");
exports.uploadsRouter = express_1.default.Router();
exports.uploadsRouter.post('/', validar_archivo_1.validarArchivoSubir, uploads_1.cargarArchivo);
exports.uploadsRouter.put('/:coleccion/:id', [
    (0, express_validator_1.check)('id', 'El id no es valido').isMongoId(),
    (0, express_validator_1.check)('coleccion').custom(c => (0, db_validators_1.coleccionesPermitidas)(c, ['usuarios', 'productos'])),
    validar_archivo_1.validarArchivoSubir,
    validar_campos_1.validarCampos
], uploads_1.subirImagenCloudinary);
exports.uploadsRouter.get('/:coleccion/:id', [
    (0, express_validator_1.check)('id', 'El id no es valido').isMongoId(),
    (0, express_validator_1.check)('coleccion').custom(c => (0, db_validators_1.coleccionesPermitidas)(c, ['usuarios', 'productos'])),
    validar_campos_1.validarCampos
], uploads_1.mostrarImagen);
//# sourceMappingURL=uploads.js.map