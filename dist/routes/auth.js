"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validar_campos_1 = require("../middlewares/validar-campos");
exports.authRouter = express_1.default.Router();
exports.authRouter.post('/login', [
    (0, express_validator_1.check)('correo', 'EL correo no es valido').isEmail(),
    (0, express_validator_1.check)('password', 'La passsword es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], auth_1.login);
//# sourceMappingURL=auth.js.map