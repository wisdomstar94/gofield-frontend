import { useCallback, useEffect, useState } from "react";
import { ICommon } from "../../../interfaces/common/common.interface";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import styles from "./stroke-tab-button-box.component.module.scss";
import { IStrokeTabButtonBox } from "./stroke-tab-button-box.interface";

const StrokeTabButtonBox = (props: IStrokeTabButtonBox.Props) => {
  const [valueItems, setValueItems] = useState<ICommon.ValueItem[]>(props.__valueItems ?? []);
  const [activeValue, setActiveValue] = useState(props.__activeValue ?? '');

  useEffect(() => {
    setValueItems(props.__valueItems ?? []);
  }, [props.__valueItems]);

  useEffect(() => {
    setActiveValue(props.__activeValue ?? '');
  }, [props.__activeValue]);

  const itemClick = useCallback((valueItem: ICommon.ValueItem) => {
    if (typeof props.__onTabClick === 'function') {
      setActiveValue(valueItem.value);
      props.__onTabClick(valueItem);
    }
  }, [props]);

  return (
    <>
      <ul className={styles['tab-button-box']}>
        {
          valueItems.map((item, index) => {
            return (
              <li key={index} 
                style={{ width: `calc(100% / ${valueItems.length})` }}
                className={getClasses([styles['item'], activeValue === item.value ? styles['active'] : ''])}
                onClick={e => itemClick(item)}>
                { item.text }
              </li>
            );
          })
        }
      </ul>
    </>
  );
};

export default StrokeTabButtonBox;