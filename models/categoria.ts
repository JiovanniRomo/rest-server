import mongoose, { Document, Schema } from 'mongoose';

export interface ICategoria extends Document {
    nombre: string;
    estado: boolean;
    usuario: Schema.Types.ObjectId;
}

const CategoriaSchema: Schema<ICategoria> = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
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
});

CategoriaSchema.methods.toJSON = function () {
    let { __v, estado, ...categoria } = this.toObject();
    return categoria;
};

module.exports = mongoose.model<ICategoria>('Categoria', CategoriaSchema);
