import Topbar from "../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../components/layouts/window-size-container/window-size-container.component"
import NewProductFormBox from "../../../../components/boxes/new-product-form-box/new-product-form-box.component";
import Head from "next/head";
import AccessTokenCheck from "../../../../components/auth/access-token-check/access-token-check.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 새상품 상세정보</title>
        <meta name="description" content="고필드 새상품 상세정보 페이지입니다." />
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
            titleComponent: '',
            // searchButtonClickCallback: searchButtonClick,
          }} />
        <NewProductFormBox />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;