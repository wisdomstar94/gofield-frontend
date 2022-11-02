import { ISvgBottomMenuHomeIcon } from "./svg-bottom-menu-home-icon.interface";

const SvgBottomMenuHomeIcon = (props: ISvgBottomMenuHomeIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m12 5 7 4v10H5V9l7-4zm2 8h-4v6h4v-6z" fill="#374553" fillRule="evenodd"/>
      </svg>
    </>
  );
};

export default SvgBottomMenuHomeIcon;