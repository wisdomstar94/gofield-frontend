import Head from "next/head";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import CancelReturnExchangeRowItem from "../../components/forms/cancel-return-exchange-row-item/cancel-return-exchange-row-item.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";

const CancelReturnExchangePage = () => {
  return (
    <>
      <Head>
        <title>고필드 취소/교환/반품 목록</title>
        <meta name="description" content="고필드 취소/교환/반품 목록 페이지 입니다." />
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
      <WindowSizeContainer>
        <Topbar
          __layoutTypeA={{
            titleComponent: <>취소/반품/교환</>,
          }} />
        <CancelReturnExchangeRowItem />
        <CancelReturnExchangeRowItem />
        <CancelReturnExchangeRowItem />
      </WindowSizeContainer>
    </>
  );
};

export default CancelReturnExchangePage;