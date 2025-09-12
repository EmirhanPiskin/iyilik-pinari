import express from 'express';
import { createVolunteerApplication, getAllApplications, deleteApplication, markApplicationAsReviewed } from '../controllers/volunteerController';
import { protect, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// YENİ BAŞVURU GÖNDERME
router.post('/', createVolunteerApplication);

// TÜM BAŞVURULARI GETİRME
router.get('/', protect, getAllApplications);

// BİR BAŞVURUYU SİLME
router.delete('/:id', protect, deleteApplication);

// Bir başvuruyu incelendi olarak işaretleme
router.patch('/:id/reviewed', protect, markApplicationAsReviewed);

export default router;