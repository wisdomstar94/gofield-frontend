import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import MenuRowList from "../../components/boxes/menu-row-list/menu-row-list.component";
import NotResultBox from "../../components/boxes/not-result-box/not-result-box.component";
import NoticeRowItem from "../../components/boxes/notice-row-item/notice-row-item.component";
import PaginationBox from "../../components/boxes/pagination-box/pagination-box.component";
import { IPaginationBox } from "../../components/boxes/pagination-box/pagination-box.interface";
import PreparingBox from "../../components/boxes/preparing-box/preparing-box.component";
import { ICheckbox } from "../../components/forms/checkbox/checkbox.interface";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import useCommonNoticeListApi from "../../hooks/use-apis/use-common-notice-list.api";
import { INotice } from "../../interfaces/notice/notice.interface";
import { getNextRouterQueryToUrlQueryString } from "../../librarys/string-util/string-util.library";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>공지사항</title>
        <meta name="description" content="고필드 공지사항 페이지입니다." />
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
  const isGettingListRef = useRef(false);
  const paginationBoxRef = useRef<IPaginationBox.RefObject>(null);
  const commonNoticeListApi = useCommonNoticeListApi();
  const [listOptions, setListOptions] = useState<INotice.NoticeListOptions>({
    page: '1',
    size: '5',
    list: [],
  });

  const getList = useCallback((options: INotice.NoticeListOptions) => {
    if (isGettingListRef.current) {
      return;
    }
    isGettingListRef.current = true;
    const query = {
      page: options.page,
      size: options.size,
    };
    commonNoticeListApi.getInstance(getNextRouterQueryToUrlQueryString(query)).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      setListOptions(prev => {
        const newValue = {
          ...prev,
          list: response.data.data.list,
        };
        return newValue;
      });
      paginationBoxRef.current?.setPage(response.data.data.page);
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [commonNoticeListApi]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    getList(listOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const onPageClick = useCallback((page: number) => {
    setListOptions(prev => {
      const newValue = {
        ...prev,
        page: page.toString(),
      };
      getList(newValue);
      return newValue;
    });
  }, [getList]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>공지사항</>,
            rightComponent: <></>,
          }} />
        {/* <PreparingBox /> */}

        {
          listOptions.list.length === 0 ?
          <>
            <NotResultBox>
              조회 결과가 없습니다.
            </NotResultBox>
          </> :
          <>
            {
              listOptions.list.map((item, index) => {
                return (
                  <NoticeRowItem
                    key={index} 
                    __item={item}
                    />
                ); 
                
              })
            }

            <div className="w-full mb-2"></div>
          </>
        }

        <div className="w-full flex flex-wrap justify-center" style={{
          display: listOptions.list.length > 0 ? undefined : 'none',
        }}>
          <PaginationBox 
            ref={paginationBoxRef}
            __onPageClick={onPageClick} />
        </div>  

        {/* <NoticeRowItem /> */}
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;