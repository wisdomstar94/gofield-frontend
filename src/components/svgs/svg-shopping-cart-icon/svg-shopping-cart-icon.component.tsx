import { ISvgShoppingCartIcon } from "./svg-shopping-cart-icon.interface";

const SvgShoppingCartIcon = (props: ISvgShoppingCartIcon.Props) => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <path d="M4.2 11.2c-.77 0-1.393.63-1.393 1.4 0 .77.623 1.4 1.393 1.4s1.4-.63 1.4-1.4c0-.77-.63-1.4-1.4-1.4zM0 0v1.4h1.4l2.52 5.313-.945 1.708c-.511.938.161 2.079 1.225 2.079h8.4V9.1H4.2l.77-1.4h5.215c.525 0 .987-.287 1.225-.721l2.506-4.543a.697.697 0 0 0-.609-1.036H2.947L2.289 0H0zm11.2 11.2c-.77 0-1.393.63-1.393 1.4 0 .77.623 1.4 1.393 1.4s1.4-.63 1.4-1.4c0-.77-.63-1.4-1.4-1.4z" id="vf9y80d6ea"/>
        </defs>
        <use fill="#374553" fillRule="nonzero" xlinkHref="#vf9y80d6ea" transform="translate(5 5)"/>
      </svg>
    </>
  );
};

export default SvgShoppingCartIcon;
