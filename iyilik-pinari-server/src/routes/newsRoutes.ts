import express from 'express';
import { getAllNews, getNewsById, createNews, updateNews, deleteNews } from '../controllers/newsController';
import { protect, isAdmin } from '../middleware/authMiddleware';
import { upload } from '../config/multerConfig';

const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', protect, upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 5 }
]), createNews);
router.put('/:id', protect, upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 5 }
]), updateNews);
router.delete('/:id', protect, deleteNews);

export default router;