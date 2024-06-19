import express from 'express';
import { authUser, getProfile, logoutUser, registerUser, updateProfile } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/home').get(protect,getProfile).put(protect,updateProfile);

export default router;