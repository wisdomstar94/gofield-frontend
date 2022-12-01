import { useCallback } from "react";
import styles from "./hash-tag-item.component.module.scss";
import { IHashTagItem } from "./hash-tag-item.interface";

const HashTagItem = (props: IHashTagItem.Props) => {
  const onClick = useCallback(() => {
    if (typeof props.__onClick === 'function') {
      props.__onClick();
    }
  }, [props]);

  return (
    <>
      <div className={styles['container']} onClick={onClick}>
        { props.children }
      </div>
    </>
  );
};

export default HashTagItem;