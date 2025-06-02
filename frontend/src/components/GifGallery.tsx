import { useEffect, useState, useRef, useCallback } from 'react';
import { getGifs } from '../services/gifService';
import GifItem from './GifItem';
import SpinnerLoading from './SpinnerLoading';

interface Gif {
  _id: string;
  url: string;
  title: string;
  likes: number;
  tags: string[];
  likedBy: string[];
  uploadedBy: {
    userId: string;
    username: string;
    avatar?: string;
  } | null;
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
    <div className="mx-auto max-w-[1280px] p-6">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
        {gifs.map((gif, i) => {
          const isLast = i === gifs.length - 1;
          return (
            <div key={gif._id} ref={isLast ? lastGifRef : null} className="break-inside-avoid mb-6">
              <GifItem
                id={gif._id}
                url={gif.url}
                title={gif.title}
                tags={gif.tags}
                likes={gif.likes}
                likedBy={gif.likedBy}
                uploadedBy={gif.uploadedBy}
              />
            </div>
          );
        })}
      </div>

      {loading && <SpinnerLoading />}
    </div>
  );
};

export default GifGallery;
