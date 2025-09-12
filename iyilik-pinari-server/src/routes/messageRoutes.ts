import express from 'express';
import { createMessage, getAllMessages, deleteMessage, markMessageAsRead } from '../controllers/messageController';
import { protect, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// YENİ MESAJ GÖNDERME
router.post('/', createMessage);

// TÜM MESAJLARI GETİRME
router.get('/', protect, getAllMessages);

// BİR MESAJI SİLME
router.delete('/:id', protect, deleteMessage);

// Bir mesajı okundu olarak işaretleme
router.patch('/:id/read', protect, markMessageAsRead);


export default router;