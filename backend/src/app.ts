import express from 'express';
import cors from 'cors';
import gifRoutes from './routes/gif.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/gifs', gifRoutes);

export default app;
