import { useRef } from "react";
import type { Gif } from "../types/gif.types";
import { GifItem } from "./GifItem";

export const SliderGifs = ({
    gifs,
    title,
    emptyText
}: {
    gifs: Gif[],
    title: string,
    emptyText: string,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!containerRef.current) return;
        const scrollAmount = containerRef.current.offsetWidth * 0.8;
        if (direction === 'left') {
            containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (gifs.length === 0) {
        return <p className="text-gray-400">{emptyText}</p>;
    }

    return (
        <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className="relative">
                <button
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 z-10"
                >
                    &#8249;
                </button>
                <div
                    ref={containerRef}
                    className="flex overflow-x-auto no-scrollbar gap-4 scroll-smooth px-8"
                >
                    {gifs.map(gif => (
                        <div key={gif._id} className="flex-shrink-0 w-[300px]">
                            <GifItem
                                id={gif._id}
                                url={gif.url}
                                title={gif.title}
                                tags={gif.tags}
                                likes={gif.likes}
                                likedBy={gif.likedBy}
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 z-10"
                >
                    &#8250;
                </button>
            </div>
        </section>
    );
};
