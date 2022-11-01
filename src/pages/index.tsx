import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import AccessTokenCheck from '../components/auth/access-token-check/access-token-check.component';
import BannerBox from '../components/boxes/banner-box/banner-box.component';
import CategoryButtonListBox from '../components/boxes/category-button-list-box/category-button-list-box.component';
import ProductColumnItem from '../components/forms/product-column-item/product-column-item.component';
import Article from '../components/layouts/article/article.component';
import BothSidebox from '../components/layouts/both-side-box/both-side-box.component';
import HorizontalScrollBox from '../components/layouts/horizontal-scroll-box/horizontal-scroll-box.component';
import List, { ListItem } from '../components/layouts/list/list.component';
import Topbar from '../components/layouts/top-bar/top-bar.component';
import WindowSizeContainer from '../components/layouts/window-size-container/window-size-container.component';

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

  return (
    <>
      <WindowSizeContainer __bgColor="#f7f8f9">
        <Topbar
          __layoutTypeB={{
            // titleComponent: <>x타이틀</>,
          }} />
        <BannerBox />
        <CategoryButtonListBox __style={{ marginBottom: '8px' }} />
        <Article __style={{ marginBottom: '8px' }}>
          <BothSidebox
            __leftComponent={<>
              <span style={{ fontSize: '0.9rem', color: '#1e2238', fontWeight: 'bold' }}>인기상품</span>
            </>}
            __rightComponent={<>
              <Link href="#">
                <a style={{ fontSize: '0.8rem', color: '#1e2238', fontWeight: 'bold' }}>더보기 &gt;</a>
              </Link>
            </>} />
          <HorizontalScrollBox>
            <ProductColumnItem
              __style={{ width: '150px' }}
              __brandNameComponent={<>맥켄리</>}
              __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
              __infoTypeA={{
                newProductPrice: 560000,
                oldProductPrice: 210000,
                reviewCount: 3,
                reviewStarPoint: 4.7,
              }} />
          </HorizontalScrollBox>
        </Article>
      </WindowSizeContainer>
    </>
  );
};

export default Home
