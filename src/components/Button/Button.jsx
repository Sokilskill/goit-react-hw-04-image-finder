import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ fetchLoadMore, children }) {
  return (
    <button
      className={css.button}
      onClick={fetchLoadMore}
      aria-label={children}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  fetchLoadMore: PropTypes.func.isRequired,
};

export default Button;
