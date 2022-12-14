import styles from "./modal-bottom-product-options.component.module.scss";
import { IModalBottomProductOptions } from "./modal-bottom-product-options.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import ModalBottom from "../../forms/modal-bottom/modal-bottom.component";
import { IModalBottom } from "../../forms/modal-bottom/modal-bottom.interface";
import SvgCloseIcon from "../../svgs/svg-close-icon/svg-close-icon.component";
import SelectBox from "../../forms/select-box/select-box.component";
import Button from "../../forms/button/button.component";
import { useRouter } from "next/router";
import useItemProductOptionListApi from "../../../hooks/use-apis/use-item-product-option-list.api";
import { IItem } from "../../../interfaces/item/item.interface";
import { ICommon } from "../../../interfaces/common/common.interface";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";
import useCartContainApi from "../../../hooks/use-apis/use-cart-contain.api";
import useCartCountQuery from "../../../hooks/use-queries/use-cart-count.query";
import useOrderSheetCreateApi from "../../../hooks/use-apis/use-order-sheet-create.api";
import useProductOrder from "../../../hooks/use-product-order/use-product-order.interface";
import useUser from "../../../hooks/use-user-hook/use-user.hook";
import { IModalSignupNotice } from "../modal-signup-notice/modal-signup-notice.interface";
import ModalSignupNotice from "../modal-signup-notice/modal-signup-notice.component";
import useModalConfirm from "../../../hooks/use-modals/use-modal-confirm.modal";
import useOrder from "../../../hooks/use-order/use-order.hook";

