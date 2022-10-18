import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AccessTokenCheck from "../../../../../../components/auth/access-token-check/access-token-check.component";
import StepItems from "../../../../../../components/forms/step-items/step-items.component";
import ContentArticle from "../../../../../../components/layouts/content-article/content-article.component";
import Titlebox from "../../../../../../components/layouts/title-box/title-box.component";
import Topbar from "../../../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../../../components/layouts/window-size-container/window-size-container.component";

const OrderProductDeliveryStatePage = () => {
  return (
    <>
      <Head>
        <title>고필드 배송조회</title>
        <meta name="description" content="고필드 배송조회 페이지 입니다." />
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
      <WindowSizeContainer>
        <Topbar
          __layoutTypeA={{
            titleComponent: <>배송조회</>
          }} />

        <ContentArticle>
          <Titlebox
            __titleStyleA={{
              component: <>상품이 배송 중입니다</>,
            }} />
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
        </ContentArticle>
      </WindowSizeContainer>
    </>
  );
};

export default OrderProductDeliveryStatePage;
