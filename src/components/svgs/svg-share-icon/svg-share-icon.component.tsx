import styles from "./svg-share-icon.component.module.scss";
import { ISvgShareIcon } from "./svg-share-icon.interface";

const SvgShareIcon = (props: ISvgShareIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <circle fill="#374553" cx="15" cy="5" r="3"/>
          <circle fill="#374553" cx="7" cy="12" r="3"/>
          <circle fill="#374553" cx="15" cy="19" r="3"/>
          <path stroke="#374553" strokeWidth="2" d="m15 5-8 7 8 7"/>
        </g>
      </svg>
    </>
  );
};

export default SvgShareIcon;