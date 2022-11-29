import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import Button from "../../forms/button/button.component";
import styles from "./product-detail-image-box.component.module.scss";
import { IProductDetailImageBox } from "./product-detail-image-box.interface";

const ProductDetailImageBox = (props: IProductDetailImageBox.Props) => {
  const[imageUrl, setImageUrl] = useState(props.__imageUrl);
  useEffect(() => { setImageUrl(props.__imageUrl); }, [props.__imageUrl]);

  const [isMinimum, setIsMinimum] = useState<boolean>(true);

  const detailImageModeViewButtonClick = useCallback(() => {
    setIsMinimum(false);
  }, []);

  return (
    <>
      <div className={getClasses([styles['product-detail-image-box'], isMinimum ? styles['minimum'] : styles['maximum']])}>
        <div className="next-image-wrapper">
          {
            imageUrl !== undefined ? 
            <Image
              src={imageUrl}
              alt="상품 상세정보 이미지"
              title="상품 상세정보 이미지"
              layout="fill"
              objectFit="cover"
              objectPosition="top" /> : 
            <></>
          }
        </div>
        <div className={styles['detail-info-more-view-button-area']}>
          <Button __buttonStyle="white-solid-gray-stroke" __onClick={detailImageModeViewButtonClick}>
            상세 정보 더보기  
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailImageBox;