import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../forms/button/button.component";
import Checkbox from "../../forms/checkbox/checkbox.component";
import { ICheckbox } from "../../forms/checkbox/checkbox.interface";
import Article from "../../layouts/article/article.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import BasketProductRowItem from "../basket-product-row-item/basket-product-row-item.component";
import BottomFixedOrRelativeBox from "../bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import styles from "./basket-form-box.component.module.scss";
import { IBasketFormBox } from "./basket-form-box.interface";

const BasketFormBox = (props: IBasketFormBox.Props) => {
  const router = useRouter();

  const ProductGroupColumnItemClick = useCallback(() => {
    router.push('/productGroup/33');
  }, [router]);

  const allCheckChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {

  }, []);

  return (
    <>
      <Article __style={{ borderBottom: '1px solid #e9ebee' }}>
        <Checkbox __name="all-check" __value="all" __checkState="checked" __onChange={allCheckChange}>
          전체 선택
        </Checkbox>
      </Article>
      <BasketProductRowItem />
      <BasketProductRowItem />
      <div className={styles['total-price-info-box']}>
        <BothSidebox
          __style={{ marginBottom: '8px' }}
          __leftComponent={<><span className={styles['title-text']}>총 상품 금액</span></>}
          __rightComponent={<><span className={styles['price-text']}>151,600원</span></>} />
        <BothSidebox
          __leftComponent={<><span className={styles['title-text']}>총 배송료</span></>}
          __rightComponent={<><span className={styles['price-text']}>3,000원</span></>} />
        <div className={styles['deco-line']} style={{ marginTop: '16px', marginBottom: '16px' }}></div>
        <BothSidebox
          __leftComponent={<><span className={styles['title-final-text']}>총 결제금액</span></>}
          __rightComponent={<><span className={styles['price-final-text']}>154,600원</span></>} />
      </div>

      <BottomFixedOrRelativeBox __heightToRelative={100}>
        <BothSidebox
          __leftComponent={<><Button __buttonStyle="white-solid-gray-stroke">합계 : 154,600원</Button></>}
          __rightComponent={<><Button __buttonStyle="black-solid">바로 구매하기</Button></>} />
      </BottomFixedOrRelativeBox>
    </>
  );
};

export default BasketFormBox;