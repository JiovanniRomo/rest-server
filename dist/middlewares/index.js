"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneUnRole = exports.esAdmin = exports.validaJWT = exports.validaCampos = void 0;
const validar_campos_1 = require("../middlewares/validar-campos");
Object.defineProperty(exports, "validaCampos", { enumerable: true, get: function () { return validar_campos_1.validarCampos; } });
const validar_jsonwebtoken_1 = require("../middlewares/validar-jsonwebtoken");
Object.defineProperty(exports, "validaJWT", { enumerable: true, get: function () { return validar_jsonwebtoken_1.validarJWT; } });
const validar_role_1 = require("../middlewares/validar-role");
Object.defineProperty(exports, "esAdmin", { enumerable: true, get: function () { return validar_role_1.esAdminRole; } });
Object.defineProperty(exports, "tieneUnRole", { enumerable: true, get: function () { return validar_role_1.tieneRole; } });
//# sourceMappingURL=index.js.map