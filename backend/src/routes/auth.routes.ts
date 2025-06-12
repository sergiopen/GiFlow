import { Router } from 'express';
import { login, register, verify, logout } from '../controllers/auth.controller';

const router = Router();

router.get('/verify', verify);

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
