import { useCallback, useEffect, useState } from "react";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import styles from "./review-star.component.module.scss";
import { IReviewStar } from "./review-star.interface";

const ReviewStar = (props: IReviewStar.Props) => {
  const [starMode, setStarMode] = useState<IReviewStar.StarMode>(props.__starMode ?? 'fill');
  const [starSizeType, setStarSizeType] = useState<IReviewStar.StarSizeType>(props.__starSizeType ?? 'big');

  useEffect(() => {
    setStarMode(props.__starMode ?? 'fill');
  }, [props.__starMode]);

  const onClick = useCallback(() => {
    if (typeof props.__onClick === 'function') {
      props.__onClick();
    }
  }, [props]);

  const onMouseEnter = useCallback(() => {
    if (typeof props.__onMouseEnter === 'function') {
      props.__onMouseEnter();
    }
  }, [props]);

  return (
    <>
      <span className={getClasses([styles['container'], styles[starSizeType]])} style={props.__style} onClick={onClick} onMouseEnter={onMouseEnter}>
        { starMode === 'fill' ? <>★</> : <>☆</> }
      </span>
    </>
  );
};

export default ReviewStar;