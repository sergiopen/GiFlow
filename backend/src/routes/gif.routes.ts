import { Router } from 'express';
import upload from '../middlewares/upload';
import { createGif, getGifs } from '../controllers/gif.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateToken, upload.single('gif'), createGif);
router.get('/', getGifs);

export default router;
