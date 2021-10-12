import express from "express";
import {
    usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut,
} from "../controllers/usuarios";

export const router = express.Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post("/", usuariosPost);

router.delete("/", usuariosDelete);
