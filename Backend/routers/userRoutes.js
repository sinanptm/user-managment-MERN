import express from 'express';
import { authUser, getProfile, logoutUser, registerUser, updateProfile } from '../controllers/userController.js';
import protectUser from '../middleware/userAuthMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/home').get(protectUser, getProfile).put(protectUser, updateProfile);

export default router;



