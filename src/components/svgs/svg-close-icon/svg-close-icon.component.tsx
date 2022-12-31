import { useEffect, useState } from "react";
import styles from "./svg-close-icon.component.module.scss";
import { ISvgCloseIcon } from "./svg-close-icon.interface";

const SvgCloseIcon = (props: ISvgCloseIcon.Props) => {
  const [color, setColor] = useState(props.__color ?? '#374553');
  useEffect(() => { setColor(props.__color ?? '#374553') }, [props.__color]);

  return (
    <>
      <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <g stroke={color} strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round">
          <path d="m8 8 12 12M20 8 8 20"/>
        </g>
      </svg>
    </>
  );
};

export default SvgCloseIcon;