import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import useNewOrOldProductOrderByListQuery from "../../../hooks/use-queries/use-new-or-old-product-order-by-list.query";
import { ICommon } from "../../../interfaces/common/common.interface";
import { getClasses, getNextRouterQueryToUrlQueryString } from "../../../librarys/string-util/string-util.library";
import Button from "../../forms/button/button.component";
import ProductRowItem from "../product-row-item/product-row-item.component";
import ProductRowItem2 from "../../boxes/product-row-item2/product-row-item2.component";
import Article from "../../layouts/article/article.component";
import HorizontalScrollBox from "../../layouts/horizontal-scroll-box/horizontal-scroll-box.component";
import StrokeTabButtonBox from "../stroke-tab-button-box/stroke-tab-button-box.component";
import styles from "./new-or-old-product-list-box.component.module.scss";
import { INewOrOldProductListBox } from "./new-or-old-product-list-box.interface";
import { IItem } from "../../../interfaces/item/item.interface";
import useBundleItemListApi from "../../../hooks/use-apis/use-bundle-item-list.api";
import PaginationBox from "../pagination-box/pagination-box.component";
import { IPaginationBox } from "../pagination-box/pagination-box.interface";

const NewOrOldProductListBox = (props: INewOrOldProductListBox.Props) => {
  const router = useRouter();
  const isGettingListRef = useRef(false);
  const paginationBoxRef = useRef<IPaginationBox.RefObject>(null);
  const bundleItemListApi = useBundleItemListApi();

  const [allItemCount, setAllItemCount] = useState(props.__allItemCount);
  useEffect(() => { setAllItemCount(props.__allItemCount) }, [props.__allItemCount]);

  const [newItemCount, setNewItemCount] = useState(props.__newItemCount);
  useEffect(() => { setNewItemCount(props.__newItemCount) }, [props.__newItemCount]);

  const [usedItemCount, setUsedItemCount] = useState(props.__usedItemCount);
  useEffect(() => { setUsedItemCount(props.__usedItemCount) }, [props.__usedItemCount]);

  // const [items, setItems] = useState(props.__items);
  // useEffect(() => { setItems(props.__items); }, [props.__items]);
  // const [classification, setClassification] = useState<IItem.Classification>('ALL');
  // const [selectedOrderBy, setSelectedOrderBy] = useState('');
  // const newOrOldProductOrderByListQuery = useNewOrOldProductOrderByListQuery();

  const [listOptions, setListOptions] = useState<IItem.NewOrOldItemListOptions>({
    bundleId: '',
    page: '1',
    size: '5',
    classification: 'ALL',
    list: [],
  });

  const getList = useCallback((options: IItem.NewOrOldItemListOptions) => {
    if (isGettingListRef.current) {
      return;
    }

    if (typeof options.bundleId !== 'string' || options.bundleId === '') {
      return;
    }

    isGettingListRef.current = true;
    const query = {
      page: options.page,
      size: options.size,
      classification: options.classification === 'ALL' ? '' : options.classification,
    };
    bundleItemListApi.getInstance(options.bundleId, getNextRouterQueryToUrlQueryString(query)).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      setListOptions(prev => {
        const newValue = {
          ...prev,
          list: response.data.data.list,
        };
        return newValue;
      });
      paginationBoxRef.current?.setPage(response.data.data.page);
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [bundleItemListApi]);

  useEffect(() => {
    if (props.__bundleId === undefined) {
      return;
    }

    setListOptions(prev => {
      const newValue = {
        ...prev,
        bundleId: props.__bundleId ?? '',
      };
      getList(newValue);
      return newValue;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.__bundleId]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    getList(listOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const onProductTypeTabClick = useCallback((valueItem: ICommon.ValueItem) => {
    setListOptions(prev => {
      const newValue = {
        ...prev,
        page: '1',
        classification: valueItem.value as IItem.Classification,
      };
      getList(newValue);
      return newValue;
    });
  }, [getList]);

  const productRowItemClick = useCallback((item: IItem.ProductRowItem) => {
    if (item.classification === 'USED') {
      router.push('/product/old/' + item.itemNumber);
    } else {
      router.push('/product/new/' + item.itemNumber);
    }
  }, [router]);

  const onPageClick = useCallback((page: number) => {
    setListOptions(prev => {
      const newValue = {
        ...prev,
        page: page.toString(),
      };
      getList(newValue);
      return newValue;
    });
  }, [getList]);

  return (
    <>
      <StrokeTabButtonBox
        __valueItems={[
          { text: `전체상품 (${allItemCount})`, value: 'ALL' },
          { text: `새상품 (${newItemCount})`, value: 'NEW' },
          { text: `중고상품 (${usedItemCount})`, value: 'USED' },
        ]}
        __activeValue="ALL"
        __onTabClick={onProductTypeTabClick} />

      {/* <HorizontalScrollBox>
        <ul className={styles['order-by-item-list']}>
          {
            newOrOldProductOrderByListQuery.data?.map((item, index) => {
              return (
                <li key={item.value}
                  className={getClasses([styles['item'], item.value === selectedOrderBy ? styles['active'] : ''])}
                  onClick={e => orderByItemClick(item)}>
                  { item.text }
                </li>
              )
            })
          }
        </ul>
      </HorizontalScrollBox> */}

      <Article __style={{ paddingTop: '12px', paddingBottom: '12px' }}>
        {
          listOptions.list.map((item, index) => {
            return (
              <ProductRowItem2 
                key={item.itemNumber} 
                __imageUrl={item.thumbnail}
                __brandName={item.brandName}
                __productName={item.name}
                __price={item.price}
                __tags={item.tags}
                __style={{ marginBottom: '18px' }} 
                __onClick={() => productRowItemClick(item)} />    
            );
          })
        }
        {/* <Button __buttonStyle="gray-stroke">더보기</Button> */}
        <div className="w-full flex flex-wrap justify-center">
          <PaginationBox 
            ref={paginationBoxRef}
            __onPageClick={onPageClick} />
        </div>  
      </Article>
    </>
  );
};

export default NewOrOldProductListBox;