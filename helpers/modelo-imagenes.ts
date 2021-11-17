import { Model } from 'mongoose';
import { IProducto } from '../models/producto';
import { IUser } from '../models/usuario';

const Usuario: Model<IUser> = require('../models/usuario');
const Producto: Model<IProducto> = require('../models/producto');
type Respuesta = IProducto | IUser | null | undefined;

export const retornarModeloImagenes = (coleccion: string, id: string): Promise<Respuesta> => {
    return new Promise( async (resolve, reject) => {
        let modelo;
    
        switch (coleccion) {
            case 'usuarios':
                modelo = await Usuario.findById(id);
                if (!modelo || modelo.estado === false) {
                    reject('No se encontro el usuario');
                }
                break;
    
            case 'productos':
                modelo = await Producto.findById(id);
                if (!modelo || modelo.estado === false) {
                    reject('No se encontro el producto');
                }
                break;
    
            default:
                reject('Oh no, se me olvido validar eso!')
        }

        resolve(modelo);
    });
};
