import styles from "./review-detail-form-box.component.module.scss";
import { IReviewDetailFormBox } from "./review-detail-form-box.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import Article from "../../layouts/article/article.component";
import FormListBox from "../form-list-box/form-list-box.component";
import Input from "../../forms/input/input.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import TextArea from "../../forms/text-area/text-area.component";
import EmptyRow from "../../layouts/empty-row/empty-row.component";
import Button from "../../forms/button/button.component";
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
import SmallImageFormBox from "../small-image-form-box/small-image-form-box.component";
import { IFile } from "../../../interfaces/file/file.interface";
import ReviewRatingStarsV2 from "../review-rating-stars-v2/review-rating-stars-v2.component";

const ReviewDetailFormBox = forwardRef((props: IReviewDetailFormBox.Props, ref: ForwardedRef<IReviewDetailFormBox.RefObject>) => {
  const router = useRouter();
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

  useImperativeHandle(ref, () => ({
    // ?????? ?????????????????? ????????? ????????? ??????
    
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

  const onImageItemsChange = useCallback((items: IFile.FileInfo[] | undefined) => {
    setReviewFormInfo(prev => ({
      ...prev,
      imageFileItems: items,
    }));
  }, []);

  const uploadButtonClick = useCallback(() => {
    if (isWritingRef.current) {
      return;
    }

    // ???????????? ?????? ?????? ????????? ?????? (?????? ??????)
    // if (typeof reviewFormInfo.weight !== 'string') {
    //   modalAlert.show({ title: '??????', content: '???????????? ??????????????????.' });
    //   return;
    // }

    // if (typeof reviewFormInfo.height !== 'string') {
    //   modalAlert.show({ title: '??????', content: '?????? ??????????????????.' });
    //   return;
    // }

    if (reviewFormInfo.reviewScore === undefined) {
      modalAlert.show({ title: '??????', content: '?????? ????????? ??????????????????.' });
      return;
    }

    if (typeof reviewFormInfo.content !== 'string') {
      modalAlert.show({ title: '??????', content: '?????? ????????? ??????????????????.' });
      return;
    }

    isWritingRef.current = true;
    orderReviewWriteApi.getInstance(reviewFormInfo).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '??????', content: '?????? ????????? ?????????????????????.' });
        return;
      }

      modalAlert.show({ title: '?????? ?????? ??????', content: '????????? ?????????????????????.' });
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
        modalAlert.show({ title: '??????', content: '?????? ?????? ????????? ??????????????? ?????????????????????.' });
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
          ????????? ???????????????????
        </div>
        <ReviewRatingStarsV2 __isAllowScoreControl={true} __reviewScore={reviewFormInfo?.reviewScore} __onReviewScoreChange={onReviewScoreChange} />
      </Article>
      <Article>
        <FormListBox
          __formItems={[
            {
              titleComponent: <>???</>,
              contentComponent: <>
                <Input 
                  __type="number" 
                  __placeholder="optional (?????? ??????)"
                  __value={reviewFormInfo?.height ?? ''} 
                  __onChange={heightChange} 
                  __rightLabel={{ width: 50, component: <>cm</> }} />
              </>,
            },
            {
              titleComponent: <>?????????</>,
              contentComponent: <>
                <Input 
                  __type="number" 
                  __placeholder="optional (?????? ??????)"
                  __value={reviewFormInfo?.weight ?? ''} 
                  __onChange={weightChange} 
                  __rightLabel={{ width: 50, component: <>kg</> }} />
              </>,
            },
            {
              titleComponent: <>??????</>,
              contentComponent: <>
                <SmallImageFormBox
                  __isEditable={true}
                  __onChange={onImageItemsChange} />
              </>,
            },
            {
              titleComponent: <><BothSidebox __leftComponent={<>??????</>} __rightComponent={<span className={styles['char-check-text']}>0/200???</span>} /></>,
              contentComponent: <><TextArea __value={reviewFormInfo?.content ?? ''} __onChange={contentChange} /></>,
            },
          ]} />
        <EmptyRow __style={{ height: '10px' }} />
        <div className={styles['description-text']}>
          - ???????????? ????????? ?????? ??????????????? ???????????????. ????????? ??????????????? ???????????? ????????????. <br />
          - ?????? ?????? ????????? 100?????? ???????????? ?????? ?????? 2??? ????????? ???????????????. <br />
          ????????? ????????? ?????? ????????? ????????? ????????????, ?????? ???????????????????????? 2??? ????????? ?????? ???????????? ????????? ??? ????????????.
        </div>
      </Article>
        
      <BottomFixedOrRelativeBox __heightToRelative={100}>
        <BothSidebox
          __leftComponent={<><Button __buttonStyle="white-solid-gray-stroke">??????</Button></>}
          __rightComponent={<><Button __buttonStyle="black-solid" __onClick={uploadButtonClick}>??????</Button></>} />
      </BottomFixedOrRelativeBox>
    </>
  );
});
ReviewDetailFormBox.displayName = 'ReviewDetailFormBox';

export default ReviewDetailFormBox;