import { useEffect, useState } from "react";
import { day } from "../../../librarys/date-util/date-util.library";
import List, { ListItem } from "../../layouts/list/list.component";
import ReviewStar from "../review-star/review-star.component";
import styles from "./review-row-item.component.module.scss";
import { IReviewRowItem } from "./review-row-item.interface";

const ReviewRowItem = (props: IReviewRowItem.Props) => {
  const [item, setItem] = useState(props.__item);
  useEffect(() => { setItem(props.__item); }, [props.__item]);

  return (
    <>
      <List __width="100%" __direction="vertical" __style={props.__style}>
        <ListItem __marginBottom="6px">
          {
            Array.from({ length: Math.floor(item?.reviewScroe ?? 0) }).map((item, index) => {
              return (
                <ReviewStar key={index} __starSizeType="small" __starMode="fill" __style={{ marginRight: '2px' }} />
              )
            })
          }
        </ListItem>
        <ListItem __marginBottom="6px">
          <span className={styles['review-writer-and-craete-at-text']}>
            { item?.nickName }, { day(new Date(item?.createDate ?? '')).format('YYYY-MM-DD HH:mm:ss') }
          </span>
        </ListItem>
        <ListItem __marginBottom="6px">
          <span className={styles['buy-options-text']}>
            { item?.height + 'cm' }, { item?.weight + 'kg' } <br />
            { item?.optionName }
            {/* 남성, 175cm, 75kg <br />
            10.5 SR 구매 */}
          </span>
        </ListItem>
        <ListItem>
          <span className={styles['review-content-text']}>
            { item?.description }
            {/* 초중급자에게 추천!
            백에서의 꺾어짐, 바운스는 물론 부드러운 느낌이 좋았다. 채빠짐이 좋은 느낌
            40m 쉽게 띄우고 부칠 수 있었음… <span className={styles['more-view-text']}>더보기</span> */}
          </span>
        </ListItem>
      </List>
    </>
  );
};

export default ReviewRowItem;