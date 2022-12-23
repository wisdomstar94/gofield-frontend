import { useCallback } from "react";
import { IOrder } from "../../interfaces/order/order.interface";

const useProductOrder = () => {
  const getTotalPriceInfo = useCallback((list: IOrder.PriceInfoItem[]) => {
    let totalPrice = 0;
    let totalCharge = 0;
    let totalPaySubmitPrice = 0;

    list.forEach((item) => {
      totalPrice += item.price * item.qty;

      // 배송료 계산
      switch (item.delivery) {
        case 'FREE': {

        } break;
        case 'PAY': {
          totalCharge += item.deliveryPrice;
        } break;
        case 'CONDITION': {
          if (item.qty * item.price < item.condition) {
            totalCharge += item.charge;
          }
        } break;
      }
    });

    totalPaySubmitPrice = totalPrice + totalCharge;

    return {
      totalPrice,
      totalCharge,
      totalPaySubmitPrice,
    };
  }, []);

  return {
    getTotalPriceInfo,
  };
};

export default useProductOrder;
