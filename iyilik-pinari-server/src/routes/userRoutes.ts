import express from 'express';
import { getAllUsers, createUser, deleteUser } from '../controllers/userController';
import { protect, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();
router.use(protect, isAdmin);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').delete(deleteUser);

export default router;