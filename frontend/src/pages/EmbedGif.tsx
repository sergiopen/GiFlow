import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGifById } from '../services/gifService';

export const EmbedGif = () => {
  const { id } = useParams();
  const [gif, setGif] = useState<{ url: string } | null>(null);

  useEffect(() => {
    const fetchGif = async () => {
      try {
        const res = await getGifById(id as string);
        setGif(res);
      } catch (err) {
        setGif(null);
        console.log(err);
      }
    };

    fetchGif();
  }, [id]);

  if (!gif) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <img src={gif.url} alt="GIF" className="max-w-full max-h-screen" />
    </div>
  );
};
