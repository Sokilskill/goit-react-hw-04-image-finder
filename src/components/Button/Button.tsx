import React from "react";
import css from "./Button.module.css";

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className={css.button}
      onClick={onClick}
      aria-label={typeof children === "string" ? children : "button"}
    >
      {children}
    </button>
  );
};

export default Button;
