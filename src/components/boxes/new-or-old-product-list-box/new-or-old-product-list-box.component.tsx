import { useCallback, useEffect, useState } from "react";
import useNewOrOldProductOrderByListQuery from "../../../hooks/use-queries/use-new-or-old-product-order-by-list.query";
import { ICommon } from "../../../interfaces/common/common.interface";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import ProductRowItem from "../../forms/product-row-item/product-row-item.component";
import Article from "../../layouts/article/article.component";
import HorizontalScrollBox from "../../layouts/horizontal-scroll-box/horizontal-scroll-box.component";
import StrokeTabButtonBox from "../stroke-tab-button-box/stroke-tab-button-box.component";
import styles from "./new-or-old-product-list-box.component.module.scss";
import { INewOrOldProductListBox } from "./new-or-old-product-list-box.interface";

const NewOrOldProductListBox = (props: INewOrOldProductListBox.Props) => {
  const [productId, setProductId] = useState(props.__productId ?? '');

  const [selectedOrderBy, setSelectedOrderBy] = useState('');
  const newOrOldProductOrderByListQuery = useNewOrOldProductOrderByListQuery();

  useEffect(() => {
    setProductId(props.__productId ?? '');
  }, [props.__productId]);

  useEffect(() => {

  }, []);

  const onProductTypeTabClick = useCallback((valueItem: ICommon.ValueItem) => {
    console.log('onProductTypeTabClick.valueItem', valueItem);
  }, []);

  const orderByItemClick = useCallback((valueItem: ICommon.ValueItem) => {
    setSelectedOrderBy(valueItem.value);
  }, []);

  return (
    <>
      <StrokeTabButtonBox
        __valueItems={[
          { text: '전체상품 (18)', value: 'all-product' },
          { text: '새상품 (3)', value: 'new-product' },
          { text: '중고상품 (15)', value: 'old-product' },
        ]}
        __activeValue="all-product"
        __onTabClick={onProductTypeTabClick} />

      <HorizontalScrollBox>
        <ul className={styles['order-by-item-list']}>
          {
            newOrOldProductOrderByListQuery.data?.map((item, index) => {
              return (
                <li key={item.value}
                  className={getClasses([styles['item'], item.value === selectedOrderBy ? styles['active'] : ''])}
                  onClick={e => orderByItemClick(item)}>
                  { item.text }
                </li>
              )
            })
          }
        </ul>
      </HorizontalScrollBox>

      <Article>
        {
          // Array.from({ length: 5 }).map((item, index) => {
          //   return (
              
          //   );
          // })
        }
      </Article>
    </>
  );
};

export default NewOrOldProductListBox;