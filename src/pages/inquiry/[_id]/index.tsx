import Head from "next/head";
import { useCallback } from "react";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import BottomFixedOrRelativeBox from "../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import FormListBox from "../../../components/boxes/form-list-box/form-list-box.component";
import Button from "../../../components/forms/button/button.component";
import Checkbox from "../../../components/forms/checkbox/checkbox.component";
import Input from "../../../components/forms/input/input.component";
import TextArea from "../../../components/forms/text-area/text-area.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 문의하기</title>
        <meta name="description" content="고필드 문의하기 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  const titleChange = useCallback((value: string) => {

  }, []);

  const contentChange = useCallback((value: string) => {

  }, []);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>문의하기</>
          }} />

        <div className="w-full block box-sizing px-6 py-6">
          <FormListBox
            __formItems={[
              {
                titleComponent: <>제목</>,
                contentComponent: <>
                  <Input __type="text" __placeholder="15자 이내 입력" __onChange={titleChange} />
                </>,
              },
              {
                titleComponent: <>내용</>,
                contentComponent: <>
                  <TextArea __onChange={contentChange} __placeholder="내용을 입력하세요" />
                </>,
              }
            ]} />
          <div className="w-full h-4"></div>
          <Checkbox __name="is-secret" __value="is-secret" __checkState="none-checked" __onChange={() => {  }}>비밀글</Checkbox>
        </div>
        
        <BottomFixedOrRelativeBox>
          <div className="w-full block box-sizing px-6 py-6">
            <Button>등록하기</Button>
          </div>
        </BottomFixedOrRelativeBox>
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;