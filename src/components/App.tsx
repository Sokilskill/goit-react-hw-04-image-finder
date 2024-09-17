import { useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import ScrollToTopButton from "./ScrollToTopButton/ScrollToTopButton";
import ImageGallery from "./ImageGallery/ImageGallery";
import SearchBar from "./SearchBar/SearchBar";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <>
      <SearchBar onSubmit={setSearchQuery} />

      <ImageGallery searchQuery={searchQuery} />
      <ScrollToTopButton />
      <ToastContainer />
    </>
  );
};
