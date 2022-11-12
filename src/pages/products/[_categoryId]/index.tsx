import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import CategoryTypeHorizontalList from "../../../components/boxes/category-type-horizontal-list/category-type-horizontal-list.component";
import ProductColumnItem from "../../../components/forms/product-column-item/product-column-item.component";
import Article from "../../../components/layouts/article/article.component";
import GridList from "../../../components/layouts/grid-list/grid-list.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";
import ModalSearch from "../../../components/modals/modal-search/modal-search.component";
import { IModalSearch } from "../../../components/modals/modal-search/modal-search.interface";
import { useProductCategoryValueItems } from "../../../hooks/use-api-hook/use-api.hook";
import useCategoryListTypeQuery from "../../../hooks/use-queries/use-category-type-list.query";
import { ICommon } from "../../../interfaces/common/common.interface";
import { getNextRouterQueryToUrlQueryString } from "../../../librarys/string-util/string-util.library";

const ProductsPage = () => {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState('');
  const [categoryTypeId, setCategoryTypeId] = useState('');
  const productCategoryValueItems = useProductCategoryValueItems();
  const modalSearchRef = useRef<IModalSearch.RefObject>(null);
  const categoryTypeListQuery = useCategoryListTypeQuery(categoryId);
  
  const searchButtonClick = useCallback(() => {
    modalSearchRef.current?.getModal()?.show();
  }, []);

  const categoryTypeItemClick = useCallback((valueItem: ICommon.ValueItem) => {
    const urlQueryString = getNextRouterQueryToUrlQueryString({
      ...router.query,
      categoryTypeId: valueItem.value,
    });
    setCategoryTypeId(valueItem.value);
    router.push(router.asPath.split('?')[0] + urlQueryString, undefined, { shallow: true });
  }, [router]);

  useEffect(() => {
    console.log('categoryTypeId 바뀜!', categoryTypeId);
  }, [categoryTypeId]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (typeof router.query._categoryId === 'string') {
      setCategoryId(router.query._categoryId);
    }

    if (typeof router.query.categoryTypeId === 'string') {
      setCategoryTypeId(router.query.categoryTypeId);
    } else {
      setCategoryTypeId('');
    }
  }, [router]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: productCategoryValueItems.find(x => x.value === router.query._categoryId)?.text,
            searchButtonClickCallback: searchButtonClick,
          }} />
        <CategoryTypeHorizontalList
          __valueItems={categoryTypeListQuery.data}
          __activeValue={categoryTypeId}
          __onItemClick={categoryTypeItemClick} />
        <Article>
          <GridList>
            <ProductColumnItem
              __brandNameComponent={<>맥켄리</>}
              __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
              __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
            <ProductColumnItem
              __brandNameComponent={<>맥켄리</>}
              __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
              __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
            <ProductColumnItem
              __brandNameComponent={<>맥켄리</>}
              __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
              __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
            <ProductColumnItem
              __brandNameComponent={<>맥켄리</>}
              __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
              __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
            <ProductColumnItem
              __brandNameComponent={<>맥켄리</>}
              __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
              __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
            <ProductColumnItem
              __brandNameComponent={<>맥켄리</>}
              __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
              __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
              <ProductColumnItem
              __brandNameComponent={<>맥켄리</>}
              __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
              __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
            <ProductColumnItem
              __brandNameComponent={<>맥켄리</>}
              __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
              __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
            <ProductColumnItem
              __brandNameComponent={<>맥켄리</>}
              __productNameComponent={<>페르마 플러스 드라이버 헤드 (9.5도 단품)</>}
              __infoTypeA={{ newProductPrice: 560000, oldProductPrice: 210000, reviewCount: 3, reviewStarPoint: 4.7, }} />
          </GridList>
        </Article>
        <ModalSearch ref={modalSearchRef} __modalState="hide" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductsPage;