import { useCallback } from "react";
import { IProductRowItem3 } from "../../components/boxes/product-row-item3/product-row-item3.interface";
import { ICommon } from "../../interfaces/common/common.interface";
import { IItem } from "../../interfaces/item/item.interface";
import { IOrder } from "../../interfaces/order/order.interface";

const useOrder = () => {
  const isCancelPosible = useCallback((shippingItem: IOrder.OrderShippingListItem) => {
    const posibleStatusSet = new Set<IOrder.OrderShippingStatus>([
      'ORDER_SHIPPING_CHECK',
      'ORDER_SHIPPING_CHECK_COMPLETE',
      'ORDER_SHIPPING_READY',
    ]);
    return posibleStatusSet.has(shippingItem.status);
  }, []);

  const isDeliveryCheckPosible = useCallback((shippingItem: IOrder.OrderShippingListItem) => {
    const posibleStatusSet = new Set<IOrder.OrderShippingStatus>([
      'ORDER_SHIPPING_DELIVERY',
      'ORDER_SHIPPING_DELIVERY_COMPLETE',
      'ORDER_SHIPPING_COMPLETE',
    ]);
    return posibleStatusSet.has(shippingItem.status);
  }, []);

  const isExchangeOrReturnPosible = useCallback((shippingItem: IOrder.OrderShippingListItem) => {
    const posibleStatusSet = new Set<IOrder.OrderShippingStatus>([
      'ORDER_SHIPPING_DELIVERY',
      'ORDER_SHIPPING_DELIVERY_COMPLETE',
    ]);
    return posibleStatusSet.has(shippingItem.status);
  }, []);

  const isReviewWritePosible = useCallback((shippingItem: IOrder.OrderShippingListItem) => {
    const posibleStatusSet = new Set<IOrder.OrderShippingStatus>([
      'ORDER_SHIPPING_DELIVERY',
      'ORDER_SHIPPING_DELIVERY_COMPLETE',
      'ORDER_SHIPPING_COMPLETE',
    ]);
    return posibleStatusSet.has(shippingItem.status);
  }, []);

  const getInstallmentText = useCallback((installment: number | undefined) => {
    if (installment === undefined) {
      return ``;
    }

    if (installment > 2) {
      return `${installment}개월 할부`;
    }

    return `일시불`;
  }, []);

  const isOptionExist = useCallback((optionName: null | undefined | string[]) => {
    if (optionName === null) return false;
    if (optionName === undefined) return false;
    if (!Array.isArray(optionName)) return false;
    if (optionName.length === 0) return false;
    return true;
  }, []);

  const getTargetOptionItem = useCallback((optionGroupSelectInfo: Map<string, ICommon.ValueItem | undefined>, optionList: IItem.OptionItem[]): IItem.OptionItem | undefined => {
    console.log('@optionGroupSelectInfo', optionGroupSelectInfo);
    console.log('@optionList', optionList);
    const target = optionList.find(optionItem => {
      // optionList.every(y => optionGroupSelectInfo.has(y.))
      return optionItem.name.every(optionName => {
        return new Set(Array.from(optionGroupSelectInfo.values()).map(k => k?.value)).has(optionName);
      });
    });
    console.log('@target', target);
    return target;
  }, []);

  const isSoldOut = useCallback((optionGroupSelectInfo: Map<string, ICommon.ValueItem | undefined>, optionList: IItem.OptionItem[]): boolean => {
    const target = getTargetOptionItem(optionGroupSelectInfo, optionList);
    if (target === undefined) {
      return false;
    }
    
    return target.status === 'SOLD_OUT';
  }, [getTargetOptionItem]);

  const isRequiredOptionAllSelected = useCallback((optionGroupSelectInfo: Map<string, ICommon.ValueItem | undefined>, optionGroupList: IItem.OptionGroupItem[]) => {
    for (const item of optionGroupList) {
      if (optionGroupSelectInfo.get(item.groupTitle) === undefined && item.isEssential === true) {
        return false;
      }
    }
    return true;
  }, []);

  const getShowButtonTypes = useCallback((shippingItem: IOrder.OrderShippingListItem, orderItem: IOrder.OrderShippingOrderItem) => {
    const buttons: IProductRowItem3.ShowButtonTypeItem[] = [];

    if (isDeliveryCheckPosible(shippingItem)) {
      buttons.push({ buttonType: 'delivery-check', buttonWidthType: 'full' }, );
    }

    if (isExchangeOrReturnPosible(shippingItem)) {
      buttons.push({ buttonType: 'exchange-refund', buttonWidthType: 'full' });
    }

    if (isCancelPosible(shippingItem)) {
      buttons.push({ buttonType: 'order-delivery-cancel', buttonWidthType: 'full' });
    }

    if (!orderItem.isReview && isReviewWritePosible(shippingItem)) {
      buttons.push({ buttonType: 'review-write', buttonWidthType: 'full' });
    }

    return buttons;
  }, [isCancelPosible, isDeliveryCheckPosible, isExchangeOrReturnPosible, isReviewWritePosible]);

  return {
    isCancelPosible,
    isExchangeOrReturnPosible,
    isReviewWritePosible,
    getInstallmentText,
    isOptionExist,
    getTargetOptionItem,
    isSoldOut,
    isRequiredOptionAllSelected,
    getShowButtonTypes,
  };
};

export default useOrder;