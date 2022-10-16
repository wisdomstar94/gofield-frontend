import { ISvgSocialSymbolNaver } from "./svg-social-symbol-naver.interface";

const SvgSocialSymbolNaver = (props: ISvgSocialSymbolNaver.Props) => {
  return (
    <>
      <svg width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
        <path d="m6.667 0 6.666 9.215V0H20v18.431h-6.667L6.666 9.215v9.216H0V0h6.667z" fill="#FFF" fill-rule="evenodd"/>
      </svg>
    </>
  );
};

export default SvgSocialSymbolNaver;