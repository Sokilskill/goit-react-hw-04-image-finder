import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

import 'react-toastify/dist/ReactToastify.min.css';
import ScrollToTopButton from './ScrollToTopButton/ScrollToTopButton';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <SearchBar onSubmit={setSearchQuery} />

      <ImageGallery searchQuery={searchQuery} />
      <ScrollToTopButton />
      <ToastContainer />
    </>
  );
};
