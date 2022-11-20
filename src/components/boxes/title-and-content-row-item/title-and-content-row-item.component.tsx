import styles from "./title-and-content-row-item.component.module.scss";
import { ITitleAndContentRowItem } from "./title-and-content-row-item.interface";

const TitleAndContentRowItem = (props: ITitleAndContentRowItem.Props) => {
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['title']}>
          { props.__title }
        </div>
        <div className={styles['content']}>
          { props.__content }
        </div>
      </div>
    </>
  );
};

export default TitleAndContentRowItem;