import styles from "./refund-account-form-box.component.module.scss";
import { IRefundAccountFormBox } from "./refund-account-form-box.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import Article from "../../layouts/article/article.component";
import FormListBox from "../form-list-box/form-list-box.component";
import Input from "../../forms/input/input.component";
import useBankList from "../../../hooks/use-queries/use-bank-list.query";
import SelectBox from "../../forms/select-box/select-box.component";

const RefundAccountFormBox = forwardRef((props: IRefundAccountFormBox.Props, ref: ForwardedRef<IRefundAccountFormBox.RefObject>) => {
  const detailInfoRef = useRef<IRefundAccountFormBox.DetailInfo>(props.__detailInfo ?? {});
  const bankListQuery = useBankList();

  useEffect(() => {
    detailInfoRef.current = props.__detailInfo ?? {};
  }, [props.__detailInfo]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  const accountHolderNameChange = useCallback((value: string) => {

  }, []);

  const bankrNameChange = useCallback((value: string) => {

  }, []);

  return (
    <>
      <Article>
        <div className={styles['top-row']}>
          <span className={styles['description-text']}>환불처리를 위해 계좌 정보를 수집, 이용하며 입력하신 정보는 환불 목적으로만 이용됩니다.</span>
        </div>
        <FormListBox
          __formItems={[
            {
              titleComponent: <>예금주명</>,
              contentComponent: <><Input __type="text" __value={detailInfoRef.current.accountHolderName ?? ''} __placeholder="예금주명을 입력해 주세요" __onChange={accountHolderNameChange} /></>,
            },
            {
              titleComponent: <>입금은행</>,
              contentComponent: <>
                <SelectBox
                  __placeholder="입금 은행을 선택해주세요"
                  __valueItems={bankListQuery.data}
                  __onChange={bankrNameChange} />
              </>,
            },
          ]} />
      </Article>

    </>
  );
});
RefundAccountFormBox.displayName = 'RefundAccountFormBox';

export default RefundAccountFormBox;