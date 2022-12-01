import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import ViewFilterBox from "../../components/boxes/view-filter-box/view-filter-box.component";
import ProductGroupColumnItem from "../../components/forms/product-group-column-item/product-group-column-item.component";
import Article from "../../components/layouts/article/article.component";
import BothSidebox from "../../components/layouts/both-side-box/both-side-box.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import GridList from "../../components/layouts/grid-list/grid-list.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import useItemListApi from "../../hooks/use-apis/use-item-list.api";
import { IScrollCheckHook } from "../../hooks/use-scroll-check/use-scroll-check.interface";
import { IItem } from "../../interfaces/item/item.interface";
import { getNextRouterQueryToUrlQueryString } from "../../librarys/string-util/string-util.library";

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
  const itemListApi = useItemListApi();
  const [list, setList] = useState<IItem.ProductRowItem[]>([]);
  const searchOptionsRef = useRef({
    page: '1',
    size: '20',
    classification: 'USED',
  });
  const isGettingListRef = useRef(false);
  const isNoneMoreDataRef = useRef(false);

  const ProductColumnItemClick = useCallback((item: IItem.ProductRowItem) => {
    router.push('/product/old/' + item.itemNumber);
  }, [router]);

  const getList = useCallback(() => {
    if (isGettingListRef.current || isNoneMoreDataRef.current) {
      return;
    }

    isGettingListRef.current = true;
    itemListApi.getInstance(getNextRouterQueryToUrlQueryString({ ...searchOptionsRef.current })).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      if (response.data.data.length === 0) {
        isNoneMoreDataRef.current = true;
        return;
      } else if (response.data.data.length < Number(searchOptionsRef.current.size)) {
        isNoneMoreDataRef.current = true;
      }

      setList(list.concat(response.data.data));
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [itemListApi, list]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const onScroll = useCallback((info: IScrollCheckHook.ScrollInfo) => {
    if (isGettingListRef.current || isNoneMoreDataRef.current) {
      return;
    }

    if (info.isLastScrollArea) {
      searchOptionsRef.current.page = (Number(searchOptionsRef.current.page) + 1).toString();
      getList()
    }
  }, [getList]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff" __onScroll={onScroll}>
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
              {/* <ViewFilterBox __optionTypes={['order-by']} /> */}
            </>} />
          <GridList>
            {
              list.map((item) => {
                return (
                  <ProductGroupColumnItem
                    key={item.itemNumber}
                    __imageUrl={item.thumbnail}
                    __onClick={() => ProductColumnItemClick(item)}
                    __brandNameComponent={<>{ item.brandName }</>}
                    __productNameComponent={<>{ item.name }</>} /> 
                );
              })
            }

            {/* {
              Array.from({ length: 14 }).map((value, index) => {
                return (
                  <ProductGroupColumnItem
                    key={index}
                    __onClick={ProductGroupColumnItemClick}
                    __brandNameComponent={<>맥켄리</>}
                    __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
                    __newProductPrice={560000}
                    __oldProductPrice={210000}
                    __reviewCount={3}
                    __reviewStarPoint={4.7} />      
                );
              })
            } */}
          </GridList>
        </Article>
        <div className="w-full h-12"></div>
        <BottomMenuBar __activeMenuId="old-product" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;