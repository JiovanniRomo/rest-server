import express from "express";
import { check } from "express-validator";
import {
    usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut,
} from "../controllers/usuarios";

export const router = express.Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post("/", [
    check('correo', 'EL correo no es valido').isEmail().normalizeEmail(),
] ,usuariosPost);

router.delete("/", usuariosDelete);