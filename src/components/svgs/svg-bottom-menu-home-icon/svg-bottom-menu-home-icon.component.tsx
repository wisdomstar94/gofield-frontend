import { useEffect, useState } from "react";
import { ISvgBottomMenuHomeIcon } from "./svg-bottom-menu-home-icon.interface";

const SvgBottomMenuHomeIcon = (props: ISvgBottomMenuHomeIcon.Props) => {
  const [color, setColor] = useState<string | undefined>();

  useEffect(() => {
    setColor(props.__color);
  }, [props.__color]);

  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m12 5 7 4v10H5V9l7-4zm2 8h-4v6h4v-6z" fill={color} fillRule="evenodd"/>
      </svg>
    </>
  );
};

export default SvgBottomMenuHomeIcon;