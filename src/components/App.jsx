import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

import 'react-toastify/dist/ReactToastify.min.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handlerFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <>
      <SearchBar onSubmit={handlerFormSubmit} />

      <ImageGallery searchQuery={searchQuery} />
      <ToastContainer />
    </>
  );
};
