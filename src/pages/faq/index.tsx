import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import FaqRowItem from "../../components/boxes/faq-row-item/faq-row-item.component";
import NotResultBox from "../../components/boxes/not-result-box/not-result-box.component";
import PaginationBox from "../../components/boxes/pagination-box/pagination-box.component";
import { IPaginationBox } from "../../components/boxes/pagination-box/pagination-box.interface";
import Input from "../../components/forms/input/input.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import SvgMagnifyingGlassIcon from "../../components/svgs/svg-magnifying-glass-icon/svg-magnifying-glass-icon.component";
import useCommonFaqListApi from "../../hooks/use-apis/use-common-faq-list.api";
import { IFaq } from "../../interfaces/faq/faq.interface";
import { getNextRouterQueryToUrlQueryString } from "../../librarys/string-util/string-util.library";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>자주하는질문</title>
        <meta name="description" content="고필드 자주하는질문 페이지입니다." />
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
  const commonFaqListApi = useCommonFaqListApi();
  const [listOptions, setListOptions] = useState<IFaq.FaqListOptions>({
    page: '1',
    size: '5',
    keyword: '',
    list: [],
  });

  const keywordRef = useRef<string>('');
  const onKeywordChange = useCallback((value: string) => {
    keywordRef.current = value;
  }, []);

  const getList = useCallback((options: IFaq.FaqListOptions) => {
    if (isGettingListRef.current) {
      return;
    }
    isGettingListRef.current = true;
    const query = {
      page: options.page,
      size: options.size,
      keyword: options.keyword,
    };
    commonFaqListApi.getInstance(getNextRouterQueryToUrlQueryString(query)).then((response) => {
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
  }, [commonFaqListApi]);

  const searchButtonClick = useCallback(() => {
    setListOptions(prev => {
      const obj = {
        ...prev,
        page: '1',
        keyword: keywordRef.current,
        list: [],
      };
      getList(obj);
      return obj;
    });
  }, [getList]);

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
            titleComponent: <>자주하는질문</>,
            rightComponent: <></>,
          }} />
        {/* <PreparingBox /> */}

        {/* 검색어 입력 부분 */}
        <div className="block mx-4 my-4 relative">
          <Input
            __width="100%"
            __type="text"
            __placeholder="무엇을 도와드릴까요?"
            __onChange={onKeywordChange}
            __style={{ paddingRight: '60px' }} />
          <span className="h-full absolute top-0 right-0 flex flex-wrap justify-center items-center px-2 cursor-pointer" onClick={searchButtonClick}>
            <SvgMagnifyingGlassIcon />
          </span>
        </div>
        
        {/* 자주하는 질문 목록 부분 */}
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
                  <FaqRowItem
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
        {/* <FaqRowItem /> */}
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;