const ModalBottomProductOptions = forwardRef((props: IModalBottomProductOptions.Props, ref: ForwardedRef<IModalBottomProductOptions.RefObject>) => {
  const router = useRouter();
  const modalAlert = useModalAlert();
  const modalConfirm = useModalConfirm();
  const productOrder = useProductOrder();
  const [modalState, setModalState] = useState<IModalBottom.ModalState>(props.__modalState ?? '');
  const itemProductOptionListApi = useItemProductOptionListApi();
  const cartContainApi = useCartContainApi();
  const orderSheetCreateApi = useOrderSheetCreateApi();
  const user = useUser();
  const order = useOrder();
  const modalSignupNoticeRef = useRef<IModalSignupNotice.RefObject>(null);
  
  const cartCountQuery = useCartCountQuery();

  const isCartContainingRef = useRef(false);
  const isOrderSheetCreatingRef = useRef(false);

  const [optionGroupList, setOptionGroupList] = useState<IItem.OptionGroupItem[]>([]);
  const [optionList, setOptionList] = useState<IItem.OptionItem[]>([]);
  // const optionListRef = useRef<IItem.OptionItem[]>([]);

  // const optionGroupSelectInfoRef = useRef<Map<number, ICommon.ValueItem | undefined>>(new Map<number, ICommon.ValueItem | undefined>());
  const [optionGroupSelectInfo, setOptionGroupSelectInfo] = useState<Map<string, ICommon.ValueItem | undefined>>(new Map());

  const [detailInfo, setDetailInfo] = useState(props.__detailInfo);
  useEffect(() => { setDetailInfo(props.__detailInfo); }, [props.__detailInfo]);

  // const [isButtonDisable, setIsButtonDisable] = useState(false); 

  // const [price, setPrice] = useState(props.__price);
  // useEffect(() => { setPrice(props.__price); }, [props.__price]);

  // const [itemId, setItemId] = useState(props.__itemId);
  // useEffect(() => { setItemId(props.__itemId); }, [props.__itemId]);

  // const [itemNumber, setItemNumber] = useState(props.__itemNumber);
  // useEffect(() => { setItemNumber(props.__itemNumber); }, [props.__itemNumber]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (detailInfo?.id === undefined || detailInfo?.id === null) {
      return;
    }

    itemProductOptionListApi.getInstance(detailInfo.id + '').then((response) => {
      if (response.data.data.optionGroupList === null || response.data.data.optionList === null) {
        return;
      }

      // console.log('res', response);
      setOptionGroupList(response.data.data.optionGroupList);
      setOptionList(response.data.data.optionList);
      // optionListRef.current = response.data.data.optionList;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, detailInfo]);

  useImperativeHandle(ref, () => ({
    // ?????? ?????????????????? ????????? ????????? ??????
    show,
    hide,
  }));

  const show = useCallback(() => {
    setModalState('show');
  }, []);

  const hide = useCallback(() => {
    setModalState('hide');
  }, []);

  const closeIconButtonClick = useCallback(() => {
    hide();
  }, [hide]);

  // const isRequiredOptionSelected = useCallback(() => {
  //   for (const item of optionGroupList) {
  //     if (optionGroupSelectInfo.get(item.groupTitle) === undefined && item.isEssential === true) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }, [optionGroupList, optionGroupSelectInfo]);

  const clear = useCallback(() => {
    hide();
    setOptionGroupSelectInfo(new Map());
  }, [hide]);

  const getTargetItemNumber = useCallback(() => {
    if (!order.isRequiredOptionAllSelected(optionGroupSelectInfo, optionGroupList)) {
      return undefined;
    }

    const targetOptionItem = order.getTargetOptionItem(optionGroupSelectInfo, optionList);
    if (targetOptionItem !== undefined) {
      return targetOptionItem.itemNumber;
    }
    return detailInfo?.itemNumber;

    // let targetItemNumber = '';
    // if (optionGroupList.length > 0) {
    //   if (!isRequiredOptionSelected()) {
    //     modalAlert.show({ title: '??????', content: '????????? ?????? ??????????????????.' });
    //     return '';
    //   }

    //   if (isCartContainingRef.current) {
    //     modalAlert.show({ title: '??????', content: '?????? ??? ?????? ??????????????????.' });
    //     return '';
    //   }

    //   // console.log('optionGroupSelectInfoRef.current', optionGroupSelectInfoRef.current);
    //   // console.log('optionGroupSelectInfo', optionGroupSelectInfo);

    //   const optionGroupSelectOptionNames = Array.from(optionGroupSelectInfo.values()).map(item => item?.text + '');
    //   // console.log('optionGroupSelectOptionNames', optionGroupSelectOptionNames);

    //   const targetOptionItem = optionList?.find((item) => {
    //     const result = item.name.every((item) => {
    //       return optionGroupSelectOptionNames.includes(item);
    //     });
    //     return result;
    //   });
    //   if (targetOptionItem === undefined) {
    //     modalAlert.show({ title: '??????', content: '????????? ???????????? ????????? ????????????.' });
    //     return '';
    //   }
    //   targetItemNumber = targetOptionItem.itemNumber;
    // } else if (optionGroupList.length === 0) {
    //   if (typeof detailInfo?.itemNumber !== 'string' || detailInfo?.itemNumber.trim() === '') {
    //     modalAlert.show({ title: '??????', content: '?????? ????????? ???????????? ???????????????.' });
    //     return '';
    //   }
    //   targetItemNumber = detailInfo.itemNumber;
    // }
    // return targetItemNumber;
  }, [detailInfo?.itemNumber, optionGroupList, optionGroupSelectInfo, optionList, order]);

  const containBasketButtonClick = useCallback(() => {
    if (!user.isLogined()) {
      modalSignupNoticeRef.current?.show();
      return;
    }

    const targetItemNumber = getTargetItemNumber();
    if (targetItemNumber === '' || targetItemNumber === undefined) {
      modalAlert.show({ title: '??????', content: '?????? ????????? ?????? ??????????????????.' });
      return;
    }

    // ???????????? ??????..
    isCartContainingRef.current = true;
    cartContainApi.getInstance(false, targetItemNumber).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '??????', content: '???????????? ????????? ?????????????????????.' });
        return;
      }

      modalConfirm.show({ 
        title: '??????', 
        content: '??????????????? ????????? ???????????????. ???????????? ???????????? ?????????????????????????', 
        negativeButtonText: '?????????',
        positiveButtonText: '???',
        positiveCallback(hide, modalItem) {
          router.push('/basket');
          hide(modalItem);
        },
      });
      cartCountQuery.refetch();
      clear();
    }).finally(() => {
      isCartContainingRef.current = false;
    });
  }, [cartContainApi, cartCountQuery, clear, getTargetItemNumber, modalAlert, modalConfirm, router, user]);

  const getTotalPrice = useCallback(() => {
    if (detailInfo?.price === undefined) {
      return 'null';
    }

    let returnPrice = detailInfo.price;
    
    const targetOptionItem = order.getTargetOptionItem(optionGroupSelectInfo, optionList);
    if (targetOptionItem !== undefined) {
      if (targetOptionItem.status === 'SOLD_OUT') {
        // setIsButtonDisable(true);
        return '???????????? ????????? ???????????????.';
      }
      returnPrice = targetOptionItem.price;
    }

    // setIsButtonDisable(false);
    return getAddCommaNumberString({ numberValue: returnPrice }) + '???';
  }, [detailInfo?.price, optionGroupSelectInfo, optionList, order]);

  const nowPayButtonClick = useCallback(() => {
    if (!user.isLogined()) {
      modalSignupNoticeRef.current?.show();
      return;
    }

    if (isOrderSheetCreatingRef.current) {
      return;
    }

    const targetItemNumber = getTargetItemNumber();
    if (targetItemNumber === '' || targetItemNumber === undefined) {
      modalAlert.show({ title: '??????', content: '?????? ????????? ?????? ??????????????????.' });
      return;
    }

    if (detailInfo?.shippingTemplate === undefined || detailInfo?.shippingTemplate === null) {
      return;
    }

    let price = 0;
    let targetItem = optionList.find(x => x.itemNumber === targetItemNumber);
    if (targetItem === undefined) {
      price = detailInfo.price;
    } else {
      price = targetItem.price;
    }

    const getPriceTotalInfo = productOrder.getTotalPriceInfo([{ 
      charge: detailInfo.shippingTemplate.charge, 
      condition: detailInfo.shippingTemplate.condition, 
      delivery: detailInfo.delivery,
      deliveryPrice: detailInfo.deliveryPrice,
      price: price, 
      qty: 1 
    }]);

    isOrderSheetCreatingRef.current = true;
    orderSheetCreateApi.getInstance({
      isCart: false,
      items: [{ cartId: null, itemNumber: targetItemNumber, qty: 1 }],
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
  }, [detailInfo?.delivery, detailInfo?.deliveryPrice, detailInfo?.price, detailInfo?.shippingTemplate, getTargetItemNumber, modalAlert, optionList, orderSheetCreateApi, productOrder, router, user]);

  const optionSelectboxChange = useCallback((item: IItem.OptionGroupItem, value: string, valueItem: ICommon.ValueItem | undefined) => {
    // optionGroupSelectInfoRef.current.set(item.id, valueItem);
    if (valueItem === undefined) {
      setOptionGroupSelectInfo((prev) => {
        const newMap = new Map(prev);
        newMap.delete(item.groupTitle);
        return newMap;
      });
      // setIsButtonDisable(order.isSoldOut(optionGroupSelectInfo, optionList));
      return;  
    }

    setOptionGroupSelectInfo((prev) => {
      const newMap = new Map(prev);
      newMap.set(item.groupTitle, valueItem);
      return newMap;
    });
    // setIsButtonDisable(order.isSoldOut(optionGroupSelectInfo, optionList));
  }, []);

  return (
    <>
      <ModalBottom __modalState={modalState}>
        <div className={`w-full grid grid-cols-9 box-sizing pt-4 px-4${optionGroupList.length !== 0 ? ' pb-4' : ''}`}>
          <div className="col-span-3 flex flex-wrap items-center justify-start">

          </div>
          <div className="col-span-3 flex flex-wrap items-center justify-center">
            {
              optionGroupList.length !== 0 ? 
              <span className="font-bold text-black tracking-tighter text-base">?????? ??????</span> : 
              <span className="font-bold text-black tracking-tighter text-base">??? ????????? ????????? ?????? ???????????????.</span>
            }
          </div>
          <div className="col-span-3 flex flex-wrap items-center justify-end">
            <span className="inline-flex cursor-pointer" onClick={closeIconButtonClick}>
              <SvgCloseIcon />
            </span>
          </div>
        </div>
        <div className="block w-full box-sizing px-6">
          {
            optionGroupList.map((item, index) => {
              return (
                <div className="block mb-2" key={index}>
                  <SelectBox
                    __placeholder={item.groupTitle + (item.isEssential ? ' (??????)' : ' (??????)')}
                    __value={optionGroupSelectInfo.get(item.groupTitle)?.value}
                    __valueItems={item.optionGroup?.map((x) => ({ text: x.name, value: x.name, value2: x.price.toString() }))}
                    __onChange={(value, valueItem) => optionSelectboxChange(item, value, valueItem)} />
                </div>
              );
            })
          }
        </div>
        
        <div className="w-full h-px bg-gray-a my-6"></div>

        <div className="w-full box-sizing px-6 grid grid-cols-2 mb-6">
          <div className="flex flex-wrap justify-start items-center">
            <span className="text-sm text-black-a tracking-tighter font-bold">?????? ??????</span>
          </div>
          <div className="flex flex-wrap justify-end items-center">
            <span className="text-sm text-orange-a tracking-tighter font-bold">{ getTotalPrice() }</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2">
          <div>
            <Button __buttonStyle="white-solid-gray-stroke" __onClick={containBasketButtonClick} __disable={order.isSoldOut(optionGroupSelectInfo, optionList)}>???????????? ??????</Button>
          </div>
          <div>
            <Button __buttonStyle="black-solid" __onClick={nowPayButtonClick} __disable={order.isSoldOut(optionGroupSelectInfo, optionList)}>?????? ????????????</Button>
          </div>
        </div>
      </ModalBottom>
      <ModalSignupNotice ref={modalSignupNoticeRef} />
    </>
  );
});
ModalBottomProductOptions.displayName = 'ModalBottomProductOptions';

export default ModalBottomProductOptions;