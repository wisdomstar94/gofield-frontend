import styled from 'styled-components';
import { ISvgCategorySoccerIcon } from "./svg-category-soccer-icon.interface";

const StyleIn = {
  
};

const SvgCategorySoccerIcon = (props: ISvgCategorySoccerIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <path id="bo0ho3ryca" d="M0 0h6.332v3.115H0z"/>
        </defs>
        <g fill="none" fill-rule="evenodd">
          <path d="M15.9 4.45a1.45 1.45 0 1 1-2.9 0 1.45 1.45 0 0 1 2.9 0M16.292 18.81a1.45 1.45 0 1 1-2.9 0 1.45 1.45 0 0 1 2.9 0M5.244 9.986a.342.342 0 0 1-.175-.635l3.61-2.143.047-.012 3.963-1.06a.341.341 0 1 1 .176.66L8.948 7.844l-3.53 2.094a.336.336 0 0 1-.174.048" fill="#374553"/>
          <g transform="translate(14.398 7.106)">
            <mask id="3x15zd26xb" fill="#fff">
              <use xlinkHref="#bo0ho3ryca"/>
            </mask>
            <path d="M5.991 3.115a.329.329 0 0 1-.082-.01l-3.88-.96L.126.607A.341.341 0 1 1 .555.076L2.341 1.52l3.732.923a.342.342 0 0 1-.082.673" fill="#374553" mask="url(#3x15zd26xb)"/>
          </g>
          <path d="M18.349 20.03a.342.342 0 0 1-.306-.189l-2.757-5.514-2.801-2.559-1.915 3.755-6.296-1.267a.341.341 0 1 1 .135-.67l5.788 1.166 2.087-4.093 3.556 3.25 2.814 5.627a.341.341 0 0 1-.305.494" fill="#374553"/>
        </g>
      </svg>
    </>
  );
};

export default SvgCategorySoccerIcon;