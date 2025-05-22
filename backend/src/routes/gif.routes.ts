import { Router } from 'express';
import { createGif } from '../controllers/gif.controller';

const router = Router();

router.post('/', createGif);

export default router;
