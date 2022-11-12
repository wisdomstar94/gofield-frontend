import { Children, useEffect, useState } from "react";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import styles from "./grid-list.component.module.scss";
import { IGridList } from "./grid-list.interface";

const GridList = (props: IGridList.Props) => {
  const [columnCount, setColumnCount] = useState(props.__columnCount ?? 2);
  useEffect(() => {
    setColumnCount(props.__columnCount ?? 2);
  }, [props.__columnCount]);

  return (
    <>
      <ul className={getClasses([styles['container'], styles[`col-${columnCount}`]])}>
        {
          Children.map(props.children, (child) => {
            return (
              <li className={styles['item']}>
                { child }
              </li>
            )
          })
        }
      </ul>
    </>
  );
};

export default GridList;