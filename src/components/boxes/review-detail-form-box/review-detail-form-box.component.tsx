import styles from "./review-detail-form-box.component.module.scss";
import { IReviewDetailFormBox } from "./review-detail-form-box.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
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

const ReviewDetailFormBox = forwardRef((props: IReviewDetailFormBox.Props, ref: ForwardedRef<IReviewDetailFormBox.RefObject>) => {
  const router = useRouter();
  const [globalModalDefaultModalItem, setGlobalModalDefaultModalItem] = useRecoilState(globalModalDefaultModalItemAtom);

  const detailInfoRef = useRef<IReviewDetailFormBox.DetailInfo>(props.__detailInfo ?? {});
  useEffect(() => {
    detailInfoRef.current = props.__detailInfo ?? {};
  }, [props.__detailInfo]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  const heightChange = useCallback((value: string) => {
    detailInfoRef.current.height = value;
  }, []);

  const weightChange = useCallback((value: string) => {
    detailInfoRef.current.weight = value;
  }, []);

  const contentChange = useCallback((value: string) => {
    detailInfoRef.current.content = value;
  }, []);

  const uploadButtonClick = useCallback(() => {
    setGlobalModalDefaultModalItem({
      titleStyleA: {
        component: <>리뷰 등록 완료</>
      },
      contentComponent: <>리뷰 등록이 완료되었습니다.<br />다른 리뷰 작성하고 추가 적립금을 받아가세요.</>,
      negativeButtonState: 'hide',
      positiveButtonState: 'show',
      onPositiveButtonClick(hide, modalItem) {
        hide(modalItem);
        router.push('/');
      },
    });
  }, [router, setGlobalModalDefaultModalItem]);

  return (
    <>
      <Article __style={{ paddingBottom: '0' }}>
        <ProductRowItem __isCancelButtonShow={false} />
      </Article>
      <div className={styles['deco-line']}></div>
      <Article __style={{ paddingBottom: '0' }}>
        <div className={styles['review-title']}>
          상품은 만족하셨나요?
        </div>
        <ReviewRatingStars />
      </Article>
      <Article>
        <FormListBox
          __formItems={[
            {
              titleComponent: <>키</>,
              contentComponent: <><Input __type="number" __value={detailInfoRef.current?.height ?? ''} __onChange={heightChange} __rightLabel={{ width: 50, component: <>cm</> }} /></>,
            },
            {
              titleComponent: <>몸무게</>,
              contentComponent: <><Input __type="number" __value={props.__detailInfo?.weight ?? ''} __onChange={weightChange} __rightLabel={{ width: 50, component: <>kg</> }} /></>,
            },
            {
              titleComponent: <><BothSidebox __leftComponent={<>내용</>} __rightComponent={<span className={styles['char-check-text']}>0/200자</span>} /></>,
              contentComponent: <><TextArea __value={props.__detailInfo?.content ?? ''} __onChange={contentChange} /></>,
            },
          ]} />
        <EmptyRow __style={{ height: '10px' }} />
        <div className={styles['description-text']}>
          - 작성하신 리뷰는 다른 회원들에게 공개됩니다. 댓글은 고필드에서 확인하지 않습니다. <br />
          - 일반 리뷰 작성시 100원의 적립금을 평일 기준 2일 전후로 지급합니다. <br />
          아래에 해당할 경우 적립금 지급이 보류되며, 이미 지급받으셨더라도 2차 검수를 통해 적립금을 회수할 수 있습니다.
        </div>
      </Article>
      <BothSidebox
        __leftComponent={<><Button __buttonStyle="white-solid-gray-stroke">취소</Button></>}
        __rightComponent={<><Button __buttonStyle="black-solid" __onClick={uploadButtonClick}>등록</Button></>} />
    </>
  );
});
ReviewDetailFormBox.displayName = 'ReviewDetailFormBox';

export default ReviewDetailFormBox;