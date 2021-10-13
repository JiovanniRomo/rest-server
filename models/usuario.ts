import { Schema, model } from "mongoose";

interface UserSchema {
    nombre: Object,
    correo: Object,
    password: Object,
    img: Object,
    rol: Object,
    estado: Object,
    google: Object
}

const UsuarioSchema = new Schema<UserSchema>({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'El password es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
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

module.exports = model( 'Usuario', UsuarioSchema );