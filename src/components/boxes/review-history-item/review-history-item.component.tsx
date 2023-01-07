import styles from "./review-history-item.component.module.scss";
import { IReviewHistoryItem } from "./review-history-item.interface";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Image from 'next/image';
import List, { ListItem } from "../../layouts/list/list.component";
import ReviewRatingStars from "../review-rating-stars/review-rating-stars.component";
import ReviewRatingStarBox from "../review-rating-star-box/review-rating-star-box.component";
import SmallImageFormBox from "../small-image-form-box/small-image-form-box.component";
import useOrder from "../../../hooks/use-order/use-order.hook";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";
import ImageBox from "../image-box/image-box.component";
import useImageManager from "../../../hooks/use-image-manager/use-image-manager.hook";

const ReviewHistoryItem = forwardRef((props: IReviewHistoryItem.Props, ref: ForwardedRef<IReviewHistoryItem.RefObject>) => {
  const imageManager = useImageManager();

  const [item, setItem] = useState(props.__item);
  useEffect(() => { setItem(props.__item) }, [props.__item]);

  const order = useOrder();

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  return (
    <>
      <div className={styles['review-history-item']}>
        <div className={styles['product-info-row']}>
          <div className={styles['left-area']}>
            <div className={styles['image-area']}>
              <ImageBox
                mode="pure"
                src={imageManager.getImageUrl(item?.thumbnail, '?s=60x60&t=crop&q=100&f=webp')}
                alt="상품 이미지"
                title="상품 이미지"
                fill={true}
                sizes="100%"
                style={{
                  objectFit: 'cover',
                }} />
            </div>
          </div>
          <div className={styles['right-area']}>
            <List __style={{ width: '100%' }} __direction="vertical" __defaultItemMarginBottom="1px">
              <ListItem>
                <span className={styles['text-style-a']}>{ item?.name }</span>
              </ListItem>
              {
                order.isOptionExist(item?.optionName) ? 
                <ListItem>
                  <span className={styles['text-style-a']}>옵션: { item?.optionName?.join(', ') }</span>
                </ListItem> : 
                null
              }
              <ListItem __marginBottom="5px">
                <span className={styles['text-style-a']}>수량: { item?.qty }개</span>
              </ListItem>
              <ListItem>
                <span className={styles['text-style-b']}>{ getAddCommaNumberString({ numberValue: item?.price }) }원</span>
              </ListItem>
              <ListItem>
                <ReviewRatingStars
                  __style={{ justifyContent: 'flex-start' }}
                  __isSmallStar={true}
                  __reviewScore={item?.reviewScore} />
              </ListItem>
            </List>
          </div>
        </div>
        <div className={styles['image-row']}>
          <SmallImageFormBox
            __isEditable={false}
            __imageItems={item?.images.map((v) => {
              return {
                fileUrl: v,
              };
            })} />
        </div>
        <div className={styles['description-row']}>
          { item?.description }
        </div>
      </div>
      <div className={styles['division-line']}></div>
    </>
  );
});
ReviewHistoryItem.displayName = 'ReviewHistoryItem';

export default ReviewHistoryItem;