import Head from "next/head";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import ProductRowItem3 from "../../../components/boxes/product-row-item3/product-row-item3.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";

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
  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: '주문상세',
            rightComponent: <></>,
          }} />
        <div className="mx-6 my-4 grid grid-cols-10">
          <div className="flex col-span-4 items-center">
            <span className="font-bold text-sm text-black-1 tracking-tighter">2022.02.01 주문</span>
          </div>
          <div className="flex col-span-6 justify-end items-center">
            <span className="font-normal text-xs text-black-1 tracking-tighter">주문번호 : 00000000000000</span>
          </div>
        </div>
        <div className="mx-6 mb-4">
          <span className="font-bold text-base text-black-a">
            결제 정보
          </span>
        </div>
        
        <div className="mx-6 mb-2 grid grid-cols-2">
          <div className="flex justify-start items-center">
            <span className="text-xs text-black-a font-bold tracking-tight">상품 금액</span>
          </div>
          <div className="flex justify-end items-center">
            <span className="text-xs text-black-a font-normal tracking-tight">151,600원</span>
          </div>
        </div>

        <div className="mx-6 mb-2 grid grid-cols-2">
          <div className="flex justify-start items-center">
            <span className="text-xs text-black-a font-bold tracking-tight">할인 금액</span>
          </div>
          <div className="flex justify-end items-center">
            <span className="text-xs text-black-a font-normal tracking-tight">-3,000원</span>
          </div>
        </div>

        <div className="mx-6 mb-4 grid grid-cols-2">
          <div className="flex justify-start items-center">
            <span className="text-xs text-black-a font-bold tracking-tight">배송비</span>
          </div>
          <div className="flex justify-end items-center">
            <span className="text-xs text-black-a font-normal tracking-tight">0원</span>
          </div>
        </div>
        
        <div className="mx-6 mb-4 h-px bg-gray-a"></div>

        <div className="block mx-6 mb-1">
          <span className="text-sm font-bold text-black-a">구민성</span>
        </div>
        <div className="block mx-6 mb-1">
          <span className="text-sm font-normal text-gray-b tracking-tighter">(00000) 서울특별시 상남구 역삼로 434, 302호</span>
        </div>
        <div className="block mx-6 mb-2">
          <span className="text-sm font-normal text-gray-b tracking-tighter">010-0000-0000</span>
        </div>
        <div className="block mx-6 mb-4">
          <span className="text-sm font-normal text-gray-b tracking-tighter">배송요청사항 : 문 앞에 놔두고 가주세요</span>
        </div>

        <div className="mx-6 mb-4 h-px bg-gray-a"></div>

        <ProductRowItem3 />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;