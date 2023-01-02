import Head from "next/head";
import TitleContentBoxV1 from "../../../components/boxes/title-content-box-v1/title-content-box-v1.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 서버 점검</title>
        <meta name="description" content="고필드 서버 점검 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContents />      
    </>
  );
};

const PageContents = () => {
  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>
              서버 점검 안내
            </>
          }} />
        <TitleContentBoxV1 
          __title={<>서버 점검 안내</>}
          __content={<>현재 서버 점검중입니다. 잠시 후 다시 시도해주세요.</>}
          />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;