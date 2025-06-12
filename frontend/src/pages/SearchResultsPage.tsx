import { useParams } from 'react-router-dom';
import { GifGallery } from '../components/GifGallery';
import { Header } from '../components/layout/Header';
import { SearchBar } from '../components/SearchBar';
import { Link } from 'react-router-dom';

export const SearchResultsPage = () => {
    const { term } = useParams();

    return (
        <>
            <Header />
            <SearchBar />
            <h1 className="mx-auto max-w-[1280px] text-3xl font-bold mb-4 px-4 md:px-0">Resultados para: <Link to={`/search/${term}`}>{term}</Link></h1>
            <GifGallery searchQuery={term} />
        </>
    );
};
