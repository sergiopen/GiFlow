import { useState, useEffect } from 'react';
import { likeGif } from '../services/gifService';

interface LikeButtonProps {
  gifId: string;
  initialLikes: number;
  initiallyLiked: boolean;
  userId: string;
  isAuthenticated: boolean;
}

export default function LikeButton({ gifId, initialLikes, initiallyLiked, userId, isAuthenticated }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initiallyLiked);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLiked(initiallyLiked);
    setLikes(initialLikes);
  }, [initiallyLiked, initialLikes]);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para dar like a un GIF');
      return;
    }
    if (loading) return;

    setLoading(true);
    try {
      const res = await likeGif(gifId);
      setLikes(res.likes);

      const likedByIds = (res.likedBy ?? []).map((id: string) => id.toString().trim());
      setLiked(userId ? likedByIds.includes(userId.trim()) : false);
    } catch (error) {
      console.error(error);
      alert('Error al dar like al GIF. Por favor, inténtalo de nuevo más tarde.');
      setLiked(initiallyLiked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`
        flex items-center p-2 gap-2
        cursor-pointer transition-transform duration-200 hover:scale-110
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={liked ? 'currentColor' : 'none'}
        className="transition-colors duration-300"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="font-bold text-base">{likes}</span>
    </button>
  );
}
