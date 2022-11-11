import styled from 'styled-components';
import { ISvgCategoryMountainIcon } from "./svg-category-mountain-icon.interface";

const StyleIn = {

};

const SvgCategoryMountainIcon = (props: ISvgCategoryMountainIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <path id="f5p64tekxa" d="M0 0h4.18v9.16H0z"/>
          <path id="2v3sl18nkc" d="M0 0h8.433v5.598H0z"/>
          <path id="hxbxbgj4je" d="M0 0h11.714v8.496H0z"/>
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M14.55 4.45a1.45 1.45 0 1 1-2.9 0 1.45 1.45 0 0 1 2.9 0M8.472 15.17a.341.341 0 0 1-.34-.328l-.189-4.806a.34.34 0 0 1 .327-.354.34.34 0 0 1 .355.327l.188 4.806a.341.341 0 0 1-.327.355h-.014M13.048 10.11 8.16 8.877a.34.34 0 1 1 .167-.662l4.408 1.114 1.822-2.893a.341.341 0 0 1 .577.364l-2.085 3.312z" fill="#374553"/>
          <g transform="translate(15.257 11.676)">
            <mask id="523tsf4qfb" fill="#fff">
              <use xlinkHref="#f5p64tekxa"/>
            </mask>
            <path d="M2.293 9.16a.34.34 0 0 1-.314-.208L0 4.282 3.58.119a.342.342 0 1 1 .518.445L.794 4.406l1.813 4.279a.341.341 0 0 1-.314.475" fill="#374553" mask="url(#523tsf4qfb)"/>
          </g>
          <g transform="translate(11.004 11.676)">
            <mask id="g8wzfwqrzd" fill="#fff">
              <use xlinkHref="#2v3sl18nkc"/>
            </mask>
            <path d="M.341 5.598a.34.34 0 0 1-.295-.512L2.777.344 8.07 0a.34.34 0 1 1 .044.68l-4.928.32L.637 5.427a.34.34 0 0 1-.296.17" fill="#374553" mask="url(#g8wzfwqrzd)"/>
          </g>
          <g transform="translate(4 13.237)">
            <mask id="ig28zouj7f" fill="#fff">
              <use xlinkHref="#hxbxbgj4je"/>
            </mask>
            <path d="M11.372 8.496a.337.337 0 0 1-.197-.063L.144.62A.342.342 0 0 1 .539.063l11.03 7.813a.341.341 0 0 1-.197.62" fill="#374553" mask="url(#ig28zouj7f)"/>
          </g>
        </g>
      </svg>
    </>
  );
};

export default SvgCategoryMountainIcon;