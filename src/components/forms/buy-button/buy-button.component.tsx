import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { deviceTypeAtom } from "../../../atoms/device-type.atom";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import SvgHeartOffIcon from "../../svgs/svg-heart-off-icon/svg-heart-off-icon.component";
import SvgHeartOnIcon from "../../svgs/svg-heart-on-icon/svg-heart-on-icon.component";
import styles from "./buy-button.component.module.scss";
import { IBuyButton } from "./buy-button.interface";

const BuyButton = (props: IBuyButton.Props) => {
  const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);

  const [isHeart, setIsHeart] = useState(props.__isHeart);
  useEffect(() => { setIsHeart(props.__isHeart); }, [props.__isHeart]);

  const heartClick = useCallback(() => {
    if (typeof props.__onHeartButtonClick === 'function') {
      props.__onHeartButtonClick();
    }
  }, [props]);

  const buyButtonClick = useCallback(() => {
    if (typeof props.__onBuyButtonClick === 'function') {
      props.__onBuyButtonClick();
    }
  }, [props]);

  return (
    <>
      <div className={getClasses([
        styles['container'],
        styles[deviceType],
      ])}>
        <div className={styles['heart-area']} onClick={heartClick}>
          {
            isHeart === true ? 
            <SvgHeartOnIcon __color="#fff" /> :
            <SvgHeartOffIcon __color="#fff" />
          }
        </div>
        <button className={styles['button']} onClick={buyButtonClick}>
          구매하기
        </button>
      </div>
    </>
  );
};

export default BuyButton;