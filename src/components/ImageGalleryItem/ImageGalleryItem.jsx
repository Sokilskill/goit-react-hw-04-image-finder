import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  imagePreview: { webformatURL, largeImageURL, tags },
}) => {
  const itemRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const randomX = Math.random() * 300 - 100;
    const randomY = Math.random() * 300 - 100;
    gsap.fromTo(
      itemRef.current,
      { opacity: 0, x: randomX, y: randomY },
      { opacity: 1, x: 0, y: 0, duration: 3, ease: 'power2.out' }
    );
  }, []);

  const onToggleModal = () => {
    setShowModal(state => !state);
  };

  return (
    <>
      <li
        ref={itemRef}
        className={css.imageGalleryItem}
        onClick={onToggleModal}
      >
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
