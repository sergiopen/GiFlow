import { useEffect, useState } from 'react';
import GifItem from './GifItem';

interface Gif {
  _id: string;
  url: string;
  title: string;
  likes: number;
  tags: string[];
}

const GifGallery = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/gifs')
      .then((res) => res.json())
      .then(setGifs)
      .catch(() => setGifs([]));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-wrap justify-center gap-6">
        {gifs.map((gif) => (
          <GifItem key={gif._id} url={gif.url} title={gif.title} tags={gif.tags} likes={gif.likes} />
        ))}
      </div>
    </div>
  );
};

export default GifGallery;
