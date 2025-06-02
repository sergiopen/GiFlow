import LikeButton from './LikeButton';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useRef } from 'react';
import { incrementView } from '../services/gifService';
import { Link } from 'react-router-dom';

interface GifItemProps {
  id: string;
  url: string;
  title: string;
  tags: string[];
  likes: number;
  likedBy: string[];
  uploadedBy: {
    userId: string;
    username: string;
    avatar?: string;
  } | null;
}

const GifItem = ({ id, url, title, tags, likes, likedBy, uploadedBy }: GifItemProps) => {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.userId?.trim().toLowerCase() ?? '';
  const likedByIds = (likedBy ?? []).map((id) => id.toString().trim().toLowerCase());
  const initiallyLiked = likedByIds.includes(userId);

  const ref = useRef<HTMLDivElement>(null);
  const hasCountedView = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCountedView.current) {
            incrementView(id);
            hasCountedView.current = true;
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [id]);

  return (
    <div ref={ref} className="relative inline-block w-full overflow-hidden rounded-lg group cursor-pointer bg-white">
      <Link to={`/gif/${id}`}>
        <img src={url} alt={title} className="w-full h-auto object-contain block" />
      </Link>

      <div
        className="absolute bottom-0 left-0 right-0 bg-black/25 text-white p-2 rounded-b-lg 
      opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex flex-col gap-2"
      >
        {uploadedBy && (
          <div className="hover:underline">
            <Link className="flex items-center my-1 gap-2" to={`/profile/${uploadedBy.username}`} onClick={(e) => e.stopPropagation()}>
              <img
                src={uploadedBy.avatar || '/default-avatar.gif'}
                alt={`Foto de perfil de ${uploadedBy.username}`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold">{uploadedBy.username}</span>
            </Link>
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex justify-between items-center text-xs">
            <div className="flex flex-wrap gap-1 max-w-[70%]">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/tag/${tag}`}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium hover:underline hover:bg-gray-300 transition-colors duration-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="absolute top-2 right-2 bg-black/15 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-xs">
          <LikeButton gifId={id} initialLikes={likes} initiallyLiked={initiallyLiked} userId={userId} isAuthenticated={isAuthenticated} />
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(url);
          }}
          className="p-2 cursor-pointer transition-transform duration-200 hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white transition-colors" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GifItem;
