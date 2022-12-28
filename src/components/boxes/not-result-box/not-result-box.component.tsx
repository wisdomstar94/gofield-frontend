import { useEffect, useState } from "react";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import styles from "./not-result-box.component.module.scss";
import { INotResultBox } from "./not-result-box.interface";

const NotResultBox = (props: INotResultBox.Props) => {
  const [isNoPadding, setIsNoPadding] = useState(props.__isNoPadding);
  useEffect(() => {
    setIsNoPadding(props.__isNoPadding);
  }, [props.__isNoPadding]);

  return (
    <>
      <div 
        className={getClasses([
          styles['not-result-box'],
          isNoPadding === true ? styles['no-padding'] : '',
        ])}>
        <span className={styles['not-result-text']}>{ props.children }</span>
      </div>
    </>
  );
};

export default NotResultBox;