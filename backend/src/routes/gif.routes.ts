import { Router } from 'express';
import upload from '../middlewares/upload';
import { createGif, getGifs } from '../controllers/gif.controller';

const router = Router();

router.post('/', upload.single('gif'), createGif);
router.get('/', getGifs);

export default router;
