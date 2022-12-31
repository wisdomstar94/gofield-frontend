import styles from "./refund-account-form-box.component.module.scss";
import { IRefundAccountFormBox } from "./refund-account-form-box.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import Article from "../../layouts/article/article.component";
import FormListBox from "../form-list-box/form-list-box.component";
import Input from "../../forms/input/input.component";
import useBankList from "../../../hooks/use-queries/use-bank-list.query";
import SelectBox from "../../forms/select-box/select-box.component";
import TermItem from "../term-item/term-item.component";
import EmptyRow from "../../layouts/empty-row/empty-row.component";
import useUserRefundAccountApi from "../../../hooks/use-apis/use-user-refund-account.api";
import useCodeBankListQuery from "../../../hooks/use-queries/use-code-bank-list.query";
import { IAccount } from "../../../interfaces/account/account.interface";

const RefundAccountFormBox = forwardRef((props: IRefundAccountFormBox.Props, ref: ForwardedRef<IRefundAccountFormBox.RefObject>) => {
  const userRefundAccountApi = useUserRefundAccountApi();
  const detailInfoRef = useRef<IAccount.RefundAccountDetailInfo>(props.__detailInfo ?? {});
  // const bankListQuery = useBankList();
  const codeBankListQuery = useCodeBankListQuery();
  const [timestamp, setTimestamp] = useState(0);
  
  useEffect(() => {
    if (codeBankListQuery.isFetched !== true) {
      return;
    }

    // userRefundAccountApi.getInstance().then((response) => {
    //   detailInfoRef.current = {
    //     accountHolderName: response.data.data.bankHolderName ?? '',
    //     accountNumber: response.data.data.bankAccountNumber ?? '',
    //     bankValueItem: codeBankListQuery.data?.find(x => x.value === response.data.data.bankCode),
    //     privacyTermAgree: false,
    //   };
    //   setTimestamp(new Date().getTime());
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeBankListQuery.isFetched]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    getDetailInfo,
    clear,
  }));

  const getDetailInfo = useCallback(() => {
    return detailInfoRef.current;
  }, []);

  const clear = useCallback(() => {
    detailInfoRef.current = {};
    setTimestamp(new Date().getTime());
  }, []);

  const accountHolderNameChange = useCallback((value: string) => {
    detailInfoRef.current.accountHolderName = value;
  }, []);

  const bankChange = useCallback((value: string) => {
    const target = codeBankListQuery.data?.find(x => x.value === value);
    detailInfoRef.current.bankValueItem = target;
  }, [codeBankListQuery.data]);

  const accountNumberChange = useCallback((value: string) => {
    detailInfoRef.current.accountNumber = value;
  }, []);

  const privacyTermAgreeChange = useCallback((value: boolean) => {
    detailInfoRef.current.privacyTermAgree = value;
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
              contentComponent: <><SelectBox __placeholder="입금 은행을 선택해주세요" __valueItems={codeBankListQuery.data} __value={detailInfoRef.current.bankValueItem?.value} __onChange={bankChange} /></>,
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
          __isChecked={detailInfoRef.current.privacyTermAgree ?? false}
          __onChange={privacyTermAgreeChange} />
      </Article>
    </>
  );
});
RefundAccountFormBox.displayName = 'RefundAccountFormBox';

export default RefundAccountFormBox;