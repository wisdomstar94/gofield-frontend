import { ISvgBottomMenuCategoryIcon } from "./svg-bottom-menu-category-icon.interface";

const SvgBottomMenuCategoryIcon = (props: ISvgBottomMenuCategoryIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="#374553" fillRule="evenodd">
          <path d="M5 5h6v6H5zM5 13h6v6H5zM13 5h6v6h-6zM13 13h6v6h-6z"/>
        </g>
      </svg>
    </>
  );
};

export default SvgBottomMenuCategoryIcon;