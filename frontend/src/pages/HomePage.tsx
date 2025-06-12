import { GifGallery } from '../components/GifGallery';
import { Header } from '../components/layout/Header';
import { SearchBar } from '../components/SearchBar';

export const HomePage = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <GifGallery />
    </>
  );
};
