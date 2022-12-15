import styles from "./review-detail-form-box.component.module.scss";
import { IReviewDetailFormBox } from "./review-detail-form-box.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import ProductRowItem from "../product-row-item/product-row-item.component";
import Article from "../../layouts/article/article.component";
import ReviewRatingStarBox from "../review-rating-star-box/review-rating-star-box.component";
import ReviewRatingStars from "../review-rating-stars/review-rating-stars.component";
import FormListBox from "../form-list-box/form-list-box.component";
import Input from "../../forms/input/input.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import TextArea from "../../forms/text-area/text-area.component";
import EmptyRow from "../../layouts/empty-row/empty-row.component";
import Button from "../../forms/button/button.component";
import ModalDefault from "../../modals/modal-default/modal-default.component";
import { useRecoilState } from "recoil";
import { globalModalDefaultModalItemAtom } from "../../../atoms/global-modal-default.atom";
import { useRouter } from "next/router";
import useOrderItemInfoApi from "../../../hooks/use-apis/use-order-item-info.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import { IOrder } from "../../../interfaces/order/order.interface";
import ProductRowItem3 from "../product-row-item3/product-row-item3.component";
import BottomFixedOrRelativeBox from "../bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import { IReview } from "../../../interfaces/review/review.interface";
import useOrderReviewWriteApi from "../../../hooks/use-apis/use-order-review-write.api";

