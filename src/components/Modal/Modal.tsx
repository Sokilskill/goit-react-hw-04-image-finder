import { createPortal } from "react-dom";
import { useEffect, useCallback } from "react";
import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;
const body = document.querySelector("body") as HTMLElement;

interface ModalProps {
  tag: string;
  img: string;
  onToggle: () => void;
}

const Modal: React.FC<ModalProps> = ({ img, tag, onToggle }) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onToggle();
      }
    },
    [onToggle]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    body.classList.add("hidden-scroll");

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      body.classList.remove("hidden-scroll");
    };
  }, [onKeyDown]);

  const onClickBackDrop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

export default Modal;
