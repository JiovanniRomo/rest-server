import { Request, Response } from "express";

export const usuariosGet = (req: Request, res: Response) => {
    const { q, nombre = 'No name', page = 1, limit = 10 } = req.query;

    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        page,
        limit
    });
};

export const usuariosPost = (req: Request, res: Response) => {
    const body = req.body;

    res.json({
        msg: "post API - Controlador",
        body,
    });
};

export const usuariosPut = (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: "put API - Controlador",
        id,
    });
};

export const usuariosDelete = (req: Request, res: Response) => {
    res.json({
        msg: "delete API - Controlador",
    });
};
