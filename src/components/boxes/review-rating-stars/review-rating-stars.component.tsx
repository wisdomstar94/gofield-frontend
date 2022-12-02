import styles from "./review-rating-stars.component.module.scss";
import { IReviewRatingStars } from "./review-rating-stars.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import ReviewStar from "../review-star/review-star.component";
import { IReviewStar } from "../review-star/review-star.interface";

const ReviewRatingStars = forwardRef((props: IReviewRatingStars.Props, ref: ForwardedRef<IReviewRatingStars.RefObject>) => {
  const [reviewScore, setReviewScore] = useState(props.__reviewScore);
  useEffect(() => { setReviewScore(props.__reviewScore); }, [props.__reviewScore]);

  const [isAllowScoreControl, setIsAllowScoreControl] = useState(props.__isAllowScoreControl);
  useEffect(() => { setIsAllowScoreControl(props.__isAllowScoreControl); }, [props.__isAllowScoreControl]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  const starClick = useCallback((index: number) => {
    if (isAllowScoreControl !== true) {
      return;
    }

    setReviewScore(index + 1);
    if (typeof props.__onReviewScoreChange === 'function') {
      props.__onReviewScoreChange(index + 1);
    }
  }, [isAllowScoreControl, props]);

  return (
    <>
      <div className={styles['container']} style={props.__style}>
        {
          Array.from({ length: 5 }).map((item, index) => {
            const starMode: IReviewStar.StarMode = index + 1 <= Math.floor(reviewScore ?? 0) ? 'fill' : 'stroke';
            return <ReviewStar key={index} __style={{ marginRight: index !== 4 ? '8px' : '0' }} __onClick={() => starClick(index)} __starMode={starMode} />  
          })
        }
      </div>
    </>
  );
});
ReviewRatingStars.displayName = 'ReviewRatingStars';

export default ReviewRatingStars;