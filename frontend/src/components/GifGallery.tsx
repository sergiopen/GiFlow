import { useEffect, useState, useRef, useCallback } from 'react';
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastGifRef = useRef<HTMLDivElement | null>(null);

  const loadGifs = useCallback(async (pageToLoad: number) => {
    setLoading(true);
    try {
      const { gifs: newGifs, total, limit } = await getGifs({ page: pageToLoad, limit: 10, sort: 'popular' });

      setGifs((prev) => {
        const ids = new Set(prev.map((gif) => gif._id));
        const filteredNew = newGifs.filter((gif: Gif) => !ids.has(gif._id));
        return [...prev, ...filteredNew];
      });

      const totalPages = Math.ceil(total / limit);
      setHasMore(pageToLoad < totalPages);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasMore) return;
    loadGifs(page);
  }, [page, loadGifs, hasMore]);

  useEffect(() => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: '200px' }
    );

    if (lastGifRef.current) {
      observer.current.observe(lastGifRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, loading]);

  return (
    <div className="mx-auto p-6">
      <div className="flex flex-wrap justify-center gap-6">
        {gifs.map((gif, i) => {
          const isLast = i === gifs.length - 1;
          return (
            <div key={gif._id} ref={isLast ? lastGifRef : null}>
              <GifItem id={gif._id} url={gif.url} title={gif.title} tags={gif.tags} likes={gif.likes} likedBy={gif.likedBy} />
            </div>
          );
        })}
      </div>
      {loading && <p className="text-center mt-4">Loading more GIFs...</p>}
    </div>
  );
};

export default GifGallery;
