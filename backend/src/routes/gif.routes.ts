import { Router } from 'express';
import { createGif, getGifs, incrementView, likeGif } from '../controllers/gif.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import upload from '../middlewares/upload.middleware';

const router = Router();

router.get('/', getGifs);
router.post('/', authenticateToken, upload.single('gif'), createGif);
router.post('/:id/like', authenticateToken, likeGif);
router.patch('/:id/view', incrementView);

export default router;
