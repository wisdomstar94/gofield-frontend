import Head from "next/head";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import ProductRowItem3 from "../../../components/boxes/product-row-item3/product-row-item3.component";
import StepItems from "../../../components/forms/step-items/step-items.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";

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
  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeA={{
            titleComponent: <>취소/반품/교환 상세정보</>,
          }} />
        <div className="w-full flex justify-center box-sizing px-6 py-6">
          <StepItems
            __stepItems={[
              {
                textComponent: <>취소<br />접수</>,
                state: 'pass'
              },
              {
                textComponent: <>환불<br />진행중</>,
                state: 'pass'
              },
              {
                textComponent: <>환불<br />완료</>,
                state: 'current'
              },
            ]} />
        </div>

        <div className="block px-6 box-sizing">
          <div className="w-full grid grid-cols-2 mb-1.5">
            <div className="flex items-center">
              <span className="text-base font-bold text-black-a tracking-tighter">2022.5.6 취소</span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-sm font-bold text-blue-a tracking-tighter underline cursor-pointer">주문 상세보기</span>
            </div>
          </div>
          <div className="w-full flex">
            <span className="text-xs text-black-a tracking-tight">접수번호</span>
            <span>&nbsp;</span>
            <span className="text-xs text-blue-a tracking-tight">12345567</span>
          </div>
        </div>

        <ProductRowItem3 __isTopRowShow={false} __buttonLayoutType="none" />

        <div className="block px-6 box-sizing mt-4">
          <div className="w-full flex mb-1">
            <span className="text-sm font-bold text-black-a">취소 사유</span>
          </div>
          <div className="w-full flex">
            <span className="text-sm font-normal text-gray-b">상품을 추가하여 재주문</span>
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
            <span className="text-xs text-black-a font-normal tracking-tighter">151,600원</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 box-sizing mb-2 px-6">
          <div className="flex items-center">
            <span className="text-xs text-black-a font-bold tracking-tighter">할인 금액</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-xs text-black-a font-normal tracking-tighter">-3,000원</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 box-sizing mb-2 px-6">
          <div className="flex items-center">
            <span className="text-xs text-black-a font-bold tracking-tighter">배송비</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-xs text-black-a font-normal tracking-tighter">3,000원</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 box-sizing mb-2 px-6">
          <div className="flex items-center">
            <span className="text-xs text-black-a font-bold tracking-tighter">반품비</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-xs text-black-a font-normal tracking-tighter">0원</span>
          </div>
        </div>

        <div className="block mx-6 my-4 h-px bg-gray-a"></div>

        <div className="w-full grid grid-cols-10 box-sizing px-6 mb-2">
          <div className="col-span-3 flex items-center">
            <span className="font-bold text-sm text-black-a tracking-tighter">환불 완료</span>
          </div>
          <div className="col-span-7 flex items-center justify-end">
            <span className="font-bold text-sm text-orange-a tracking-tighter">154,600원</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-10 box-sizing px-6 mb-2">
          <div className="col-span-3 flex items-center">
            <span className="font-bold text-xs text-black-a tracking-tighter">환불 수단</span>
          </div>
          <div className="col-span-7 flex items-center justify-end">
            <span className="font-normal text-xs text-black-a tracking-tighter">현대카드/7개월 할부 154,600원</span>
          </div>
        </div>
      </WindowSizeContainer>
    </>
  );
};

export default CancelReturnExchangePage;