import express from 'express';
import protectAdmin from '../middleware/adminAuthMiddleware.js';

import {
    authAdmin,
    getUsers,
    updateUser,
    logoutAdmin,
    getUserDetails
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/auth', authAdmin);
router.use(protectAdmin)
router.get('/users', getUsers);
router.get('/user/:id', getUserDetails);
router.put('/users/:id', updateUser);
router.post('/logout', logoutAdmin);

export default router;
