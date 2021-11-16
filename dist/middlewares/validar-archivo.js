"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarArchivoSubir = void 0;
const validarArchivoSubir = (req, res, next) => {
    if (!req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos por subir.' });
    }
    next();
};
exports.validarArchivoSubir = validarArchivoSubir;
//# sourceMappingURL=validar-archivo.js.map