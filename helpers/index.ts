const dbValidators = require('./helpers/dbValidator');
const generarJWT = require('./helpers/generarJWT');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}