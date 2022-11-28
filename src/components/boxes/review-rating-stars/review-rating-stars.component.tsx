import styles from "./review-rating-stars.component.module.scss";
import { IReviewRatingStars } from "./review-rating-stars.interface";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import ReviewStar from "../review-star/review-star.component";

const ReviewRatingStars = forwardRef((props: IReviewRatingStars.Props, ref: ForwardedRef<IReviewRatingStars.RefObject>) => {
  const [reviewScore, setReviewScore] = useState(props.__reviewScore);
  useEffect(() => { setReviewScore(props.__reviewScore); }, [props.__reviewScore])

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  return (
    <>
      <div className={styles['container']} style={props.__style}>
        {
          Array.from({ length: 5 }).map((item, index) => {
            return (
              <>
                {
                  index + 1 <= Math.floor(reviewScore ?? 0) ? 
                  <ReviewStar __style={{ marginRight: index !== 4 ? '8px' : '0' }} /> : 
                  <ReviewStar __style={{ marginRight: index !== 4 ? '8px' : '0' }} __starMode="stroke" />  
                }
              </>
            )
          })
        }
      </div>
    </>
  );
});
ReviewRatingStars.displayName = 'ReviewRatingStars';

export default ReviewRatingStars;