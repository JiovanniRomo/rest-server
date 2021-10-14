import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    nombre: string,
    correo: string,
    password: string,
    img?: string,
    rol: string,
    estado: boolean,
    google: boolean
}

const UsuarioSchema: Schema<IUser> = new Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model<IUser>('Usuario', UsuarioSchema);