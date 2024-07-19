import React, { RefObject } from "react";
import cl from "./BlueButton.module.css";

interface IBlueBtnProps {
    value: string;
    id: string;
    ref: RefObject<HTMLInputElement>;
    onClick?: ()=>void;
}

const BlueButton = React.forwardRef<HTMLInputElement, IBlueBtnProps>((props, ref) => {
  return <input type="button" className={cl.BlueButton} {...props} ref={ref} />;
});

export default BlueButton;
