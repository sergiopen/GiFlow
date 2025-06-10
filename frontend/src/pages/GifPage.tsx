import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getGifById } from '../services/gifService';
import LikeButton from '../components/LikeButton';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';

type Gif = {
  _id: string;
  url: string;
  title: string;
  tags: string[];
  likes: number;
  views: number;
  uploadedBy: {
    _id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  likedByUser: boolean;
  uploadedAt?: string; // si tienes fecha subida, opcional
};

export const GifPage = () => {
  const { id } = useParams();
  const [gif, setGif] = useState<Gif | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const [sizeKB, setSizeKB] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const fetchGif = async () => {
      try {
        const res = await getGifById(id as string);
        const likedByUser = res.likedBy?.includes(user?.userId) || false;
        setGif({ ...res, likedByUser });
      } catch {
        setGif(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchGif();
  }, [id, user]);

  useEffect(() => {
    const fetchGifData = async () => {
      if (!gif) return;

      try {
        const headRes = await fetch(gif.url, { method: 'HEAD' });
        const contentLength = headRes.headers.get('content-length');
        if (contentLength) setSizeKB(Math.round(Number(contentLength) / 1024));
      } catch {
        setSizeKB(null);
      }

      const img = new Image();
      img.src = gif.url;
      img.onload = () => {
        setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        setDimensions(null);
      };
    };

    fetchGifData();
  }, [gif]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: gif?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  if (loading) return <div className="text-center mt-8">Cargando...</div>;
  if (!gif) return <div className="text-center mt-8 text-red-500">GIF no encontrado</div>;

  return (
    <div>
      <Header />

      <div className="max-w-[1200px] mx-auto mt-8 px-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">{gif.title}</h1>

        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-full md:w-[200px] flex flex-col gap-4">
            {gif.uploadedBy && (
              <div className="p-3 rounded-lg bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-gray-300 shadow-md">
                <Link className="flex gap-2 items-center group" to={`/profile/${gif.uploadedBy.username}`} onClick={(e) => e.stopPropagation()}>
                  <img
                    src={gif.uploadedBy.avatar || '/default-avatar.gif'}
                    alt={`Foto de perfil de ${gif.uploadedBy.username}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-m">Sergio</span>
                    <span className="font-semibold group-hover:underline cursor-pointer">@{gif.uploadedBy.username}</span>
                  </div>
                </Link>
                <p className="mt-2 text-sm text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus maiores dolorem alias, quo libero iure eos repellendus eveniet cum!
                  Soluta expedita nihil voluptatem beatae ut pariatur eius excepturi iste neque.
                </p>
              </div>
            )}

            <div className="text-lg text-gray-300 p-3 rounded-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 shadow-sm">
              <p>
                <strong className="text-gray-400">Visualizaciones:</strong> {gif.views}
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4 items-center">
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow bg-white
                hover:bg-[linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%),linear-gradient(45deg,#ccc_25%,white_25%,white_75%,#ccc_75%)]
                hover:bg-[length:40px_40px] transition-colors duration-300 ease-in-out"
            >
              <img src={gif.url} alt={gif.title} className="relative w-full h-auto z-10 rounded-2xl" />
            </div>

            <div className="flex flex-wrap gap-2">
              {gif.tags.map((tag) => (
                <Link to={`/tag/${tag}`} key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-300">
                  #{tag}
                </Link>
              ))}
            </div>

            <div className="m-4 text-lg w-full pt-4 text-gray-200 rounded-lg p-4 bg-gradient-to-r from-purple-900 via-purple-700 to-pink-700">
              <h2 className="font-semibold mb-2 text-white">Detalles</h2>
              {sizeKB !== null && (
                <p>
                  <strong>Tamaño:</strong> {sizeKB} KB
                </p>
              )}
              {dimensions && (
                <p>
                  <strong>Dimensiones:</strong> {dimensions.width} x {dimensions.height} px
                </p>
              )}
              {gif.createdAt && (
                <p>
                  <strong>Fecha de subida:</strong> {new Date(gif.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          <div className="w-full md:w-[200px] flex flex-col gap-3 items-start">
            <LikeButton
              gifId={gif._id}
              initialLikes={gif.likes}
              initiallyLiked={gif.likedByUser}
              userId={user?.userId || ''}
              isAuthenticated={isAuthenticated}
            />
            <button
              onClick={handleShare}
              className="p-2 cursor-pointer transition-transform duration-200 hover:scale-110 flex"
              aria-label="Compartir GIF"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white transition-colors" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
              </svg>
              <p className="text-lg">Copiar enlace</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
