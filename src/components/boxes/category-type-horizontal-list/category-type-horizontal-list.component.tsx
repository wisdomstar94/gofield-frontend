import { useCallback, useEffect, useRef, useState } from "react";
import { ICommon } from "../../../interfaces/common/common.interface";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import HorizontalScrollBox from "../../layouts/horizontal-scroll-box/horizontal-scroll-box.component";
import styles from "./category-type-horizontal-list.component.module.scss";
import { ICategoryTypeHorizontalList } from "./category-type-horizontal-list.interface";

const CategoryTypeHorizontalList = (props: ICategoryTypeHorizontalList.Props) => {
  const ulRef = useRef<HTMLUListElement>(null);

  const [valueItems, setValueItems] = useState<ICommon.ValueItem[]>(props.__valueItems ?? []);
  const [activeValue, setActiveValue] = useState(props.__activeValue ?? '');
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    setValueItems(props.__valueItems ?? []);
  }, [props.__valueItems]);

  useEffect(() => {
    applyActiveValueItemScrollLeft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueItems, activeValue]);

  useEffect(() => {
    setActiveValue(props.__activeValue ?? '');
  }, [props.__activeValue]);

  const applyActiveValueItemScrollLeft = useCallback(() => {
    if (ulRef.current === null) {
      return;
    } 

    const targetLi = ulRef.current.querySelector<HTMLElement>(`li[data-value="${activeValue}"]`);
    if (targetLi === null) {
      return;
    }

    setScrollLeft(targetLi.offsetLeft < 200 ? 0 : targetLi.offsetLeft - 100);
  }, [activeValue]);

  const itemClick = useCallback((item: ICommon.ValueItem) => {
    if (item.value === activeValue) {
      return;
    }

    if (typeof props.__onItemClick === 'function') {
      props.__onItemClick(item);
    }
  }, [activeValue, props]);

  return (
    <>
      <HorizontalScrollBox __style={{ borderBottom: '1px solid #e9ebee' }} __scrollLeft={scrollLeft}>
        <ul ref={ulRef} className={styles['list']}>
          {
            valueItems.map((item, index) => {
              return (
                <li key={index} 
                  className={getClasses([styles['item'], item.value === props.__activeValue ? styles['active'] : ''])} data-value={item.value}
                  onClick={e => itemClick(item)}>
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