import { Router } from 'express';
import {
  createGif,
  deleteGif,
  getGifById,
  getGifs,
  getGifsSuggestions,
  incrementView,
  likeGif,
  searchGifs,
  updateGif,
} from '../controllers/gif.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { uploadGif } from '../middlewares/upload.middleware';

const router = Router();

router.get('/', getGifs);
router.get('/search', searchGifs);
router.get('/suggestions', getGifsSuggestions);
router.get('/:id', getGifById);

router.post('/', authenticateToken, uploadGif.single('gif'), createGif);
router.post('/:id/like', authenticateToken, likeGif);

router.patch('/:id', authenticateToken, updateGif);
router.patch('/:id/view', incrementView);

router.delete('/:id', authenticateToken, deleteGif);

export default router;
