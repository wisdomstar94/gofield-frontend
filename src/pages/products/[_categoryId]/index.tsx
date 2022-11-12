import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import CategoryTypeHorizontalList from "../../../components/boxes/category-type-horizontal-list/category-type-horizontal-list.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";
import ModalSearch from "../../../components/modals/modal-search/modal-search.component";
import { IModalSearch } from "../../../components/modals/modal-search/modal-search.interface";
import { useProductCategoryValueItems } from "../../../hooks/use-api-hook/use-api.hook";
import useCategoryListTypeQuery from "../../../hooks/use-queries/use-category-type-list.query";

const ProductsPage = () => {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState('');
  const productCategoryValueItems = useProductCategoryValueItems();
  const modalSearchRef = useRef<IModalSearch.RefObject>(null);
  
  const categoryTypeListQuery = useCategoryListTypeQuery(categoryId);
  useEffect(() => {
    // console.log('categoryTypeListQuery', categoryTypeListQuery);
  }, [categoryTypeListQuery]);

  const searchButtonClick = useCallback(() => {
    modalSearchRef.current?.getModal()?.show();
  }, []);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (typeof router.query._categoryId === 'string') {
      setCategoryId(router.query._categoryId);
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
          __activeValue="etc" />

        <ModalSearch ref={modalSearchRef} __modalState="hide" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductsPage;