import styles from "./not-result-box.component.module.scss";
import { INotResultBox } from "./not-result-box.interface";

const NotResultBox = (props: INotResultBox.Props) => {
  return (
    <>
      <div className={styles['not-result-box']}>
        <span className={styles['not-result-text']}>{ props.children }</span>
      </div>
    </>
  );
};

export default NotResultBox;