import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import useItemBundleProductReviewListApi from "../../../hooks/use-apis/use-item-bundle-product-review-list.api";
import useRender from "../../../hooks/use-render/use-render.hook";
import { IItem } from "../../../interfaces/item/item.interface";
import Button from "../../forms/button/button.component";
import List, { ListItem } from "../../layouts/list/list.component";
import ReviewRatingStarBox from "../review-rating-star-box/review-rating-star-box.component";
import ReviewRatingStars from "../review-rating-stars/review-rating-stars.component";
import ReviewRowItem from "../review-row-item/review-row-item.component";
import styles from "./review-box.component.module.scss";
import { IReviewBox } from "./review-box.interface";

const ReviewBox = (props: IReviewBox.Props) => {
  const router = useRouter();
  const render = useRender();
  const [productGroupId, setProductGroupId] = useState(props.__productGroupId);
  useEffect(() => { setProductGroupId(props.__productGroupId); }, [props.__productGroupId]);

  const itemBundleProductReviewListApi = useItemBundleProductReviewListApi();

  const searchOptionsRef = useRef({
    page: '1',
    size: '20',
  });
  const isGettingListRef = useRef(false);
  const isNoneMoreDataRef = useRef(false);
  // const [page, setPage] = useState(1);
  // const [size, setSize] = useState(20);
  const [list, setList] = useState<IItem.ReviewItem[]>([]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, productGroupId]);

  const getList = useCallback(() => {
    if (isGettingListRef.current || isNoneMoreDataRef.current) return;
    if (productGroupId === undefined) return;

    isGettingListRef.current = true;
    itemBundleProductReviewListApi.getInstance(productGroupId?.toString()).then((response) => {
      if (response.data.data.length === 0) {
        console.log('!!@@@@')
        isNoneMoreDataRef.current = true;
        render.render();
        return;
      }

      if (response.data.data.length < Number(searchOptionsRef.current.size)) {
        isNoneMoreDataRef.current = true;
      }

      setList(list.concat(response.data.data));
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [itemBundleProductReviewListApi, list, productGroupId, render]);

  const moreViewButtonClick = useCallback(() => {
    if (isGettingListRef.current || isNoneMoreDataRef.current) return;
    searchOptionsRef.current.page = (Number(searchOptionsRef.current.page) + 1).toString();
    // setPage(page + 1);
    getList();
  }, [getList]);

  return (
    <>
      {/* <ReviewRatingStarBox __style={{ marginBottom: '12px' }} /> */}
      <List __width="100%" __defaultItemJustifyContent="center">
        <ListItem __marginBottom="12px">
          <ReviewRatingStars __reviewScore={props.__productGroupDetailInfo?.reviewScore} />
        </ListItem>
        <ListItem __marginBottom="2px">
          <span className={styles['review-number-info-text']}>{ props.__productGroupDetailInfo?.reviewScore } / 5</span>
        </ListItem>
        <ListItem>
          <span className={styles['review-count-text']}>리뷰 { props.__productGroupDetailInfo?.reviewCount }개</span>
        </ListItem>
      </List>
      {
        list.map((item, index) => {
          return (
            <ReviewRowItem key={index} __style={{ marginBottom: '24px' }} __item={item} />
          );
        })
      }
      {
        !isNoneMoreDataRef.current ? 
        <Button __buttonStyle="gray-stroke" __onClick={moreViewButtonClick}>더보기</Button>
        : undefined
      }
    </>
  );
};

export default ReviewBox;