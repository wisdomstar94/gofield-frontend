import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import ProductRowItem3 from "../../../components/boxes/product-row-item3/product-row-item3.component";
import { IProductRowItem3 } from "../../../components/boxes/product-row-item3/product-row-item3.interface";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";
import useOrderDetailApi from "../../../hooks/use-apis/use-order-detail.api";
import useOrder from "../../../hooks/use-order/use-order.hook";
import { IOrder } from "../../../interfaces/order/order.interface";
import { day } from "../../../librarys/date-util/date-util.library";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 주문상세</title>
        <meta name="description" content="고필드 주문상세 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  const orderDetailApi = useOrderDetailApi();
  const router = useRouter();
  const order = useOrder();
  const [orderDetailInfo, setOrderDetailInfo] = useState<IOrder.OrderDetailInfo>();
  const [originType, setOriginType] = useState('');

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const orderNumber = router.query._orderNumber;
    if (typeof orderNumber !== 'string') {
      return;
    }

    getDetailInfo(orderNumber);
    
    const originType = router.query.originType;
    if (typeof originType === 'string') {
      setOriginType(originType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const getDetailInfo = useCallback((orderNumber: string) => {
    orderDetailApi.getInstance(orderNumber).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      setOrderDetailInfo(response.data.data);
    });
  }, [orderDetailApi]);

  const backButtonClick = useCallback(() => {
    router.push('/');
  }, [router]);

  const getShowButtonTypes = useCallback((shippingItem: IOrder.OrderShippingListItem, orderItem: IOrder.OrderShippingOrderItem) => {
    const buttons: IProductRowItem3.ShowButtonTypeItem[] = [
      { buttonType: 'delivery-check', buttonWidthType: 'full' }, 
    ];

    if (order.isExchangeOrReturnPosible(shippingItem)) {
      buttons.push({ buttonType: 'exchange-refund', buttonWidthType: 'full' });
    }

    if (order.isCancelPosible(shippingItem)) {
      buttons.push({ buttonType: 'order-delivery-cancel', buttonWidthType: 'full' });
    }

    if (!orderItem.isReview && order.isReviewWritePosible(shippingItem)) {
      buttons.push({ buttonType: 'review-write', buttonWidthType: 'full' });
    }

    return buttons;
  }, [order]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __backButtonClickCallback={originType === 'byOrder' ? backButtonClick : undefined}
          __layoutTypeB={{
            titleComponent: '주문상세',
            rightComponent: <></>,
          }} />
        <div className="mx-6 my-4 grid grid-cols-10">
          <div className="flex col-span-4 items-center">
            { 
              typeof orderDetailInfo?.createDate === 'string' ? 
              <span className="font-bold text-sm text-black-1 tracking-tighter">
                { day(new Date(orderDetailInfo.createDate)).format('YYYY-MM-DD') } 주문
              </span> : 
              <></>
            }
          </div>
          <div className="flex col-span-6 justify-end items-center">
            <span className="font-normal text-xs text-black-1 tracking-tighter">주문번호 : { orderDetailInfo?.orderNumber }</span>
          </div>
        </div>
        <div className="mx-6 mb-4">
          <span className="font-bold text-base text-black-a">
            결제 정보
          </span>
        </div>
        
        <div className="mx-6 mb-2 grid grid-cols-2">
          <div className="flex justify-start items-center">
            <span className="text-xs text-black-a font-bold tracking-tight">총 상품 금액</span>
          </div>
          <div className="flex justify-end items-center">
            <span className="text-xs text-black-a font-normal tracking-tight">{ getAddCommaNumberString({ numberValue: orderDetailInfo?.totalItem }) }원</span>
          </div>
        </div>

        <div className="mx-6 mb-2 grid grid-cols-2">
          <div className="flex justify-start items-center">
            <span className="text-xs text-black-a font-bold tracking-tight">할인 금액</span>
          </div>
          <div className="flex justify-end items-center">
            <span className="text-xs text-black-a font-normal tracking-tight">-{ getAddCommaNumberString({ numberValue: orderDetailInfo?.totalDiscount }) }원</span>
          </div>
        </div>

        <div className="mx-6 mb-4 grid grid-cols-2">
          <div className="flex justify-start items-center">
            <span className="text-xs text-black-a font-bold tracking-tight">배송비</span>
          </div>
          <div className="flex justify-end items-center">
            <span className="text-xs text-black-a font-normal tracking-tight">{ getAddCommaNumberString({ numberValue: orderDetailInfo?.totalDelivery }) }원</span>
          </div>
        </div>
        
        <div className="mx-6 mb-4 h-px bg-gray-a"></div>

        <div className="mx-6 mb-2 grid grid-cols-2">
          <div className="flex justify-start items-center">
            <span className="text-xs text-black-a font-bold tracking-tight">{ orderDetailInfo?.paymentCompany }</span>
          </div>
          <div className="flex justify-end items-center">
            {/* <span className="text-xs text-black-a font-normal tracking-tight">{ getAddCommaNumberString({ numberValue: orderDetailInfo?.totalAmount }) }원</span> */}
          </div>
        </div>

        <div className="mx-6 mb-4 grid grid-cols-2">
          <div className="flex justify-start items-center">
            <span className="text-xs text-black-a font-bold tracking-tight">총 결제금액</span>
          </div>
          <div className="flex justify-end items-center">
            <span className="text-xs text-black-a font-normal tracking-tight">{ getAddCommaNumberString({ numberValue: orderDetailInfo?.totalAmount }) }원</span>
          </div>
        </div>

        <div className="block mx-6 mb-1">
          <span className="text-sm font-bold text-black-a">{ orderDetailInfo?.name }</span>
        </div>
        <div className="block mx-6 mb-1">
          <span className="text-sm font-normal text-gray-b tracking-tighter">({ orderDetailInfo?.zipCode }) { orderDetailInfo?.address }, { orderDetailInfo?.addressExtra }</span>
        </div>
        <div className="block mx-6 mb-2">
          <span className="text-sm font-normal text-gray-b tracking-tighter">{ orderDetailInfo?.tel }</span>
        </div>
        <div className="block mx-6 mb-4">
          <span className="text-sm font-normal text-gray-b tracking-tighter">배송요청사항 : { orderDetailInfo?.shippingComment }</span>
        </div>

        <div className="mx-6 mb-4 h-px bg-gray-a"></div>

        {
          orderDetailInfo?.orderShippingList.map((shippingItem) => {
            return shippingItem.orderItems.map((orderItem) => {
              return (
                <ProductRowItem3 
                  key={orderItem.id} 
                  __orderItemNumber={orderItem.orderItemNumber}
                  __orderNumber={orderDetailInfo.orderNumber}
                  __orderItemId={orderItem.id}
                  __imageUrl={orderItem.thumbnail}
                  __productName={orderItem.name}
                  __price={orderItem.price}
                  __qty={orderItem.qty}
                  // __deliveryPrice={shippingItem.deliveryPrice}
                  __orderShippingStatus={shippingItem.status}
                  __orderItemStatus={orderItem.status}
                  __optionNames={orderItem.optionName}
                  __carrierId={shippingItem.carrier}
                  __trackId={shippingItem.trackingNumber}
                  __showButtonTypes={getShowButtonTypes(shippingItem, orderItem)}
                  // __buttonLayoutType={'none'}
                />
              )
            })
          })
        }
        
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;