import Head from "next/head";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";

const UseService20221101 = () => {
  return (
    <>
      <Head>
        <title>고필드 - 이용약관</title>
        <meta name="description" content="고필드 이용약관 페이지입니다." />
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
            titleComponent: '이용약관',
          }} />
        <div className="terms-content-area">
          <h2>이용약관</h2>
          <p>
            준비중입니다..
          </p>
        </div>
      </WindowSizeContainer>
    </>
  );
};

export default UseService20221101;