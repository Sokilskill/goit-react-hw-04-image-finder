import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { ImSearch } from "react-icons/im";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      toast.error("Enter something to search.");
      return;
    }
    onSubmit(searchQuery.trim().toLowerCase());
    setSearchQuery("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleFormSubmit}>
        <button
          type="submit"
          className={css["searchForm-button"]}
          aria-label=" Search"
        >
          <ImSearch className={css["searchForm-button-icon"]}></ImSearch>
        </button>

        <input
          onChange={handleInputChange}
          className={css["searchForm-input"]}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
        />
      </form>
    </header>
  );
};

export default SearchBar;
