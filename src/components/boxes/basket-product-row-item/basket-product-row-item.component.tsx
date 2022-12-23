import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useProductOrder from "../../../hooks/use-product-order/use-product-order.interface";
import { IOrder } from "../../../interfaces/order/order.interface";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";
import Checkbox from "../../forms/checkbox/checkbox.component";
import { ICheckbox } from "../../forms/checkbox/checkbox.interface";
import List, { ListItem } from "../../layouts/list/list.component";
import styles from "./basket-product-row-item.component.module.scss";
import { IBasketProductRowItem } from "./basket-product-row-item.interface";

const BasketProductRowItem = (props: IBasketProductRowItem.Props) => {
  const productOrder = useProductOrder();
  const router = useRouter();
  const [item, setItem] = useState(props.__item);
  useEffect(() => { setItem(props.__item); }, [props.__item]);

  const [totalPriceInfo, setTotalPriceInfo] = useState<IOrder.TotalPriceInfo>();

  const checkboxChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {
    if (typeof props.__onCheckboxChange === 'function') {
      props.__onCheckboxChange(changeInfo.checkState === 'checked');
    }
  }, [props]);

  const countControllButtonClick = useCallback((type: '+' | '-') => {
    if (item === undefined) {
      return;
    }

    let currentQty = item.qty;
    let nextQty = item.qty;
    if (type === '+') {
      if (item.qty >= 99) {
        return;
      }
      nextQty += 1;
    } else if (type === '-') {
      if (item.qty <= 1) {
        return;
      }
      nextQty -= 1;
    }

    const newItem = { ...item, qty: nextQty };
    setItem(newItem);

    setTotalPriceInfo(productOrder.getTotalPriceInfo([{
      charge: newItem.charge,
      condition: newItem.condition,
      delivery: newItem.delivery,
      deliveryPrice: newItem.deliveryPrice,
      price: newItem.price,
      qty: newItem.qty,
    }]));

    if (typeof props.__onCountChange === 'function' && nextQty !== currentQty) {
      props.__onCountChange(nextQty);
    }
  }, [item, productOrder, props]);

  const deleteCartItemButtonClick = useCallback(() => {
    if (typeof props.__onDeleteButtonClick === 'function' && item !== undefined) {
      props.__onDeleteButtonClick(item);
    }
  }, [item, props]);

  // useEffect(() => {
  //   if (item === undefined) {
  //     return;
  //   }

  //   setTotalPriceInfo(productOrder.getTotalPriceInfo([{
  //     charge: item.charge,
  //     condition: item.condition,
  //     delivery: item.delivery,
  //     deliveryPrice: item.deliveryPrice,
  //     price: item.price,
  //     qty: item.qty,
  //   }]));
  // }, [item, productOrder]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (item === undefined) {
      return;
    }

    setTotalPriceInfo(productOrder.getTotalPriceInfo([{
      charge: item.charge,
      condition: item.condition,
      delivery: item.delivery,
      deliveryPrice: item.deliveryPrice,
      price: item.price,
      qty: item.qty,
    }]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
    
  return (
    <>
      <div className={styles['basket-product-row-item']}>
        <div className={styles['container']}>
          <div className={styles['checkbox-area']}>
            <Checkbox __name="" __checkState={item?.isChecked === true ? 'checked' : 'none-checked'} __value="" __onChange={checkboxChange} />
          </div>
          <div className={styles['product-area']}>
            <div className={styles['photo-area']}>
              <div className="next-image-wrapper">
                {
                  typeof item?.thumbnail === 'string' ? 
                  <Image
                    src={item?.thumbnail}
                    alt="상품 상세정보 이미지"
                    title="상품 상세정보 이미지"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top" />
                  : <></>
                }
              </div>
            </div>
            <div className={styles['info-area']}>
              <List __direction="vertical" __width="100%" __defaultItemMarginBottom="10px">
                <ListItem>
                  <span className={styles['product-name-text']}>{ item?.itemName }</span>
                </ListItem>
                <ListItem>
                  {
                    item?.optionName?.length ?? 0 > 0 ? 
                    <span className={styles['options-text']}>
                      옵션: 
                      {
                        item?.optionName?.map((optionName, index) => {
                          let comma = ', ';
                          if (index === (item?.optionName?.length ?? 0) - 1) comma = '';
                          return <span key={index}>{ optionName + comma }</span>;
                        })
                      }
                    </span> : <></>
                  }
                </ListItem>
                <ListItem>
                  <span className={styles['price-text']}>{ getAddCommaNumberString({ numberValue: item?.price }) }원</span>
                </ListItem>
                <ListItem>
                  <div className={styles['sqaure-button']} onClick={e => countControllButtonClick('+')}>+</div>
                  <div className={styles['sqaure-button']}>{ item?.qty }</div>
                  <div className={styles['sqaure-button']} onClick={e => countControllButtonClick('-')}>-</div>
                </ListItem>
                <ListItem>
                  <span className={styles['seller-text']}>판매자: { item?.sellerName }</span>
                </ListItem>
                <ListItem>
                  {
                    item !== undefined ? 
                    <span className={styles['is-delivery-free-or-pay-area']}>
                      { totalPriceInfo?.totalCharge === 0 ? '무료배송' : '배송료 ' + getAddCommaNumberString({ numberValue: totalPriceInfo?.totalCharge }) } 
                    </span> : 
                    <></>
                  }
                </ListItem>
              </List>
            </div>
          </div>
          <div className={styles['x-button-area']} onClick={deleteCartItemButtonClick}>
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