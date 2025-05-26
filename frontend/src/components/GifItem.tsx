interface GifItemProps {
  url: string;
  title: string;
  tags: string[];
  likes: number;
}

const GifItem = ({ url, title, tags, likes }: GifItemProps) => (
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
        <button type="button" className="flex items-center gap-1 text-gray-200 hover:text-indigo-400 transition" aria-label="Like">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
  4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 
  19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <span>{likes}</span>
        </button>
      </div>
    </div>
  </a>
);

export default GifItem;
