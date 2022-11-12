import { ISvgCategoryEtcIcon } from "./svg-category-etc-icon.interface";

const SvgCategoryEtcIcon = (props: ISvgCategoryEtcIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="#374553" fillRule="evenodd">
          <circle cx="12" cy="12" r="1.5"/>
          <circle cx="7.5" cy="12" r="1.5"/>
          <circle cx="16.5" cy="12" r="1.5"/>
        </g>
      </svg>
    </>
  );
};

export default SvgCategoryEtcIcon;