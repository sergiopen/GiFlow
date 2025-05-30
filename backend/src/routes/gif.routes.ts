import { Router } from 'express';
import upload from '../middlewares/upload';
import { createGif, getGifs, incrementView, likeGif } from '../controllers/gif.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateToken, upload.single('gif'), createGif);
router.get('/', getGifs);
router.post('/:id/like', authenticateToken, likeGif);
router.patch('/:id/view', incrementView);

export default router;
