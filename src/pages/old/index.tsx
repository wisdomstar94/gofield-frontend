import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import ViewFilterBox from "../../components/boxes/view-filter-box/view-filter-box.component";
import ProductGroupColumnItem from "../../components/forms/product-group-column-item/product-group-column-item.component";
import Article from "../../components/layouts/article/article.component";
import BothSidebox from "../../components/layouts/both-side-box/both-side-box.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import GridList from "../../components/layouts/grid-list/grid-list.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 중고상품</title>
        <meta name="description" content="고필드 중고상품 페이지입니다." />
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

  const ProductGroupColumnItemClick = useCallback(() => {
    router.push('/productGroup/33');
  }, [router]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: '중고상품',
            // searchButtonClickCallback: searchButtonClick,
          }} />
        <Article>
          <BothSidebox
            __leftComponentStyle={{ width: '0' }}
            __rightComponentStyle={{ width: '100%' }}
            __leftComponent={<></>}
            __rightComponent={<>
              <ViewFilterBox __optionTypes={['order-by']} />
            </>} />
          <GridList>
            {
              Array.from({ length: 14 }).map((value, index) => {
                return (
                  <ProductGroupColumnItem
                    key={index}
                    __onClick={ProductGroupColumnItemClick}
                    __brandNameComponent={<>맥켄리</>}
                    __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
                    __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />      
                );
              })
            }
          </GridList>
        </Article>
        <BottomMenuBar __activeMenuId="old-product" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;