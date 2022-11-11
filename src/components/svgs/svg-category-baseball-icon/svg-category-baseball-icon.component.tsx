import styled from 'styled-components';
import { ISvgCategoryBaseballIcon } from "./svg-category-baseball-icon.interface";

const StyleIn = {
  
};

const SvgCategoryBaseballIcon = (props: ISvgCategoryBaseballIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <path id="ri1tj2gjea" d="M0 0h6.98v10.055H0z"/>
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M11.932 6.112a1.45 1.45 0 1 1-2.9 0 1.45 1.45 0 0 1 2.9 0M18.306 12.037a.726.726 0 1 1-1.451 0 .726.726 0 0 1 1.45 0" fill="#374553"/>
          <g transform="translate(5 1)">
            <mask id="x5fjacn9yb" fill="#fff">
              <use xlinkHref="#ri1tj2gjea"/>
            </mask>
            <path d="M2.28 10.055 0 5.88 5.846.098a.341.341 0 0 1 .48.486L.845 6.004l1.721 3.151L6.49 7.236a.341.341 0 0 1 .3.613l-4.51 2.206z" fill="#374553" mask="url(#x5fjacn9yb)"/>
          </g>
          <path d="M8.839 22.488a.342.342 0 0 1-.341-.329l-.191-5.13 4.9-3.811 4.279 8.685a.341.341 0 1 1-.612.302l-3.91-7.934-3.962 3.082.178 4.781a.342.342 0 0 1-.328.354h-.013" fill="#374553"/>
        </g>
      </svg>
    </>
  );
};

export default SvgCategoryBaseballIcon;