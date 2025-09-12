import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password_hash: string;
    role: 'admin' | 'editor';
}

const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password_hash: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'editor'],
            default: 'editor',
        },
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;