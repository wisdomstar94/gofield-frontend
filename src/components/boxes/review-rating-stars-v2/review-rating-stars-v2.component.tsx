import styles from "./review-rating-stars-v2.component.module.scss";
import { IReviewRatingStarsV2 } from "./review-rating-stars-v2.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import ReviewStarV2 from "../review-star-v2/review-star-v2.component";

const ReviewRatingStarsV2 = forwardRef((props: IReviewRatingStarsV2.Props, ref: ForwardedRef<IReviewRatingStarsV2.RefObject>) => {
  const [reviewScore, setReviewScore] = useState(props.__reviewScore);
  useEffect(() => { setReviewScore(props.__reviewScore); }, [props.__reviewScore]);

  const [isSmallStar, setIsSmallStar] = useState(props.__isSmallStar);
  useEffect(() => { setIsSmallStar(props.__isSmallStar); }, [props.__isSmallStar]);

  const [defaultMargin, setDefaultMargin] = useState('6px');
  useEffect(() => { 
    setDefaultMargin(isSmallStar === true ? '2px' : '6px');
  }, [isSmallStar]);

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

  const getStarFillPercent = useCallback((index: number) => {
    if (reviewScore === undefined) {
      return 0;
    }

    if (reviewScore === index + 1) {
      return 100;
    }

    if (index < reviewScore && index + 1 >= reviewScore) {
      return (index + 1 - reviewScore) * 100;
    }

    if (reviewScore >= index + 1) {
      return 100;
    }

    return 0;
  }, [reviewScore]);

  return (
    <>
      <div className={styles['container']} style={props.__style}>
        {
          Array.from({ length: 5 }).map((item, index) => {
            return (
              <ReviewStarV2 
                key={index}
                __starSizeType={isSmallStar ? 'small' : 'big'}
                __style={{ marginRight: index !== 4 ? defaultMargin : '0' }} 
                __fillPercent={getStarFillPercent(index)}
                __onClick={() => starClick(index)}
                />
            );
          })
        }
      </div>
    </>
  );
});
ReviewRatingStarsV2.displayName = 'ReviewRatingStarsV2';

export default ReviewRatingStarsV2;