import mongoose, { Document, Schema } from 'mongoose';

export interface IRole extends Document{
    rol: string;
}

const RoleSchema: Schema<IRole> = new Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
})

module.exports = mongoose.model<IRole>('Role', RoleSchema);