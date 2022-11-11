import styles from "./svg-category-clothing-icon.component.module.scss";
import { ISvgCategoryClothingIcon } from "./svg-category-clothing-icon.interface";

const StyleIn = {
  
};

const SvgCategoryClothingIcon = (props: ISvgCategoryClothingIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <path id="ioam1r8cza" d="M0 0h18.869v15.9H0z"/>
        </defs>
        <g transform="translate(3 4)" fill="none" fillRule="evenodd">
          <mask id="fi65ge3hwb" fill="#fff">
            <use xlinkHref="#ioam1r8cza"/>
          </mask>
          <path d="M4.5 15.218h9.868V5.84h3l.702-3.157L12.41.791c-.346.321-.872.572-1.566.744-.923.23-1.899.23-2.82 0-.696-.172-1.22-.423-1.568-.744L.8 2.683l.7 3.157h3v9.378zm10.55.683H3.817V6.523H.952L0 2.231 6.67 0l.15.182c.234.287.708.526 1.37.691a5.167 5.167 0 0 0 2.49 0c.66-.165 1.135-.404 1.37-.691L12.197 0l6.67 2.231-.951 4.292H15.05v9.378z" fill="#374553" mask="url(#fi65ge3hwb)"/>
        </g>
    </svg>
    </>
  );
};

export default SvgCategoryClothingIcon;