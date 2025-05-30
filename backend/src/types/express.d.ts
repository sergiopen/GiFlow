declare namespace Express {
  export interface Request {
    user?: {
      _id: string;
    };
    file?: import('multer').File;
    files?: import('multer').File[];
  }
}
