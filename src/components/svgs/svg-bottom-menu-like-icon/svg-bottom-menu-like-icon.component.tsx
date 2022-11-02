import { ISvgBottomMenuLikeIcon } from "./svg-bottom-menu-like-icon.interface";

const SvgBottomMenuLikeIcon = (props: ISvgBottomMenuLikeIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.994 9.57a3.79 3.79 0 0 0-1.15-2.516A3.671 3.671 0 0 0 15.274 6c-1.424 0-2.457 1.11-3.011 1.708-.086.092-.186.2-.256.266-.056-.057-.132-.143-.202-.22C11.3 7.183 10.246 6 8.726 6c-.958 0-1.87.374-2.569 1.054a3.789 3.789 0 0 0-1.15 2.516c-.052.95.195 1.777.798 2.68.478.716 1.738 2.112 3.064 3.397a25.081 25.081 0 0 0 1.818 1.622c.822.648 1.137.731 1.32.731.17 0 .494-.076 1.324-.73a24.48 24.48 0 0 0 1.811-1.619c1.314-1.277 2.57-2.676 3.053-3.4.406-.61.865-1.466.799-2.681z" fill="#374553" fillRule="nonzero"/>
      </svg>
    </>
  );
};

export default SvgBottomMenuLikeIcon;