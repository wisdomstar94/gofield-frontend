import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import AccessTokenCheck from '../components/auth/access-token-check/access-token-check.component';
import BannerBox from '../components/boxes/banner-box/banner-box.component';
import CategoryButtonListBox from '../components/boxes/category-button-list-box/category-button-list-box.component';
import ProductGroupColumnItem from '../components/forms/product-group-column-item/product-group-column-item.component';
import Article from '../components/layouts/article/article.component';
import BothSidebox from '../components/layouts/both-side-box/both-side-box.component';
import HorizontalScrollBox from '../components/layouts/horizontal-scroll-box/horizontal-scroll-box.component';
import Topbar from '../components/layouts/top-bar/top-bar.component';
import WindowSizeContainer from '../components/layouts/window-size-container/window-size-container.component';
import BottomMenuBar from '../components/layouts/bottom-menu-bar/bottom-menu-bar.component';
import EmptyRow from '../components/layouts/empty-row/empty-row.component';
import ModalSearch from '../components/modals/modal-search/modal-search.component';
import { IModalSearch } from '../components/modals/modal-search/modal-search.interface';
import ArticleTopRow from '../components/layouts/article-top-row/article-top-row.component';
import TextProductTypeTitle from '../components/texts/text-product-type-title/text-product-type-title.component';
import TextMoreViewButton from '../components/texts/text-more-view-button/text-more-view-button.component';
import EmptyColumn from '../components/layouts/empty-column/empty-column.component';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [popularityProductList, setPopularityProductList] = useState([1, 2, 3, 4, 5]);
  const [recommendProductList, setRecommendProductList] = useState([1, 2, 3, 4, 5]);
  const [recentOldProductList, setRecentOldProductList] = useState([1, 2, 3, 4, 5]);

  return (
    <>
      <WindowSizeContainer __bgColor="#f7f8f9">
        <Topbar
          __layoutTypeB={{

          }}
           />
        <BannerBox />
        <CategoryButtonListBox __style={{ marginBottom: '8px' }} />
        <Article __style={{ marginBottom: '8px', padding: '0 0 24px 0' }}>
          <ArticleTopRow>
            <BothSidebox
              __leftComponent={<>
                <TextProductTypeTitle>인기 상품</TextProductTypeTitle>
              </>}
              __rightComponent={<>
                <TextMoreViewButton><Link href="#">더보기 &gt;</Link></TextMoreViewButton>
              </>} />
          </ArticleTopRow>
          <HorizontalScrollBox>
            <EmptyColumn __style={{ width: '24px' }} />
            {
              popularityProductList.map((item, index) => {
                return (
                  <ProductGroupColumnItem key={index} __style={{ width: '150px' }}
                    __onClick={() => { router.push('/productGroup/33') }}
                    __brandNameComponent={<>맥켄리</>}
                    __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
                    __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
                )
              })
            }
            <EmptyColumn __style={{ width: '24px' }} />
          </HorizontalScrollBox>
        </Article>
        <Article __style={{ marginBottom: '8px', padding: '0 0 24px 0' }}>
          <ArticleTopRow>
            <BothSidebox
              __leftComponent={<>
                <TextProductTypeTitle>추천 상품</TextProductTypeTitle>
              </>}
              __rightComponent={<>
                <TextMoreViewButton><Link href="#">더보기 &gt;</Link></TextMoreViewButton>
              </>} />
          </ArticleTopRow>
          <HorizontalScrollBox>
            <EmptyColumn __style={{ width: '24px' }} />
            {
              recommendProductList.map((item, index) => {
                return (
                  <ProductGroupColumnItem key={index} __style={{ width: '150px' }}
                    __onClick={() => { router.push('/productGroup/33') }}
                    __brandNameComponent={<>맥켄리</>}
                    __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
                    __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
                )
              })
            }
            <EmptyColumn __style={{ width: '24px' }} />
          </HorizontalScrollBox>
        </Article>
        <Article __style={{ marginBottom: '8px', padding: '0 0 24px 0' }}>
          <ArticleTopRow>
            <BothSidebox
              __leftComponent={<>
                <TextProductTypeTitle>최근 등록된 중고 상품</TextProductTypeTitle>
              </>}
              __rightComponent={<>
                <TextMoreViewButton><Link href="#">더보기 &gt;</Link></TextMoreViewButton>
              </>} />
          </ArticleTopRow>
          <HorizontalScrollBox>
            <EmptyColumn __style={{ width: '24px' }} />
            {
              recentOldProductList.map((item, index) => {
                return (
                  <ProductGroupColumnItem key={index} __style={{ width: '150px' }}
                    __onClick={() => { router.push('/productGroup/33') }}
                    __brandNameComponent={<>맥켄리</>}
                    __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
                    __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
                )
              })
            }
            <EmptyColumn __style={{ width: '24px' }} />
          </HorizontalScrollBox>
        </Article>
        <EmptyRow __style={{ height: '64px' }} />
        <BottomMenuBar __activeMenuId="home" />
      </WindowSizeContainer>
    </>
  );
};

export default Home
