import { Request, Response } from 'express';
import Gif from '../models/Gif';

export const createGif = async (req: Request, res: Response) => {
  try {
    const { title, tags } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No GIF file uploaded' });
    }

    const newGif = new Gif({
      url: `${process.env.SERVER_URL}/uploads/${req.file.filename}`,
      title,
      tags: Array.isArray(tags) ? tags : [tags].filter(Boolean),
      likes: 0,
    });

    const savedGif = await newGif.save();
    res.status(201).json(savedGif);
  } catch (error) {
    res.status(500).json({ message: 'Error creating GIF' });
  }
};

export const getGifs = async (req: Request, res: Response) => {
  try {
    const gifs = await Gif.find().sort({ createdAt: -1 });
    res.json(gifs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching GIFs' });
  }
};
