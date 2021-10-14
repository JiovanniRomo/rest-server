import express from "express";
import { check } from "express-validator";
import {
    usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut,
} from "../controllers/usuarios";
import { validarCampos } from "../middlewares/validar-campos";

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
        check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        validarCampos,
    ],
    usuariosPost
);

router.delete("/", usuariosDelete);
