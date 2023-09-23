import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  imagePreview: { webformatURL, largeImageURL, tags },
}) => {
  const [showModal, setShowModal] = useState(false);
  console.log('show', showModal);
  const onToggleModal = () => {
    setShowModal(state => !state);
  };

  return (
    <>
      <li className={css.imageGalleryItem} onClick={onToggleModal}>
        <img
          src={webformatURL}
          alt={tags}
          className={css['imageGalleryItem-image']}
          loading="lazy"
        />
      </li>
      {showModal && (
        <Modal tag={tags} img={largeImageURL} onToggle={onToggleModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  imagePreview: PropTypes.object.isRequired,
};

export default ImageGalleryItem;
