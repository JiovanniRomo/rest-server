"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const usuarios_1 = require("../controllers/usuarios");
exports.router = express_1.default.Router();
exports.router.get("/", usuarios_1.usuariosGet);
exports.router.put("/:id", usuarios_1.usuariosPut);
exports.router.post("/", usuarios_1.usuariosPost);
exports.router.delete("/", usuarios_1.usuariosDelete);
//# sourceMappingURL=user.js.map