import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import CategoryTypeHorizontalList from "../../../components/boxes/category-type-horizontal-list/category-type-horizontal-list.component";
import ViewFilterBox from "../../../components/boxes/view-filter-box/view-filter-box.component";
import ProductGroupColumnItem from "../../../components/forms/product-group-column-item/product-group-column-item.component";
import Article from "../../../components/layouts/article/article.component";
import BothSidebox from "../../../components/layouts/both-side-box/both-side-box.component";
import GridList from "../../../components/layouts/grid-list/grid-list.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import { ITopbar } from "../../../components/layouts/top-bar/top-bar.interface";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";
import { IModalBottomViewOptions } from "../../../components/modals/modal-bottom-view-options/modal-bottom-view-options.interface";
import useItemCategoryBundleProductListApi from "../../../hooks/use-apis/use-item-category-bundle-product-list.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import useCodeSubCategoryListQuery from "../../../hooks/use-queries/use-code-sub-category-list.query";
import useEnumBundleItemSortListQuery from "../../../hooks/use-queries/use-enum-bundle-item-sort-list.query";
import useProductCategoryListQuery from "../../../hooks/use-queries/use-product-category-list.query";
import { IScrollCheckHook } from "../../../hooks/use-scroll-check/use-scroll-check.interface";
import { ICommon } from "../../../interfaces/common/common.interface";
import { IItem } from "../../../interfaces/item/item.interface";
import { getNextRouterQueryToUrlQueryString } from "../../../librarys/string-util/string-util.library";

const ProductGroupsPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 카테고리 묶음상품 목록</title>
        <meta name="description" content="고필드 카테고리 묶음상품 목록 페이지입니다." />
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
  const modalAlert = useModalAlert();
  const topbarRef = useRef<ITopbar.RefObject>(null);
  const enumBundleItemSortListQuery = useEnumBundleItemSortListQuery();

  const isGettingListRef = useRef(false);
  const isNotMoreDataRef = useRef(false);
  // const [list, setList] = useState<IItem.BundleProductItem[]>([]);

  const [listOptions, setListOptions] = useState<IItem.BundleProductItemListOptions>({
    page: '1',
    size: '20',
    categoryId: '',
    subCategoryId: '',
    sort: '',
    list: [],
  });
  // const [page, setPage] = useState(1);
  // const [size, seSize] = useState(20);
  // const [categoryId, setCategoryId] = useState('');
  // const [categoryTypeId, setCategoryTypeId] = useState('');

  const codeSubCategoryListQuery = useCodeSubCategoryListQuery(router.query._categoryId?.toString());
  const productCategoryListQuery = useProductCategoryListQuery();

  const itemCategoryBundleProductListApi = useItemCategoryBundleProductListApi();

  const productGroupColumnItemClick = useCallback((item: IItem.BundleProductItem) => {
    router.push('/productGroup/' + item.id);
  }, [router]);

  useEffect(() => {
    if (!router.isReady) return;
    if (typeof router.query._categoryId === 'string' && listOptions.categoryId === '') {
      const categoryId = router.query._categoryId;
      // setCategoryId(router.query._categoryId?.toString());
      setListOptions((prev) => {
        const newValue = {
          ...prev,
          categoryId,
        };
        getList(newValue);
        return newValue;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (!enumBundleItemSortListQuery.isFetched) {
      return;
    }

    if (enumBundleItemSortListQuery.data !== undefined) {
      if (typeof enumBundleItemSortListQuery.data[0].value === 'string' && listOptions.sort === '') {
        setListOptions((prev) => {
          const newValue = {
            ...prev,
            sort: enumBundleItemSortListQuery.data[0].value,
          };
          getList(newValue);
          return newValue;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enumBundleItemSortListQuery.isFetched]);

  useEffect(() => {
    if (!codeSubCategoryListQuery.isFetched) {
      return;
    }

    if (codeSubCategoryListQuery.data !== undefined) {
      if (codeSubCategoryListQuery.data[0]?.value !== undefined && listOptions.subCategoryId === '') {
        const subCategoryId = codeSubCategoryListQuery.data[0].value;

        setListOptions((prev) => {
          const newValue = {
            ...prev,
            subCategoryId,
          };
          getList(newValue);
          return newValue; 
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeSubCategoryListQuery.isFetched])

  const getList = useCallback((options: IItem.BundleProductItemListOptions) => { 
    if (isGettingListRef.current) {
      return; 
    }

    if (options.page === '') return;
    if (options.size === '') return;
    if (options.categoryId === '') return;
    if (options.subCategoryId === '') return;
    if (options.sort === '') return;

    isGettingListRef.current = true;
    const query = {
      page: options.page, 
      size: options.size, 
      categoryId: options.categoryId, 
      subCategoryId: options.subCategoryId,
      sort: options.sort,
    };
    itemCategoryBundleProductListApi.getInstance(getNextRouterQueryToUrlQueryString(query)).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '목록을 가져오는데 실패하얐습니다.' });
        return;
      }

      if (response.data.data.length === 0) {
        isNotMoreDataRef.current = true;
        return;
      }

      setListOptions((prev) => {
        return {
          ...prev,
          list: prev.list.concat(response.data.data),
        };
      });
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [itemCategoryBundleProductListApi, modalAlert]);

  const categoryTypeItemClick = useCallback((valueItem: ICommon.ValueItem) => {
    isNotMoreDataRef.current = false;
    setListOptions((prev) => {
      const newValue = {
        ...prev,
        page: '1',
        subCategoryId: valueItem.value,
        list: [],
      };
      getList(newValue);
      return newValue;
    });
  }, [getList]);

  const onScroll = useCallback((info: IScrollCheckHook.ScrollInfo) => {
    if (isGettingListRef.current || isNotMoreDataRef.current) {
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
      });
    }
  }, [getList, listOptions.page]);

  const viewFilterChange = useCallback((info: IModalBottomViewOptions.OutputInfo) => {
    if (typeof info.selectedOrderBy === 'string') {
      isNotMoreDataRef.current = false;
      setListOptions((prev) => {
        const newValue = {
          ...prev,
          page: '1',
          sort: info.selectedOrderBy + '',
          list: [],
        };
        getList(newValue);
        return newValue;
      });
    }
  }, [getList]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff" __onScroll={onScroll}>
        <Topbar
          ref={topbarRef}
          __layoutTypeB={{
            titleComponent: productCategoryListQuery.data?.find(x => x.value === router.query._categoryId)?.text,
          }}
          // __onSearchButtonClick={(value) => {topbarRef.current?.searchModalHide(); console.log(value);}} 
          />
        <CategoryTypeHorizontalList
          __valueItems={codeSubCategoryListQuery.data}
          __activeValue={listOptions.subCategoryId}
          __onItemClick={categoryTypeItemClick} />
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
                __orderByValueItems={enumBundleItemSortListQuery.data}
                __onChange={viewFilterChange} />
            </>} />
          <GridList>
            {
              listOptions.list.map((item, index) => {
                return (
                  <ProductGroupColumnItem
                    key={item.id}
                    __onClick={() => productGroupColumnItemClick(item)}
                    __imageUrl={item.thumbnail}
                    __brandNameComponent={<>{ item.brandName }</>}
                    __productNameComponent={<>{ item.name }</>}
                    __newProductPrice={item.newLowestPrice}
                    __oldProductPrice={item.usedLowestPrice}
                    __reviewCount={item.reviewCount}
                    __reviewStarPoint={item.reviewScore} />      
                );
              })
            }
          </GridList>
        </Article>
      </WindowSizeContainer>
    </>
  );
};

export default ProductGroupsPage;