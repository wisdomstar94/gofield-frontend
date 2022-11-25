import Head from "next/head";
import { useCallback } from "react";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import BasketFormBox from "../../../components/boxes/basket-form-box/basket-form-box.component";
import BottomFixedOrRelativeBox from "../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import QnaRowItem from "../../../components/boxes/qna-row-item/qna-row-item.component";
import SearchFormBox from "../../../components/boxes/search-form-box/search-form-box.component";
import Button from "../../../components/forms/button/button.component";
import Checkbox from "../../../components/forms/checkbox/checkbox.component";
import { ICheckbox } from "../../../components/forms/checkbox/checkbox.interface";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";
import ModalSearch from "../../../components/modals/modal-search/modal-search.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>Q&A</title>
        <meta name="description" content="고필드 Q&A 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  const isMyWriteOnlyShowCheckboxChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {

  }, []);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>Q&A</>,
          }} />
        <div className="block mx-6 my-4">
          <Checkbox __name="is-my-write-only-show" __value="is-my-write-only-show" __checkState="none-checked" __onChange={isMyWriteOnlyShowCheckboxChange}>내가 쓴 글 보기</Checkbox>
        </div>
        <QnaRowItem __question="상품 관련 문의입니다." __qnaStatus="answer-expected" __isSecret={true} />
        <QnaRowItem __question="상품 관련 문의입니다." __qnaStatus="answer-expected" />
        <QnaRowItem __question="상품 관련 문의입니다." __qnaStatus="answer-complete" __answer="안녕하세요 19년도에 구매를 하였습니다. 총 15번 정도 이용을 한 것 같아요." />
        <BottomFixedOrRelativeBox __heightToRelative={100}>
          <div className="w-full block box-sizing px-6 py-6">
            <Button __buttonStyle="black-solid">문의하기</Button>
          </div>
        </BottomFixedOrRelativeBox>
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;