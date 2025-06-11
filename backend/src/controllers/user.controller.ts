import { RequestHandler } from 'express';
import User from '../models/User';
import Gif from '../models/Gif';

const BACK_URL = process.env.BACK_URL || 'http://localhost:4000';

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

export const updateUserProfile: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates: Partial<{ username: string; bio: string; avatar: string }> = {};

    if (req.body.username) updates.username = req.body.username;
    if (req.body.bio) updates.bio = req.body.bio;

    if (req.file) {
      updates.avatar = `${BACK_URL}/uploads/avatars/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ user: updatedUser });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};
