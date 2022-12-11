import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../../../components/auth/access-token-check/access-token-check.component";
import BasketFormBox from "../../../../components/boxes/basket-form-box/basket-form-box.component";
import BottomFixedOrRelativeBox from "../../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import ProductRowItem3 from "../../../../components/boxes/product-row-item3/product-row-item3.component";
import SearchFormBox from "../../../../components/boxes/search-form-box/search-form-box.component";
import Button from "../../../../components/forms/button/button.component";
import Checkbox from "../../../../components/forms/checkbox/checkbox.component";
import { ICheckbox } from "../../../../components/forms/checkbox/checkbox.interface";
import Topbar from "../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../components/layouts/window-size-container/window-size-container.component";
import ModalSearch from "../../../../components/modals/modal-search/modal-search.component";
import useCancelReasonListQuery from "../../../../hooks/use-queries/use-cancel-reason-list.query";

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
  const cancelReasonListQuery = useCancelReasonListQuery();

  const cancelReasonCheckboxChange = useCallback((info: ICheckbox.CheckboxChangeInfo) => {

  }, []);

  return (
    <>
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
        <ProductRowItem3 __isTopRowShow={false} />

        <div className="block mx-6 mt-4">
          <div className="font-bold text-sm text-black-a mb-1">
            취소 사유
          </div>
          <div className="font-normal text-sm text-gray-b">
            다른 상품 추가 후 재주문 예정
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
            <span className="font-normal text-xs text-black-a">151,600원</span>
          </div>
        </div>

        <div className="w-full grid box-sizing grid-cols-2 px-6 mb-2">
          <div className="flex items-center justify-start">
            <span className="font-bold text-xs text-black-a">할인 금액</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-normal text-xs text-black-a">-3,000원</span>
          </div>
        </div>

        <div className="w-full grid box-sizing grid-cols-2 px-6 mb-2">
          <div className="flex items-center justify-start">
            <span className="font-bold text-xs text-black-a">배송비</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-normal text-xs text-black-a">3,000원</span>
          </div>
        </div>

        <div className="w-full grid box-sizing grid-cols-2 px-6">
          <div className="flex items-center justify-start">
            <span className="font-bold text-xs text-black-a">반품비</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-normal text-xs text-black-a">0원</span>
          </div>
        </div>
        
        <div className="block h-px bg-gray-a mx-6 my-4"></div>

        <div className="w-full grid box-sizing grid-cols-2 px-6 mb-2">
          <div className="flex items-center justify-start">
            <span className="font-bold text-sm text-black-a">환불 완료</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="font-bold text-sm text-orange-a">154,600원</span>
          </div>
        </div>

        <div className="w-full grid box-sizing grid-cols-5 px-6">
          <div className="flex items-center justify-start col-span-2">
            <span className="font-bold text-xs text-black-a">환불 수단</span>
          </div>
          <div className="flex items-center justify-end col-span-3">
            <span className="font-normal text-xs text-black-a">현대카드/7개월 할부 154,600원</span>
          </div>
        </div>

        <BottomFixedOrRelativeBox __heightToRelative={100}>
          <div className="w-full px-6 pb-6 grid grid-cols-2 gap-2 mt-4">
            <div>
              <Button __buttonStyle="white-solid-gray-stroke">이전단계</Button>
            </div>
            <div>
              <Button __buttonStyle="black-solid">신청하기</Button>
            </div>
          </div>
        </BottomFixedOrRelativeBox>
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;