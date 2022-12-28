import styles from "./product-detail-description-box.component.module.scss";
import { IProductDetailDescriptionBox } from "./product-detail-description-box.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import Button from "../../forms/button/button.component";
import { getClasses } from "../../../librarys/string-util/string-util.library";

const ProductDetailDescriptionBox = forwardRef((props: IProductDetailDescriptionBox.Props, ref: ForwardedRef<IProductDetailDescriptionBox.RefObject>) => {
  const realContentBoxRef = useRef<HTMLDivElement>(null);

  const [isClosed, setIsClosed] = useState(props.isClosed ?? true);
  useEffect(() => {
    setIsClosed(props.isClosed ?? true);
  }, [props.isClosed]);

  const [description, setDescription] = useState(props.__description);
  useEffect(() => {
    setDescription(props.__description);
  }, [props.__description]);

  useEffect(() => {
    checkImageSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  const detailImageModeViewButtonClick = useCallback(() => {
    setIsClosed(false);
  }, []);

  const checkImageSize = useCallback(() => {
    if (realContentBoxRef.current === null) {
      return;
    }

    for (let i = 0; i < realContentBoxRef.current.children.length; i++) {
      const childElement = realContentBoxRef.current.children[i];
      if (childElement.children.length > 0) {
        for (let k = 0; k < childElement.children.length; k++) {
          const childElement2 = childElement.children[k];
          const src = childElement2?.getAttribute('src');
          // console.log('src', src);
          if (typeof src === 'string') {
            (childElement2 as HTMLElement).style.width = '100%';
            (childElement2 as HTMLElement).style.height = 'auto';
          }
        }
      }
    }

    // realContentBoxRef.current?.childNodes.forEach((node) => {
    //   node.childNodes.forEach((node2) => {
    //     // console.log('node2', node2);
    //     const src = (node2 as any)?.getAttribute('src');
    //     console.log('src', src);
    //   });
    // });
  }, []);  

  return (
    <>
      <div 
        className={getClasses([
          styles['product-detail-description-box'],
          isClosed === true ? styles['closed'] : '',
        ])}>
        <div 
          className={styles['real-content-box']} 
          ref={realContentBoxRef} 
          dangerouslySetInnerHTML={{ __html: description ?? '' }}>
          {/* html code ... */}
        </div>
        <div 
          className={getClasses([
            styles['detail-info-more-view-button-area'],
          ])}>
          <Button __buttonStyle="white-solid-gray-stroke" __onClick={detailImageModeViewButtonClick}>
            상세 정보 더보기  
          </Button>
        </div>
      </div>
    </>
  );
});
ProductDetailDescriptionBox.displayName = 'ProductDetailDescriptionBox';

export default ProductDetailDescriptionBox;