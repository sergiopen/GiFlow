import { useEffect, useState, useCallback, useRef } from 'react';
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

  const loadGifs = useCallback(
    async (pageToLoad: number) => {
      if (loading || !hasMore) return;

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
        setPage(pageToLoad + 1);
      } catch {
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    loadGifs(page);
  }, [loadGifs, page]);

  useEffect(() => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadGifs(page);
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
  }, [loadGifs, hasMore, loading, page]);

  return (
    <div className="mx-auto p-6">
      <div className="flex flex-wrap justify-center gap-6">
        {gifs.map((gif, i) => {
          if (i === gifs.length - 1) {
            return (
              <div ref={lastGifRef} key={gif._id}>
                <GifItem id={gif._id} url={gif.url} title={gif.title} tags={gif.tags} likes={gif.likes} likedBy={gif.likedBy} />
              </div>
            );
          } else {
            return <GifItem key={gif._id} id={gif._id} url={gif.url} title={gif.title} tags={gif.tags} likes={gif.likes} likedBy={gif.likedBy} />;
          }
        })}
      </div>
      {loading && <p className="text-center mt-4">Loading more GIFs...</p>}
    </div>
  );
};

export default GifGallery;
