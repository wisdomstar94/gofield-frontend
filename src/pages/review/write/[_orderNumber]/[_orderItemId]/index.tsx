import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AccessTokenCheck from "../../../../../components/auth/access-token-check/access-token-check.component";
import ReviewDetailFormBox from "../../../../../components/boxes/review-detail-form-box/review-detail-form-box.component";
import Topbar from "../../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../../components/layouts/window-size-container/window-size-container.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>상품 리뷰 작성</title>
        <meta name="description" content="고필드 상품 리뷰 작성 페이지입니다." />
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
  const [orderItemId, setOrderItemId] = useState<string>();
  const [orderNumber, setOrderNumber] = useState<string>();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (typeof router.query._orderItemId === 'string') {
      setOrderItemId(router.query._orderItemId);
    }

    if (typeof router.query._orderNumber === 'string') {
      setOrderNumber(router.query._orderNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>상품 리뷰 작성</>,
            rightComponent: <></>,
          }} />
        <ReviewDetailFormBox
          __orderNumber={orderNumber}
          __orderItemId={orderItemId} />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;