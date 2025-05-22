import { Request, Response } from 'express';
import Gif from '../models/Gif';

export const getGifs = async (req: Request, res: Response) => {
  try {
    const gifs = await Gif.find();
    res.json(gifs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createGif = async (req: Request, res: Response) => {
  try {
    const { url, title, likes, tags } = req.body;
    const newGif = new Gif({
      url,
      title,
      likes: likes ?? 0,
      tags: Array.isArray(tags) ? tags : [],
    });
    await newGif.save();
    res.status(201).json(newGif);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};
