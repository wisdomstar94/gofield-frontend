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

const ProductDetailPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 묶음상품 상세정보</title>
        <meta name="description" content="고필드 묶음상품 상세정보 페이지입니다." />
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
  const modalSearchRef = useRef<IModalSearch.RefObject>(null);
  const itemBundleProductDetailApi = useItemBundleProductDetailApi();
  const [detailInfo, setDetailInfo] = useState<IItem.BundleProductDetailApiData>();
  // const detailInfoRef = useRef<IItem.BundleProductDetailApiData>();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const _productGroupId = router.query._productGroupId;
    console.log('_productGroupId', _productGroupId);

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

        <SwiperCustom __style={{ height: '360px', borderBottom: '1px solid #e9ebee' }}>
          {
            detailInfo?.images.map((item, index) => {
              return (
                <div style={{ width: '100%', height: '100%' }} key={index}>
                  <Image
                    src={item}
                    draggable={false}
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
          <List __defaultItemMarginBottom="5px">
            <ListItem>
              <span style={{ fontSize: '0.8rem', color: '#646f7c' }}>{ detailInfo?.brandName }</span>
            </ListItem>
            <ListItem>
              <span style={{ fontSize: '1rem', color: '#1e2238', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>{ detailInfo?.name }</span>
            </ListItem>
            <ListItem>
              <span style={{ color: '#646f7c', fontSize: '0.7rem', display: 'inline-flex' }}>★ &nbsp;</span> 
              <span style={{ color: '#646f7c', fontSize: '0.7rem', display: 'inline-flex' }}>{ detailInfo?.reviewScore } ({ detailInfo?.reviewCount })</span>
            </ListItem>
            <ListItem>
              <span style={{ display: 'inline-flex', color: '#ff6247', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>
                새상품 최저가 &nbsp;
              </span>
              <span style={{ display: 'inline-flex', color: '#1e2238', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>
                { getAddCommaNumberString({ numberValue: detailInfo?.newLowestPrice }) }원
              </span>
            </ListItem>
            <ListItem>
              <span style={{ display: 'inline-flex', color: '#ff6247', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>
                중고상품 최저가 &nbsp;
              </span>
              <span style={{ display: 'inline-flex', color: '#1e2238', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>
                { getAddCommaNumberString({ numberValue: detailInfo?.usedLowestPrice }) }원
              </span>
            </ListItem>
          </List>
        </Article>

        <NewOrOldProductListBox __items={detailInfo?.items} />

        <Article __style={{ marginBottom: '0' }}>
          <div style={{ width: '100%', fontSize: '0.9rem', fontWeight: 'bold', color: '#374553', marginBottom: '12px' }}>사용자 총 평점</div>
          <ReviewBox __productGroupDetailInfo={detailInfo} __productGroupId={detailInfo?.id} />
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