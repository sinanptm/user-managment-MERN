import express from 'express';
import { authUser, getProfile, logoutUser, registerUser, updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getProfile).put(updateProfile);

export default router;
