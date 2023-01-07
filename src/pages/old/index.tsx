import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import ProductColumnItem from "../../components/boxes/product-column-item/product-column-item.component";
import ViewFilterBox from "../../components/boxes/view-filter-box/view-filter-box.component";
import ProductGroupColumnItem from "../../components/boxes/product-group-column-item/product-group-column-item.component";
import Article from "../../components/layouts/article/article.component";
import BothSidebox from "../../components/layouts/both-side-box/both-side-box.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import GridList from "../../components/layouts/grid-list/grid-list.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import { IModalBottomViewOptions } from "../../components/modals/modal-bottom-view-options/modal-bottom-view-options.interface";
import useItemListApi from "../../hooks/use-apis/use-item-list.api";
import useEnumUsedItemSortListQuery from "../../hooks/use-queries/use-enum-used-item-sort-list.query";
import { IScrollCheckHook } from "../../hooks/use-scroll-check/use-scroll-check.interface";
import { IItem } from "../../interfaces/item/item.interface";
import { getNextRouterQueryToUrlQueryString } from "../../librarys/string-util/string-util.library";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드(gofield) - 중고상품</title>
        <meta name="title" content="고필드(gofield) - 중고상품" />
        <meta name="description" content="고필드(gofield) 중고상품 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="not-login-or-sign-true">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  const router = useRouter();
  const itemListApi = useItemListApi();
  const enumUsedItemSortListQuery = useEnumUsedItemSortListQuery();
  const isGettingListRef = useRef(false);
  const isNoneMoreDataRef = useRef(false);

  useEffect(() => {
    if (!enumUsedItemSortListQuery.isFetched) {
      return;
    }

    if (enumUsedItemSortListQuery.data !== undefined) {
      if (typeof enumUsedItemSortListQuery.data[0].value === 'string' && listOptions.sort === '') {
        setListOptions((prev) => {
          const newValue = {
            ...prev,
            sort: enumUsedItemSortListQuery.data[0].value,
          };
          getList(newValue);
          return newValue;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enumUsedItemSortListQuery.isFetched]);

  const [listOptions, setListOptions] = useState<IItem.UsedItemListOptions>({
    page: '1',
    size: '20',
    sort: '',
    list: [],
  });

  const ProductColumnItemClick = useCallback((item: IItem.ProductRowItem) => {
    router.push('/product/old/' + item.itemNumber);
  }, [router]);

  const getList = useCallback((options: IItem.UsedItemListOptions) => {
    if (isGettingListRef.current || isNoneMoreDataRef.current) {
      return;
    }

    if (options.sort === '') return;

    isGettingListRef.current = true;
    console.log('getList.options', options);
    const query = {
      page: options.page,
      size: options.size,
      sort: options.sort,
    };
    itemListApi.getInstance(getNextRouterQueryToUrlQueryString(query)).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      if (response.data.data.length === 0) {
        isNoneMoreDataRef.current = true;
        return;
      } else if (response.data.data.length < Number(listOptions.size)) {
        isNoneMoreDataRef.current = true;
      }

      // setList(list.concat(response.data.data));
      setListOptions((prev) => {
        const newValue = {
          ...prev,
          list: prev.list.concat(response.data.data),
        };
        return newValue;
      });
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [itemListApi, listOptions.size]);

  const onScroll = useCallback((info: IScrollCheckHook.ScrollInfo) => {
    if (isGettingListRef.current || isNoneMoreDataRef.current) {
      return;
    }

    if (info.isLastScrollArea) {
      const nextPage = Number(listOptions.page) + 1;
      setListOptions((prev) => {
        const newValue = {
          ...prev,
          page: nextPage.toString(),
        };
        getList(newValue);
        return newValue;
      })
    }
  }, [getList, listOptions.page]);

  const viewFilterChange = useCallback((info: IModalBottomViewOptions.OutputInfo) => {
    // console.log('viewFilterChange', info);
    isNoneMoreDataRef.current = false;
    setListOptions((prev) => {
      const newValue = {
        ...prev,
        page: '1',
        sort: info.selectedOrderBy + '',
        list: [],
      };
      // console.log('getList 호출했...는데?', newValue);
      getList(newValue);
      return newValue;
    });
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
            __style={{ marginBottom: '12px' }}
            __leftComponentStyle={{ width: '0' }}
            __rightComponentStyle={{ width: '100%' }}
            __leftComponent={<></>}
            __rightComponent={<>
              <ViewFilterBox 
                __optionTypes={['order-by']}
                __selectedOrderBy={listOptions.sort}
                __orderByValueItems={enumUsedItemSortListQuery.data}
                __onChange={viewFilterChange} />
            </>} />
          <GridList>
            {
              listOptions.list.map((item) => {
                return (
                  <ProductColumnItem
                    key={item.itemNumber}
                    __itemId={item.id}
                    __imageUrl={item.thumbnail}
                    __brandNameComponent={item.brandName}
                    __tags={item.tags}
                    __price={item.price}
                    __productNameComponent={item.name}
                    __onClick={() => ProductColumnItemClick(item)}
                    __isHeartLayout={true}
                    __isHeart={item.likeId !== null} />
                  // <ProductGroupColumnItem
                  //   key={item.itemNumber}
                  //   __itemId={item.id}
                  //   __isHeart={item.likeId !== null}
                  //   __imageUrl={item.thumbnail}
                  //   __onClick={() => ProductColumnItemClick(item)}
                  //   __brandNameComponent={<>{ item.brandName }</>}
                  //   __productNameComponent={<>{ item.name }</>}
                  //   __isHeartLayout={true}
                  //   __price={item.price} /> 
                );
              })
            }
          </GridList>
        </Article>
        <div className="w-full h-12"></div>
        <BottomMenuBar __activeMenuId="old-product" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;