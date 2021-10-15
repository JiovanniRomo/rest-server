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
Object.defineProperty(exports, "__esModule", { value: true });
exports.esRoleValido = void 0;
const Role = require('../models/role');
const esRoleValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(` EL rol ${rol} no esta registrado en la DB`);
    }
});
exports.esRoleValido = esRoleValido;
//# sourceMappingURL=db-validators.js.map