import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useNewOrOldProductOrderByListQuery from "../../../hooks/use-queries/use-new-or-old-product-order-by-list.query";
import { ICommon } from "../../../interfaces/common/common.interface";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import Button from "../../forms/button/button.component";
import ProductRowItem from "../product-row-item/product-row-item.component";
import ProductRowItem2 from "../../boxes/product-row-item2/product-row-item2.component";
import Article from "../../layouts/article/article.component";
import HorizontalScrollBox from "../../layouts/horizontal-scroll-box/horizontal-scroll-box.component";
import StrokeTabButtonBox from "../stroke-tab-button-box/stroke-tab-button-box.component";
import styles from "./new-or-old-product-list-box.component.module.scss";
import { INewOrOldProductListBox } from "./new-or-old-product-list-box.interface";
import { IItem } from "../../../interfaces/item/item.interface";

const NewOrOldProductListBox = (props: INewOrOldProductListBox.Props) => {
  const router = useRouter();
  
  const [items, setItems] = useState(props.__items);
  useEffect(() => { setItems(props.__items); }, [props.__items]);

  const [classification, setClassification] = useState<IItem.Classification>('ALL');

  const [selectedOrderBy, setSelectedOrderBy] = useState('');
  const newOrOldProductOrderByListQuery = useNewOrOldProductOrderByListQuery();


  useEffect(() => {

  }, []);

  const onProductTypeTabClick = useCallback((valueItem: ICommon.ValueItem) => {
    // console.log('onProductTypeTabClick.valueItem', valueItem);
    setClassification(valueItem.value as IItem.Classification);
  }, []);

  const orderByItemClick = useCallback((valueItem: ICommon.ValueItem) => {
    setSelectedOrderBy(valueItem.value);
  }, []);
  
  const productRowItemClick = useCallback((item: IItem.ProductRowItem) => {
    if (item.classification === 'USED') {
      router.push('/product/old/' + item.itemNumber);
    } else {
      router.push('/product/new/' + item.itemNumber);
    }
  }, [router]);

  return (
    <>
      <StrokeTabButtonBox
        __valueItems={[
          { text: `전체상품 (${items?.length})`, value: 'ALL' },
          { text: `새상품 (${items?.filter(x => x.classification === 'NEW').length})`, value: 'NEW' },
          { text: `중고상품 (${items?.filter(x => x.classification === 'USED').length})`, value: 'USED' },
        ]}
        __activeValue="ALL"
        __onTabClick={onProductTypeTabClick} />

      {/* <HorizontalScrollBox>
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
      </HorizontalScrollBox> */}

      <Article __style={{ paddingTop: '12px', paddingBottom: '12px' }}>
        {
          items?.filter((item) => {
            switch (classification) {
              case 'USED': return item.classification === 'USED';
              case 'NEW': return item.classification === 'NEW';
              case 'ALL': 
              default: return true;
            }
          }).map((item, index) => {
            return (
              <>
                <ProductRowItem2 
                  key={item.id} 
                  __imageUrl={item.thumbnail}
                  __brandName={item.brandName}
                  __productName={item.name}
                  __price={item.price}
                  __tags={item.tags}
                  __style={{ marginBottom: '18px' }} 
                  __onClick={() => productRowItemClick(item)} />    
              </>
            );
          })
        }
        {/* {
          Array.from({ length: 5 }).map((item, index) => {
            return (
              <ProductRowItem2 key={index} __style={{ marginBottom: '18px' }} __onClick={productRowItemClick} />  
            );
          })
        } */}
        {/* <Button __buttonStyle="gray-stroke">더보기</Button> */}
      </Article>
    </>
  );
};

export default NewOrOldProductListBox;