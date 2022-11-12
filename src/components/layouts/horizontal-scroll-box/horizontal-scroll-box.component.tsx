import { IHorizontalScrollBox } from "./horizontal-scroll-box.interface";
import styles from './horizontal-scroll-box.component.module.scss';

const HorizontalScrollBox = (props: IHorizontalScrollBox.Props) => {
  return (
    <>
      <div className={styles['container']} style={props.__style}>
        <div className={styles['inline-box']}>
          { props.children }
        </div>
      </div>
    </>
  );
};

export default HorizontalScrollBox;