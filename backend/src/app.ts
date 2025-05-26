import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import gifRoutes from './routes/gif.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/gifs', gifRoutes);
app.use('/uploads', express.static(path.resolve('uploads')));

const uploadsPath = path.resolve('uploads');

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

export default app;
