import { ISvgCategoryHealthIcon } from "./svg-category-health-icon.interface";

const SvgCategoryHealthIcon = (props: ISvgCategoryHealthIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <path id="opylznss0a" d="M.08 0h.84v4.098H.08z"/>
          <path id="3d61zr5ruc" d="M.08 0h.84v4.098H.08z"/>
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M13.979 13.575a1.45 1.45 0 1 1-2.9 0 1.45 1.45 0 0 1 2.9 0" fill="#374553"/>
          <path d="m12.532 18.017-4.537-3.65-1.321-4.34a.342.342 0 1 1 .653-.197l1.259 4.136 3.939 3.168 4.036-3.348 1.168-3.954a.342.342 0 0 1 .655.194l-1.227 4.152-4.625 3.838z" fill="#374553"/>
          <g transform="translate(4 5)">
            <mask id="uysb5aq32b" fill="#fff">
              <use xlinkHref="#opylznss0a"/>
            </mask>
            <path d="M.42 4.098a.34.34 0 0 1-.34-.341V.341A.34.34 0 0 1 .42 0a.34.34 0 0 1 .342.341v3.416a.34.34 0 0 1-.341.341" fill="#374553" mask="url(#uysb5aq32b)"/>
          </g>
          <g transform="translate(19.78 5)">
            <mask id="nwssxkd41d" fill="#fff">
              <use xlinkHref="#3d61zr5ruc"/>
            </mask>
            <path d="M.58 4.098a.34.34 0 0 1-.342-.341V.341a.34.34 0 1 1 .682 0v3.416a.341.341 0 0 1-.34.341" fill="#374553" mask="url(#nwssxkd41d)"/>
          </g>
          <path d="M20.238 7.39H4.45a.34.34 0 1 1 0-.683h15.788a.341.341 0 1 1 0 .683" fill="#374553"/>
        </g>
      </svg>
    </>
  );
};

export default SvgCategoryHealthIcon;