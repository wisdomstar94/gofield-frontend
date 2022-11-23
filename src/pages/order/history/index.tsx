import Head from "next/head";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import ProductRowItem from "../../../components/boxes/product-row-item/product-row-item.component";
import ProductRowItem2 from "../../../components/boxes/product-row-item2/product-row-item2.component";
import ProductRowItem3 from "../../../components/boxes/product-row-item3/product-row-item3.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 주문목록</title>
        <meta name="description" content="고필드 주문목록 페이지입니다." />
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
            titleComponent: '주문목록',
            rightComponent: <></>,
          }} />
        {/* <ProductRowItem />
        <ProductRowItem2 /> */}
        <ProductRowItem3 />
        <ProductRowItem3 />
        <ProductRowItem3 />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;