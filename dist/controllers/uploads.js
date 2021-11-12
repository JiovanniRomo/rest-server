"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cargarArchivo = void 0;
const path_1 = __importDefault(require("path"));
const cargarArchivo = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
    }
    const archivo = req.files.sampleFile;
    const uploadPath = path_1.default.resolve(__dirname + '../uploads/' + archivo.name);
    archivo.mv(uploadPath, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ err });
        }
        res.json({ msg: 'File uploaded to ' + uploadPath });
    });
};
exports.cargarArchivo = cargarArchivo;
//# sourceMappingURL=uploads.js.map