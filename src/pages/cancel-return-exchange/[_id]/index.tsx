import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import ProductRowItem3 from "../../../components/boxes/product-row-item3/product-row-item3.component";
import StepItems from "../../../components/forms/step-items/step-items.component";
import { IStepItems } from "../../../components/forms/step-items/step-items.interface";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";
import useOrderCancelExchangeReturnDetailApi from "../../../hooks/use-apis/use-order-cancel-exchange-return-detail.api";
import useOrder from "../../../hooks/use-order/use-order.hook";
import useEnumOrderCancelExchangeReturnStatusListQuery from "../../../hooks/use-queries/use-enum-order-cancel-exchange-return-status-list.query";
import useEnumOrderCancelExchangeReturnTypeListQuery from "../../../hooks/use-queries/use-enum-order-cancel-exchange-return-type-list.query";
import { IExchangeReturn } from "../../../interfaces/exchange-return/exchange-return.interface";
import { day } from "../../../librarys/date-util/date-util.library";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";

const CancelReturnExchangePage = () => {
  return (
    <>
      <Head>
        <title>고필드 취소/교환/반품 상세정보</title>
        <meta name="description" content="고필드 취소/교환/반품 상세정보 페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  const router = useRouter();
  const order = useOrder();
  const isGettingDetailRef = useRef(false);
  const orderCancelExchangeReturnDetailApi = useOrderCancelExchangeReturnDetailApi();
  const [targetId, setTargetId] = useState('');
  const [detailInfo, setDetailInfo] = useState<IExchangeReturn.OrderCancelExchangeReturnDetailInfo>();
  const enumOrderCancelExchangeReturnTypeListQuery = useEnumOrderCancelExchangeReturnTypeListQuery();
  const enumOrderCancelExchangeReturnStatusListQuery = useEnumOrderCancelExchangeReturnStatusListQuery();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    let targetId = '';
    if (typeof router.query._id === 'string') {
      targetId = router.query._id;
      setTargetId(targetId);
    }

    getDetailInfo(targetId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const getDetailInfo = useCallback((targetId: string) => {
    if (targetId === '') return;
    if (isGettingDetailRef.current) return;

    isGettingDetailRef.current = true;
    orderCancelExchangeReturnDetailApi.getInstance(targetId).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      setDetailInfo(response.data.data);
    }).finally(() => {
      isGettingDetailRef.current = false;
    });
  }, [orderCancelExchangeReturnDetailApi]);

  const getTypeText = useCallback(() => {
    return enumOrderCancelExchangeReturnTypeListQuery.data?.find(x => x.value === detailInfo?.type)?.text;
  }, [detailInfo?.type, enumOrderCancelExchangeReturnTypeListQuery.data]);

  const getStepItems = useCallback(() => {
    const stepItems: IStepItems.StepItem[] = [];

    switch (detailInfo?.type) {
      case 'CANCEL': {
        stepItems.push({
          textComponent: <>취소<br />접수</>,
          state: detailInfo?.status === 'ORDER_CANCEL_REQUEST' ? 'current' : 'pass',
        });
        if (detailInfo.status === 'ORDER_CANCEL_DENIED') {
          stepItems.push({
            textComponent: <>취소<br />거절</>,
            state: 'pass',
          });
        } else {
          stepItems.push({
            textComponent: <>환불<br />진행중</>,
            state: detailInfo?.status === 'ORDER_CANCEL_PROCESS' ? 'current' :
                  detailInfo?.status === 'ORDER_CANCEL_REQUEST' ? 'yet' : 
                  'pass',
          });
          stepItems.push({
            textComponent: <>환불<br />완료</>,
            state: detailInfo?.status === 'ORDER_CANCEL_COMPLETE' ? 'current' : 'yet',
          });
        }
      } break;
      case 'CHANGE': {
        stepItems.push({
          textComponent: <>교환<br />접수</>,
          state: detailInfo?.status === 'ORDER_CHANGE_REQUEST' ? 'current' : 'pass',
        });
        if (detailInfo.status === 'ORDER_CHANGE_DENIED') {
          stepItems.push({
            textComponent: <>교환<br />거절</>,
            state: 'pass',
          });
        } else {
          stepItems.push({
            textComponent: <>수거중</>,
            state: new Set(['ORDER_CHANGE_COLLECT_PROCESS']).has(detailInfo?.status) ? 'current' :
                  new Set(['ORDER_CHANGE_REQUEST']).has(detailInfo?.status) ? 'yet' : 
                  'pass',
          });
          stepItems.push({
            textComponent: <>수거<br />완료</>,
            state: new Set(['ORDER_CHANGE_COLLECT_PROCESS_COMPLETE']).has(detailInfo?.status) ? 'current' :
                  new Set(['ORDER_CHANGE_REQUEST', 'ORDER_CHANGE_COLLECT_PROCESS']).has(detailInfo?.status) ? 'yet' : 
                  'pass',
          });
          stepItems.push({
            textComponent: <>재배송</>,
            state: new Set(['ORDER_CHANGE_REDELIVERY']).has(detailInfo?.status) ? 'current' :
                  new Set(['ORDER_CHANGE_REQUEST', 'ORDER_CHANGE_COLLECT_PROCESS', 'ORDER_CHANGE_COLLECT_PROCESS_COMPLETE']).has(detailInfo?.status) ? 'yet' : 
                  'pass',
          });
          stepItems.push({
            textComponent: <>교환<br />완료</>,
            state: new Set(['ORDER_CHANGE_COMPLETE']).has(detailInfo?.status) ? 'current' :
                  new Set(['ORDER_CHANGE_REQUEST', 'ORDER_CHANGE_COLLECT_PROCESS', 'ORDER_CHANGE_COLLECT_PROCESS_COMPLETE', 'ORDER_CHANGE_REDELIVERY']).has(detailInfo?.status) ? 'yet' : 
                  'pass',
          });
        }
      } break;
      case 'RETURN': {
        stepItems.push({
          textComponent: <>반품<br />접수</>,
          state: detailInfo?.status === 'ORDER_RETURN_REQUEST' ? 'current' : 'pass',
        });
        if (detailInfo.status === 'ORDER_RETURN_DENIED') {
          stepItems.push({
            textComponent: <>반품<br />거절</>,
            state: 'pass',
          });
        } else {
          stepItems.push({
            textComponent: <>수거중</>,
            state: new Set(['ORDER_RETURN_COLLECT_PROCESS']).has(detailInfo?.status) ? 'current' :
                   new Set(['ORDER_RETURN_REQUEST']).has(detailInfo?.status) ? 'yet' : 
                   'pass',
          });
          stepItems.push({
            textComponent: <>수거<br />완료</>,
            state: new Set(['ORDER_RETURN_COLLECT_PROCESS_COMPLETE']).has(detailInfo?.status) ? 'current' :
                   new Set(['ORDER_RETURN_REQUEST', 'ORDER_RETURN_COLLECT_PROCESS']).has(detailInfo?.status) ? 'yet' : 
                   'pass',
          });
          stepItems.push({
            textComponent: <>반품<br />완료</>,
            state: new Set(['ORDER_RETURN_COMPLETE']).has(detailInfo?.status) ? 'current' :
                   new Set(['ORDER_RETURN_REQUEST', 'ORDER_RETURN_COLLECT_PROCESS', 'ORDER_RETURN_COLLECT_PROCESS_COMPLETE']).has(detailInfo?.status) ? 'yet' : 
                   'pass',
          });
        }
      } break;
    }

    return stepItems;
  }, [detailInfo?.status, detailInfo?.type]);

  const orderDetailViewButtonClick = useCallback(() => {
    router.push('/order/' + detailInfo?.orderNumber);
  }, [detailInfo?.orderNumber, router]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeA={{
            titleComponent: <>취소/반품/교환 상세정보</>,
          }} />
        <div className="w-full flex justify-center box-sizing px-6 py-6">
          <StepItems
            __stepItems={getStepItems()} />
        </div>

        <div className="block px-6 box-sizing">
          <div className="w-full grid grid-cols-2 mb-1.5">
            <div className="flex items-center">
              <span className="text-base font-bold text-black-a tracking-tighter">
                { day(new Date(detailInfo?.createDate ?? '')).format('YYYY-MM-DD HH:mm') }
                &nbsp;&nbsp;{ getTypeText() }
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-sm font-bold text-blue-a tracking-tighter underline cursor-pointer" onClick={orderDetailViewButtonClick}>
                주문 상세보기
              </span>
            </div>
          </div>
          <div className="w-full flex">
            <span className="text-xs text-black-a tracking-tight">접수번호</span>
            <span>&nbsp;</span>
            <span className="text-xs text-blue-a tracking-tight">{ detailInfo?.cancelNumber }</span>
          </div>
        </div>

        {
          detailInfo?.cancelItems.map((item) => {
            return (
              <ProductRowItem3 
                key={item.id}
                __imageUrl={item.thumbnail}
                __productName={item.name}
                __optionNames={item.optionName ?? undefined}
                __qty={item.qty}
                __price={item.price}
                __isTopRowShow={false} />
            );
          })
        }

        <div className="block px-6 box-sizing mt-4">
          <div className="w-full flex mb-1">
            <span className="text-sm font-bold text-black-a">{ getTypeText() } 사유</span>
          </div>
          <div className="w-full flex">
            <span className="text-sm font-normal text-gray-b">{ detailInfo?.content }</span>
          </div>
        </div>

        <div className="block mx-6 my-4 h-px bg-gray-a"></div>

        <div className="block mx-6 my-4">
          <span className="text-base font-bold text-black-a tracking-tight">환불정보</span>
        </div>

        <div className="w-full grid grid-cols-2 box-sizing mb-2 px-6">
          <div className="flex items-center">
            <span className="text-xs text-black-a font-bold tracking-tighter">상품 금액</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-xs text-black-a font-normal tracking-tighter">{ getAddCommaNumberString({ numberValue: detailInfo?.totalItem }) }원</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 box-sizing mb-2 px-6">
          <div className="flex items-center">
            <span className="text-xs text-black-a font-bold tracking-tighter">할인 금액</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-xs text-black-a font-normal tracking-tighter">-{ getAddCommaNumberString({ numberValue: detailInfo?.totalDiscount }) }원</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 box-sizing mb-2 px-6">
          <div className="flex items-center">
            <span className="text-xs text-black-a font-bold tracking-tighter">배송비</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-xs text-black-a font-normal tracking-tighter">{ getAddCommaNumberString({ numberValue: detailInfo?.totalDelivery }) }원</span>
          </div>
        </div>

        {
          detailInfo?.type !== 'CANCEL' ? 
          <div className="w-full grid grid-cols-2 box-sizing mb-2 px-6">
            <div className="flex items-center">
              <span className="text-xs text-black-a font-bold tracking-tighter">{ getTypeText() }비</span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-xs text-black-a font-normal tracking-tighter">{ getAddCommaNumberString({ numberValue: detailInfo?.totalRefund }) }원</span>
            </div>
          </div> : 
          <></>
        }
          
        <div className="block mx-6 my-4 h-px bg-gray-a"></div>

        <div className="w-full grid grid-cols-10 box-sizing px-6 mb-2">
          <div className="col-span-3 flex items-center">
            <span className="font-bold text-sm text-black-a tracking-tighter">환불 금액</span>
          </div>
          <div className="col-span-7 flex items-center justify-end">
            <span className="font-bold text-sm text-orange-a tracking-tighter">{ getAddCommaNumberString({ numberValue: detailInfo?.totalAmount }) }원</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-10 box-sizing px-6 mb-2">
          <div className="col-span-3 flex items-center">
            <span className="font-bold text-xs text-black-a tracking-tighter">환불 수단</span>
          </div>
          <div className="col-span-7 flex items-center justify-end">
            <span className="font-normal text-xs text-black-a tracking-tighter">
              { detailInfo?.paymentCompany }/{ order.getInstallmentText(detailInfo?.installlment) } { getAddCommaNumberString({ numberValue: detailInfo?.totalItem }) }원
            </span>
          </div>
        </div>
      </WindowSizeContainer>
    </>
  );
};

export default CancelReturnExchangePage;