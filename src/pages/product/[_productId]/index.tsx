import { useCallback, useEffect, useRef } from "react";
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

const ProductDetailPage = () => {
  const router = useRouter();
  const modalSearchRef = useRef<IModalSearch.RefObject>(null);

  const searchButtonClick = useCallback(() => {
    modalSearchRef.current?.getModal()?.show();
  }, []);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const productId = router.query._productId;
    console.log('productId', productId);
  }, [router]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: '',
            searchButtonClickCallback: searchButtonClick,
          }} />

        <SwiperCustom __style={{ height: '360px', borderBottom: '1px solid #e9ebee' }}>
          <div style={{ width: '100%', height: '100%' }}>
            <Image
              src="https://cdn.pixabay.com/photo/2018/09/18/09/30/golf-3685616__480.jpg"
              alt="상품 이미지"
              title="상품 이미지"
              layout="fill"
              objectFit="cover" />
          </div>
          <div style={{ width: '100%', height: '100%' }}>
            <Image
              src="https://cdn.pixabay.com/photo/2020/04/29/02/12/golf-5106917__480.jpg"
              alt="상품 이미지"
              title="상품 이미지"
              layout="fill"
              objectFit="cover" />
          </div>
          <div style={{ width: '100%', height: '100%' }}>
            <Image
              src="https://cdn.pixabay.com/photo/2020/04/29/02/12/golf-5106918__480.jpg"
              alt="상품 이미지"
              title="상품 이미지"
              layout="fill"
              objectFit="cover" />
          </div>
        </SwiperCustom>

        <Article __style={{ 
            // borderBottom: '1px solid #e9ebee' 
          }}>
          <List __defaultItemMarginBottom="5px">
            <ListItem>
              <span style={{ fontSize: '0.8rem', color: '#646f7c' }}>맥켄리</span>
            </ListItem>
            <ListItem>
              <span style={{ fontSize: '1rem', color: '#1e2238', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>페르마 플러스 드라이버 헤드 (9.5도 단품)</span>
            </ListItem>
            <ListItem>
              <span style={{ color: '#646f7c', fontSize: '0.7rem', display: 'inline-flex' }}>★ &nbsp;</span> 
              <span style={{ color: '#646f7c', fontSize: '0.7rem', display: 'inline-flex' }}>4.7 (3)</span>
            </ListItem>
            <ListItem>
              <span style={{ display: 'inline-flex', color: '#ff6247', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>
                새상품 최저가 &nbsp;
              </span>
              <span style={{ display: 'inline-flex', color: '#1e2238', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>
                { getAddCommaNumberString({ numberValue: 560000 }) }원
              </span>
            </ListItem>
            <ListItem>
              <span style={{ display: 'inline-flex', color: '#ff6247', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>
                중고상품 최저가 &nbsp;
              </span>
              <span style={{ display: 'inline-flex', color: '#1e2238', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>
                { getAddCommaNumberString({ numberValue: 560000 }) }원
              </span>
            </ListItem>
          </List>
        </Article>

        <NewOrOldProductListBox />

        <Article __style={{ marginBottom: '50px' }}>
          <div style={{ width: '100%', fontSize: '0.9rem', fontWeight: 'bold', color: '#374553', marginBottom: '12px' }}>사용자 총 평점</div>
          <ReviewBox />
        </Article>

        <BottomFixedBox>
          <BuyButton />
        </BottomFixedBox>

        <ModalSearch ref={modalSearchRef} __modalState="hide" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductDetailPage;