import styles from "./svg-back-icon.component.module.scss";
import { ISvgBackIcon } from "./svg-back-icon.interface";

const SvgBackIcon = (props: ISvgBackIcon.Props) => {
  return (
    <>
      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="m11.895 3.105-6 5.79 6 6" stroke="#374553" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round"/>
      </svg>
    </>
  );
};

export default SvgBackIcon;