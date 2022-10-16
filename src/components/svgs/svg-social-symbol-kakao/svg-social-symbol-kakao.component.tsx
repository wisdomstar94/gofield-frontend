import { ISvgSocialSymbolKakao } from "./svg-social-symbol-kakao.interface";

const SvgSocialSymbolKakao = (props: ISvgSocialSymbolKakao.Props) => {
  return (
    <>
      <svg
        width="21"
        height="19"
        viewBox="0 0 21 19"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.928.56c-5.523 0-10 3.446-10 7.698 0 2.735 1.855 5.13 4.64 6.5l-.942 3.428a.28.28 0 0 0 .071.293.29.29 0 0 0 .204.082c.06 0 .12-.025.174-.065l4.053-2.667c.587.082 1.188.128 1.8.128 5.521 0 10-3.446 10-7.699 0-4.252-4.479-7.697-10-7.697"
          fill="#391F1F"
          fillRule="evenodd" />
      </svg>
    </>
  );
};

export default SvgSocialSymbolKakao;
