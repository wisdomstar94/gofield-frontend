import { useEffect, useState } from "react";
import styles from "./review-star.component.module.scss";
import { IReviewStar } from "./review-star.interface";

const ReviewStar = (props: IReviewStar.Props) => {
  const [starMode, setStarMode] = useState<IReviewStar.StarMode>(props.__starMode ?? 'fill');

  useEffect(() => {
    setStarMode(props.__starMode ?? 'fill');
  }, [props.__starMode]);

  return (
    <>
      <span className={styles['container']} style={props.__style}>
        { starMode === 'fill' ? <>★</> : <>☆</> }
      </span>
    </>
  );
};

export default ReviewStar;