import styles from "./svg-arrow-bottom-icon.component.module.scss";
import { ISvgArrowBottomIcon } from "./svg-arrow-bottom-icon.interface";

const SvgArrowBottomIcon = (props: ISvgArrowBottomIcon.Props) => {
  return (
    <>
      <svg width="21" height="19" viewBox="0 0 21 19" xmlns="http://www.w3.org/2000/svg">
        <path d="m16.895 6.895-5.79 6-6-6" stroke="#374553" fill="none" fillRule="evenodd" strokeLinecap="round"/>
      </svg>
    </>
  );
};

export default SvgArrowBottomIcon;