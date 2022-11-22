import Image from "next/image";
import { useCallback } from "react";
import Checkbox from "../../forms/checkbox/checkbox.component";
import { ICheckbox } from "../../forms/checkbox/checkbox.interface";
import List, { ListItem } from "../../layouts/list/list.component";
import styles from "./basket-product-row-item.component.module.scss";
import { IBasketProductRowItem } from "./basket-product-row-item.interface";

const BasketProductRowItem = (props: IBasketProductRowItem.Props) => {
  const checkboxChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {
    
  }, []);

  return (
    <>
      <div className={styles['basket-product-row-item']}>
        <div className={styles['container']}>
          <div className={styles['checkbox-area']}>
            <Checkbox __name="" __checkState="none-checked" __value="" __onChange={checkboxChange} />
          </div>
          <div className={styles['product-area']}>
            <div className={styles['photo-area']}>
              <div className="next-image-wrapper">
                <Image
                  src={"https://cdn.pixabay.com/photo/2017/09/17/07/07/waterfall-2757689_1280.jpg"}
                  alt="상품 상세정보 이미지"
                  title="상품 상세정보 이미지"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top" />
              </div>
            </div>
            <div className={styles['info-area']}>
              <List __direction="vertical" __width="100%" __defaultItemMarginBottom="10px">
                <ListItem>
                  <span className={styles['product-name-text']}>페르마 플러스 드라이버 헤드 (9.5도 단품)</span>
                </ListItem>
                <ListItem>
                  <span className={styles['options-text']}>옵션: {'Black'}</span>
                </ListItem>
                <ListItem>
                  <span className={styles['price-text']}>560,000원</span>
                </ListItem>
                <ListItem>
                  <div className={styles['sqaure-button']}>+</div>
                  <div className={styles['sqaure-button']}>1</div>
                  <div className={styles['sqaure-button']}>-</div>
                </ListItem>
                <ListItem>
                  <span className={styles['seller-text']}>판매자: 제임스쿠</span>
                </ListItem>
              </List>
            </div>
          </div>
          <div className={styles['x-button-area']}>
            x
          </div>
        </div>
        <div className={styles['border-bottom-box']}>

        </div>
      </div>
    </>
  );
};

export default BasketProductRowItem;