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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validar_campos_1 = require("../middlewares/validar-campos");
const Role = require('../models/role');
exports.router = express_1.default.Router();
exports.router.get("/", usuarios_1.usuariosGet);
exports.router.put("/:id", usuarios_1.usuariosPut);
exports.router.post("/", [
    (0, express_validator_1.check)("nombre", "EL nombre es obligatorio").not().isEmpty().trim().escape(),
    (0, express_validator_1.check)("password", "La password es obligatoria y con mas de 6 caracteres")
        .not()
        .isEmpty()
        .isLength({ min: 6 }),
    (0, express_validator_1.check)("correo", "EL correo no es valido").isEmail().normalizeEmail(),
    (0, express_validator_1.check)('rol').custom((rol = '') => __awaiter(void 0, void 0, void 0, function* () {
        const existeRol = yield Role.findOne({ rol });
        if (!existeRol) {
            throw new Error(` EL rol ${rol} no esta registrado en la DB`);
        }
    })),
    validar_campos_1.validarCampos,
], usuarios_1.usuariosPost);
exports.router.delete("/", usuarios_1.usuariosDelete);
//# sourceMappingURL=user.js.map