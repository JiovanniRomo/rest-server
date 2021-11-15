import { Request, Response } from 'express';
import { subirArchivo } from '../helpers/subir-archivo';

export const cargarArchivo = async (req: Request, res: Response) => {

    if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.archivo
    ) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
    }

    try {
        const nombre = await subirArchivo(req.files.archivo, undefined, 'imgs');
        
        res.json({
            nombre, 
        });
    } catch (msg) {
        res.status(400).json({ msg });
    }
};
