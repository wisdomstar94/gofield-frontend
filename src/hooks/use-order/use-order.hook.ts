import { useCallback } from "react";
import { IOrder } from "../../interfaces/order/order.interface";

const useOrder = () => {
  const isCancelPosible = useCallback((shippingItem: IOrder.OrderShippingListItem) => {
    const cancelPosibleStatusSet = new Set<IOrder.OrderShippingStatus>([
      'ORDER_SHIPPING_CHECK',
      'ORDER_SHIPPING_CHECK_COMPLETE',
      'ORDER_SHIPPING_READY',
      'ORDER_SHIPPING_DELIVERY',
    ]);
    return cancelPosibleStatusSet.has(shippingItem.status);
  }, []);

  return {
    isCancelPosible,
  };
};

export default useOrder;