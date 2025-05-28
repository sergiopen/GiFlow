import { Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const authenticateToken: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as Request & { userId?: string }).userId = decoded.userId;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
};
