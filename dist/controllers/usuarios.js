"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDelete = exports.usuariosPut = exports.usuariosPost = exports.usuariosGet = void 0;
const usuariosGet = (req, res) => {
    const { q, nombre = 'No name', page = 1, limit = 10 } = req.query;
    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        page,
        limit
    });
};
exports.usuariosGet = usuariosGet;
const usuariosPost = (req, res) => {
    const body = req.body;
    res.json({
        msg: "post API - Controlador",
        body,
    });
};
exports.usuariosPost = usuariosPost;
const usuariosPut = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "put API - Controlador",
        id,
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