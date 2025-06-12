import { Router } from 'express';
import { getUserByUsername, updateUserProfile } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { uploadAvatar } from '../middlewares/upload.middleware';

const router = Router();

router.get('/:username', getUserByUsername);

router.patch('/:id', authenticateToken, uploadAvatar.single('avatar'), updateUserProfile);

export default router;
