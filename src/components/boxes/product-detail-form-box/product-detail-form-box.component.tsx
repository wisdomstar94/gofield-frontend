import styles from "./product-detail-form-box.component.module.scss";
import { IProductDetailFormBox } from "./product-detail-form-box.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useRouter } from "next/router";
import useNewOrOldProductOrderByListQuery from "../../../hooks/use-queries/use-new-or-old-product-order-by-list.query";
import { ICommon } from "../../../interfaces/common/common.interface";
import { getAddCommaNumberString, getClasses, getNextRouterQueryToUrlQueryString } from "../../../librarys/string-util/string-util.library";
import Button from "../../forms/button/button.component";
import BuyButton from "../../forms/buy-button/buy-button.component";
import ProductRowItem2 from "../../boxes/product-row-item2/product-row-item2.component";
import SwiperCustom from "../../forms/swiper-custom/swiper-custom.component";
import Article from "../../layouts/article/article.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import EmptyRow from "../../layouts/empty-row/empty-row.component";
import HorizontalScrollBox from "../../layouts/horizontal-scroll-box/horizontal-scroll-box.component";
import List, { ListItem } from "../../layouts/list/list.component";
import SvgShareIcon from "../../svgs/svg-share-icon/svg-share-icon.component";
import BottomFixedBox from "../bottom-fixed-box/bottom-fixed-box.component";
import HashTagItem from "../hash-tag-item/hash-tag-item.component";
import MenuRowItem from "../menu-row-item/menu-row-item.component";
import ProductDetailImageBox from "../product-detail-image-box/product-detail-image-box.component";
import StrokeTabButtonBox from "../stroke-tab-button-box/stroke-tab-button-box.component";
import TitleAndContentRowItem from "../title-and-content-row-item/title-and-content-row-item.component";
import Image from "next/image";
import ModalBottomProductOptions from "../../modals/modal-bottom-product-options/modal-bottom-product-options.component";
import { IModalBottomProductOptions } from "../../modals/modal-bottom-product-options/modal-bottom-product-options.interface";
import useItemProductDetailApi from "../../../hooks/use-apis/use-item-product-detail.api";
import { IItem } from "../../../interfaces/item/item.interface";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import { goToScroll } from "../../../librarys/client-util/client-util.library";
import useItemProductOtherListApi from "../../../hooks/use-apis/use-item-product-other-list.api";
import useRender from "../../../hooks/use-render/use-render.hook";
import useItemLikeApi from "../../../hooks/use-apis/use-item-like.api";

