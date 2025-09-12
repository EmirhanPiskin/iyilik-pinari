import { Request, Response } from 'express';
import News from '../models/News';
import Message from '../models/Message';
import Volunteer from '../models/Volunteer';

export const getStats = async (req: Request, res: Response) => {
    try {
        const newsCount = await News.countDocuments();
        const unreadMessagesCount = await Message.countDocuments({ isRead: false });
        const newVolunteersCount = await Volunteer.countDocuments({ isReviewed: false });
        const recentNews = await News.find().sort({ createdAt: -1 }).limit(5).select('title createdAt');
        const recentMessages = await Message.find().sort({ createdAt: -1 }).limit(5).select('name createdAt');

        res.status(200).json({
            newsCount,
            unreadMessagesCount,
            newVolunteersCount,
            recentNews,
            recentMessages
        });

    } catch (error) {
        res.status(500).json({ message: "Dashboard verileri alınırken bir hata oluştu.", error });
    }
};