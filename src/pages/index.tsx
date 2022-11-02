import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useState } from 'react';
import AccessTokenCheck from '../components/auth/access-token-check/access-token-check.component';
import BannerBox from '../components/boxes/banner-box/banner-box.component';
import CategoryButtonListBox from '../components/boxes/category-button-list-box/category-button-list-box.component';
import ProductColumnItem from '../components/forms/product-column-item/product-column-item.component';
import Article from '../components/layouts/article/article.component';
import BothSidebox from '../components/layouts/both-side-box/both-side-box.component';
import HorizontalScrollBox from '../components/layouts/horizontal-scroll-box/horizontal-scroll-box.component';
import Topbar from '../components/layouts/top-bar/top-bar.component';
import WindowSizeContainer from '../components/layouts/window-size-container/window-size-container.component';
import styled from 'styled-components';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 메인</title>
        <meta name="description" content="고필드 메인 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  )
};

const PageContents = () => {
  const [popularityProductList, setPopularityProductList] = useState([1, 2, 3, 4, 5]);
  const [recommendProductList, setRecommendProductList] = useState([1, 2, 3, 4, 5]);
  const [recentOldProductList, setRecentOldProductList] = useState([1, 2, 3, 4, 5]);

  return (
    <>
      <WindowSizeContainer __bgColor="#f7f8f9">
        <Topbar
          __layoutTypeB={{
            // titleComponent: <>x타이틀</>,
          }} />
        <BannerBox />
        <CategoryButtonListBox __style={{ marginBottom: '8px' }} />
        <Article __style={{ marginBottom: '8px', padding: '0 0 24px 0' }}>
          <StyleIn.ArticleTopRow>
            <BothSidebox
              __leftComponent={<>
                <StyleIn.ProductTypeTitleText>인기 상품</StyleIn.ProductTypeTitleText>
              </>}
              __rightComponent={<>
                <Link href="#">
                  <StyleIn.MoreViewButtonText>더보기 &gt;</StyleIn.MoreViewButtonText>
                </Link>
              </>} />
          </StyleIn.ArticleTopRow>
          <HorizontalScrollBox>
            <StyleIn.EmptyColumn />
            {
              popularityProductList.map((item, index) => {
                return (
                  <ProductColumnItem key={index} __style={{ width: '150px' }}
                    __brandNameComponent={<>맥켄리</>}
                    __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
                    __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
                )
              })
            }
            <StyleIn.EmptyColumn />
          </HorizontalScrollBox>
        </Article>
        <Article __style={{ marginBottom: '8px', padding: '0 0 24px 0' }}>
          <StyleIn.ArticleTopRow>
            <BothSidebox
              __leftComponent={<>
                <StyleIn.ProductTypeTitleText>추천 상품</StyleIn.ProductTypeTitleText>
              </>}
              __rightComponent={<>
                <Link href="#">
                  <StyleIn.MoreViewButtonText>더보기 &gt;</StyleIn.MoreViewButtonText>
                </Link>
              </>} />
          </StyleIn.ArticleTopRow>
          <HorizontalScrollBox>
            <StyleIn.EmptyColumn />
            {
              recommendProductList.map((item, index) => {
                return (
                  <ProductColumnItem key={index} __style={{ width: '150px' }}
                    __brandNameComponent={<>맥켄리</>}
                    __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
                    __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
                )
              })
            }
            <StyleIn.EmptyColumn />
          </HorizontalScrollBox>
        </Article>
        <Article __style={{ marginBottom: '8px', padding: '0 0 24px 0' }}>
          <StyleIn.ArticleTopRow>
            <BothSidebox
              __leftComponent={<>
                <StyleIn.ProductTypeTitleText>최근 등록된 중고 상품</StyleIn.ProductTypeTitleText>
              </>}
              __rightComponent={<>
                <Link href="#">
                  <StyleIn.MoreViewButtonText>더보기 &gt;</StyleIn.MoreViewButtonText>
                </Link>
              </>} />
          </StyleIn.ArticleTopRow>
          <HorizontalScrollBox>
            <StyleIn.EmptyColumn />
            {
              recentOldProductList.map((item, index) => {
                return (
                  <ProductColumnItem key={index} __style={{ width: '150px' }}
                    __brandNameComponent={<>맥켄리</>}
                    __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
                    __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
                )
              })
            }
            <StyleIn.EmptyColumn />
          </HorizontalScrollBox>
        </Article>
      </WindowSizeContainer>
    </>
  );
};

const StyleIn = {
  ArticleTopRow: styled.div`
    width: 100%;
    display: block;
    padding: 24px;
    padding-bottom: 0;
    box-sizing: border-box;
  `,
  ProductTypeTitleText: styled.span`
    display: inline-flex;
    font-size: 0.9rem;
    color: #1e2238;
    font-weight: bold;
  `,
  MoreViewButtonText: styled.span`
    display: inline-flex;
    font-size: 0.8rem;
    color: #1e2238;
    font-weight: bold;
  `,
  EmptyColumn: styled.div`
    width: 24px;
    height: 1px;
    display: inline-flex;
  `,
};

export default Home
