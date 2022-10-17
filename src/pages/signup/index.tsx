import { NextPage } from "next";
import Head from "next/head";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import Input from "../../components/forms/input/input.component";
import MultipleCheckItems from "../../components/forms/multiple-check-items/multiple-check-items.component";
import Formbox, { FormboxItem } from "../../components/layouts/form-box/form-box.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import { useCategoryValueItems } from "../../hooks/use-api-hook/use-api.hook";

const SignupPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 회원가입</title>
        <meta name="description" content="고필드 회원가입 페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="first-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  const categoryValueItems = useCategoryValueItems();

  return (
    <>
      <WindowSizeContainer>
        <Topbar
          __layoutTypeA={{
            titleComponent: <>회원가입</>,
            bgColorTransparency: true,
          }} />
        <Formbox>
          <FormboxItem
            __titleComponent={<>네이버 ID로 연결됨&nbsp;<span style={{ color: '#ff6247' }}>*</span></>}
            __contentComponent={
              <>
                <Input
                  __type="text"
                  __value="naver.com..."
                  __disable={true}
                  __onChange={e => {  }} />
              </>
            } />
          <FormboxItem
            __titleComponent={<>신체사이즈</>}
            __contentComponent={
              <>
                <Input
                  __type="number"
                  __placeholder="키(cm)"
                  __onChange={e => {  }} />
                <div style={{ height: '10px' }}></div>
                <Input
                  __type="number"
                  __placeholder="몸무게(kg)"
                  __onChange={e => {  }} />
              </>
            } />
          <FormboxItem
            __titleComponent={<>관심 스포츠 종목</>}
            __contentComponent={
              <>
                <MultipleCheckItems
                  __valueItems={categoryValueItems}
                  __onChange={info => { console.log(`info`, info) }} />
              </>
            } />
        </Formbox>
      </WindowSizeContainer>
    </>
  );
};

export default SignupPage;