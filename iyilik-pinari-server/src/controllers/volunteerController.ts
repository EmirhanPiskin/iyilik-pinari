import { Request, Response } from 'express';
import Volunteer from '../models/Volunteer';

// --- YENİ BİR GÖNÜLLÜ BAŞVURUSU OLUŞTURMA ---
export const createVolunteerApplication = async (req: Request, res: Response) => {
    try {
        const newApplication = new Volunteer(req.body);
        await newApplication.save();
        res.status(201).json({ success: true, message: "Başvurunuz başarıyla alındı. Teşekkür ederiz!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Başvuru gönderilirken bir hata oluştu.", error });
    }
};

// --- TÜM BAŞVURULARI GETİRME ---
export const getAllApplications = async (req: Request, res: Response) => {
    try {
        const applications = await Volunteer.find().sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: "Başvurular alınırken bir hata oluştu.", error });
    }
};

// --- BİR BAŞVURUYU SİLME ---
export const deleteApplication = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedApplication = await Volunteer.findByIdAndDelete(id);
        if (!deletedApplication) {
            return res.status(404).json({ message: "Silinecek başvuru bulunamadı." });
        }
        res.status(200).json({ message: "Başvuru başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ message: "Başvuru silinirken bir hata oluştu.", error });
    }
};

export const markApplicationAsReviewed = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updatedApplication = await Volunteer.findByIdAndUpdate(
            id,
            { isReviewed: true },
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: "Başvuru bulunamadı." });
        }

        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({ message: "Başvuru güncellenirken bir hata oluştu.", error });
    }
};