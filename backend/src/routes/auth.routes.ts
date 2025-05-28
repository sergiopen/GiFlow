import { Router } from 'express';
import { login, register, verify, logout } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', verify);
router.post('/logout', logout);

export default router;
