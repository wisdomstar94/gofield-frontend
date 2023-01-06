import Head from "next/head";
import React, { useCallback, useRef, useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import FaqRowItem from "../../components/boxes/faq-row-item/faq-row-item.component";
import MenuRowList from "../../components/boxes/menu-row-list/menu-row-list.component";
import PreparingBox from "../../components/boxes/preparing-box/preparing-box.component";
import { ICheckbox } from "../../components/forms/checkbox/checkbox.interface";
import Input from "../../components/forms/input/input.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import SvgMagnifyingGlassIcon from "../../components/svgs/svg-magnifying-glass-icon/svg-magnifying-glass-icon.component";
import { IFaq } from "../../interfaces/faq/faq.interface";

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
  const [listOptions, setListOptions] = useState<IFaq.FaqListOptions>({
    page: '1',
    size: '10',
    keyword: '',
    list: [],
  });

  const keywordRef = useRef<string>('');
  const onKeywordChange = useCallback((value: string) => {
    keywordRef.current = value;
  }, []);

  const getList = useCallback((optoins: IFaq.FaqListOptions) => {

  }, []);

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
        <FaqRowItem />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;