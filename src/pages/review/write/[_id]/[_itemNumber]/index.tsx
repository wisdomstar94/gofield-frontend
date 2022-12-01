import Head from "next/head";
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
  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>상품 리뷰 작성</>,
            rightComponent: <></>,
          }} />
        <ReviewDetailFormBox />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;