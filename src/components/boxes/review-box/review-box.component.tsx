import Button from "../../forms/button/button.component";
import ReviewRatingStarBox from "../review-rating-star-box/review-rating-star-box.component";
import ReviewRowItem from "../review-row-item/review-row-item.component";
import styles from "./review-box.component.module.scss";
import { IReviewBox } from "./review-box.interface";

const ReviewBox = (props: IReviewBox.Props) => {
  return (
    <>
      <ReviewRatingStarBox __style={{ marginBottom: '12px' }} />
      {
        Array.from({ length: 5 }).map((item, index) => {
          return (
            <ReviewRowItem key={index} __style={{ marginBottom: '24px' }} />
          );
        })
      }
      <Button __buttonStyle="gray-stroke">더보기</Button>
    </>
  );
};

export default ReviewBox;