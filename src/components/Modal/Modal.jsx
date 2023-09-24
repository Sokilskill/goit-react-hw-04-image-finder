import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
const body = document.querySelector('body');

const Modal = ({ img, tag, onToggle }) => {
  const onKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onToggle();
      }
    },
    [onToggle]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    body.classList.add('hidden-scroll');

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      body.classList.remove('hidden-scroll');
    };
  }, [onKeyDown]);

  const onClickBackDrop = e => {
    if (e.target === e.currentTarget) {
      onToggle();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={onClickBackDrop}>
      <div className={css.modal}>
        <img src={img} alt={tag} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  tag: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Modal;
