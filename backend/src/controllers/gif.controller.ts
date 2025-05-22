import { Request, Response } from 'express';
import Gif from '../models/Gif';

export const createGif = async (req: Request, res: Response) => {
  try {
    const { url, title, tags } = req.body;

    const newGif = new Gif({
      url,
      title,
      tags: Array.isArray(tags) ? tags : [],
      likes: 0,
    });

    const savedGif = await newGif.save();
    res.status(201).json(savedGif);
  } catch (error) {
    res.status(500).json({ message: 'Error creating GIF' });
  }
};
