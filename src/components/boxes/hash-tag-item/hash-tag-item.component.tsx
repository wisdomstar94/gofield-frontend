import styles from "./hash-tag-item.component.module.scss";
import { IHashTagItem } from "./hash-tag-item.interface";

const HashTagItem = (props: IHashTagItem.Props) => {
  return (
    <>
      <div className={styles['container']}>
        { props.children }
      </div>
    </>
  );
};

export default HashTagItem;