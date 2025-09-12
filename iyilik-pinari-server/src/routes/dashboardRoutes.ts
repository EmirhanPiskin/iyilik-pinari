import express from 'express';
import { getStats } from '../controllers/dashboardController';
import { protect, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/stats', protect, getStats);

export default router;