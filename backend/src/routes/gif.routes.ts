import { Router } from 'express';
import { getGifs, createGif } from '../controllers/gif.controller';

const router = Router();

router.get('/', getGifs);
router.post('/', createGif);

export default router;
