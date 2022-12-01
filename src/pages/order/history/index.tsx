import Head from "next/head";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import OrderRowItem from "../../../components/boxes/order-row-item/order-row-item.component";
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
        <OrderRowItem />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;