import Head from "next/head";
import AccessTokenCheck from "../../../../../components/auth/access-token-check/access-token-check.component";
import ProductDetailFormBox from "../../../../../components/boxes/product-detail-form-box/product-detail-form-box.component";
import ReviewDetailFormBox from "../../../../../components/boxes/review-detail-form-box/review-detail-form-box.component";
import ProductRowItem from "../../../../../components/boxes/product-row-item/product-row-item.component";
import Article from "../../../../../components/layouts/article/article.component";
import Topbar from "../../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../../components/layouts/window-size-container/window-size-container.component";

const ProductReviewWritePage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 리뷰쓰기</title>
        <meta name="description" content="고필드 리뷰쓰기 페이지입니다." />
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
            titleComponent: '상품 리뷰 작성',
            rightComponent: <></>,
            // searchButtonClickCallback: searchButtonClick,
          }} />
        <ReviewDetailFormBox />
      </WindowSizeContainer>
    </>
  );
};

export default ProductReviewWritePage;