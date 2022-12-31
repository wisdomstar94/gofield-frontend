import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useItemLikeApi from "../../../hooks/use-apis/use-item-like.api";
import useImageManager from "../../../hooks/use-image-manager/use-image-manager.hook";
import useUser from "../../../hooks/use-user-hook/use-user.hook";
import { getAddCommaNumberString, getClasses } from "../../../librarys/string-util/string-util.library";
import ModalSignupNotice from "../../modals/modal-signup-notice/modal-signup-notice.component";
import { IModalSignupNotice } from "../../modals/modal-signup-notice/modal-signup-notice.interface";
import SvgHeartOffIcon from "../../svgs/svg-heart-off-icon/svg-heart-off-icon.component";
import SvgHeartOnIcon from "../../svgs/svg-heart-on-icon/svg-heart-on-icon.component";
import HashTagItem from "../hash-tag-item/hash-tag-item.component";
import styles from "./product-column-item.component.module.scss";
import { IProductColumnItem } from "./product-column-item.interface";

const ProductColumnItem = (props: IProductColumnItem.Props) => {
  const user = useUser();
  const imageManager = useImageManager();
  const isHeartingRef = useRef(false);
  const itemLikeApi = useItemLikeApi();
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

  const [price, setPrice] = useState(props.__price);
  useEffect(() => { setPrice(props.__price) }, [props.__price]);

  const [tags, setTags] = useState(props.__tags);
  useEffect(() => { setTags(props.__tags) }, [props.__tags]);

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
        <div className={styles['image-row']}>
          {/* blur 이미지 출저 : https://lottiefiles.com/99297-loading-files */}
          {
            typeof imageUrl === 'string' ? 
            <Image
              src={imageManager.getImageUrl(imageUrl, '?s=240x240&t=crop&q=60&f=webp') ?? '/images/loading-files.gif'}
              alt="상품 이미지" 
              title="상품 이미지" 
              fill={true}
              sizes="100%"
              style={{
                objectFit: 'contain',
              }}
              priority={true}
              // placeholder="blur"
              // blurDataURL="/images/loading-files.gif"
              onClick={itemClick} /> : 
              <></>
          }
          {
            isHeartLayout === true ? 
            <div className={styles['icon-area']} onClick={heartIconClick}>
              { isHeart === true ? <SvgHeartOnIcon /> : <SvgHeartOffIcon /> }
            </div> : <></>
          }
        </div>
        <div className={getClasses([
          "w-full flex flex-wrap mb-1",
          styles['brand-name-area']
        ])} onClick={itemClick}>
          <span className="inline-flex flex-wrap font-bold text-sm text-gray-b">{brandNameComponent}</span>
        </div>
        <div className={getClasses([
          "w-full flex flex-wrap mb-1",
          styles['product-name-area']
        ])} onClick={itemClick}>
          <span className="inline-flex flex-wrap font-normal text-sm text-black-a">{productNameComponent}</span>
        </div>
        {
          tags !== undefined ? 
          <div className="w-full flex flex-wrap mb-2" onClick={itemClick}>
            {
              tags?.map((item, index) => {
                return (
                  <HashTagItem key={index}>{ item }</HashTagItem>
                );
              })
            }
          </div> : <></>
        }
        <div className="w-full flex flex-wrap" onClick={itemClick}>
          <span className="inline-flex flex-wrap font-bold text-sm text-black-a">{ getAddCommaNumberString({ numberValue: price }) }원</span>
        </div>
      </div>
      <ModalSignupNotice ref={modalSignupNoticeRef} />
    </>
  );
};

export default ProductColumnItem;