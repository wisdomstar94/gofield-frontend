import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import BottomFixedOrRelativeBox from "../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import QnaRowItem from "../../../components/boxes/qna-row-item/qna-row-item.component";
import Button from "../../../components/forms/button/button.component";
import Checkbox from "../../../components/forms/checkbox/checkbox.component";
import { ICheckbox } from "../../../components/forms/checkbox/checkbox.interface";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";
import useItemProductQnaListApi from "../../../hooks/use-apis/use-item-product-qna-list.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import { IScrollCheckHook } from "../../../hooks/use-scroll-check/use-scroll-check.interface";
import { IQna } from "../../../interfaces/qna/qna.interface";
import { getNextRouterQueryToUrlQueryString } from "../../../librarys/string-util/string-util.library";

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
  const router = useRouter();
  const itemProductQnaListApi = useItemProductQnaListApi();
  const modalAlert = useModalAlert();

  const isGettingListRef = useRef(false);
  const isNoneMoreDataRef = useRef(false);

  const [itemId, setItemId] = useState<string>('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [isMe, setIsMe] = useState<'true' | 'false'>('false');
  
  const [list, setList] = useState<IQna.QnaItem[]>([]);

  const isMyWriteOnlyShowCheckboxChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {
    isNoneMoreDataRef.current = false;
    setPage(1);
    setList([]);
    console.log('changeInfo', changeInfo);
    setIsMe(changeInfo.checkState === 'checked' ? 'true' : 'false');
  }, []);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const itemId = router.query._itemId?.toString();
    if (typeof itemId !== 'string') {
      return;
    }
    
    setPage(1);
    setList([]);
    setItemId(itemId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, page, size, isMe]);

  const getList = useCallback(() => {
    if (itemId === '') return;
    if (isGettingListRef.current || isNoneMoreDataRef.current) return;

    isGettingListRef.current = true;
    const queryString = getNextRouterQueryToUrlQueryString({ ...router.query, page: page.toString(), size: size.toString(), isMe });
    itemProductQnaListApi.getInstance(itemId, queryString).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: 'Q&A 목록을 가져오는데 실패하였습니다.' });
        return;
      }

      if (response.data.data.length === 0) {
        isNoneMoreDataRef.current = true;
        return;
      }

      if (response.data.data.length < size) {
        isNoneMoreDataRef.current = true;
      }

      setList(list.concat(response.data.data));
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [isMe, itemId, itemProductQnaListApi, list, modalAlert, page, router.query, size]);

  const onScroll = useCallback((info: IScrollCheckHook.ScrollInfo) => {
    if (isGettingListRef.current || isNoneMoreDataRef.current) {
      return;
    }

    if (info.isLastScrollArea) {
      setPage(page + 1);
    }
  }, [page]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff" __onScroll={onScroll}>
        <Topbar
          __layoutTypeB={{
            titleComponent: <>Q&A</>,
          }} />
        <div className="block mx-6 my-4">
          <Checkbox 
            __name="is-my-write-only-show" 
            __value="is-my-write-only-show"
            __checkState="none-checked" 
            __onChange={isMyWriteOnlyShowCheckboxChange}>
            내가 쓴 글 보기
          </Checkbox>
        </div>
        {
          list.map((item) => {
            return (
              <QnaRowItem 
                key={item.id} 
                __item={item} />
            )
          })
        }
        <BottomFixedOrRelativeBox __heightToRelative={100}>
          <div className="w-full block box-sizing px-6 py-6">
            <Button __buttonStyle="black-solid" __onClick={() => {
              router.push('/inquiry/' + itemId);
            }}>문의하기</Button>
          </div>
        </BottomFixedOrRelativeBox>
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;