import { RequestHandler } from 'express';
import User from '../models/User';
import Gif from '../models/Gif';

export const getUserByUsername: RequestHandler = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username }).select('_id username name bio avatar').lean();
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const uploadedGifs = await Gif.find({ uploadedBy: user._id }).lean();
    const likedGifs = await Gif.find({ likedBy: user._id }).lean();

    res.json({ user, uploadedGifs, likedGifs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
