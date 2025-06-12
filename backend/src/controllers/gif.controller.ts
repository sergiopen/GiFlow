import { RequestHandler } from 'express';
import Gif from '../models/Gif';
import User from '../models/User';
import mongoose from 'mongoose';
import type { Request, Response } from 'express';

export const createGif: RequestHandler = async (req, res, next) => {
  try {
    const { title, tags } = req.body;
    const file = req.file;
    const BACK_URL = process.env.BACK_URL || 'http://localhost:4000';

    if (!file) {
      res.status(400).json({ message: 'No GIF file uploaded' });
      return;
    }

    const newGif = new Gif({
      url: `${BACK_URL}/uploads/gifs/${file.filename}`,
      title,
      tags: Array.isArray(tags) ? tags : [tags].filter(Boolean),
      uploadedBy: req.user?._id,
      likedBy: [],
      views: 0,
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
    const tag = req.query.tag as string;

    const tagFilter = tag ? { tags: tag } : {};
    let gifs;
    const total = await Gif.countDocuments(tagFilter);

    switch (sort) {
      case 'random':
        gifs = await Gif.aggregate([
          { $match: tagFilter },
          { $sample: { size: limit } },
          {
            $lookup: {
              from: 'users',
              localField: 'uploadedBy',
              foreignField: '_id',
              as: 'uploadedBy',
            },
          },
          {
            $unwind: {
              path: '$uploadedBy',
              preserveNullAndEmptyArrays: true,
            },
          },
        ]);
        break;

      case 'popular':
        gifs = await Gif.find(tagFilter)
          .sort({ views: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('uploadedBy', 'username avatar');
        break;

      case 'recent':
      default:
        gifs = await Gif.find(tagFilter)
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('uploadedBy', 'username avatar');
        break;
    }

    res.json({ gifs, total, limit });
  } catch (error) {
    console.error('Error fetching gifs:', error);
    res.status(500).json({ message: 'Error fetching gifs' });
  }
};

export const searchGifs: RequestHandler = async (req: Request, res: Response) => {
  try {
    const q = (req.query.q as string)?.trim();
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 10, 1);

    if (!q) {
      res.status(400).json({ message: 'Missing search query' });
      return;
    }

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    const filter = { title: { $regex: regex } };
    const total = await Gif.countDocuments(filter);

    const gifs = await Gif.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('uploadedBy', 'username avatar');

    res.json({ gifs, total, limit });
  } catch (error) {
    console.error('Error in searchGifs:', error);
    res.status(500).json({ message: 'Server error while searching GIFs' });
  }
};

export const getGifsSuggestions: RequestHandler = async (req, res) => {
  try {
    const q = (req.query.q as string)?.trim();
    if (!q || q.length < 2) {
      res.json({ suggestions: [] });
      return;
    }

    if (q.startsWith('@')) {
      const usernameQuery = q.slice(1);
      if (usernameQuery.length < 2) {
        res.json({ suggestions: [] });
        return;
      }

      const regex = new RegExp('^' + usernameQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      const users = await User.find({ username: { $regex: regex } })
        .limit(5)
        .select('username name avatar -_id')
        .lean();

      res.json({
        suggestions: users.map((u) => ({
          type: 'user',
          username: u.username,
          avatar: u.avatar,
          name: u.name,
        })),
      });
      return;
    }

    const regex = new RegExp('^' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const gifs = await Gif.find({ title: { $regex: regex } })
      .select('title -_id')
      .lean();

    const uniqueTitles = Array.from(new Set(gifs.map((g) => g.title))).slice(0, 5);

    res.json({
      suggestions: uniqueTitles.map((title) => ({
        type: 'gif',
        title,
      })),
    });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ message: 'Error fetching suggestions' });
  }
};

export const getGifById: RequestHandler = async (req, res, next) => {
  try {
    const gif = await Gif.findById(req.params.id).populate('uploadedBy', 'username avatar name bio');

    if (!gif) {
      res.status(404).json({ message: 'GIF not found' });
      return;
    }
    res.json(gif);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateGif: RequestHandler = async (req, res) => {
  try {
    const loggedUserId = req.user?._id;
    const gifId = req.params.id;

    const gif = await Gif.findById(gifId);
    if (!gif) {
      res.status(404).json({ message: 'GIF no encontrado' });
      return;
    }

    if (gif.uploadedBy.toString() !== loggedUserId) {
      res.status(403).json({ message: 'No autorizado para editar este GIF' });
      return;
    }

    const updates: Partial<{ title: string; tags: string[] }> = {};

    if (req.body.title) updates.title = req.body.title;
    if (req.body.tags) {
      if (Array.isArray(req.body.tags)) {
        updates.tags = req.body.tags;
      } else if (typeof req.body.tags === 'string') {
        updates.tags = req.body.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
      }
    }

    const updatedGif = await Gif.findByIdAndUpdate(gifId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedGif) {
      res.status(404).json({ message: 'GIF no encontrado tras intentar actualizar' });
      return;
    }

    res.json({ message: 'GIF actualizado correctamente', gif: updatedGif });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el GIF', error: error.message });
  }
};

export const deleteGif: RequestHandler = async (req, res) => {
  try {
    const loggedUserId = req.user?._id;
    const gifId = req.params.id;

    const gif = await Gif.findById(gifId);
    if (!gif) {
      res.status(404).json({ message: 'GIF no encontrado' });
      return;
    }

    if (gif.uploadedBy.toString() !== loggedUserId) {
      res.status(403).json({ message: 'No autorizado para eliminar este GIF' });
      return;
    }

    await gif.deleteOne();

    res.json({ message: 'GIF eliminado correctamente' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el GIF', error: error.message });
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

    const userObjectId = new mongoose.Types.ObjectId(userId);

    if (gif.likedBy.some((id) => id.equals(userObjectId))) {
      gif.likes--;
      gif.likedBy = gif.likedBy.filter((id) => !id.equals(userObjectId));
    } else {
      gif.likes++;
      gif.likedBy.push(userObjectId);
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
