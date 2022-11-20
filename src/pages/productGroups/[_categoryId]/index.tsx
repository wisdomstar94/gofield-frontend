import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import CategoryTypeHorizontalList from "../../../components/boxes/category-type-horizontal-list/category-type-horizontal-list.component";
import ViewFilterBox from "../../../components/boxes/view-filter-box/view-filter-box.component";
import ProductGroupColumnItem from "../../../components/forms/product-group-column-item/product-group-column-item.component";
import Article from "../../../components/layouts/article/article.component";
import BothSidebox from "../../../components/layouts/both-side-box/both-side-box.component";
import GridList from "../../../components/layouts/grid-list/grid-list.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";
import { useProductCategoryValueItems } from "../../../hooks/use-api-hook/use-api.hook";
import useCategoryListTypeQuery from "../../../hooks/use-queries/use-category-type-list.query";
import { ICommon } from "../../../interfaces/common/common.interface";
import { getNextRouterQueryToUrlQueryString } from "../../../librarys/string-util/string-util.library";

const ProductGroupsPage = () => {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState('');
  const [categoryTypeId, setCategoryTypeId] = useState('');
  const productCategoryValueItems = useProductCategoryValueItems();
  const categoryTypeListQuery = useCategoryListTypeQuery(categoryId);

  const categoryTypeItemClick = useCallback((valueItem: ICommon.ValueItem) => {
    const urlQueryString = getNextRouterQueryToUrlQueryString({
      ...router.query,
      categoryTypeId: valueItem.value,
    });
    setCategoryTypeId(valueItem.value);
    router.push(router.asPath.split('?')[0] + urlQueryString, undefined, { shallow: true });
  }, [router]);

  const ProductGroupColumnItemClick = useCallback(() => {
    router.push('/productGroup/33');
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
          }} />
        <CategoryTypeHorizontalList
          __valueItems={categoryTypeListQuery.data}
          __activeValue={categoryTypeId}
          __onItemClick={categoryTypeItemClick} />
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
      </WindowSizeContainer>
    </>
  );
};

export default ProductGroupsPage;