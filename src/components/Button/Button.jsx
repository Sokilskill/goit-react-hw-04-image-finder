import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ fetchLoadMore }) {
  return (
    <button
      className={css.button}
      onClick={fetchLoadMore}
      aria-label="button load more"
    >
      Load More
    </button>
  );
}

Button.propTypes = {
  fetchLoadMore: PropTypes.func.isRequired,
};

export default Button;
