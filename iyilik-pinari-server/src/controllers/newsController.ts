import { Request, Response } from 'express';
import fs from 'fs';
import News from '../models/News';

// Tüm haberleri getiren fonksiyon
export const getAllNews = async (req: Request, res: Response) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: 'Haberler alınırken bir hata oluştu.', error });
    }
};

// Tek bir haberi ID'ye göre getiren fonksiyon
export const getNewsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newsItem = await News.findById(id);
        if (!newsItem) {
            return res.status(404).json({ message: 'Bu ID ile bir haber bulunamadı.' });
        }
        res.status(200).json(newsItem);

    } catch (error) {
        res.status(500).json({ message: 'Haber detayı alınırken bir hata oluştu.', error });
    }
};
// Yeni bir haber oluşturan fonksiyon
export const createNews = async (req: Request, res: Response) => {
    try {
        const { title, date, summary, content } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (!files.mainImage || files.mainImage.length === 0) {
            return res.status(400).json({ message: "Ana görsel zorunludur." });
        }

        const mainImage = files.mainImage[0].path.replace(/\\/g, "/");
        const galleryImages = files.galleryImages
            ? files.galleryImages.map(file => file.path.replace(/\\/g, "/"))
            : [];

        const newNews = new News({
            title, date: new Date(date), summary, content: content.split('|').map((p: string) => p.trim()),
            mainImage, galleryImages
        });

        const savedNews = await newNews.save();
        res.status(201).json(savedNews);
    } catch (error) { res.status(500).json({ message: 'Haber oluşturulurken bir hata oluştu.', error }); }
};

// --- Mevcut bir haberi güncelleyen fonksiyon ---
export const updateNews = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, date, summary, content } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const updateData: any = {
            title,
            date: new Date(date),
            summary,
            content: content.split('|').map((p: string) => p.trim()),
        };

        if (files.mainImage && files.mainImage.length > 0) {
            updateData.mainImage = files.mainImage[0].path.replace(/\\/g, "/");
        }

        if (files.galleryImages && files.galleryImages.length > 0) {
            updateData.galleryImages = files.galleryImages.map(file => file.path.replace(/\\/g, "/"));
        }

        // const existingNews = await News.findById(id);
        // if (existingNews) { ... fs.unlink ... }

        const updatedNews = await News.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedNews) {
            return res.status(404).json({ message: "Güncellenecek haber bulunamadı." });
        }

        res.status(200).json(updatedNews);

    } catch (error) {
        res.status(500).json({ message: 'Haber güncellenirken bir hata oluştu.', error });
    }
};

// YENİ: Bir haberi ID'ye göre silen fonksiyon
export const deleteNews = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedNews = await News.findByIdAndDelete(id);

        if (!deletedNews) {
            return res.status(404).json({ message: "Silinecek haber bulunamadı." });
        }

        res.status(200).json({ message: "Haber başarıyla silindi." });

    } catch (error) {
        res.status(500).json({ message: 'Haber silinirken bir hata oluştu.', error });
    }
};