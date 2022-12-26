import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import ProductColumnItem from "../../components/boxes/product-column-item/product-column-item.component";
import ViewFilterBox from "../../components/boxes/view-filter-box/view-filter-box.component";
import ProductGroupColumnItem from "../../components/forms/product-group-column-item/product-group-column-item.component";
import Article from "../../components/layouts/article/article.component";
import BothSidebox from "../../components/layouts/both-side-box/both-side-box.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import GridList from "../../components/layouts/grid-list/grid-list.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import useItemLikeListApi from "../../hooks/use-apis/use-item-like-list.api";
import useRender from "../../hooks/use-render/use-render.hook";
import { IScrollCheckHook } from "../../hooks/use-scroll-check/use-scroll-check.interface";
import { IItem } from "../../interfaces/item/item.interface";
import { getNextRouterQueryToUrlQueryString } from "../../librarys/string-util/string-util.library";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 좋아요</title>
        <meta name="description" content="고필드 좋아요 페이지입니다." />
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
  const render = useRender();
  const itemLikeListApi = useItemLikeListApi();

  const isGettingListRef = useRef(false);
  const isNoneMoreDataRef = useRef(false);
  const searchOptionsRef = useRef({
    page: '1',
    size: '20',
  });
  const [list, setList] = useState<IItem.ProductRowItem[]>([]);

  const ProductGroupColumnItemClick = useCallback(() => {
    router.push('/productGroup/33');
  }, [router]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const getList = useCallback(() => {
    if (isGettingListRef.current || isNoneMoreDataRef.current) {
      return;
    }

    isGettingListRef.current = true;
    itemLikeListApi.getInstance(getNextRouterQueryToUrlQueryString({ ...searchOptionsRef.current })).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      if (response.data.data.length === 0) {
        isNoneMoreDataRef.current = true;
        render.render();
        return;
      } else if (response.data.data.length < Number(searchOptionsRef.current.size)) {
        isNoneMoreDataRef.current = true;
      }

      setList(list.concat(response.data.data));
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [itemLikeListApi, list, render]);

  const ProductColumnItemClick = useCallback((item: IItem.ProductRowItem) => {
    if (item.classification === 'NEW') {
      router.push('/product/new/' + item.itemNumber);
    } else {
      router.push('/product/old/' + item.itemNumber);
    }
  }, [router]);

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
            titleComponent: '좋아요',
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
          {
            list.length === 0 ? 
            <div className="w-full relative px-6 py-12">
              <div className="w-full box-sizing flex justify-center items-center">
                <span className="text-black-b text-sm">좋아요 내역이 없습니다.</span>
              </div>
            </div> : <></>
          }
          <GridList>
            {
              list.map((item) => {
                return (
                  <ProductColumnItem
                    key={item.itemNumber}
                    __itemId={item.id}
                    __imageUrl={item.thumbnail}
                    __brandNameComponent={item.brandName}
                    __price={item.price}
                    __productNameComponent={item.name}
                    __onClick={() => ProductColumnItemClick(item)}
                    __isHeartLayout={true}
                    __isHeart={item.likeId !== null} />
                );
              })
            }
          </GridList>
        </Article>
        <BottomMenuBar __activeMenuId="likes" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;