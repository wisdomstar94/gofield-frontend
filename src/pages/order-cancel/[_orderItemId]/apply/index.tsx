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
import useOrderItemDetailApi from "../../../../hooks/use-apis/use-order-item-detail.api";
import useModalAlert from "../../../../hooks/use-modals/use-modal-alert.modal";
import useModalConfirm from "../../../../hooks/use-modals/use-modal-confirm.modal";
import useOrder from "../../../../hooks/use-order/use-order.hook";
import useCancelReasonListQuery from "../../../../hooks/use-queries/use-cancel-reason-list.query";
import useEnumOrderCancelReasonListQuery from "../../../../hooks/use-queries/use-enum-order-cancel-reason-list.query";
import { IOrder } from "../../../../interfaces/order/order.interface";
import { getAddCommaNumberString } from "../../../../librarys/string-util/string-util.library";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>????????? - ???????????? (??????)</title>
        <meta name="description" content="????????? ???????????? ?????? ??????????????????." />
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
  const orderItemDetailApi = useOrderItemDetailApi();
  const orderCancelApi = useOrderCancelApi();
  const isDetailInfoGettingRef = useRef(false);
  const isCancelingRef = useRef(false);
  const [cancelDetailInfo, setCancelDetailInfo] = useState<IOrder.OrderItemDetailInfo>();
  const [isValid, setIsValid] = useState(false);
  const order = useOrder();
    
  // const cancelReasonCheckboxChange = useCallback((info: ICheckbox.CheckboxChangeInfo) => {

  // }, []);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const orderItemId = router.query._orderItemId;
    if (typeof orderItemId !== 'string') {
      return;
    }
    setOrderItemId(orderItemId);

    const cancelReason = router.query.cancelReason as IOrder.OrderCancelReasonEnum;
    if (typeof cancelReason !== 'string') {
      return;
    }
    setCancelReason(cancelReason);
    
    getDetailInfo(orderItemId, cancelReason);
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
    orderItemDetailApi.getInstance(id).then((response) => {
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
  }, [orderItemDetailApi, router]);

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
        modalAlert.show({ title: '??????', content: '?????? ????????? ?????????????????????.' });
        return;
      }

      modalAlert.show({ title: '??????', content: '?????? ?????? ????????? ?????????????????????.' });
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
      title: '??????',
      content: `?????? ?????????????????????????`,
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
            titleComponent: <>????????????</>
          }} />
        
        <div className="block mx-6 mt-4">
          <div className="block font-bold text-base">
            ????????? ?????? 1???
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
            ?????? ??????
          </div>
          <div className="font-normal text-sm text-gray-b">
            { enumOrderCancelReasonListQuery.data?.find(x => x.value === cancelReason)?.text }
          </div>
        </div>

        <div className="block h-px bg-gray-a mx-6 my-4"></div>

        <div className="font-bold text-base text-black-a mx-6 mb-4">
          ????????????
        </div>
        
        <div className="w-full grid box-sizing grid-cols-2 px-6 mb-2">
          <div className="flex items-center justify-start">
            <span className="font-bold text-xs text-black-a">?????? ??????</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-normal text-xs text-black-a">{ getAddCommaNumberString({ numberValue: cancelDetailInfo?.itemPrice }) }???</span>
          </div>
        </div>

        <div className="w-full grid box-sizing grid-cols-2 px-6 mb-2">
          <div className="flex items-center justify-start">
            <span className="font-bold text-xs text-black-a">?????? ??????</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-normal text-xs text-black-a">-{ getAddCommaNumberString({ numberValue: cancelDetailInfo?.discountPrice }) }???</span>
          </div>
        </div>

        <div className="w-full grid box-sizing grid-cols-2 px-6 mb-2">
          <div className="flex items-center justify-start">
            <span className="font-bold text-xs text-black-a">?????????</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-normal text-xs text-black-a">{ getAddCommaNumberString({ numberValue: cancelDetailInfo?.deliveryPrice }) }???</span>
          </div>
        </div>

        <div className="w-full grid box-sizing grid-cols-2 px-6">
          <div className="flex items-center justify-start">
            <span className="font-bold text-xs text-black-a">?????????</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-normal text-xs text-black-a">{ getAddCommaNumberString({ numberValue: cancelDetailInfo?.refundPrice }) }???</span>
          </div>
        </div>
        
        <div className="block h-px bg-gray-a mx-6 my-4"></div>

        <div className="w-full grid box-sizing grid-cols-2 px-6 mb-2">
          <div className="flex items-center justify-start">
            <span className="font-bold text-sm text-black-a">?????? ??????</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-bold text-sm text-orange-a">{ getAddCommaNumberString({ numberValue: cancelDetailInfo?.totalAmount }) }???</span>
          </div>
        </div>

        <div className="w-full grid box-sizing grid-cols-5 px-6">
          <div className="flex items-center justify-start col-span-2">
            <span className="font-bold text-xs text-black-a">?????? ??????</span>
          </div>
          <div className="flex items-center justify-end col-span-3">
            <span className="font-normal text-xs text-black-a">{ cancelDetailInfo?.paymentCompany }/{ order.getInstallmentText(cancelDetailInfo?.installmentPlanMonth) }</span>
          </div>
        </div>

        <BottomFixedOrRelativeBox __heightToRelative={100}>
          <div className="w-full px-6 pb-6 grid grid-cols-2 gap-2 mt-4">
            <div>
              <Button __buttonStyle="white-solid-gray-stroke" __onClick={prevButtonClick}>????????????</Button>
            </div>
            <div>
              <Button __buttonStyle="black-solid" __onClick={applyButtonClick}>????????????</Button>
            </div>
          </div>
        </BottomFixedOrRelativeBox>
      </WindowSizeContainer>
    </CustomSuspense>
  );
};

export default ProductNewPage;