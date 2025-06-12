import { useEffect, useState, useRef, useCallback } from 'react';
import { getGifs, getGifsByTag, getGifsByName } from '../services/gifService';
import { GifItem } from './GifItem';
import { SpinnerLoading } from './SpinnerLoading';
import type { Gif } from '../types/gif.types';

interface GifGalleryProps {
  tag?: string;
  searchQuery?: string;
}

export const GifGallery = ({ tag, searchQuery }: GifGalleryProps) => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastGifRef = useRef<HTMLDivElement | null>(null);

  const loadGifs = useCallback(
    async (pageToLoad: number) => {
      setLoading(true);
      try {
        let data;
        if (searchQuery) {
          data = await getGifsByName(searchQuery, pageToLoad, 10);
        } else if (tag) {
          data = await getGifsByTag(tag, pageToLoad, 10);
        } else {
          data = await getGifs({ page: pageToLoad, limit: 10, sort: 'popular' });
        }

        const newGifs = data.gifs as Gif[];
        const total = data.total as number;
        const limit = data.limit as number;

        setGifs((prev) => {
          const ids = new Set(prev.map((g) => g._id));
          const filteredNew = newGifs.filter((g) => !ids.has(g._id));
          return [...prev, ...filteredNew];
        });

        const totalPages = Math.ceil(total / limit);
        setHasMore(pageToLoad < totalPages);
      } catch {
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [tag, searchQuery]
  );

  useEffect(() => {
    setGifs([]);
    setPage(1);
    setHasMore(true);
    setLoading(false);
  }, [tag, searchQuery]);

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

    if (lastGifRef.current) observer.current.observe(lastGifRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, loading]);

  if (gifs.length < 1) return (<h1 className='text-center'>No se han encontrado gifs</h1>)

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-0">
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
                uploadedBy={
                  gif.uploadedBy
                    ? {
                      userId: gif.uploadedBy._id,
                      username: gif.uploadedBy.username,
                      avatar: gif.uploadedBy.avatar,
                    }
                    : null
                }
              />
            </div>
          );
        })}
      </div>

      {loading && <SpinnerLoading />}
    </div>
  );
};
