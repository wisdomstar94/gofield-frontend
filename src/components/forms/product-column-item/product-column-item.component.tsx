import styles from './product-column-item.component.module.scss';
import { IProductColumnItem } from "./product-column-item.interface";
import Image from 'next/image';
import { useEffect, useState } from "react";
import SvgHeartOnIcon from "../../svgs/svg-heart-on-icon/svg-heart-on-icon.component";
import SvgHeartOffIcon from "../../svgs/svg-heart-off-icon/svg-heart-off-icon.component";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";

const ProductColumnItem = (props: IProductColumnItem.Props) => {
  const [isHeart, setIsHeart] = useState(props.__isHeart ?? false);

  useEffect(() => {
    setIsHeart(props.__isHeart ?? false);
  }, [props.__isHeart]);

  return (
    <>
      <div className={styles['container']} style={props.__style}>
        <div className={styles['image-area']}>
          <Image
            src={props.__imageUrl ?? 'https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__480.jpg'}
            alt="로고 이미지" title="로고 이미지" layout="fill" objectFit="contain" />
          <div className={styles['icon-area']}>
            { props.__isHeart ? <SvgHeartOnIcon /> : <SvgHeartOffIcon /> }
          </div>
        </div>
        <div className={styles['brand-name-area']}>
          { props.__brandNameComponent }
        </div>
        <div className={styles['product-name-area']}>
          { props.__productNameComponent }
        </div>
        <div className={styles['info-area']}>
          <div className={styles['info-area-type-a']}>
            <div className={styles['row']}>
              <span className={styles['orange-text']}>
                새상품 최저가 &nbsp;
              </span>
              <span className={styles['price-text']}>
                { getAddCommaNumberString({ numberValue: props.__infoTypeA?.newProductPrice }) }원
              </span>
            </div>
            <div className={styles['row']}>
              <span className={styles['orange-text']}>
                중고상품 최저가 &nbsp;
              </span>
              <span className={styles['price-text']}>
                { getAddCommaNumberString({ numberValue: props.__infoTypeA?.oldProductPrice }) }원
              </span>
            </div>
            <div className={styles['row']}>
              <span className={styles['star-text']}>★ &nbsp;</span> 
              <span className={styles['review-info-text']}>4.7 (3)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductColumnItem;