import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AccessTokenCheck from "../../../../../../components/auth/access-token-check/access-token-check.component";
import LinkText from "../../../../../../components/forms/link-text/link-text.component";
import ProductRowItem from "../../../../../../components/boxes/product-row-item/product-row-item.component";
import StepItems from "../../../../../../components/forms/step-items/step-items.component";
import StrokeButtons from "../../../../../../components/forms/stroke-buttons/stroke-buttons.component";
import BothSidebox from "../../../../../../components/layouts/both-side-box/both-side-box.component";
import ContentArticle from "../../../../../../components/layouts/content-article/content-article.component";
import EmptyRow from "../../../../../../components/layouts/empty-row/empty-row.component";
import List, { ListItem } from "../../../../../../components/layouts/list/list.component";
import Titlebox from "../../../../../../components/layouts/title-box/title-box.component";
import Topbar from "../../../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../../../components/layouts/window-size-container/window-size-container.component";
import ProductRowItem3 from "../../../../../../components/boxes/product-row-item3/product-row-item3.component";

const OrderProductDeliveryStatePage = () => {
  return (
    <>
      <Head>
        <title>고필드 주문/배송 조회</title>
        <meta name="description" content="고필드 주문/배송 조회 페이지 입니다." />
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

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const {
      _orderId,
      _productId,
    } = router.query;
    console.log('_orderId', _orderId);
    console.log('_productId', _productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <>
      <WindowSizeContainer __bgColor="#ffffff">
        <Topbar
          __layoutTypeA={{
            titleComponent: <>주문/배송 조회</>
          }} />

        <div className="w-full my-6 flex justify-center items-center text-lg text-black-b font-bold">
          상품이 배송 중입니다
        </div>

        <StepItems
          __stepItems={[
            {
              textComponent: <>결제 완료</>,
              state: 'pass',
            },
            {
              textComponent: <>배송 준비중</>,
              state: 'pass',
            },
            {
              textComponent: <>배송중</>,
              state: 'current',
            },
            {
              textComponent: <>배송 완료</>,
              state: 'yet',
            },
          ]} />
        
        <div className="block mx-6 mt-10 mb-4 grid grid-cols-2">
          <div className="flex flex-wrap items-start">
            <div className="font-bold text-sm text-black-a w-full mb-1">
              CJ 대한통운
            </div>
            <div className="w-full text-xs font-normal">
              <span className="text-black-a">운송장 번호</span> 
              &nbsp;
              <span className="text-blue-a">123354325</span>
            </div>
          </div>
          <div className="flex flex-wrap items-start justify-end">
            <span className="text-blue-a text-sm font-bold underline cursor-pointer">자세히보기</span>
          </div>
        </div>

        <div className="mx-6 h-px bg-gray-a mb-4"></div>
        
        <div className="block mb-4">
          <ProductRowItem3 __buttonLayoutType="order-delicery-cancel" />
        </div>

        <div className="block mx-6 mb-1">
          <span className="text-sm font-bold text-black-a tracking-tighter">홍길동</span>
        </div>

        <div className="block mx-6 mb-1">
          <span className="text-sm font-normal text-gray-b tracking-tighter">(00000) 서울특별시 상남구 역삼로 434, 302호</span>
        </div>

        <div className="block mx-6 mb-1">
          <span className="text-sm font-normal text-gray-b tracking-tighter">010-0000-0000</span>
        </div>

      </WindowSizeContainer>
    </>
  );
};

export default OrderProductDeliveryStatePage;
