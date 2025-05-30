import LikeButton from './LikeButton';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useRef } from 'react';
import { incrementView } from '../services/gifService';

interface GifItemProps {
  id: string;
  url: string;
  title: string;
  tags: string[];
  likes: number;
  likedBy: string[];
}

const GifItem = ({ id, url, title, tags, likes, likedBy }: GifItemProps) => {
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
    <a href="#" className="relative inline-block w-80 overflow-hidden rounded-lg shadow-md group">
      <img src={url} alt={title} className="w-full h-80 object-cover block" />
      <div
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 rounded-b-lg 
          opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
      >
        <div className="flex justify-between items-center text-xs">
          <div className="flex flex-wrap gap-1 max-w-[70%]">
            {tags.map((tag) => (
              <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
          <div ref={ref} className="text-xs">
            <LikeButton gifId={id} initialLikes={likes} initiallyLiked={initiallyLiked} userId={userId} isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </div>
    </a>
  );
};

export default GifItem;
