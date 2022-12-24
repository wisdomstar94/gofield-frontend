import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import useViewFilterOptionItemListQuery from "../../../hooks/use-queries/use-view-filter-option-item-list.query";
import { ICommon } from "../../../interfaces/common/common.interface";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import ModalBottom from "../../forms/modal-bottom/modal-bottom.component";
import { IModalBottom } from "../../forms/modal-bottom/modal-bottom.interface";
import SvgCloseIcon from "../../svgs/svg-close-icon/svg-close-icon.component";
import styles from "./modal-bottom-view-options.component.module.scss";
import { IModalBottomViewOptions } from "./modal-bottom-view-options.interface";

const ModalBottomViewOptions = forwardRef((props: IModalBottomViewOptions.Props, ref: ForwardedRef<IModalBottomViewOptions.RefObject>) => {
  const [modalState, setModalState] = useState<IModalBottom.ModalState>(props.__modalState ?? '');

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

  // useEffect(() => {
  //   console.log('@@ ?? selectedOrderBy', selectedOrderBy); // RECOMMEND
  // }, [selectedOrderBy]);



  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    show,
    hide,
  }));

  const show = useCallback(() => {
    setModalState('show');
  }, []);

  const hide = useCallback(() => {
    setModalState('hide');
  }, []);

  useEffect(() => {
    setModalState(props.__modalState ?? '');
  }, [props.__modalState]);

  const closeButtonClick = useCallback(() => {
    setModalState('hide');
  }, []);

  const confirmButtonClick = useCallback(() => {
    // ...
    if (typeof props.__onChanged === 'function') {
      props.__onChanged({
        selectedCategory,
        selectedOrderBy,
        selectedProductStatus,
      });
    }
    setModalState('hide');
  }, [props, selectedCategory, selectedOrderBy, selectedProductStatus]);

  const categoryItemClick = useCallback((valueItem: ICommon.ValueItem) => {
    setSelectedCategory(valueItem.value);
  }, []);

  const orderByItemClick = useCallback((valueItem: ICommon.ValueItem) => {
    setSelectedOrderBy(valueItem.value);
  }, []);

  const productStatusItemClick = useCallback((valueItem: ICommon.ValueItem) => {
    setSelectedProductStatus(valueItem.value);
  }, []);

  return (
    <>
      <ModalBottom __modalState={modalState}>
        <div className={styles['top-row']}>
          <div className={getClasses([styles['common-area'], styles['left-area']])} onClick={closeButtonClick}>
            <SvgCloseIcon />
          </div>
          <div className={getClasses([styles['common-area'], styles['center-area']])}>
            <span className={styles['center-title-text']}>보기 옵션</span>
          </div>
          <div className={getClasses([styles['common-area'], styles['right-area']])} onClick={confirmButtonClick}>
            <span className={styles['confirm-button-text']}>확인</span>
          </div>
        </div>
        <ul className={styles['option-type-list']}>
          {
            props.__optionTypes?.includes('category') ? 
            <>
              <li className={styles['item']}>
                <div className={styles['title-row']}>
                  종목
                </div>
                <ul className={styles['option-type-item-list']}>
                  {
                    useViewFilterOptionCategoryItemListQuery.data?.map((item, index) => {
                      return (
                        <li key={item.value} className={getClasses([styles['item'], item.value === selectedCategory ? styles['active'] : ''])} onClick={e => categoryItemClick(item)}>
                          { item.text }
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
            </> : 
            <></>
          }
          {
            props.__optionTypes?.includes('order-by') ? 
            <>
              <li className={styles['item']}>
                <div className={styles['title-row']}>
                  정렬
                </div>
                <ul className={styles['option-type-item-list']}>
                  {
                    orderByValueItems?.map((item, index) => {
                      return (
                        <li key={item.value} 
                          className={getClasses([
                            styles['item'], 
                            item.value === selectedOrderBy ? styles['active'] : ''
                          ])} 
                          onClick={e => orderByItemClick(item)}>
                          { item.text }
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
            </> : 
            <></>
          }
          {
            props.__optionTypes?.includes('product-status') ? 
            <>
              <li className={styles['item']}>
                <div className={styles['title-row']}>
                  상품상태
                </div>
                <ul className={styles['option-type-item-list']}>
                  {
                    useViewFilterOptionProductStatusItemListQuery.data?.map((item, index) => {
                      return (
                        <li key={item.value} className={getClasses([styles['item'], item.value === selectedProductStatus ? styles['active'] : ''])} onClick={e => productStatusItemClick(item)}>
                          { item.text }
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
            </> : 
            <></>
          }
        </ul>
      </ModalBottom>
    </>
  );
});
ModalBottomViewOptions.displayName = 'ModalBottomViewOptions';

export default ModalBottomViewOptions;