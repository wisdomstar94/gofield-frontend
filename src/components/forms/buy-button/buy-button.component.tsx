import { useCallback, useEffect, useState } from "react";
import SvgHeartOffIcon from "../../svgs/svg-heart-off-icon/svg-heart-off-icon.component";
import SvgHeartOnIcon from "../../svgs/svg-heart-on-icon/svg-heart-on-icon.component";
import styles from "./buy-button.component.module.scss";
import { IBuyButton } from "./buy-button.interface";

const BuyButton = (props: IBuyButton.Props) => {
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
      <div className={styles['container']}>
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