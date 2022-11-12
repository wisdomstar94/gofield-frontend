import { useEffect, useState } from "react";
import { ICommon } from "../../../interfaces/common/common.interface";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import HorizontalScrollBox from "../../layouts/horizontal-scroll-box/horizontal-scroll-box.component";
import styles from "./category-type-horizontal-list.component.module.scss";
import { ICategoryTypeHorizontalList } from "./category-type-horizontal-list.interface";

const CategoryTypeHorizontalList = (props: ICategoryTypeHorizontalList.Props) => {
  const [valueItems, setValueItems] = useState<ICommon.ValueItem[]>(props.__valueItems ?? []);
  useEffect(() => {
    setValueItems(props.__valueItems ?? []);
  }, [props.__valueItems]);

  return (
    <>
      <HorizontalScrollBox __style={{ borderBottom: '1px solid #e9ebee' }}>
        <ul className={styles['list']}>
          {
            valueItems.map((item, index) => {
              return (
                <li key={index} className={getClasses([styles['item'], item.value === props.__activeValue ? styles['active'] : ''])}>
                  { item.text }
                </li>
              );
            })
          }
        </ul>
      </HorizontalScrollBox>
    </>
  );
};

export default CategoryTypeHorizontalList;