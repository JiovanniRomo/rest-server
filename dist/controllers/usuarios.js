"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDelete = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const usuariosGet = (req, res) => {
    res.json({
        msg: "get API - Controlador",
    });
};
exports.usuariosGet = usuariosGet;
const usuariosPost = (req, res) => {
    res.json({
        msg: "post API - Controlador",
    });
};
exports.usuariosPost = usuariosPost;
const usuariosPut = (req, res) => {
    res.json({
        msg: "put API - Controlador",
    });
};
exports.usuariosPut = usuariosPut;
const usuariosDelete = (req, res) => {
    res.json({
        msg: "delete API - Controlador",
    });
};
exports.usuariosDelete = usuariosDelete;
//# sourceMappingURL=usuarios.js.map