const ProductDetailFormBox = forwardRef((props: IProductDetailFormBox.Props, ref: ForwardedRef<IProductDetailFormBox.RefObject>) => {
  const virtualScrollContainerElementRef = useRef<HTMLDivElement>(null);
  const productInfoTitleRef = useRef<HTMLDivElement>(null);
  const productDescriptionImageTitleRef = useRef<HTMLDivElement>(null);
  const itemProductDetailApi = useItemProductDetailApi();
  const modalBottomProductOptionsRef = useRef<IModalBottomProductOptions.RefObject>(null);
  const [detailInfo, setDetailInfo] = useState<IItem.ItemDetailInfoApiData>();
  const router = useRouter();
  const modalAlert = useModalAlert();
  const [selectedOrderBy, setSelectedOrderBy] = useState('');
  const newOrOldProductOrderByListQuery = useNewOrOldProductOrderByListQuery();
  const itemProductOtherListApi = useItemProductOtherListApi();
  const render = useRender();
  const itemLikeApi = useItemLikeApi();
  
  const isHeartingRef = useRef(false);

  const isGettingListRef = useRef(false);
  const isNoneMoreDataRef = useRef(false);
  const itemProductOtherListApiSearchOptionsRef = useRef({
    page: '1',
    size: '20',
    classification: 'USED',
  });
  const productOtherListRef = useRef<IItem.ProductRowItem[]>([]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  useEffect(() => {
    productOtherListRef.current = [];

    () => {
      productOtherListRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!router.isReady){
      return;
    }

    getDetailInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const getProductOtherList = useCallback((detailInfo: IItem.ItemDetailInfoApiData | undefined) => {
    if (detailInfo === undefined) return;
    if (isNoneMoreDataRef.current) return;

    itemProductOtherListApi.getInstance(
      detailInfo.bundleId?.toString() + '', 
      detailInfo.id?.toString() + '', 
      getNextRouterQueryToUrlQueryString(itemProductOtherListApiSearchOptionsRef.current),
    ).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      if (response.data.data.length === 0) {
        isNoneMoreDataRef.current = true;
        return;
      }

      if (response.data.data.length < Number(itemProductOtherListApiSearchOptionsRef.current.size)) {
        isNoneMoreDataRef.current = true;
      }

      productOtherListRef.current = productOtherListRef.current.concat(response.data.data);
      render.render();
    });
  }, [itemProductOtherListApi, render]);

  const getDetailInfo = useCallback(() => {
    const itemNumber = router.query._itemNumber?.toString();
    if (itemNumber === undefined) {
      return;
    }

    if (isGettingListRef.current) {
      return;
    }

    isGettingListRef.current = true;
    itemProductDetailApi.getInstance(itemNumber).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '상품 상세 정보를 가져오는데 실패하였습니다.', });
        return;
      }

      setDetailInfo(response.data.data);
      return response.data.data;
    }).then((value) => {
      getProductOtherList(value);
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [getProductOtherList, itemProductDetailApi, modalAlert, router.query._itemNumber]);

  const shareButtonClick = useCallback(() => {

  }, []);

  const onTabClick = useCallback((valueItem: ICommon.ValueItem) => {
    /*
      { text: '상품 정보', value: 'product-info' },
      { text: '상품 설명', value: 'product-description' },
      { text: '상품 문의', value: 'product-question' },
    */

    if (valueItem.value === 'product-info') {
      goToScroll({ scrollContainerElement: virtualScrollContainerElementRef.current?.parentElement, targetElement: productInfoTitleRef.current });
      return;
    }

    if (valueItem.value === 'product-description') {
      goToScroll({ scrollContainerElement: virtualScrollContainerElementRef.current?.parentElement, targetElement: productDescriptionImageTitleRef.current });
      return;
    }

    if (valueItem.value === 'product-question') {
      router.push('/qna/' + detailInfo?.id);
    }
  }, [detailInfo?.id, router]);

  const orderByItemClick = useCallback((valueItem: ICommon.ValueItem) => {
    setSelectedOrderBy(valueItem.value);
  }, []);

  const productRowItemClick = useCallback((item: IItem.ProductRowItem) => {
    router.push('/product/old/' + item.itemNumber);
  }, [router]);

  const buyButtonClick = useCallback(() => {
    modalBottomProductOptionsRef.current?.show();
  }, []);

  const otherProductsMoreViewButtonClick = useCallback(() => {
    if (isGettingListRef.current) return;
    itemProductOtherListApiSearchOptionsRef.current.page = (Number(itemProductOtherListApiSearchOptionsRef.current.page) + 1).toString();
    getProductOtherList(detailInfo);
  }, [detailInfo, getProductOtherList]);

  const onHeartButtonClick = useCallback(() => {
    if (typeof detailInfo?.id !== 'number') {
      return;
    }

    if (isHeartingRef.current) {
      return;
    }

    const currentIsHeart = detailInfo.likeId !== null;

    isHeartingRef.current = true;
    itemLikeApi.getInstance(detailInfo.id, !currentIsHeart).then((response) => {
      if (response.data.status !== true) {
        // ...
        return;
      }

      getDetailInfo();
    }).finally(() => {
      isHeartingRef.current = false;
    });
  }, [detailInfo?.id, detailInfo?.likeId, getDetailInfo, itemLikeApi]);

  return (
    <>
      <div ref={virtualScrollContainerElementRef}></div>
      <SwiperCustom __style={{ height: '360px', borderBottom: '1px solid #e9ebee' }}>
        {
          detailInfo?.images.map((item, index) => {
            return (
              <div style={{ width: '100%', height: '100%' }} key={index}>
                <Image
                  src={item}
                  alt="상품 이미지"
                  title="상품 이미지"
                  layout="fill"
                  objectFit="cover" />
              </div>
            )
          })
        }
      </SwiperCustom>

      <Article __style={{ 
          // borderBottom: '1px solid #e9ebee' 
        }}>
        <List __defaultItemMarginBottom="5px" __direction="vertical" __width="100%">
          <ListItem>
            <span style={{ fontSize: '0.8rem', color: '#646f7c' }}>{ detailInfo?.brandName }</span>
          </ListItem>
          <ListItem>
            <span style={{ fontSize: '1rem', color: '#1e2238', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>{ detailInfo?.name }</span>
          </ListItem>
          {
            // detailInfo?.classification === 'NEW' ? 
            // <ListItem>
            //   <span style={{ color: '#646f7c', fontSize: '0.7rem', display: 'inline-flex' }}>★ &nbsp;</span> 
            //   <span style={{ color: '#646f7c', fontSize: '0.7rem', display: 'inline-flex' }}>{ '파라미터 없음' } ({ '파라미터 없음' })</span>
            // </ListItem> :
            // <ListItem __marginBottom="0"><></></ListItem>
          }
          <ListItem>
            <span style={{ color: '#13162b', fontSize: '1.3rem', display: 'inline-flex', fontWeight: 'bold' }}>{ getAddCommaNumberString({ numberValue: detailInfo?.price }) }원</span> 
          </ListItem>
          <ListItem>
            <BothSidebox
              __leftComponentStyle={{ width: 'calc(100% - 30px)' }}
              __leftComponent={<>
                {
                  detailInfo?.tags.map((item, index) => <HashTagItem key={index}>{ item }</HashTagItem>)
                }
              </>}
              __rightComponentStyle={{ width: '30px' }}
              __rightComponent={<>
                <div style={{ display: 'inline-flex', cursor: 'pointer' }} onClick={shareButtonClick}>
                  <SvgShareIcon />
                </div>
              </>} />
          </ListItem>
        </List>
      </Article>
      <StrokeTabButtonBox
        __valueItems={
          detailInfo?.classification === 'NEW' ? 
          [
            { text: '상품 정보', value: 'product-info' },
            { text: '상품 설명', value: 'product-description' },
            { text: '상품 문의', value: 'product-question' },
          ] : 
          [
            { text: '상품 정보', value: 'product-info' },
            { text: '상품 설명', value: 'product-description' },
          ]
        }
        __onTabClick={onTabClick} />
      <Article>
        <div className={styles['article-title-row']} ref={productInfoTitleRef}>
          상품 정보
        </div>
        <List __width="100%" __direction="vertical" __defaultItemMarginBottom="6px">
          {
            detailInfo?.option.map((item) => {
              return (
                <ListItem key={item.key}>
                  <TitleAndContentRowItem
                    __title={<>{ item.key }</>}
                    __content={<>{ item.value }</>} />
                </ListItem>      
              )
            })
          }
        </List>
      </Article>
      <div className={styles['deco-line']}></div>
      <Article>
        <div className={getClasses([styles['article-title-row'], styles['not-margin-bottom']])} ref={productDescriptionImageTitleRef}> 
          상품 설명
        </div>
      </Article>
      <ProductDetailImageBox __imageUrl={detailInfo?.thumbnail} />
      <MenuRowItem __isEnableTopBorder={true} __onClick={() => { 
        router.push('/qna/' + detailInfo?.id);
       }}>
        상품문의
      </MenuRowItem>
      <MenuRowItem __onClick={() => { router.push('/delivery-exchange-return-notice') }}>
        배송/교환/반품 안내
      </MenuRowItem>
      <Article __style={{ paddingBottom: '0' }}>
        <div className={getClasses([styles['article-title-row'], styles['not-margin-bottom']])}>
          { detailInfo?.classification === 'USED' ? '다른 ' : '' } 중고상품
        </div>
      </Article>
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
          productOtherListRef.current.map((item, index) => {
            return (
              <ProductRowItem2 
                key={index} 
                __style={{ marginBottom: '18px' }} 
                __onClick={() => productRowItemClick(item)}
                __imageUrl={item.thumbnail}
                __brandName={item.brandName}
                __price={item.price}
                __productName={item.name}
                __tags={item.tags} />  
            );
          })
        }
        { !isNoneMoreDataRef.current ? <Button __buttonStyle="gray-stroke" __onClick={otherProductsMoreViewButtonClick}>더보기</Button> : <></> }
      </Article>
      <EmptyRow __style={{ height: '56px' }} />
      <BottomFixedBox>
        <span className="w-full inline-flex">
          <BuyButton __onBuyButtonClick={buyButtonClick} __isHeart={detailInfo?.likeId !== null} __onHeartButtonClick={onHeartButtonClick} />
        </span>
      </BottomFixedBox>
      <ModalBottomProductOptions 
        ref={modalBottomProductOptionsRef} 
        __itemId={detailInfo?.id.toString()}
        __itemNumber={detailInfo?.itemNumber.toString()}
        __price={detailInfo?.price} />
    </>
  );
});
ProductDetailFormBox.displayName = 'ProductDetailFormBox';

export default ProductDetailFormBox;