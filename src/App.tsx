import "react-toastify/dist/ReactToastify.min.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton.js";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.tsx";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <SearchBar onSubmit={setSearchQuery} />

      <ImageGallery searchQuery={searchQuery} />
      <ScrollToTopButton />
      <ToastContainer />
    </>
  );
};
