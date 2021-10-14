import express from "express";
import { check } from "express-validator";
import {
    usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut,
} from "../controllers/usuarios";
import { validarCampos } from "../middlewares/validar-campos";
const Role = require('../models/role');

export const router = express.Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post(
    "/",
    [
        check("nombre", "EL nombre es obligatorio").not().isEmpty().trim().escape(),
        check("password", "La password es obligatoria y con mas de 6 caracteres")
            .not()
            .isEmpty()
            .isLength({ min: 6 }),
        check("correo", "EL correo no es valido").isEmail().normalizeEmail(),
        // check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        check('rol').custom( async (rol = '') => {
            const existeRol = await Role.findOne({ rol });

            if(!existeRol) {
                throw new Error(` EL rol ${ rol } no esta registrado en la DB`)
            }
        }),
        validarCampos,
    ],
    usuariosPost
);

router.delete("/", usuariosDelete);
