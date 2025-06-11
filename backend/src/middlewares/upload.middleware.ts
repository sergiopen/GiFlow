import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const gifFileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(new Error('Only GIF files are allowed'));
  }
};

const avatarFileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, WEBP and GIF images are allowed for avatar'));
  }
};

const gifStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/gifs/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

export const uploadGif = multer({ storage: gifStorage, fileFilter: gifFileFilter });
export const uploadAvatar = multer({ storage: avatarStorage, fileFilter: avatarFileFilter });
