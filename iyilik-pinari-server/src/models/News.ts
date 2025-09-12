import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
    title: string;
    date: Date;
    summary: string;
    imageUrls: string[];
    content: string[];
    mainImage: string;
    galleryImages: string[];
}

// Mongoose için Şema Tanımlama
const NewsSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Başlık alanı zorunludur.'],
            trim: true,
        },
        date: {
            type: Date,
            required: [true, 'Tarih alanı zorunludur.'],
        },
        summary: {
            type: String,
            required: [true, 'Özet alanı zorunludur.'],
        },
        imageUrls: {
            type: [String],
            required: true,
        },
        content: {
            type: [String],
            required: true,
        },
        mainImage: {
            type: String,
            required: true
        },
        galleryImages: {
            type: [String]
        },
    },
    {
        // Otomatik olarak `createdAt` ve `updatedAt` alanlarını ekler.
        // Bu, verinin ne zaman oluşturulduğunu ve güncellendiğini bilmek için çok kullanışlıdır.
        timestamps: true,
    }
);

const News = mongoose.model<INews>('News', NewsSchema);

export default News;