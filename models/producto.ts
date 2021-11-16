import mongoose, { Document, Schema } from 'mongoose';

export interface IProducto extends Document {
    nombre: string;
    estado: boolean;
    usuario: Schema.Types.ObjectId;
    precio: number;
    categoria: Schema.Types.ObjectId;
    descripcion: string;
    disponible: boolean;
    img: string;
}

const ProductoSchema: Schema<IProducto> = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    // it's deleted?
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true,
    },
    descripcion: {
        type: String,
    },
    //Do i have any in stock?
    disponible: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String,
    }
});

ProductoSchema.methods.toJSON = function () {
    let { __v, estado, ...producto } = this.toObject();
    return producto;
};

module.exports = mongoose.model<IProducto>('Producto', ProductoSchema);
