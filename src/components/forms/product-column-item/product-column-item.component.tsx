import styles from "./product-column-item.component.module.scss";
import { IProductColumnItem } from "./product-column-item.interface";
import Image from 'next/image';
import { useEffect, useState } from "react";
import SvgHeartOnIcon from "../../svgs/svg-heart-on-icon/svg-heart-on-icon.component";
import SvgHeartOffIcon from "../../svgs/svg-heart-off-icon/svg-heart-off-icon.component";

const ProductColumnItem = (props: IProductColumnItem.Props) => {
  const [isHeart, setIsHeart] = useState(props.__isHeart ?? false);

  useEffect(() => {
    setIsHeart(props.__isHeart ?? false);
  }, [props.__isHeart]);

  return (
    <>
      <div 
        className={[
          styles['product-column-item'],
        ].join(' ')}
        style={props.__style}>
        <div 
          className={[
            styles['image-area'],
          ].join(' ')}>
          <Image
            src={props.__imageUrl ?? 'https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__480.jpg'}
            alt="로고 이미지"
            title="로고 이미지"
            layout="fill"
            objectFit="contain" />
          <div className={[
              styles['icon-area']
            ].join(' ')}>
            {
              props.__isHeart ? 
              <>
                <SvgHeartOnIcon />
              </> :
              <>
                <SvgHeartOffIcon />
              </>
            }
          </div>
        </div>
        <div 
          className={[
            styles['brand-name-area']
          ].join(' ')}>
          { props.__brandNameComponent }
        </div>
        <div 
          className={[
            styles['product-name-area']
          ].join(' ')}>
          { props.__productNameComponent }
        </div>
      </div>
    </>
  );
};

export default ProductColumnItem;