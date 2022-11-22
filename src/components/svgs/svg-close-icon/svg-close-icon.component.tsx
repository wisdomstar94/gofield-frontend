import styles from "./svg-close-icon.component.module.scss";
import { ISvgCloseIcon } from "./svg-close-icon.interface";

const SvgCloseIcon = (props: ISvgCloseIcon.Props) => {
  return (
    <>
      <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#374553" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round">
          <path d="m8 8 12 12M20 8 8 20"/>
        </g>
      </svg>
    </>
  );
};

export default SvgCloseIcon;