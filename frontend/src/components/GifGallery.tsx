import { useEffect, useState } from 'react';
import { getGifs } from '../services/gifService';
import GifItem from './GifItem';

interface Gif {
  _id: string;
  url: string;
  title: string;
  likes: number;
  tags: string[];
  likedBy: string[];
}

const GifGallery = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);

  useEffect(() => {
    getGifs()
      .then(setGifs)
      .catch(() => setGifs([]));
  }, []);

  return (
    <div className="mx-auto p-6">
      <div className="flex flex-wrap justify-center gap-6">
        {gifs.map((gif) => (
          <GifItem key={gif._id} id={gif._id} url={gif.url} title={gif.title} tags={gif.tags} likes={gif.likes} likedBy={gif.likedBy} />
        ))}
      </div>
    </div>
  );
};

export default GifGallery;
