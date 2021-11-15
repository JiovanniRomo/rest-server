"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirArchivo = void 0;
const uuid_1 = require("uuid");
const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const archivo = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es valida`);
        }
        const nombreTmp = (0, uuid_1.v4)() + '.' + extension;
        const uploadPath = `./uploads/${carpeta}/${nombreTmp}`;
        archivo.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(nombreTmp);
        });
    });
};
exports.subirArchivo = subirArchivo;
//# sourceMappingURL=subir-archivo.js.map