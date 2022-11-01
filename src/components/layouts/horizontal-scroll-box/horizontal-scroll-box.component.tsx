import styles from "./horizontal-scroll-box.component.module.scss";
import { IHorizontalScrollBox } from "./horizontal-scroll-box.interface";

const HorizontalScrollBox = (props: IHorizontalScrollBox.Props) => {
  return (
    <>
      <div className={[
          styles['horizontal-sroll-box'],
        ].join(' ')}>
        { props.children }
      </div>
    </>
  );
};

export default HorizontalScrollBox;