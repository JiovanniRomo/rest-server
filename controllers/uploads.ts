import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';

export const cargarArchivo = (req: Request, res: Response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'No files were uploaded.'});
    }

    const archivo = req.files.sampleFile as UploadedFile;

    const uploadPath = path.resolve(__dirname + '../uploads/' + archivo.name);

    archivo.mv(uploadPath, (err: string) => {
        if (err) {
            console.log(err)
            return res.status(500).json({err});
        }

        res.json({msg: 'File uploaded to ' + uploadPath});
    });
};
