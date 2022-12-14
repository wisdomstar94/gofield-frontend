import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import useCartItemDeleteApi from "../../../hooks/use-apis/use-cart-item-delete.api";
import useCartListApi from "../../../hooks/use-apis/use-cart-list.api";
import useOrderSheetCreateApi from "../../../hooks/use-apis/use-order-sheet-create.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import useModalConfirm from "../../../hooks/use-modals/use-modal-confirm.modal";
import useProductOrder from "../../../hooks/use-product-order/use-product-order.interface";
import useCartCountQuery from "../../../hooks/use-queries/use-cart-count.query";
import { ICart } from "../../../interfaces/cart/cart.interface";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";
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
  const orderSheetCreateApi = useOrderSheetCreateApi();
  const cartListApi = useCartListApi();
  const cartItemDeleteApi = useCartItemDeleteApi();
  const modalAlert = useModalAlert();
  const modalConfirm = useModalConfirm();
  const productOrder = useProductOrder();
  const cartCountQuery = useCartCountQuery();

  const [isAllChecked, setIsAllChecked] = useState(true);
  const [list, setList] = useState<ICart.CartItem[]>([]);

  const isOrderSheetCreatingRef = useRef(false);
  const isDeletingRef = useRef(false);
  const isGettingListRef = useRef(false);

  const allCheckChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {
    const nextValue = changeInfo.checkState === 'checked';
    setIsAllChecked(nextValue);
    if (nextValue === false) {
      const newList = [ ...list ];
      newList.forEach((inItem) => {
        inItem.isChecked = false;
      });
      setList(newList);
    }
  }, [list]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (isGettingListRef.current) {
      return;
    }

    isGettingListRef.current = true;
    cartListApi.getInstance().then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '??????', content: '???????????? ????????? ??????????????? ?????????????????????.' });
        return;
      }

      setList(response.data.data.map((item) => {
        const newItem = { ...item };
        newItem.isChecked = true;
        return newItem;
      }));
    }).finally(() => {
      isGettingListRef.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const getTotalPriceInfo = useCallback(() => {
    return productOrder.getTotalPriceInfo(list.filter(item => item.isChecked === true).map(item => ({ 
      charge: item.charge, 
      condition: item.condition, 
      delivery: item.delivery,
      deliveryPrice: item.deliveryPrice,
      price: item.price,
      qty: item.qty,
    })));
  }, [list, productOrder]);

  const onCheckboxChange = useCallback((item: ICart.CartItem, isChecked: boolean) => {
    const newList = [ ...list ];
    newList.forEach((inItem) => {
      if (inItem === item) {
        inItem.isChecked = isChecked;
      }
    });

    if (!isChecked) {
      setIsAllChecked(false);
    } else {
      if (newList.every(item => item.isChecked)) {
        setIsAllChecked(true);
      }
    }

    setList(newList);
  }, [list]);

  const onCountChange = useCallback((item: ICart.CartItem, count: number) => {
    const newList = [ ...list ];
    newList.forEach((inItem) => {
      if (inItem === item) {
        inItem.qty = count;
      }
    });
    setList(newList);
  }, [list]);

  const onDeleteButtonClick = useCallback((item: ICart.CartItem) => {
    if (isDeletingRef.current) {
      modalAlert.show({ title: '??????', content: '?????? ??? ?????? ??????????????????.' });
      return;
    }

    isDeletingRef.current = true;
    cartItemDeleteApi.getInstance(item.id).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '??????', content: '?????????????????? ??????????????? ?????????????????????.' });
        return;
      }

      setList(list.filter(inItem => inItem !== item));
      cartCountQuery.refetch();
    }).finally(() => {
      isDeletingRef.current = false;
    });
  }, [cartCountQuery, cartItemDeleteApi, list, modalAlert]);

  const getCheckedItems = useCallback(() => {
    return list.filter(item => item.isChecked === true);
  }, [list]);

  const nowBuyButtonClick = useCallback(() => {
    if (isOrderSheetCreatingRef.current) {
      modalAlert.show({ title: '??????', content: '?????? ??? ?????? ??????????????????.' });
      return;
    }

    // modalAlert.show({ title: '??????', content: 'API ?????? ????????????.' });
    const checkedItems = getCheckedItems();

    if (checkedItems.length === 0) {
      modalAlert.show({ title: '??????', content: '????????? ????????? ????????????.' });
      return;
    }

    const getPriceTotalInfo = productOrder.getTotalPriceInfo(checkedItems.map(item => ({ 
      charge: item.charge, 
      condition: item.condition, 
      delivery: item.delivery,
      deliveryPrice: item.deliveryPrice,
      price: item.price, 
      qty: item.qty 
    })));

    modalConfirm.show({
      title: '??????',
      content: `???????????? ????????? ????????? ?????????????????????????`,
      positiveCallback(hide, modalItem) {
        isOrderSheetCreatingRef.current = true;
        orderSheetCreateApi.getInstance({
          isCart: true,
          items: checkedItems.map((item) => ({ cartId: item.id, itemNumber: item.itemNumber, qty: item.qty })),
          totalDelivery: getPriceTotalInfo.totalCharge,
          totalPrice: getPriceTotalInfo.totalPrice,
        }).then((response) => {
          if (response.data.status !== true) {
            modalAlert.show({ title: '??????', content: '?????? ????????? ???????????? ???????????????. ?????? ??? ?????? ??????????????????.' });
            return;
          }

          router.push('/order/submit/' + response.data.data.code);
        }).finally(() => {  
          isOrderSheetCreatingRef.current = false;
        });
        hide(modalItem);
      },
    })    
  }, [getCheckedItems, modalAlert, modalConfirm, orderSheetCreateApi, productOrder, router]);

  return (
    <>
      {
        list.length === 0 ? 
        <div className="w-full relative px-6 py-12">
          <div className="w-full box-sizing flex justify-center items-center">
            <span className="text-black-b text-sm">??????????????? ???????????????.</span>
          </div>
        </div> : 
        <>
          <Article __style={{ borderBottom: '1px solid #e9ebee' }}>
            <Checkbox __name="all-check" __value="all" __checkState={isAllChecked ? 'checked' : 'none-checked'} __onChange={allCheckChange}>
              ?????? ??????
            </Checkbox>
          </Article>
          <div className="w-full relative">
            {
              list.map((item) => {
                return (
                  <BasketProductRowItem
                    key={item.id}
                    __item={item}
                    __onCheckboxChange={isChecked => onCheckboxChange(item, isChecked)}
                    __onCountChange={count => onCountChange(item, count)}
                    __onDeleteButtonClick={() => onDeleteButtonClick(item)} />
                )
              })
            }
          </div>
          <div className={styles['total-price-info-box']}>
            <BothSidebox
              __style={{ marginBottom: '8px' }}
              __leftComponent={<><span className={styles['title-text']}>??? ?????? ??????</span></>}
              __rightComponent={<><span className={styles['price-text']}>{ getAddCommaNumberString({ numberValue: getTotalPriceInfo().totalPrice }) }???</span></>} />
            <BothSidebox
              __leftComponent={<><span className={styles['title-text']}>??? ?????????</span></>}
              __rightComponent={<><span className={styles['price-text']}>{ getAddCommaNumberString({ numberValue: getTotalPriceInfo().totalCharge }) }???</span></>} />
            <div className={styles['deco-line']} style={{ marginTop: '16px', marginBottom: '16px' }}></div>
            <BothSidebox
              __leftComponent={<><span className={styles['title-final-text']}>??? ????????????</span></>}
              __rightComponent={<><span className={styles['price-final-text']}>{ getAddCommaNumberString({ numberValue: getTotalPriceInfo().totalPaySubmitPrice }) }???</span></>} />
          </div>

          <BottomFixedOrRelativeBox __heightToRelative={60}>
            <BothSidebox
              __leftComponent={<><Button __buttonStyle="white-solid-gray-stroke">?????? : { getAddCommaNumberString({ numberValue: getTotalPriceInfo().totalPaySubmitPrice }) }???</Button></>}
              __rightComponent={<><Button __buttonStyle="black-solid" __onClick={nowBuyButtonClick}>?????? ????????????</Button></>} />
          </BottomFixedOrRelativeBox>
        </> 
      }
    </>
  );
};

export default BasketFormBox;