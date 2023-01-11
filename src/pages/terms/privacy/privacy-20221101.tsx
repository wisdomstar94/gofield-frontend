import Head from "next/head";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";

const Privacy20221101 = () => {
  return (
    <>
      <Head>
        <title>고필드 - 개인정보 처리방침</title>
        <meta name="description" content="고필드 개인정보 처리방침 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContents />
    </>
  );
};

const PageContents = () => {
  return (
    <>
      <WindowSizeContainer>
        <Topbar
          __layoutTypeB={{
            titleComponent: '개인정보 처리 방침',
          }} />
        <div className="terms-content-area">
          <h2>개인정보 처리 방침</h2>
          <p>
            준비중입니다..
          </p>
        </div>
      </WindowSizeContainer>
    </>
  );
};

export default Privacy20221101;