import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import BottomFixedOrRelativeBox from "../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import FormListBox from "../../../components/boxes/form-list-box/form-list-box.component";
import Button from "../../../components/forms/button/button.component";
import Checkbox from "../../../components/forms/checkbox/checkbox.component";
import { ICheckbox } from "../../../components/forms/checkbox/checkbox.interface";
import Input from "../../../components/forms/input/input.component";
import TextArea from "../../../components/forms/text-area/text-area.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";
import useItemProductQnaUploadApi from "../../../hooks/use-apis/use-item-product-qna-upload.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import { IQna } from "../../../interfaces/qna/qna.interface";

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
  const detailInfoRef = useRef<IQna.QnaForm>({ isVisible: false });
  const modalAlert = useModalAlert();
  const itemProductQnaUploadApi = useItemProductQnaUploadApi();
  const router = useRouter();
  const [timestamp, setTimestamp] = useState(0);

  const isUploadingRef = useRef(false);

  const titleChange = useCallback((value: string) => {
    detailInfoRef.current.title = value;
  }, []);

  const contentChange = useCallback((value: string) => {
    detailInfoRef.current.description = value;
  }, []);

  const isVisibleChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {
    detailInfoRef.current.isVisible = changeInfo.checkState === 'checked';
  }, []);

  const uploadButtonClick = useCallback(() => {
    if (isUploadingRef.current) {
      return;
    }

    const detailInfo = detailInfoRef.current;

    if (typeof detailInfo.title !== 'string' || detailInfo.title.trim() === '') {
      modalAlert.show({ title: '안내', content: '제목을 입력해주세요.' });
      return;
    }

    if (typeof detailInfo.description !== 'string' || detailInfo.description.trim() === '') {
      modalAlert.show({ title: '안내', content: '문의 내용을 입력해주세요.' });
      return;
    }

    const itemId = router.query._itemId?.toString();
    if (itemId === undefined) {
      return;
    }

    isUploadingRef.current = true;
    itemProductQnaUploadApi.getInstance(itemId, detailInfo).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '등록에 실패하였습니다.' });
        return;
      }

      modalAlert.show({ title: '안내', content: '등록되었습니다.' });
      detailInfoRef.current = { isVisible: false };
      setTimestamp(new Date().getTime());
      history.back();
    }).finally(() => {
      isUploadingRef.current = false;
    });
  }, [itemProductQnaUploadApi, modalAlert, router.query._itemId]);

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
                  <Input __type="text" __value={detailInfoRef.current.title ?? ''} __placeholder="15자 이내 입력" __onChange={titleChange} />
                </>,
              },
              {
                titleComponent: <>내용</>,
                contentComponent: <>
                  <TextArea __onChange={contentChange} __value={detailInfoRef.current.description ?? ''} __placeholder="내용을 입력하세요" />
                </>,
              }
            ]} />
          <div className="w-full h-4"></div>
          <Checkbox __name="is-secret" __value="is-secret" __checkState={detailInfoRef.current.isVisible === true ? 'checked' : 'none-checked'} __onChange={isVisibleChange}>비밀글</Checkbox>
        </div>
        
        <BottomFixedOrRelativeBox>
          <div className="w-full block box-sizing px-6 py-6">
            <Button __onClick={uploadButtonClick}>등록하기</Button>
          </div>
        </BottomFixedOrRelativeBox>
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;