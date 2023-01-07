import List, { ListItem } from "../../layouts/list/list.component";
import ReviewRatingStarsV2 from "../review-rating-stars-v2/review-rating-stars-v2.component";
import styles from "./review-rating-star-box.component.module.scss";
import { IReviewRatingStarBox } from "./review-rating-star-box.interface";

const ReviewRatingStarBox = (props: IReviewRatingStarBox.Props) => {
  return (
    <>
      <List __width="100%" __defaultItemJustifyContent="center" __style={props.__style}>
        <ListItem __marginBottom="12px">
          <ReviewRatingStarsV2 />
        </ListItem>
        <ListItem __marginBottom="2px">
          <span className={styles['review-number-info-text']}>4.3 / 5</span>
        </ListItem>
        <ListItem>
          <span className={styles['review-count-text']}>리뷰 10개</span>
        </ListItem>
      </List>
    </>
  );
};

export default ReviewRatingStarBox;