import { NextFunction, Request, Response } from 'express';

export const esAdminRole = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin verificar primero el token',
        });
    }

    const { nombre, rol } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `No se puede ejecutar esta accion! El usuario ${nombre} no es un administrador`,
        });
    }

    next();
};

export const tieneRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere validar el rol sin haber validado el token',
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }

        next();
    };
};
