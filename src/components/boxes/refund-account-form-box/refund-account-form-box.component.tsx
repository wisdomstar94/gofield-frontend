import styles from "./refund-account-form-box.component.module.scss";
import { IRefundAccountFormBox } from "./refund-account-form-box.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import Article from "../../layouts/article/article.component";
import FormListBox from "../form-list-box/form-list-box.component";
import Input from "../../forms/input/input.component";
import useBankList from "../../../hooks/use-queries/use-bank-list.query";
import SelectBox from "../../forms/select-box/select-box.component";
import TermItem from "../term-item/term-item.component";
import EmptyRow from "../../layouts/empty-row/empty-row.component";

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

  const accountNumberChange = useCallback((value: string) => {

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
              contentComponent: <><SelectBox __placeholder="입금 은행을 선택해주세요" __valueItems={bankListQuery.data} __onChange={bankrNameChange} /></>,
            },
            {
              titleComponent: <>계좌번호</>,
              contentComponent: <><Input __type="text" __value={detailInfoRef.current.accountNumber ?? ''} __placeholder="계좌번호를 입력해 주세요" __onChange={accountNumberChange} /></>,
            },
          ]} />
        <EmptyRow __style={{ height: '16px' }} />
        <TermItem
          __termName="개인정보 수집 및 이용 동의"
          __detailContentComponent={<>개인정보 수집 및 이용 동의 !!!</>}
          __isChecked={false}
          // __childTermItems={[
          //   {
          //     termName: '약관1',
          //     isChecked: false,
          //     isCheckBoxShow: true,
          //     detailContentComponent: <>약관1 내용!!</>
          //   },
          //   {
          //     termName: '약관2',
          //     isChecked: false,
          //     isCheckBoxShow: true,
          //     detailContentComponent: <>약관2 내용!!</>
          //   }
          // ]} 
          />
      </Article>
    </>
  );
});
RefundAccountFormBox.displayName = 'RefundAccountFormBox';

export default RefundAccountFormBox;