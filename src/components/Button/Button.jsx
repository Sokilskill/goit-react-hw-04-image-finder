import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ onClick, children }) {
  return (
    <button className={css.button} onClick={onClick} aria-label={children}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Button;
