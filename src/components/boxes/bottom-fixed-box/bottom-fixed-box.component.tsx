import styles from "./bottom-fixed-box.component.module.scss";
import { IBottomFixedBox } from "./bottom-fixed-box.interface";

const BottomFixedBox = (props: IBottomFixedBox.Props) => {
  return (
    <>
      <div className={styles['container']}>
        { props.children }
      </div>
    </>
  );
};

export default BottomFixedBox;