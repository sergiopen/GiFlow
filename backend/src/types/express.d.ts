import 'express';

declare module 'express' {
  export interface Request {
    file?: import('multer').File;
    files?: import('multer').File[];
  }
}
