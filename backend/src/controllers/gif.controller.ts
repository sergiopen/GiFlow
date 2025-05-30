import { RequestHandler } from 'express';
import Gif from '../models/Gif';
import type { Request, Response } from 'express';

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

export const getGifs = async (req: Request, res: Response) => {
  try {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 20, 1);
    const sort = (req.query.sort as string) || 'recent';

    let gifs;
    let total = await Gif.countDocuments();

    switch (sort) {
      case 'random':
        gifs = await Gif.aggregate([{ $sample: { size: limit } }]);
        break;
      case 'popular':
        gifs = await Gif.find()
          .sort({ views: -1 })
          .skip((page - 1) * limit)
          .limit(limit);
        break;
      case 'recent':
      default:
        gifs = await Gif.find()
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit);
        break;
    }

    res.json({ gifs, total, limit });
  } catch (error) {
    console.error('Error fetching gifs:', error);
    res.status(500).json({ message: 'Error fetching gifs' });
  }
};

export const likeGif: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const gif = await Gif.findById(id);
    if (!gif) {
      res.status(404).json({ message: 'GIF not found' });
      return;
    }

    if (gif.likedBy.includes(userId)) {
      gif.likes--;
      gif.likedBy = gif.likedBy.filter((id) => id.toString() !== userId);
    } else {
      gif.likes++;
      gif.likedBy.push(userId);
    }

    await gif.save();
    res.json(gif);
  } catch (error) {
    next(error);
  }
};

export const incrementView: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGif = await Gif.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });

    if (!updatedGif) {
      res.status(404).json({ message: 'GIF not found' });
      return;
    }

    res.json(updatedGif);
  } catch {
    res.status(500).json({ message: 'Error incrementing view' });
  }
};
