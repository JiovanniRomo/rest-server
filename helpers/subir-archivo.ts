import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';

export const subirArchivo = (
    files: UploadedFile | UploadedFile[],
    extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'],
    carpeta = ''
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const archivo = files as UploadedFile;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // Validar extensiones
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es valida`);
        }

        const nombreTmp = uuidv4() + '.' + extension;
        const uploadPath = `./uploads/${carpeta}/${nombreTmp}`;

        archivo.mv(uploadPath, (err: any) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(nombreTmp);
        });
    });
};
