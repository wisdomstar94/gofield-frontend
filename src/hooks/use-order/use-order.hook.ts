import { useCallback } from "react";
import { IOrder } from "../../interfaces/order/order.interface";

const useOrder = () => {
  const isCancelPosible = useCallback((shippingItem: IOrder.OrderShippingListItem) => {
    const posibleStatusSet = new Set<IOrder.OrderShippingStatus>([
      'ORDER_SHIPPING_CHECK',
      'ORDER_SHIPPING_CHECK_COMPLETE',
      'ORDER_SHIPPING_READY',
      'ORDER_SHIPPING_DELIVERY',
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

  return {
    isCancelPosible,
    isExchangeOrReturnPosible,
    isReviewWritePosible,
    getInstallmentText,
    isOptionExist,
  };
};

export default useOrder;