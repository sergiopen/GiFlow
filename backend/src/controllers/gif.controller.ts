import { RequestHandler } from 'express';
import Gif from '../models/Gif';

export const createGif: RequestHandler = async (req, res, next) => {
  try {
    const { title, tags } = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: 'No GIF file uploaded' });
      return;
    }

    const newGif = new Gif({
      url: `${process.env.SERVER_URL}/uploads/${file.filename}`,
      title,
      tags: Array.isArray(tags) ? tags : [tags].filter(Boolean),
      likes: 0,
    });

    const savedGif = await newGif.save();
    res.status(201).json(savedGif);
  } catch (error) {
    next(error);
  }
};

export const getGifs: RequestHandler = async (req, res, next) => {
  try {
    const gifs = await Gif.find().sort({ createdAt: -1 });
    res.json(gifs);
  } catch (error) {
    next(error);
  }
};
