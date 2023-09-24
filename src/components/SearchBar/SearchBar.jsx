import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handlerFormSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Enter something to search.');
      return;
    }
    onSubmit(searchQuery.toLowerCase());
    setSearchQuery('');
  };

  const handlerInputChange = e => {
    setSearchQuery(e.currentTarget.value);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handlerFormSubmit}>
        <button
          type="submit"
          className={css['searchForm-button']}
          aria-label=" Search"
        >
          <ImSearch className={css['searchForm-button-icon']}></ImSearch>
        </button>

        <input
          onChange={handlerInputChange}
          className={css['searchForm-input']}
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

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
