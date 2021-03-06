"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares");
exports.router = express_1.default.Router();
exports.router.get('/', usuarios_1.usuariosGet);
exports.router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUsuarioPorId),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRoleValido),
    middlewares_1.validaCampos,
], usuarios_1.usuariosPut);
exports.router.post('/', [
    (0, express_validator_1.check)('nombre', 'EL nombre es obligatorio')
        .not()
        .isEmpty()
        .trim()
        .escape(),
    (0, express_validator_1.check)('password', 'La password es obligatoria y con mas de 6 caracteres')
        .not()
        .isEmpty()
        .isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'EL correo no es valido').isEmail().custom(db_validators_1.existeEmail),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRoleValido),
    middlewares_1.validaCampos,
], usuarios_1.usuariosPost);
exports.router.delete('/:id', [
    middlewares_1.validaJWT,
    (0, middlewares_1.tieneUnRole)('ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE'),
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUsuarioPorId),
    middlewares_1.validaCampos,
], usuarios_1.usuariosDelete);
//# sourceMappingURL=user.js.map