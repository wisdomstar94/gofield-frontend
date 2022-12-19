import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useOrder from "../../../hooks/use-order/use-order.hook";
import { IOrder } from "../../../interfaces/order/order.interface";
import { day } from "../../../librarys/date-util/date-util.library";
import ProductRowItem3 from "../product-row-item3/product-row-item3.component";
import { IProductRowItem3 } from "../product-row-item3/product-row-item3.interface";
import styles from "./order-row-item.component.module.scss";
import { IOrderRowItem } from "./order-row-item.interface";

const OrderRowItem = (props: IOrderRowItem.Props) => {
  const router = useRouter();
  const order = useOrder();
  const [orderListItem, setOrderListItem] = useState(props.__orderListItem);
  useEffect(() => { setOrderListItem(props.__orderListItem); }, [props.__orderListItem]);

  const orderDetailViewButtonClick = useCallback(() => {
    if (orderListItem === undefined) {
      return;
    }

    router.push('/order/' + orderListItem.orderNumber);
  }, [orderListItem, router]);

  const getShowButtonTypes = useCallback((shippingItem: IOrder.OrderShippingListItem, orderItem: IOrder.OrderShippingOrderItem) => {
    const buttons: IProductRowItem3.ShowButtonTypeItem[] = [
      { buttonType: 'delivery-check', buttonWidthType: 'half' }, 
      { buttonType: 'exchange-refund', buttonWidthType: 'half' },
    ];

    if (!orderItem.isReview) {
      buttons.push({ buttonType: 'review-write', buttonWidthType: 'full' });
    }

    if (order.isCancelPosible(shippingItem)) {
      buttons.push({ buttonType: 'order-delivery-cancel', buttonWidthType: 'full' });
    }

    return buttons;
  }, [order]);

  return (
    <div className="w-full block">
      <div className="block mt-4 mx-6 grid grid-cols-2">
        <div className="text-sm font-bold text-black-a">
          {/* 2022.02.01 */}
          { orderListItem !== undefined ? day(new Date(orderListItem?.createDate)).format('YYYY-MM-DD') : '' }
        </div>
        <div className="flex text-sm font-bold text-black-a justify-end cursor-pointer" onClick={orderDetailViewButtonClick}>
          주문 상세보기 {'>'}
        </div>
      </div>
      {
        orderListItem?.orderShippingList.map((shippingItem) => {
          return shippingItem.orderItems.map((orderItem) => {
            return (
              <ProductRowItem3 
                key={orderItem.id} 
                __orderNumber={orderListItem.orderNumber}
                __orderItemId={orderItem.id}
                __imageUrl={orderItem.thumbnail}
                __productName={orderItem.name}
                __price={orderItem.price}
                __qty={orderItem.qty}
                __orderShippingStatus={shippingItem.status}
                __orderItemStatus={orderItem.status}
                __optionNames={orderItem.optionName}
                __carrierId={shippingItem.carrier}
                __trackId={shippingItem.trackingNumber}
                __showButtonTypes={getShowButtonTypes(shippingItem, orderItem)}
              />
            )
          })
        })
      }
    </div>
  );
};

export default OrderRowItem;