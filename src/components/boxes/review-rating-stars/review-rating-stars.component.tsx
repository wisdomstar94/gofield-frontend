import styles from "./review-rating-stars.component.module.scss";
import { IReviewRatingStars } from "./review-rating-stars.interface";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import ReviewStar from "../review-star/review-star.component";

const ReviewRatingStars = forwardRef((props: IReviewRatingStars.Props, ref: ForwardedRef<IReviewRatingStars.RefObject>) => {
  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  return (
    <>
      <div className={styles['container']} style={props.__style}>
        <ReviewStar __style={{ marginRight: '8px' }} />
        <ReviewStar __style={{ marginRight: '8px' }} />
        <ReviewStar __style={{ marginRight: '8px' }} />
        <ReviewStar __style={{ marginRight: '8px' }} />
        <ReviewStar __starMode="stroke" />
      </div>
    </>
  );
});
ReviewRatingStars.displayName = 'ReviewRatingStars';

export default ReviewRatingStars;