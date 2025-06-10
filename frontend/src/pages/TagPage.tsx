import { useParams } from 'react-router-dom';
import GifGallery from '../components/GifGallery';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';

export const TagPage = () => {
  const { tag } = useParams();

  return (
    <div>
      <Header />
      <h1 className="mx-auto max-w-[1280px] p-6 text-3xl font-bold mb-4">
        Gifs con el tag <Link to={`/tag/${tag}`}>#{tag}</Link>
      </h1>
      <GifGallery tag={tag} />
    </div>
  );
};
