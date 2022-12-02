import Head from "next/head";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>주문 완료</title>
        <meta name="description" content="고필드 주문 완료 페이지입니다." />
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
            titleComponent: <>주문 완료</>,
            rightComponent: <></>,
          }} />
        ...
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;