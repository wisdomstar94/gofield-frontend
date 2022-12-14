import { useCallback, useEffect, useRef, useState } from "react";
import SwiperCustom from "../../../components/forms/swiper-custom/swiper-custom.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";
import ModalSearch from "../../../components/modals/modal-search/modal-search.component";
import { IModalSearch } from "../../../components/modals/modal-search/modal-search.interface";
import Image from 'next/image';
import { useRouter } from "next/router";
import Article from "../../../components/layouts/article/article.component";
import List, { ListItem } from "../../../components/layouts/list/list.component";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";
import StrokeTabButtonBox from "../../../components/boxes/stroke-tab-button-box/stroke-tab-button-box.component";
import { ICommon } from "../../../interfaces/common/common.interface";
import NewOrOldProductListBox from "../../../components/boxes/new-or-old-product-list-box/new-or-old-product-list-box.component";
import ReviewRatingStarBox from "../../../components/boxes/review-rating-star-box/review-rating-star-box.component";
import ReviewRowItem from "../../../components/boxes/review-row-item/review-row-item.component";
import Button from "../../../components/forms/button/button.component";
import ReviewBox from "../../../components/boxes/review-box/review-box.component";
import BottomFixedBox from "../../../components/boxes/bottom-fixed-box/bottom-fixed-box.component";
import BuyButton from "../../../components/forms/buy-button/buy-button.component";
import Head from "next/head";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import useItemBundleProductDetailApi from "../../../hooks/use-apis/use-item-bundle-product-detail.api";
import { IItem } from "../../../interfaces/item/item.interface";
import styles from './index.module.scss';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import NotResultBox from "../../../components/boxes/not-result-box/not-result-box.component";
import useImageManager from "../../../hooks/use-image-manager/use-image-manager.hook";
import ImageBox from "../../../components/boxes/image-box/image-box.component";
import useClientManager from "../../../hooks/use-client-manager/use-client-manager.hook";
import ReviewRatingStarsV2 from "../../../components/boxes/review-rating-stars-v2/review-rating-stars-v2.component";

const ProductDetailPage = () => {
  return (
    <>
      <Head>
        <title>????????? - ???????????? ????????????</title>
        <meta name="description" content="????????? ???????????? ???????????? ??????????????????." />
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
  const imageManager = useImageManager();
  const clientManager = useClientManager();
  const modalSearchRef = useRef<IModalSearch.RefObject>(null);
  const itemBundleProductDetailApi = useItemBundleProductDetailApi();
  const [detailInfo, setDetailInfo] = useState<IItem.BundleProductDetailApiData>();
  // const detailInfoRef = useRef<IItem.BundleProductDetailApiData>();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const _productGroupId = router.query._productGroupId;
    // console.log('_productGroupId', _productGroupId);

    if (typeof _productGroupId?.toString() !== 'string') {
      return;
    }

    itemBundleProductDetailApi.getInstance(_productGroupId?.toString()).then((response) => {
      setDetailInfo(response.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: '',
          }} />

        <div className={styles['product-images-row']}>
          {
            Array.isArray(detailInfo?.images) && (detailInfo?.images.length ?? 0) > 0 ? 
            <Swiper
              navigation
              pagination={{ clickable: true }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              autoplay={{ delay: 3000 }}
              >
              {
                detailInfo?.images.map((item, index) => {
                  return (
                    <SwiperSlide 
                      key={index}>
                      <div className={styles['product-image-item']}>
                        <ImageBox
                          mode="pure"
                          priority={true}
                          src={imageManager.getImageUrl(item, `?s=${clientManager.getWindowSizeContainerWidth()}x${clientManager.getWindowSizeContainerWidth()}&t=crop&q=100&f=webp`)}
                          alt={'?????? ?????????'}
                          title={'?????? ?????????'}
                          fill={true}
                          sizes="100%"
                          draggable={false}
                          placeholder="blur"
                          blurDataURL="/images/loading-files.gif"
                          style={{
                            objectFit: 'cover',
                          }} />
                      </div>
                    </SwiperSlide>
                  );
                })
              }
            </Swiper> :
            <NotResultBox>
              ????????? ?????? ???????????? ????????????.
            </NotResultBox>
          }
        </div>

        <Article __style={{ 
            // borderBottom: '1px solid #e9ebee' 
          }}>
          <List __defaultItemMarginBottom="5px">
            <ListItem>
              <span style={{ fontSize: '0.8rem', color: '#646f7c' }}>{ detailInfo?.brandName }</span>
            </ListItem>
            <ListItem>
              <span style={{ fontSize: '1rem', color: '#1e2238', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>{ detailInfo?.name }</span>
            </ListItem>
            <ListItem>
              {/* <span style={{ color: '#646f7c', fontSize: '0.7rem', display: 'inline-flex' }}>??? &nbsp;</span>  */}
              <ReviewRatingStarsV2
                __style={{ 'width': 'auto', marginRight: '4px' }}
                __isSmallStar={true}
                __reviewScore={detailInfo?.reviewScore}
                __isAllowScoreControl={false} />
              <span style={{ color: '#646f7c', fontSize: '0.7rem', display: 'inline-flex' }}>{ detailInfo?.reviewScore } ({ detailInfo?.reviewCount })</span>
            </ListItem>
            <ListItem>
              <span style={{ display: 'inline-flex', color: '#ff6247', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>
                ????????? ????????? &nbsp;
              </span>
              <span style={{ display: 'inline-flex', color: '#1e2238', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>
                { getAddCommaNumberString({ numberValue: detailInfo?.newLowestPrice }) }???
              </span>
            </ListItem>
            <ListItem>
              <span style={{ display: 'inline-flex', color: '#ff6247', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>
                ???????????? ????????? &nbsp;
              </span>
              <span style={{ display: 'inline-flex', color: '#1e2238', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>
                { getAddCommaNumberString({ numberValue: detailInfo?.usedLowestPrice }) }???
              </span>
            </ListItem>
          </List>
        </Article>

        <NewOrOldProductListBox
          __bundleId={detailInfo?.id.toString()}
          __allItemCount={detailInfo?.allItemCount}
          __newItemCount={detailInfo?.newItemCount}
          __usedItemCount={detailInfo?.usedItemCount} />

        <Article __style={{ marginBottom: '0' }}>
          <div style={{ width: '100%', fontSize: '0.9rem', fontWeight: 'bold', color: '#374553', marginBottom: '12px' }}>????????? ??? ??????</div>
          <ReviewBox __productGroupDetailInfo={detailInfo} __bundleId={detailInfo?.id.toString() ?? ''} />
        </Article>

        {/* <BottomFixedBox>
          <BuyButton />
        </BottomFixedBox> */}

        {/* <ModalSearch ref={modalSearchRef} __modalState="hide" /> */}
      </WindowSizeContainer>
    </>
  );
};

export default ProductDetailPage;