import { NextPage } from "next";
import Head from "next/head";
import AccessTokenCheck from "../../../../../../../components/auth/access-token-check/access-token-check.component";
import ContentArticle from "../../../../../../../components/layouts/content-article/content-article.component";
import Titlebox from "../../../../../../../components/layouts/title-box/title-box.component";
import Topbar from "../../../../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../../../../components/layouts/window-size-container/window-size-container.component";

const ExchangeReturnReasonPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 교환/반품 사유선택</title>
        <meta name="description" content="고필드 교환/반품 사유선택 페이지 입니다." />
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
            titleComponent: <>교환/반품 신청</>,
          }} />
        <ContentArticle
          __bgOpacityZero={true}>
          <Titlebox
            __titleStyleA={{
              component: <>사유를 선택해주세요</>
            }} />
        </ContentArticle>
      </WindowSizeContainer>
    </>
  );
};

export default ExchangeReturnReasonPage;