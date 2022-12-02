import { useCallback } from "react";
import { IOrder } from "../../interfaces/order/order.interface";

const useProductOrder = () => {
  const getTotalPriceInfo = useCallback((list: IOrder.PriceInfoItem[]) => {
    let totalPrice = 0;
    let totalCharge = 0;
    let totalPaySubmitPrice = 0;

    list.forEach((item) => {
      totalPrice += item.price * item.qty;

      if (item.qty * item.price < item.condition) {
        totalCharge += item.charge;
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
