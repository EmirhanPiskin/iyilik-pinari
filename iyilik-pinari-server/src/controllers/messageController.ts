import { Request, Response } from 'express';
import Message from '../models/Message';
import { AuthRequest, protect, isAdmin } from '../middleware/authMiddleware';

// --- YENİ BİR MESAJ OLUŞTURMA ---
export const createMessage = async (req: Request, res: Response) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: "Lütfen tüm zorunlu alanları doldurun." });
        }

        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        res.status(201).json({ success: true, message: "Mesajınız başarıyla gönderildi." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Mesaj gönderilirken bir hata oluştu.", error });
    }
};

// --- TÜM MESAJLARI GETİRME ---
export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Mesajlar alınırken bir hata oluştu.", error });
    }
};

// --- BİR MESAJI SİLME ---
export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ message: "Silinecek mesaj bulunamadı." });
        }
        res.status(200).json({ message: "Mesaj başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ message: "Mesaj silinirken bir hata oluştu.", error });
    }
};

// Bir mesajı okundu olarak işaretleyen fonksiyon
export const markMessageAsRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ message: "Mesaj bulunamadı." });
        }

        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: "Mesaj güncellenirken bir hata oluştu.", error });
    }
};