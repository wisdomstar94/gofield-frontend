import styles from "./faq-row-item.component.module.scss";
import { IFaqRowItem } from "./faq-row-item.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import SvgArrowBottomIcon from "../../svgs/svg-arrow-bottom-icon/svg-arrow-bottom-icon.component";
import { getClasses } from "../../../librarys/string-util/string-util.library";

const FaqRowItem = forwardRef((props: IFaqRowItem.Props, ref: ForwardedRef<IFaqRowItem.RefObject>) => {
  const [state, setState] = useState(props.__state ?? 'default');
  useEffect(() => { setState(props.__state ?? 'default') }, [props.__state]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  const buttonRowClick = useCallback(() => {
    if (state === 'default') {
      setState('open');
    } else if (state === 'open') {
      setState('close');
    } else {
      setState('open');
    }
  }, [state]);

  return (
    <>
      <div className={getClasses([
        'block border-solid border-b border-slate-200',
        styles['container'],
        styles[state],
      ])}>
        <div data-name="button-row" className="w-full grid grid-cols-8 py-3 cursor-pointer hover:bg-slate-50" onClick={buttonRowClick}>
          <div data-name="left-area" className="col-span-7">
            <div className="inline-block ml-4 mr-2">
              <span className="text-xs">(로그인)</span>
            </div>
            <div className="inline-block">
              <span className="text-xs">아이디와 비밀번호가 기억나지 않아요 </span>
            </div>
          </div>
          <div data-name="right-area" className="flex flex-wrap justify-end items-center">
            <div className="mr-4">
              <SvgArrowBottomIcon />
            </div>
          </div>
        </div>
        <div className={getClasses([
          'w-full block bg-neutral-100 overflow-hidden',
          styles['content-row'],
        ])}>
          <div className="block h-4"></div>
          <div data-name="content-scroll-area" className="block text-xs whitespace-pre-line break-all mx-4 overflow-y-scroll">
            {
              `
                교환은 배송 완료 후  7일 이내일 경우에만 주문/배송/픽업 조회에서 접수 가능합니다. 
                
                ■ 교환 접수 경로 
                모바일(앱/웹): 마이페이지 > 주문/배송/픽업 조회 > 교환 요청
                PC(웹): 마이페이지 > 주문 내역 조회 > 교환 요청
                
                1. 반품할 상품의 교환을 선택 해주세요.

                2. 반품 방법을 선택해 주세요.
                - 회수해 주세요 : 무신사 자동회수 서비스로 택배기사가 요청한 회수지로 평일 기준 1일 ~ 3일 이내 방문합니다. 
                - 직접 발송했어요 : 상품을 받은 택배사와 같은 택배사로 반품 예약해야 합니다. 
                ※ 반송장 번호가 아직 없다면 반송장 정보는 '다음에 등록하기'를 선택해 주세요. 

                3. 환불 배송비를 선결제해야 합니다.
                신용카드 또는 가상 계좌 결제만 가능합니다.

                4. 상품은 받아본 그대로 포장해서 반품해 주셔야 합니다.

                ※ 회원님의 사유로 교환 진행중인 상품이 품절될 경우, 반품비가 발생될 수 있고 이를 제외한 결제 금액이 환불 처리됩니다. 
                ※ [교환처리가 어려운 경우 FAQ]를 꼭 확인해 주세요.     
              `.trim()
            }
          </div>
          <div className="block h-4"></div>
        </div>
      </div>
    </>
  );
});
FaqRowItem.displayName = 'FaqRowItem';

export default FaqRowItem;