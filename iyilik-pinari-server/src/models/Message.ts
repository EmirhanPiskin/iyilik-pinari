import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
    name: string;
    email: string;
    message: string;
    isRead: boolean;
}

const MessageSchema: Schema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;