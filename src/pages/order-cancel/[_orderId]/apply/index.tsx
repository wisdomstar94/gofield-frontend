import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../../../components/auth/access-token-check/access-token-check.component";
import BasketFormBox from "../../../../components/boxes/basket-form-box/basket-form-box.component";
import BottomFixedOrRelativeBox from "../../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import CustomSuspense from "../../../../components/boxes/custom-suspense/custom-suspense.component";
import ProductRowItem3 from "../../../../components/boxes/product-row-item3/product-row-item3.component";
import SearchFormBox from "../../../../components/boxes/search-form-box/search-form-box.component";
import Button from "../../../../components/forms/button/button.component";
import Checkbox from "../../../../components/forms/checkbox/checkbox.component";
import { ICheckbox } from "../../../../components/forms/checkbox/checkbox.interface";
import Topbar from "../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../components/layouts/window-size-container/window-size-container.component";
import ModalSearch from "../../../../components/modals/modal-search/modal-search.component";
import useOrderCancelApi from "../../../../hooks/use-apis/use-order-cancel.api";
import useOrderItemCancelDetailApi from "../../../../hooks/use-apis/use-order-item-cancel-detail.api";
import useModalAlert from "../../../../hooks/use-modals/use-modal-alert.modal";
import useModalConfirm from "../../../../hooks/use-modals/use-modal-confirm.modal";
import useCancelReasonListQuery from "../../../../hooks/use-queries/use-cancel-reason-list.query";
import useEnumOrderCancelReasonListQuery from "../../../../hooks/use-queries/use-enum-order-cancel-reason-list.query";
import { IOrder } from "../../../../interfaces/order/order.interface";
import { getAddCommaNumberString } from "../../../../librarys/string-util/string-util.library";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 주문취소 (신청)</title>
        <meta name="description" content="고필드 주문취소 신청 페이지입니다." />
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
  const modalAlert = useModalAlert();
  const modalConfirm = useModalConfirm();
  const [orderItemId, setOrderItemId] = useState<string>();
  const [cancelReason, setCancelReason] = useState<IOrder.OrderCancelReasonEnum>();
  const enumOrderCancelReasonListQuery = useEnumOrderCancelReasonListQuery();
  const orderItemCancelDetailApi = useOrderItemCancelDetailApi();
  const orderCancelApi = useOrderCancelApi();
  const isDetailInfoGettingRef = useRef(false);
  const isCancelingRef = useRef(false);
  const [cancelDetailInfo, setCancelDetailInfo] = useState<IOrder.OrderItemCancelDetailInfo>();
  const [isValid, setIsValid] = useState(false);

  // const cancelReasonCheckboxChange = useCallback((info: ICheckbox.CheckboxChangeInfo) => {

  // }, []);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const orderId = router.query._orderId;
    if (typeof orderId !== 'string') {
      return;
    }
    setOrderItemId(orderId);

    const cancelReason = router.query.cancelReason as IOrder.OrderCancelReasonEnum;
    if (typeof cancelReason !== 'string') {
      return;
    }
    setCancelReason(cancelReason);
    
    getDetailInfo(orderId, cancelReason);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const getDetailInfo = useCallback((id: string, reason: IOrder.OrderCancelReasonEnum) => {
    if (isDetailInfoGettingRef.current) {
      return;
    }

    if (id === undefined) {
      return;
    }

    isDetailInfoGettingRef.current = true;
    orderItemCancelDetailApi.getInstance(id, reason).then((response) => {
      if (response.data.status !== true) {
        setIsValid(false);
        router.push('/');
        return;
      }

      setIsValid(true);
      setCancelDetailInfo(response.data.data);
    }).finally(() => {
      isDetailInfoGettingRef.current = false;
    }).catch((error) => {
      setIsValid(false);
      router.push('/');
    });
  }, [orderItemCancelDetailApi, router]);

  const getInstallmentText = useCallback(() => {
    if (cancelDetailInfo === undefined) {
      return ``;
    }

    if (cancelDetailInfo.installmentPlanMonth > 2) {
      return `${cancelDetailInfo.installmentPlanMonth}개월 할부`;
    }

    return `일시불`;
  }, [cancelDetailInfo]);

  const startCancel = useCallback(() => {
    if (isCancelingRef.current) {
      return;
    }

    if (orderItemId === undefined) {
      return;
    }

    if (cancelReason === undefined) {
      return;
    }

    isCancelingRef.current = true;
    orderCancelApi.getInstance(orderItemId, cancelReason).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '주문 취소가 실패하였습니다.' });
        return;
      }

      modalAlert.show({ title: '안내', content: '주문 취소 신청이 완료되었습니다.' });
      router.push('/order/history');
    }).finally(() =>{
      isCancelingRef.current = false;
    });
  }, [cancelReason, modalAlert, orderCancelApi, orderItemId, router]);

  const prevButtonClick = useCallback(() => {
    history.back();
  }, []);

  const applyButtonClick = useCallback(() => {
    modalConfirm.show({
      title: '안내',
      content: `취소 신청하시겠습니까?`,
      positiveCallback(hide, modalItem) {
        startCancel();
        hide(modalItem);
      },
    })
  }, [modalConfirm, startCancel]);

  return (
    <CustomSuspense __isShow={orderItemId !== undefined && cancelReason !== undefined && isValid}>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeA={{
            titleComponent: <>주문취소</>
          }} />
        
        <div className="block mx-6 mt-4">
          <div className="block font-bold text-base">
            선택한 상품 1건
          </div>
        </div>
        <ProductRowItem3 
          __isTopRowShow={false}
          __imageUrl={cancelDetailInfo?.thumbnail}
          __deliveryPrice={cancelDetailInfo?.deliveryPrice}
          __productName={cancelDetailInfo?.name}
          __price={cancelDetailInfo?.itemPrice}
          __qty={cancelDetailInfo?.qty} />

        <div className="block mx-6 mt-4">
          <div className="font-bold text-sm text-black-a mb-1">
            취소 사유
          </div>
          <div className="font-normal text-sm text-gray-b">
            { enumOrderCancelReasonListQuery.data?.find(x => x.value === cancelReason)?.text }
          </div>
        </div>

        <div className="block h-px bg-gray-a mx-6 my-4"></div>

        <div className="font-bold text-base text-black-a mx-6 mb-4">
          환불정보
        </div>
        
        <div className="w-full grid box-sizing grid-cols-2 px-6 mb-2">
          <div className="flex items-center justify-start">
            <span className="font-bold text-xs text-black-a">상품 금액</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-normal text-xs text-black-a">{ getAddCommaNumberString({ numberValue: cancelDetailInfo?.itemPrice }) }원</span>
          </div>
        </div>

        <div className="w-full grid box-sizing grid-cols-2 px-6 mb-2">
          <div className="flex items-center justify-start">
            <span className="font-bold text-xs text-black-a">할인 금액</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-normal text-xs text-black-a">-{ getAddCommaNumberString({ numberValue: cancelDetailInfo?.discountPrice }) }원</span>
          </div>
        </div>

        <div className="w-full grid box-sizing grid-cols-2 px-6 mb-2">
          <div className="flex items-center justify-start">
            <span className="font-bold text-xs text-black-a">배송비</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-normal text-xs text-black-a">{ getAddCommaNumberString({ numberValue: cancelDetailInfo?.deliveryPrice }) }원</span>
          </div>
        </div>

        <div className="w-full grid box-sizing grid-cols-2 px-6">
          <div className="flex items-center justify-start">
            <span className="font-bold text-xs text-black-a">반품비</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-normal text-xs text-black-a">{ getAddCommaNumberString({ numberValue: cancelDetailInfo?.refundPrice }) }원</span>
          </div>
        </div>
        
        <div className="block h-px bg-gray-a mx-6 my-4"></div>

        <div className="w-full grid box-sizing grid-cols-2 px-6 mb-2">
          <div className="flex items-center justify-start">
            <span className="font-bold text-sm text-black-a">환불 완료</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-bold text-sm text-orange-a">{ getAddCommaNumberString({ numberValue: cancelDetailInfo?.totalAmount }) }원</span>
          </div>
        </div>

        <div className="w-full grid box-sizing grid-cols-5 px-6">
          <div className="flex items-center justify-start col-span-2">
            <span className="font-bold text-xs text-black-a">환불 수단</span>
          </div>
          <div className="flex items-center justify-end col-span-3">
            <span className="font-normal text-xs text-black-a">{ cancelDetailInfo?.paymentCompany }/{ getInstallmentText() }</span>
          </div>
        </div>

        <BottomFixedOrRelativeBox __heightToRelative={100}>
          <div className="w-full px-6 pb-6 grid grid-cols-2 gap-2 mt-4">
            <div>
              <Button __buttonStyle="white-solid-gray-stroke" __onClick={prevButtonClick}>이전단계</Button>
            </div>
            <div>
              <Button __buttonStyle="black-solid" __onClick={applyButtonClick}>신청하기</Button>
            </div>
          </div>
        </BottomFixedOrRelativeBox>
      </WindowSizeContainer>
    </CustomSuspense>
  );
};

export default ProductNewPage;