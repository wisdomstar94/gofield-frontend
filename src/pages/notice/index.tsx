import Head from "next/head";
import React, { useCallback, useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import MenuRowList from "../../components/boxes/menu-row-list/menu-row-list.component";
import NoticeRowItem from "../../components/boxes/notice-row-item/notice-row-item.component";
import PreparingBox from "../../components/boxes/preparing-box/preparing-box.component";
import { ICheckbox } from "../../components/forms/checkbox/checkbox.interface";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import { INotice } from "../../interfaces/notice/notice.interface";

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
  const [listOptions, setListOptions] = useState<INotice.NoticeListOptions>({
    page: '1',
    size: '10',
    list: [],
  });

  const getList = useCallback((optoins: INotice.NoticeListOptions) => {

  }, []);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>공지사항</>,
            rightComponent: <></>,
          }} />
        {/* <PreparingBox /> */}

        <NoticeRowItem />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;