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
import useItemCategoryBundleProductListApi from "../../../hooks/use-apis/use-item-category-bundle-product-list.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import useCodeSubCategoryListQuery from "../../../hooks/use-queries/use-code-sub-category-list.query";
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

  const isGettingListRef = useRef(false);
  const isNotMoreDataRef = useRef(false);
  const [list, setList] = useState<IItem.BundleProductItem[]>([]);
  const [page, setPage] = useState(1);
  const [size, seSize] = useState(20);
  const [categoryId, setCategoryId] = useState('');
  const [categoryTypeId, setCategoryTypeId] = useState('');

  const codeSubCategoryListQuery = useCodeSubCategoryListQuery(router.query._categoryId?.toString());
  const productCategoryListQuery = useProductCategoryListQuery();

  const itemCategoryBundleProductListApi = useItemCategoryBundleProductListApi();

  const categoryTypeItemClick = useCallback((valueItem: ICommon.ValueItem) => {
    isNotMoreDataRef.current = false;
    setPage(1);
    setList([]);
    setCategoryTypeId(valueItem.value);
  }, []);

  const productGroupColumnItemClick = useCallback((item: IItem.BundleProductItem) => {
    router.push('/productGroup/' + item.id);
  }, [router]);

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query._categoryId?.toString() !== undefined) {
      setCategoryId(router.query._categoryId?.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (!codeSubCategoryListQuery.isFetched) {
      return;
    }

    if (codeSubCategoryListQuery.data !== undefined) {
      if (codeSubCategoryListQuery.data[0]?.value !== undefined) {
        console.log('@@@');
        setCategoryTypeId(codeSubCategoryListQuery.data[0]?.value + '');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeSubCategoryListQuery.isFetched])

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, categoryId, categoryTypeId]);

  const getList = useCallback(() => {
    if (isGettingListRef.current) {
      return;
    }

    if (page === 0) return;
    if (size === 0) return;
    if (categoryId === '') return;
    if (categoryTypeId === '') return;

    isGettingListRef.current = true;
    const query = {
      page: page.toString(), size: size.toString(), categoryId, subCategoryId: categoryTypeId
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

      setList(list.concat(response.data.data));
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [categoryId, categoryTypeId, itemCategoryBundleProductListApi, list, modalAlert, page, size]);

  const onScroll = useCallback((info: IScrollCheckHook.ScrollInfo) => {
    if (isGettingListRef.current || isNotMoreDataRef.current) {
      return;
    }

    if (info.isLastScrollArea) {
      setPage(page + 1);
    }
  }, [page]);

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
          __activeValue={categoryTypeId}
          __onItemClick={categoryTypeItemClick} />
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
              list.map((item, index) => {
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