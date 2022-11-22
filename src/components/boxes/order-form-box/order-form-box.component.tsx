import { useCallback, useEffect, useRef } from "react";
import Button from "../../forms/button/button.component";
import Checkbox from "../../forms/checkbox/checkbox.component";
import { ICheckbox } from "../../forms/checkbox/checkbox.interface";
import Input from "../../forms/input/input.component";
import Article from "../../layouts/article/article.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import EmptyRow from "../../layouts/empty-row/empty-row.component";
import List, { ListItem } from "../../layouts/list/list.component";
import FormListBox from "../form-list-box/form-list-box.component";
import styles from "./order-form-box.component.module.scss";
import { IOrderFormBox } from "./order-form-box.interface";

const OrderFormBox = (props: IOrderFormBox.Props) => {
  const detailInfoRef = useRef<IOrderFormBox.DetailInfo>(props.__detailInfo ?? {});

  useEffect(() => {
    detailInfoRef.current = props.__detailInfo ?? {};
  }, [props.__detailInfo]);

  const getterNameChange = useCallback((value: string) => {
    detailInfoRef.current.getterName = value;
  }, []);

  const cpChange = useCallback((value: string) => {
    detailInfoRef.current.cp = value;
  }, []);

  const postNumberChange = useCallback((value: string) => {
    detailInfoRef.current.postNumber = value;
  }, []);

  const addrDetailChange = useCallback((value: string) =>{
    detailInfoRef.current.addrDetail = value;
  }, []);

  const requestMessageChange = useCallback((value: string) => {
    detailInfoRef.current.requestMessage = value;
  }, []);

  const payMethodChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {

  }, []);

  return (
    <>
      <Article>
        <div className={styles['big-title-row']}>
          <BothSidebox
            __style={{ alignItems: 'flex-start' }}
            __leftComponent={<>배송정보</>}
            __rightComponent={<><Button __buttonStyle="gray-solid-radius" __style={{ width: 'auto', padding: '10px 16px' }}>주소록</Button></>} />
        </div>
        <FormListBox
          __formItems={[
            {
              titleComponent: <>수령인</>,
              contentComponent: <><Input __type="text" __placeholder="이름을 입력해 주세요" __value={detailInfoRef.current.getterName ?? ''} __onChange={getterNameChange} /></>,
            },
            {
              titleComponent: <>휴대폰번호</>,
              contentComponent: <><Input __type="number" __placeholder="01000000000" __value={detailInfoRef.current.cp ?? ''} __onChange={cpChange} /></>,
            },
            {
              titleComponent: <>우편번호</>,
              contentComponent: <>
                <BothSidebox
                  __leftComponentStyle={{ width: 'calc(100% - 128px)' }}
                  __leftComponent={<><Input __type="number" __placeholder="00000" __value={detailInfoRef.current.postNumber ?? ''} __onChange={postNumberChange} /></>}
                  __rightComponentStyle={{ width: '128px' }}
                  __rightComponent={<><Button __style={{ width: 'calc(100% - 8px)', padding: '12px 14px' }} __buttonStyle="black-solid-radius">우편번호 검색</Button></>}/>
              </>,
            },
            {
              titleComponent: <>주소</>,
              contentComponent: <>
                <Input __type="text" __disable={true} __placeholder="기본 주소" __value={detailInfoRef.current.addrBasic ?? ''} __onChange={() => {  }} />
                <EmptyRow __style={{ height: '10px' }} />
                <Input __type="text" __placeholder="나머지 주소를 입력해주세요" __value={detailInfoRef.current.addrDetail ?? ''} __onChange={addrDetailChange} />
                <EmptyRow __style={{ height: '10px' }} />
                <Input __type="text" __placeholder="배송시 요청사항을 입력해주세요." __value={detailInfoRef.current.requestMessage ?? ''} __onChange={requestMessageChange} />
              </>,
            },
          ]} />
      </Article>
      <div className={styles['deco-line']}></div>
      <Article>
        <div className={styles['big-title-row']}>
          <BothSidebox
            __style={{ alignItems: 'flex-start' }}
            __leftComponent={<>주문상품 정보</>}
            __rightComponent={<></>} />
        </div>
      </Article>
      <div className={styles['deco-line']}></div>
      <Article>
        <div className={styles['big-title-row']}>
          <BothSidebox
            __style={{ alignItems: 'flex-start' }}
            __leftComponent={<>결제 정보</>}
            __rightComponent={<></>} />
        </div>
        <List __width="100%" __direction="vertical" __defaultItemMarginBottom="14px">
          <ListItem>
            <Checkbox __name="pay-method" __value="card" __checkState="none-checked" __onChange={payMethodChange}>카드결제(신용/체크)</Checkbox>
          </ListItem>
          <ListItem>
            <Checkbox __name="pay-method" __value="deposit-without-bankbook" __checkState="none-checked" __onChange={payMethodChange}>무통장 입금</Checkbox>
          </ListItem>
          <ListItem __marginBottom="0">
            <Checkbox __name="pay-method" __value="bank-transfer" __checkState="none-checked" __onChange={payMethodChange}>계좌이체</Checkbox>
          </ListItem>
        </List>
      </Article>
      <div className={styles['deco-line']}></div>
      <Article>
        <div className={styles['big-title-row']}>
          <BothSidebox
            __style={{ alignItems: 'flex-start' }}
            __leftComponent={<>최종 결제 금액</>}
            __rightComponent={<></>} />
        </div>
        <BothSidebox
          __leftComponent={<><div className={styles['price-info-title-text']}>총 상품 금액</div></>}
          __rightComponent={<><div className={styles['price-info-content-text']}>151,600원</div></>} />
        <EmptyRow __style={{ height: '8px' }} />
        <BothSidebox
          __leftComponent={<><div className={styles['price-info-title-text']}>총 배송료</div></>}
          __rightComponent={<><div className={styles['price-info-content-text']}>3,000원</div></>} />
        <EmptyRow __style={{ height: '16px' }} />
        <div className={styles['deco-line']}></div>
        <EmptyRow __style={{ height: '16px' }} />
        <BothSidebox
          __leftComponent={<><div className={styles['price-info-title-text-big']}>총 결제 금액</div></>}
          __rightComponent={<><div className={styles['price-info-content-text-big']}>154,600원</div></>} />
      </Article>
      <Button __buttonStyle="black-solid">결제하기</Button>
    </>
  );
};

export default OrderFormBox;