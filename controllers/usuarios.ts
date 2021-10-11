import { Request, Response } from "express";

export const usuariosGet = (req: Request, res: Response) => {
    res.json({
        msg: "get API - Controlador",
    });
};

export const usuariosPost = (req: Request, res: Response) => {
    res.json({
        msg: "post API - Controlador",
    });
};

export const usuariosPut = (req: Request, res: Response) => {
    res.json({
        msg: "put API - Controlador",
    });
};

export const usuariosDelete = (req: Request, res: Response) => {
    res.json({
        msg: "delete API - Controlador",
    });
};
