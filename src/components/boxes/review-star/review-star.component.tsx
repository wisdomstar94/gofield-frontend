import { useEffect, useState } from "react";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import styles from "./review-star.component.module.scss";
import { IReviewStar } from "./review-star.interface";

const ReviewStar = (props: IReviewStar.Props) => {
  const [starMode, setStarMode] = useState<IReviewStar.StarMode>(props.__starMode ?? 'fill');
  const [starSizeType, setStarSizeType] = useState<IReviewStar.StarSizeType>(props.__starSizeType ?? 'big');

  useEffect(() => {
    setStarMode(props.__starMode ?? 'fill');
  }, [props.__starMode]);

  return (
    <>
      <span className={getClasses([styles['container'], styles[starSizeType]])} style={props.__style}>
        { starMode === 'fill' ? <>★</> : <>☆</> }
      </span>
    </>
  );
};

export default ReviewStar;