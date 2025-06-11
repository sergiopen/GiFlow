export type Gif = {
  _id: string;
  url: string;
  title: string;
  tags: string[];
  likes: number;
  likedBy: string[];
  likedByUser: boolean;
  views: number;
  uploadedBy: {
    _id: string;
    username: string;
    avatar?: string;
    bio?: string;
    name?: string;
  };
  createdAt: string;
};
