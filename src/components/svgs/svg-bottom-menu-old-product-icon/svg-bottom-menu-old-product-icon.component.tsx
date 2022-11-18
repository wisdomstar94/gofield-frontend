import { useEffect, useState } from "react";
import { ISvgBottomMenuOldProductIcon } from "./svg-bottom-menu-old-product-icon.interface";

const SvgBottomMenuOldProductIcon = (props: ISvgBottomMenuOldProductIcon.Props) => {
  const [color, setColor] = useState<string | undefined>();

  useEffect(() => {
    setColor(props.__color);
  }, [props.__color]);

  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <path d="m7.85.2 5.09 2.55c.65.323 1.06.986 1.06 1.712v6.075c0 .726-.41 1.389-1.058 1.711l-5.09 2.55c-.539.27-1.172.27-1.71 0l-5.092-2.55A1.911 1.911 0 0 1 0 10.53V4.461c0-.725.41-1.388 1.058-1.71l2.44-1.224a.638.638 0 0 1 .07-.036L6.152.2A1.906 1.906 0 0 1 7.85.2zM1.272 4.702v5.833a.637.637 0 0 0 .349.573l4.742 2.374v-6.23l-5.091-2.55zm11.455 0-5.091 2.55v6.227l4.738-2.372a.637.637 0 0 0 .353-.57V4.702zM3.821 2.791l-1.759.881L7 6.146l1.758-.882-4.937-2.473zm2.897-1.45-1.475.738 4.938 2.472 1.756-.879-4.654-2.33a.635.635 0 0 0-.565-.001z" id="pko1ktqu7a"/>
        </defs>
        <use fill={color} fillRule="nonzero" xlinkHref="#pko1ktqu7a" transform="translate(5 5)"/>
      </svg>
    </>
  );
};

export default SvgBottomMenuOldProductIcon;