import { useEffect, useRef, useState, RefObject } from "react";
import gsap from "gsap";
import Modal from "../Modal/Modal";
import css from "./ImageGalleryItem.module.css";

interface ImagePreview {
  webformatURL: string;
  largeImageURL: string;
  tags: string;
}

interface ImageGalleryItemProps {
  imagePreview: ImagePreview;
}

const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  imagePreview: { webformatURL, largeImageURL, tags },
}) => {
  const itemRef: RefObject<HTMLLIElement> = useRef<HTMLLIElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const randomX = Math.random() * 300 - 100;
    const randomY = Math.random() * 300 - 100;
    gsap.fromTo(
      itemRef.current,
      { opacity: 0, x: randomX, y: randomY },
      { opacity: 1, x: 0, y: 0, duration: 3, ease: "power2.out" }
    );
  }, []);

  const onToggleModal = () => {
    setShowModal((state) => !state);
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
          className={css["imageGalleryItem-image"]}
          loading="lazy"
        />
      </li>
      {showModal && (
        <Modal tag={tags} img={largeImageURL} onToggle={onToggleModal} />
      )}
    </>
  );
};

export default ImageGalleryItem;
