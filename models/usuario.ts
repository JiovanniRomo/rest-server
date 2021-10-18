import mongoose, { Schema, Document } from "mongoose";
import bcryptjs from 'bcryptjs';

export interface IUser extends Document {
    nombre: string,
    correo: string,
    password: string,
    img?: string,
    rol: string,
    estado: boolean,
    google: boolean,
    encriptarPassword(password: string): string;
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
});

UsuarioSchema.methods.toJSON = function () {

    //this.toOBject is a mongoose method that convert the model to a JS common object so we
    // could use his methods or properties related to an object
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

UsuarioSchema.methods.encriptarPassword = function(password: string): string {
    const salt = bcryptjs.genSaltSync();
    return this.password =  bcryptjs.hashSync(password, salt);
}


module.exports = mongoose.model<IUser>('Usuario', UsuarioSchema);