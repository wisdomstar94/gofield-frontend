import { NextPage } from "next";
import Head from "next/head";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import Article from "../../components/layouts/article/article.component";
import BothSidebox from "../../components/layouts/both-side-box/both-side-box.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import Image from 'next/image';
import ProfileInfoBox from "../../components/boxes/profile-info-box/profile-info-box.component";
import MenuRowList from "../../components/boxes/menu-row-list/menu-row-list.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import StrokeTabButtonBox from "../../components/boxes/stroke-tab-button-box/stroke-tab-button-box.component";
import { useCallback, useState } from "react";
import { ICommon } from "../../interfaces/common/common.interface";
import styles from './index.module.scss';
import ProductRowItem3 from "../../components/boxes/product-row-item3/product-row-item3.component";
import { getClasses } from "../../librarys/string-util/string-util.library";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 리뷰 관리</title>
        <meta name="description" content="고필드 리뷰 관리 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};  

const PageContents = () => {
  const [tabButtonValueItems, setTabButtonValueItems] = useState<ICommon.ValueItem[]>([
    { text: '리뷰작성', value: 'review-list' },
    { text: '리뷰내역', value: 'review-history' },
  ]);
  const [selectedTabValue, setSelectedTabValue] = useState('review-list');

  const onTabClick = useCallback((valueItem: ICommon.ValueItem) => {
    setSelectedTabValue(valueItem.value);
  }, []);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>리뷰 관리</>,
            rightComponent: <></>,
          }} />
        <StrokeTabButtonBox
          __isItemBorderTopNone={true}
          __valueItems={tabButtonValueItems}
          __activeValue={selectedTabValue}
          __onTabClick={onTabClick} />
        
        {/* 공통 내용 */}
        <div className={styles['top-notice-area']}>
          <div className={styles['top-row']}>
            리뷰작성 안내
          </div>
          <div className={styles['bottom-row']}>
            - 고필드 스토어의 리뷰는 일반리뷰, 상품 사진 리뷰, 상품 추천 리뷰로 구성되며 각각의 리뷰 작성 시 기준에 맞는 적립금이 지급됩니다. <br />
            - 작성 시 관리자 확인 후 적립금이지급됩니다.<br />
            - 리뷰작성은 구매확정일로부터 90일까지 가능합니다.<br />
          </div>
        </div>

        {/* 리뷰 작성 탭에 해당하는 내용 */}
        <div 
          className={getClasses([
            styles['tab-content-box'],
            selectedTabValue === 'review-list' ? styles['show'] : styles['hide'],
          ])}>
          <div className={styles['list-row']}>
            <ProductRowItem3 />
          </div>
        </div>

        {/* 리뷰 내역 탭에 해당하는 내용 */}
        <div 
          className={getClasses([
            styles['tab-content-box'],
            selectedTabValue === 'review-history' ? styles['show'] : styles['hide'],
          ])}>
          
        </div>
      </WindowSizeContainer>
    </>
  );
};

export default LoginPage;