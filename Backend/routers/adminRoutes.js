import express from 'express';
import {
    authAdmin,
    getUsers,
    updateUser,
    logoutAdmin
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/auth', authAdmin);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.post('/logout', logoutAdmin);

export default router;
