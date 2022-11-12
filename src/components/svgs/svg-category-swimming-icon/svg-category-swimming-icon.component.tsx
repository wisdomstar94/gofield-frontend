import { ISvgCategorySwimmingIcon } from "./svg-category-swimming-icon.interface";

const SvgCategorySwimmingIcon = (props: ISvgCategorySwimmingIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <path id="025q1yadja" d="M0 0h7.81v5.366H0z"/>
          <path id="m2he2i4kqc" d="M0 .08h18.054v.84H0z"/>
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M18.102 11.958a1.45 1.45 0 1 1-2.9 0 1.45 1.45 0 0 1 2.9 0" fill="#374553"/>
          <g transform="translate(6.672 9)">
            <mask id="d78fndt72b" fill="#fff">
              <use xlinkHref="#025q1yadja"/>
            </mask>
            <path d="M7.47 5.366a.342.342 0 0 1-.297-.171L4.716.917.504 3.196a.341.341 0 0 1-.325-.6L4.976 0l2.79 4.855a.342.342 0 0 1-.297.51" fill="#374553" mask="url(#d78fndt72b)"/>
          </g>
          <g transform="translate(3 14.895)">
            <mask id="da1nwc40yd" fill="#fff">
              <use xlinkHref="#m2he2i4kqc"/>
            </mask>
            <path d="M17.713.92H.341a.34.34 0 1 1 0-.682h17.372a.342.342 0 0 1 0 .683" fill="#374553" mask="url(#da1nwc40yd)"/>
          </g>
        </g>
      </svg>
    </>
  );
};

export default SvgCategorySwimmingIcon;