import { useCallback, useEffect, useRef, useState } from "react";
import useViewFilterOptionItemListQuery from "../../../hooks/use-queries/use-view-filter-option-item-list.query";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import ModalBottomViewOptions from "../../modals/modal-bottom-view-options/modal-bottom-view-options.component";
import { IModalBottomViewOptions } from "../../modals/modal-bottom-view-options/modal-bottom-view-options.interface";
import styles from "./view-filter-box.component.module.scss";
import { IViewFilterBox } from "./view-filter-box.interface";

const ViewFilterBox = (props: IViewFilterBox.Props) => {
  const modalBottomVeiwOptionsRef = useRef<IModalBottomViewOptions.RefObject>(null);

  const useViewFilterOptionCategoryItemListQuery = useViewFilterOptionItemListQuery('category');
  const useViewFilterOptionOrderByItemListQuery = useViewFilterOptionItemListQuery('order-by');
  const useViewFilterOptionProductStatusItemListQuery = useViewFilterOptionItemListQuery('product-status');

  const [selectedCategory, setSelectedCategory] = useState(props.__selectedCategory ?? 'all');
  useEffect(() => { setSelectedCategory(props.__selectedCategory ?? 'all') }, [props.__selectedCategory]);
  
  const [selectedOrderBy, setSelectedOrderBy] = useState(props.__selectedOrderBy);
  useEffect(() => { setSelectedOrderBy(props.__selectedOrderBy) }, [props.__selectedOrderBy]);
  
  const [selectedProductStatus, setSelectedProductStatus] = useState(props.__selectedProductStatus ?? '');
  useEffect(() => { setSelectedProductStatus(props.__selectedProductStatus ?? '') }, [props.__selectedProductStatus]);

  const [orderByValueItems, setOrderByValueItems] = useState(props.__orderByValueItems);
  useEffect(() => { setOrderByValueItems(props.__orderByValueItems) }, [props.__orderByValueItems]);

  const viewFilterClick = useCallback(() => {
    modalBottomVeiwOptionsRef.current?.show();
  }, []);

  const onChange = useCallback((info: IModalBottomViewOptions.OutputInfo) => {
    console.log('onChange', info);

    setSelectedCategory(info.selectedCategory);
    setSelectedOrderBy(info.selectedOrderBy);
    setSelectedProductStatus(info.selectedProductStatus);

    if (typeof props.__onChange === 'function') {
      props.__onChange(info);
    }
  }, [props]);

  return (
    <>
      <ul className={styles['container']} onClick={viewFilterClick}>
        { 
          selectedCategory !== '' && props.__optionTypes?.includes('category') ? 
          <>
            <li className={styles['item']}>
              { useViewFilterOptionCategoryItemListQuery.data?.find(x => x.value === selectedCategory)?.text }
            </li>
            <li className={getClasses([styles['item'], styles['deco']])}>
            </li>
          </> : <></> 
        }
        { 
          selectedOrderBy !== '' && selectedOrderBy !== undefined && props.__optionTypes?.includes('order-by') ? 
          <>
            <li className={styles['item']}>
              { orderByValueItems?.find(x => x.value === selectedOrderBy)?.text }
            </li>
            <li className={getClasses([styles['item'], styles['deco']])}>
            </li>
          </> : <></> 
        }
        { 
          selectedProductStatus !== '' && props.__optionTypes?.includes('product-status') ? 
          <>
            <li className={styles['item']}>
              { useViewFilterOptionProductStatusItemListQuery.data?.find(x => x.value === selectedProductStatus)?.text }
            </li>
            <li className={getClasses([styles['item'], styles['deco']])}>
            </li>
          </> : <></> 
        }
      </ul>
      <ModalBottomViewOptions 
        ref={modalBottomVeiwOptionsRef} 
        __optionTypes={props.__optionTypes}
        __selectedCategory={selectedCategory}
        __orderByValueItems={orderByValueItems}
        __selectedOrderBy={selectedOrderBy}
        __selectedProductStatus={selectedProductStatus}
        __onChanged={onChange} />
    </>
  );
};

export default ViewFilterBox;