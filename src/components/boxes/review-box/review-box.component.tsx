import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import useItemBundleProductReviewListApi from "../../../hooks/use-apis/use-item-bundle-product-review-list.api";
import { IReview } from "../../../interfaces/review/review.interface";
import { getNextRouterQueryToUrlQueryString } from "../../../librarys/string-util/string-util.library";
import List, { ListItem } from "../../layouts/list/list.component";
import NotResultBox from "../not-result-box/not-result-box.component";
import PaginationBox from "../pagination-box/pagination-box.component";
import { IPaginationBox } from "../pagination-box/pagination-box.interface";
import ReviewRatingStars from "../review-rating-stars/review-rating-stars.component";
import ReviewRowItem from "../review-row-item/review-row-item.component";
import styles from "./review-box.component.module.scss";
import { IReviewBox } from "./review-box.interface";

const ReviewBox = (props: IReviewBox.Props) => {
  const paginationBoxRef = useRef<IPaginationBox.RefObject>(null);
  const router = useRouter();
  const itemBundleProductReviewListApi = useItemBundleProductReviewListApi();

  const [listOptions, setListOptions] = useState<IReview.ReviewListOptions>({
    page: '1',
    size: '5',
    bundleId: props.__bundleId ?? '',
    list: [],
  });
  const isGettingListRef = useRef(false);

  useEffect(() => {
    setListOptions(prev => {
      const newValue = {
        ...prev,
        bundleId: props.__bundleId ?? '',
      };
      getList(newValue);
      return newValue;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.__bundleId]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    getList(listOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const getList = useCallback((options: IReview.ReviewListOptions) => {
    if (isGettingListRef.current) return;
    if (typeof options.bundleId !== 'string' || options.bundleId === '') return;

    isGettingListRef.current = true;
    const query = {
      page: options.page,
      size: options.size,
    };
    itemBundleProductReviewListApi.getInstance(options.bundleId?.toString(), getNextRouterQueryToUrlQueryString(query)).then((response) => {
      setListOptions(prev => {
        const newValue = {
          ...prev,
          list: response.data.data.list,
        };
        return newValue;
      });
      paginationBoxRef.current?.setPage(response.data.data.page);
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [itemBundleProductReviewListApi]);

  const onPageClick = useCallback((page: number) => {
    setListOptions(prev => {
      const newValue = {
        ...prev,
        page: page.toString(),
      };
      getList(newValue);
      return newValue;
    });
  }, [getList]);

  return (
    <>
      <div style={{ 
        display: listOptions.list.length === 0 ? 'none' : undefined,
      }}>
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
          listOptions.list.map((item, index) => {
            return (
              <ReviewRowItem key={index} __style={{ marginBottom: '24px' }} __item={item} />
            );
          })
        }
        <div className="w-full flex flex-wrap justify-center">
          <PaginationBox 
            ref={paginationBoxRef}
            __onPageClick={onPageClick} />
        </div>  
      </div>

      <div style={{
        display: listOptions.list.length > 0 ? 'none' : undefined,
      }}>
        <NotResultBox __isNoPadding={true}>
          등록된 리뷰가 없습니다.
        </NotResultBox>
      </div>
    </>
  );
};

export default ReviewBox;