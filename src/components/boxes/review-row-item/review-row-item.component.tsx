import { useCallback, useEffect, useState } from "react";
import { IItem } from "../../../interfaces/item/item.interface";
import { day } from "../../../librarys/date-util/date-util.library";
import List, { ListItem } from "../../layouts/list/list.component";
import ReviewRatingStarsV2 from "../review-rating-stars-v2/review-rating-stars-v2.component";
import SmallImageFormBox from "../small-image-form-box/small-image-form-box.component";
import styles from "./review-row-item.component.module.scss";
import { IReviewRowItem } from "./review-row-item.interface";

const ReviewRowItem = (props: IReviewRowItem.Props) => {
  const [item, setItem] = useState(props.__item);
  useEffect(() => { setItem(props.__item); }, [props.__item]);

  const isBodyInfoExist = useCallback((item: IItem.ReviewItem | undefined) => {
    if (item === undefined) {
      return false;
    }

    return item.height !== null || item.weight !== null;
  }, []);

  const isImageExist = useCallback((item: IItem.ReviewItem | undefined) => {
    if (item === undefined) {
      return false;
    }

    if (item.images === undefined || item.images === null) {
      return false;
    }

    if (item.images.length === 0) {
      return false;
    }

    return true;
  }, []);

  return (
    <>
      <List __width="100%" __direction="vertical" __style={props.__style}>
        <ListItem __marginBottom="6px">
          <ReviewRatingStarsV2
            __style={{ width: 'auto' }}
            __isAllowScoreControl={false}
            __isSmallStar={true}
            __reviewScore={item?.reviewScroe} />
        </ListItem>
        <ListItem __marginBottom="6px">
          <span className={styles['review-writer-and-craete-at-text']}>
            { item?.nickName }, { day(new Date(item?.createDate ?? '')).format('YYYY-MM-DD HH:mm:ss') }
          </span>
        </ListItem>
        <ListItem __marginBottom="6px">
          <span className={styles['buy-options-text']}>
            {
              isBodyInfoExist(item) ? 
              <>
                { item?.height !== null ? <>{ item?.height + 'cm'}&nbsp;&nbsp;</> : '' } 
                { item?.weight !== null ? item?.weight + 'kg' : '' } <br />
              </> : <></>
            }
            { 
              Array.isArray(item?.optionName) ? 
              item?.optionName.join(', ') :
              <></>
            }
            {/* ??????, 175cm, 75kg <br />
            10.5 SR ?????? */}
          </span>
        </ListItem>
        {
          isImageExist(item) ? 
          <ListItem __marginBottom="8px">
            <SmallImageFormBox
              __isEditable={false}
              __imageItems={item?.images.map((v) => {
                return {
                  fileUrl: v,
                };
              })} />
          </ListItem> : 
          undefined
        }
        <ListItem>
          <span className={styles['review-content-text']}>
            { item?.description }
            {/* ?????????????????? ??????!
            ???????????? ?????????, ???????????? ?????? ???????????? ????????? ?????????. ???????????? ?????? ??????
            40m ?????? ????????? ?????? ??? ???????????? <span className={styles['more-view-text']}>?????????</span> */}
          </span>
        </ListItem>
      </List>
    </>
  );
};

export default ReviewRowItem;