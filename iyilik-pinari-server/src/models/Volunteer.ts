import mongoose, { Document, Schema } from 'mongoose';

export interface IVolunteer extends Document {
    fullName: string;
    email: string;
    phone: string;
    availability: string[];
    motivation: string;
    isReviewed: boolean;
}

const VolunteerSchema: Schema = new Schema(
    {
        fullName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, required: true },
        availability: { type: [String], required: true },
        motivation: { type: String, required: true },
        isReviewed: { type: Boolean, default: false },
    },
    { timestamps: true } // Başvurunun ne zaman yapıldığını bilmek için
);

const Volunteer = mongoose.model<IVolunteer>('Volunteer', VolunteerSchema);

export default Volunteer;