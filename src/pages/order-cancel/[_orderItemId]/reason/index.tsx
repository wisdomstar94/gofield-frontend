import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../../../components/auth/access-token-check/access-token-check.component";
import BasketFormBox from "../../../../components/boxes/basket-form-box/basket-form-box.component";
import BottomFixedOrRelativeBox from "../../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import CustomSuspense from "../../../../components/boxes/custom-suspense/custom-suspense.component";
import SearchFormBox from "../../../../components/boxes/search-form-box/search-form-box.component";
import Button from "../../../../components/forms/button/button.component";
import Checkbox from "../../../../components/forms/checkbox/checkbox.component";
import { ICheckbox } from "../../../../components/forms/checkbox/checkbox.interface";
import Topbar from "../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../components/layouts/window-size-container/window-size-container.component";
import ModalSearch from "../../../../components/modals/modal-search/modal-search.component";
import useModalAlert from "../../../../hooks/use-modals/use-modal-alert.modal";
import useEnumOrderCancelReasonListQuery from "../../../../hooks/use-queries/use-enum-order-cancel-reason-list.query";
// import useCancelReasonListQuery from "../../../../hooks/use-queries/use-cancel-reason-list.query";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 주문취소 (사유선택)</title>
        <meta name="description" content="고필드 주문취소 사유선택 페이지입니다." />
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
  const enumOrderCancelReasonListQuery = useEnumOrderCancelReasonListQuery();
  const [selectedCancelReason, setSelectedCancelReason] = useState<string>();
  const [orderItemId, setOrderItemId] = useState<string>();

  const cancelReasonCheckboxChange = useCallback((info: ICheckbox.CheckboxChangeInfo) => {
    setSelectedCancelReason(info.value);
  }, []);

  const prevButtonClick = useCallback(() => {
    history.back();
  }, []);

  const nextButtonClick = useCallback(() => {
    if (selectedCancelReason === undefined) {
      modalAlert.show({ title: '안내', content: '취소 사유를 선택해주세요.' });
      return;
    }

    router.push(`/order-cancel/${orderItemId}/apply?cancelReason=${selectedCancelReason}`);
  }, [modalAlert, orderItemId, router, selectedCancelReason]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const orderItemId = router.query._orderItemId;
    if (typeof orderItemId !== 'string') {
      return;
    }

    setOrderItemId(orderItemId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <CustomSuspense __isShow={orderItemId !== undefined}>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeA={{
            titleComponent: <>주문취소</>
          }} />
        <div className="w-full flex justify-center py-8 text-lg font-bold">
          취소 사유를 선택해주세요
        </div>
        <ul className="block m-0 px-6">
          {
            enumOrderCancelReasonListQuery.data?.map((item, index) => {
              return (
                <li key={index} className="flex m-0 p-0 list-none items-center mb-6">
                  <div className="inline-flex mr-2.5">
                    <Checkbox 
                      __name="cancel-reason" 
                      __isImpossibleUncheck={true}
                      __value={item.value} 
                      __checkState={item.value === selectedCancelReason ? 'checked' : 'none-checked'} 
                      __onChange={cancelReasonCheckboxChange}>
                      <div className="inline-flex flex-wrap text-sm font-normal text-black-b">
                        { item.text }
                      </div>
                    </Checkbox>
                  </div>
                </li>     
              )
            })
          }
        </ul>
        
        <BottomFixedOrRelativeBox __heightToRelative={100}>
          <div className="w-full px-6 pb-6 grid grid-cols-2 gap-2">
            <div>
              <Button __buttonStyle="white-solid-gray-stroke" __onClick={prevButtonClick}>이전단계</Button>
            </div>
            <div>
              <Button __buttonStyle="white-solid-gray-stroke" __onClick={nextButtonClick}>다음단계</Button>
            </div>
          </div>
        </BottomFixedOrRelativeBox>
      </WindowSizeContainer>
    </CustomSuspense>
  );
};

export default ProductNewPage;