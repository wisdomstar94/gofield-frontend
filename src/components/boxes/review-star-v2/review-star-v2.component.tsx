import styles from "./review-star-v2.component.module.scss";
import { IReviewStarV2 } from "./review-star-v2.interface";
import { CSSProperties, ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { getClasses } from "../../../librarys/string-util/string-util.library";

const ReviewStarV2 = forwardRef((props: IReviewStarV2.Props, ref: ForwardedRef<IReviewStarV2.RefObject>) => {
  const [starSizeType, setStarSizeType] = useState(props.__starSizeType);
  useEffect(() => { setStarSizeType(props.__starSizeType) }, [props.__starSizeType]);

  const [fillPercent, setFillPercent] = useState(props.__fillPercent);
  useEffect(() => { setFillPercent(props.__fillPercent) }, [props.__fillPercent]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  const getBgStyle = useCallback(() => {
    const styleObj: CSSProperties = {};

    if (typeof fillPercent === 'number') {
      styleObj.width = `${fillPercent}%`;
    } else if (typeof fillPercent === 'string') {
      styleObj.width = fillPercent;
    } else {
      styleObj.width = '100%';
    }

    return styleObj;
  }, [fillPercent]);

  const starClick = useCallback(() => {
    if (typeof props.__onClick === 'function') {
      props.__onClick();
    }
  }, [props]);

  return (
    <>
      <div
        data-fill-percent={fillPercent} 
        className={getClasses([
          styles['container'],
          typeof starSizeType === 'string' ? styles[starSizeType] : '',
        ])} onClick={starClick}
        style={props.__style}>
        <div className={styles['star-box']}>
          <div className={styles['inner-container']}>
            <div className={styles['bg']} style={getBgStyle()}>

            </div>
          </div>
        </div>
      </div>
    </>
  );
});
ReviewStarV2.displayName = 'ReviewStarV2';

export default ReviewStarV2;