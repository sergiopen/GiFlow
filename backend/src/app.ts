import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import gifRoutes from './routes/gif.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.disable('x-powered-by');

app.use('/api/gifs', gifRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/uploads', express.static(path.resolve('uploads')));

const uploadsPath = path.resolve('uploads');

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

export default app;
