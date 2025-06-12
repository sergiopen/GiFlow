import { useParams } from 'react-router-dom';
import { GifGallery } from '../components/GifGallery';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { SearchBar } from '../components/SearchBar';

export const TagPage = () => {
  const { tag } = useParams();

  return (
    <div>
      <Header />
      <SearchBar />
      <h1 className="mx-auto max-w-[1280px] text-3xl font-bold mb-4 px-4 md:px-0">
        Gifs con el tag <Link to={`/tag/${tag}`}>#{tag}</Link>
      </h1>
      <GifGallery tag={tag} />
    </div>
  );
};
