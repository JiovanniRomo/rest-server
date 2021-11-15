"use strict";
const dbValidators = require('./helpers/dbValidator');
const generarJWT = require('./helpers/generarJWT');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');
module.exports = Object.assign(Object.assign(Object.assign(Object.assign({}, dbValidators), generarJWT), googleVerify), subirArchivo);
//# sourceMappingURL=index.js.map