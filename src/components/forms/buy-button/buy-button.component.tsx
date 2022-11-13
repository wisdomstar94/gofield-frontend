import SvgHeartOffIcon from "../../svgs/svg-heart-off-icon/svg-heart-off-icon.component";
import styles from "./buy-button.component.module.scss";
import { IBuyButton } from "./buy-button.interface";

const BuyButton = (props: IBuyButton.Props) => {
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['heart-area']}>
          <SvgHeartOffIcon __color="#fff" />
        </div>
        <button className={styles['button']}>
          구매하기
        </button>
      </div>
    </>
  );
};

export default BuyButton;