const ReviewDetailFormBox = forwardRef((props: IReviewDetailFormBox.Props, ref: ForwardedRef<IReviewDetailFormBox.RefObject>) => {
  const router = useRouter();
  const [globalModalDefaultModalItem, setGlobalModalDefaultModalItem] = useRecoilState(globalModalDefaultModalItemAtom);
  const orderItemInfoApi = useOrderItemInfoApi();
  const isDetailInfoGettingRef = useRef(false);
  const modalAlert = useModalAlert();
  const [orderItem, setOrderItem] = useState<IOrder.OrderShippingOrderItem>();
  const orderReviewWriteApi = useOrderReviewWriteApi();
  const isWritingRef = useRef(false);

  const [orderItemId, setOrderItemId] = useState(props.__orderItemId);
  useEffect(() => { setOrderItemId(props.__orderItemId) }, [props.__orderItemId]);

  const [orderNumber, setOrderNumber] = useState(props.__orderNumber);
  useEffect(() => { setOrderNumber(props.__orderNumber) }, [props.__orderNumber]);

  const [reviewFormInfo, setReviewFormInfo] = useState<IReview.ReviewFormInfo>({});

  // const detailInfoRef = useRef<IReviewDetailFormBox.DetailInfo>(props.__detailInfo ?? {});
  // useEffect(() => {
  //   detailInfoRef.current = props.__detailInfo ?? {};
  // }, [props.__detailInfo]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  const onReviewScoreChange = useCallback((score: number) => {
    setReviewFormInfo(prev => ({
      ...prev,
      reviewScore: score,
    }));
  }, []);

  const heightChange = useCallback((value: string) => {
    // detailInfoRef.current.height = value;
    setReviewFormInfo(prev => ({
      ...prev,
      height: value,
    }));
  }, []);

  const weightChange = useCallback((value: string) => {
    // detailInfoRef.current.weight = value;
    setReviewFormInfo(prev => ({
      ...prev,
      weight: value,
    }));
  }, []);

  const contentChange = useCallback((value: string) => {
    // detailInfoRef.current.content = value;
    setReviewFormInfo(prev => ({
      ...prev,
      content: value,
    }));
  }, []);

  const uploadButtonClick = useCallback(() => {
    if (isWritingRef.current) {
      return;
    }

    if (typeof reviewFormInfo.weight !== 'string') {
      modalAlert.show({ title: '안내', content: '몸무게를 입력해주세요.' });
      return;
    }

    if (typeof reviewFormInfo.height !== 'string') {
      modalAlert.show({ title: '안내', content: '키를 입력해주세요.' });
      return;
    }

    if (reviewFormInfo.reviewScore === undefined) {
      modalAlert.show({ title: '안내', content: '리뷰 점수를 지정해주세요.' });
      return;
    }

    if (typeof reviewFormInfo.content !== 'string') {
      modalAlert.show({ title: '안내', content: '리뷰 점수를 지정해주세요.' });
      return;
    }

    isWritingRef.current = true;
    orderReviewWriteApi.getInstance(reviewFormInfo).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '리뷰 등록이 실패하였습니다.' });
        return;
      }

      modalAlert.show({ title: '리뷰 등록 완료', content: '리뷰가 등록되었습니다.' });
      history.back();
    }).finally(() => {
      isWritingRef.current = false;
    });
  }, [modalAlert, orderReviewWriteApi, reviewFormInfo]);

  useEffect(() => {
    if (orderItemId === undefined || orderNumber === undefined) {
      return;
    }

    setReviewFormInfo(prev => ({
      ...prev,
      orderItemId: orderItemId,
    }));
    getDetailInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderItemId, orderNumber]);

  const getDetailInfo = useCallback(() => {
    if (orderItemId === undefined || orderNumber === undefined || isDetailInfoGettingRef.current) {
      return;
    }

    isDetailInfoGettingRef.current = true;
    orderItemInfoApi.getInstance(orderNumber, orderItemId).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '리뷰 상품 정보를 불러오는데 실패하였습니다.' });
        return;
      }

      setOrderItem(response.data.data);
    }).finally(() => {
      isDetailInfoGettingRef.current = false;
    });
  }, [modalAlert, orderItemId, orderItemInfoApi, orderNumber]);

  return (
    <>
      <Article __style={{ paddingBottom: '0' }}>
        <ProductRowItem3
          __productName={orderItem?.name}
          __imageUrl={orderItem?.thumbnail}
          __optionNames={orderItem?.optionName}
          __price={orderItem?.price}
          __qty={orderItem?.qty}
          __isTopRowShow={false}
           />
      </Article>
      <div className={styles['deco-line']}></div>
      <Article __style={{ paddingBottom: '0' }}>
        <div className={styles['review-title']}>
          상품은 만족하셨나요?
        </div>
        <ReviewRatingStars __isAllowScoreControl={true} __reviewScore={reviewFormInfo?.reviewScore} __onReviewScoreChange={onReviewScoreChange} />
      </Article>
      <Article>
        <FormListBox
          __formItems={[
            {
              titleComponent: <>키</>,
              contentComponent: <><Input __type="number" __value={reviewFormInfo?.height ?? ''} __onChange={heightChange} __rightLabel={{ width: 50, component: <>cm</> }} /></>,
            },
            {
              titleComponent: <>몸무게</>,
              contentComponent: <><Input __type="number" __value={reviewFormInfo?.weight ?? ''} __onChange={weightChange} __rightLabel={{ width: 50, component: <>kg</> }} /></>,
            },
            {
              titleComponent: <><BothSidebox __leftComponent={<>내용</>} __rightComponent={<span className={styles['char-check-text']}>0/200자</span>} /></>,
              contentComponent: <><TextArea __value={reviewFormInfo?.content ?? ''} __onChange={contentChange} /></>,
            },
          ]} />
        <EmptyRow __style={{ height: '10px' }} />
        <div className={styles['description-text']}>
          - 작성하신 리뷰는 다른 회원들에게 공개됩니다. 댓글은 고필드에서 확인하지 않습니다. <br />
          - 일반 리뷰 작성시 100원의 적립금을 평일 기준 2일 전후로 지급합니다. <br />
          아래에 해당할 경우 적립금 지급이 보류되며, 이미 지급받으셨더라도 2차 검수를 통해 적립금을 회수할 수 있습니다.
        </div>
      </Article>
        
      <BottomFixedOrRelativeBox __heightToRelative={100}>
        <BothSidebox
          __leftComponent={<><Button __buttonStyle="white-solid-gray-stroke">취소</Button></>}
          __rightComponent={<><Button __buttonStyle="black-solid" __onClick={uploadButtonClick}>등록</Button></>} />
      </BottomFixedOrRelativeBox>
    </>
  );
});
ReviewDetailFormBox.displayName = 'ReviewDetailFormBox';

export default ReviewDetailFormBox;