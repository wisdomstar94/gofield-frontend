import styles from './product-group-column-item.component.module.scss';
import { IProductGroupColumnItem } from "./product-group-column-item.interface";
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from "react";
import SvgHeartOnIcon from "../../svgs/svg-heart-on-icon/svg-heart-on-icon.component";
import SvgHeartOffIcon from "../../svgs/svg-heart-off-icon/svg-heart-off-icon.component";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";
import useItemLikeApi from '../../../hooks/use-apis/use-item-like.api';
import useUser from '../../../hooks/use-user-hook/use-user.hook';
import { useRouter } from 'next/router';
import { IModalSignupNotice } from '../../modals/modal-signup-notice/modal-signup-notice.interface';
import ModalSignupNotice from '../../modals/modal-signup-notice/modal-signup-notice.component';
import useImageManager from '../../../hooks/use-image-manager/use-image-manager.hook';
import useClientManager from '../../../hooks/use-client-manager/use-client-manager.hook';

const ProductGroupColumnItem = (props: IProductGroupColumnItem.Props) => {
  const user = useUser();
  const router = useRouter();
  const imageManager = useImageManager();
  const clientManager = useClientManager();
  const modalSignupNoticeRef = useRef<IModalSignupNotice.RefObject>(null);

  const [itemId, setItemId] = useState(props.__itemId);
  useEffect(() => { setItemId(props.__itemId) }, [props.__itemId]);

  const [imageUrl, setImageUrl] = useState(props.__imageUrl);
  useEffect(() => { setImageUrl(props.__imageUrl) }, [props.__imageUrl]);

  const [isHeart, setIsHeart] = useState(props.__isHeart);
  useEffect(() => { setIsHeart(props.__isHeart) }, [props.__isHeart]);

  const [isHeartLayout, setIsHeartLayout] = useState(props.__isHeartLayout);
  useEffect(() => { setIsHeartLayout(props.__isHeartLayout) }, [props.__isHeartLayout]);

  const [brandNameComponent, setBrandNameComponent] = useState(props.__brandNameComponent);
  useEffect(() => { setBrandNameComponent(props.__brandNameComponent) }, [props.__brandNameComponent]);

  const [productNameComponent, setProductNameComponent] = useState(props.__productNameComponent);
  useEffect(() => { setProductNameComponent(props.__productNameComponent) }, [props.__productNameComponent]);

  const [newProductPrice, setNewProductPrice] = useState(props.__newProductPrice);
  useEffect(() => { setNewProductPrice(props.__newProductPrice) }, [props.__newProductPrice]);

  const [oldProductPrice, setOldProductPrice] = useState(props.__oldProductPrice);
  useEffect(() => { setOldProductPrice(props.__oldProductPrice) }, [props.__oldProductPrice]);

  const [price, setPrice] = useState(props.__price);
  useEffect(() => { setPrice(props.__price) }, [props.__price]);

  const [reviewCount, setReviewCount] = useState(props.__reviewCount);
  useEffect(() => { setReviewCount(props.__reviewCount) }, [props.__reviewCount]);

  const [reviewStarPoint, setReviewStarPoint] = useState(props.__reviewStarPoint);
  useEffect(() => { setReviewStarPoint(props.__reviewStarPoint) }, [props.__reviewStarPoint]);

  const isHeartingRef = useRef(false);
  const itemLikeApi = useItemLikeApi();
  // const [isShowNewOrOldPrice, setIsShowNewOrOldPrice] = useState(props.__isShowNewOrOldPrice);
  // useEffect(() => { setIsShowNewOrOldPrice(props.__isShowNewOrOldPrice) }, [props.__isShowNewOrOldPrice]);  

  // const [isShowReviewInfo, setIsShowReviewInfo] = useState(props.__isShowReviewInfo);
  // useEffect(() => { setIsShowReviewInfo(props.__isShowReviewInfo) }, [props.__isShowReviewInfo]);  

  // const [isShowPrice, setIsShowPrice] = useState(props.__isShowPrice);
  // useEffect(() => { setIsShowPrice(props.__isShowPrice) }, [props.__isShowPrice]);  

  const itemClick = useCallback(() => {
    if (typeof props.__onClick === 'function') {
      props.__onClick();
    }
  }, [props]);

  const heartIconClick = useCallback(() => {
    if (!user.isLogined()) {
      modalSignupNoticeRef.current?.show();
      return;
    }

    if (itemId === undefined) {
      return;
    }
    
    if (isHeartingRef.current) {
      return;
    }

    isHeartingRef.current = true;
    itemLikeApi.getInstance(itemId, !isHeart).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      setIsHeart(!isHeart);
    }).finally(() => {
      isHeartingRef.current = false;
    });
  }, [isHeart, itemId, itemLikeApi, user]);

  return (
    <>
      <div className={styles['container']} style={props.__style}>
        <div className={styles['image-area']}>
          {/* blur 이미지 출저 : https://lottiefiles.com/99297-loading-files */}
          {
            typeof imageUrl === 'string' ? 
            <Image
              onClick={itemClick}
              src={imageManager.getImageUrl(imageUrl, `?s=${clientManager.getWindowSizeContainerWidthHalf()}x${clientManager.getWindowSizeContainerWidthHalf()}&t=crop&q=100&f=webp`)}
              alt="상품 이미지" 
              title="상품 이미지" 
              fill={true}
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              // priority={true}
              placeholder="blur"
              blurDataURL="/images/loading-files.gif"
              /> : 
            <></>
          }
          {
            isHeartLayout === true ? 
            <div className={styles['icon-area']} onClick={heartIconClick}>
              { isHeart === true ? <SvgHeartOnIcon /> : <SvgHeartOffIcon /> }
            </div> : <></>
          }
        </div>
        <div className={styles['brand-name-area']} onClick={itemClick}>
          { brandNameComponent }
        </div>
        <div className={styles['product-name-area']} onClick={itemClick}>
          { productNameComponent }
        </div>
        <div className={styles['info-area']} onClick={itemClick}>
          <div className={styles['info-area-type-a']}>
            {
              newProductPrice !== undefined && oldProductPrice !== undefined ?
              <>
                <div className={styles['row']}>
                  <span className={styles['orange-text']}>
                    새상품 최저가 &nbsp;
                  </span>
                  <span className={styles['price-text']}>
                    { getAddCommaNumberString({ numberValue: newProductPrice }) }원
                  </span>
                </div>
                <div className={styles['row']}>
                  <span className={styles['orange-text']}>
                    중고상품 최저가 &nbsp;
                  </span>
                  <span className={styles['price-text']}>
                    { getAddCommaNumberString({ numberValue: oldProductPrice }) }원
                  </span>
                </div>
              </> : <></>
            }
            {
              reviewStarPoint !== undefined && reviewCount !== undefined ? 
              <div className={styles['row']}>
                <span className={styles['star-text']}>★ &nbsp;</span> 
                <span className={styles['review-info-text']}>{reviewStarPoint} ({reviewCount})</span>
              </div> : <></>
            }
            {
              price !== undefined ? 
              <div className={styles['row']}>
                <span className="text-sm text-black-a font-bold">{ getAddCommaNumberString({ numberValue: price }) }원</span>
              </div> : <></>
            }
          </div>
        </div>
      </div>
      <ModalSignupNotice ref={modalSignupNoticeRef} />
    </>
  );
};

export default ProductGroupColumnItem;