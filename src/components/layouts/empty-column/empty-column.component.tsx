import styles from "./empty-column.component.module.scss";
import { IEmptyColumn } from "./empty-column.interface";

const EmptyColumn = (props: IEmptyColumn.Props) => {
  return (
    <>
      <div className={styles['container']} style={props.__style}>

      </div>
    </>
  );
};

export default EmptyColumn;