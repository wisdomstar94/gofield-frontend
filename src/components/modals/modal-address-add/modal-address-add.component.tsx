import styles from "./modal-address-add.component.module.scss";
import { IModalAddressAdd } from "./modal-address-add.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { IModal } from "../../forms/modal/modal.interface";
import Modal from "../../forms/modal/modal.component";
import Topbar from "../../layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../layouts/window-size-container/window-size-container.component";
import Article from "../../layouts/article/article.component";
import FormListBox from "../../boxes/form-list-box/form-list-box.component";
import Input from "../../forms/input/input.component";
import Button from "../../forms/button/button.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import { IDaum } from "../../../interfaces/daum/daum.interface";
import EmptyRow from "../../layouts/empty-row/empty-row.component";
import Checkbox from "../../forms/checkbox/checkbox.component";
import { ICheckbox } from "../../forms/checkbox/checkbox.interface";
import BottomFixedOrRelativeBox from "../../boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";

const ModalAddressAdd = forwardRef((props: IModalAddressAdd.Props, ref: ForwardedRef<IModalAddressAdd.RefObject>) => {
  const lastBottomElementRef = useRef<HTMLDivElement>(null);
  const [isBottomButtonFixed, setIsBottomButtonFixed] = useState<boolean>(false);

  const [modalState, setModalState] = useState<IModal.ModalState | undefined>(props.__modalState);
  useEffect(() => { setModalState(props.__modalState) }, [props.__modalState]);

  const [_, setTimestamp] = useState(0);

  const detailInfoRef = useRef<IModalAddressAdd.DetailInfo>({});

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    show,
    hide,
  }));

  const show = useCallback(() => {
    setModalState('show');
  }, []);

  const hide = useCallback(() => {
    setModalState('hide');
  }, []);

  useEffect(() => {
    windowSizeCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  const postNumberSearchButtonClick = useCallback(() => {
    new (window as any).daum.Postcode({
      oncomplete: function(data: IDaum.AddrInfo) {
        console.log('data', data);
        console.log('data', JSON.stringify(data, undefined, 2));

        detailInfoRef.current.addrBasic = data.address;
        detailInfoRef.current.postNumber = data.zonecode;
        setTimestamp(new Date().getTime());
      },
    }).open();
  }, []);

  const newAddressAddCompleteButtonClick = useCallback(() => {

  }, []);

  const getterNameChange = useCallback((value: string) => {
    detailInfoRef.current.getterName = value;
  }, []);

  const cpChange = useCallback((value: string) => {
    detailInfoRef.current.cp = value;
  }, []);

  const addrDetailChange = useCallback((value: string) => {
    detailInfoRef.current.addrDetail = value;
  }, []);

  const isDefaultAddrChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {
    detailInfoRef.current.isDefault = changeInfo.checkState === 'checked';
  }, []);

  const windowSizeCheck = useCallback(() => {
    if (typeof window === undefined) {
      return;
    }

    if (lastBottomElementRef.current === null) {
      return;
    }

    const windowHeight = window.innerHeight;
    if (windowHeight - 50 < lastBottomElementRef.current?.getBoundingClientRect().top) {
      setIsBottomButtonFixed(false);
    } else {
      setIsBottomButtonFixed(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    window.removeEventListener('resize', windowSizeCheck);
    window.addEventListener('resize', windowSizeCheck);
    windowSizeCheck();

    return () => {
      window.removeEventListener('resize', windowSizeCheck);
    };
  }, [windowSizeCheck]);

  return (
    <>
      <Modal __modalState={modalState}>
        <WindowSizeContainer __bgColor="#fff">
          <Topbar
            __backButtonClickCallback={() => { setModalState('hide') }}
            __layoutTypeB={{
              titleComponent: <>주소 추가</>,
              rightComponent: <></>,
            }} />
          <Article>
            <FormListBox
              __formItems={[
                {
                  titleComponent: <>수령인</>,
                  contentComponent: <><Input __type="text" __value={props.__detailInfo?.getterName ?? ''} __placeholder="이름을 입력해 주세요" __onChange={getterNameChange} /></>,
                },
                {
                  titleComponent: <>휴대폰번호</>,
                  contentComponent: <><Input __type="number" __value={props.__detailInfo?.cp ?? ''} __placeholder="01000000000" __onChange={cpChange} /></>,
                },
                {
                  titleComponent: <>우편번호</>,
                  contentComponent: <>
                    <BothSidebox
                      __leftComponentStyle={{ width: 'calc(100% - 128px)' }}
                      __leftComponent={<><Input __type="number" __disable={true} __placeholder="00000" __value={detailInfoRef.current.postNumber ?? ''} __onChange={() => {  }} /></>}
                      __rightComponentStyle={{ width: '128px' }}
                      __rightComponent={<>
                        <Button __style={{ width: 'calc(100% - 8px)', padding: '12px 14px' }} __buttonStyle="black-solid-radius" __onClick={postNumberSearchButtonClick}>
                          우편번호 검색
                        </Button>
                      </>}/>
                  </>,
                },
                {
                  titleComponent: <>주소</>,
                  contentComponent: <>
                    <Input __type="text" __disable={true} __placeholder="기본 주소" __value={detailInfoRef.current.addrBasic ?? ''} __onChange={() => {  }} />
                    <EmptyRow __style={{ height: '10px' }} />
                    <Input __type="text" __placeholder="나머지 주소를 입력해주세요" __value={detailInfoRef.current.addrDetail ?? ''} __onChange={addrDetailChange} />
                    <EmptyRow __style={{ height: '10px' }} />
                    <Checkbox 
                      __name="is-default" 
                      __checkState={detailInfoRef.current.isDefault === true ? 'checked' : 'none-checked'}
                      __value="is-default"
                      __onChange={isDefaultAddrChange}>기본배송지로 설정</Checkbox>
                  </>,
                },
              ]} />
            <BottomFixedOrRelativeBox __isFixed={isBottomButtonFixed}>
              <Button __style={{ marginTop: '20px' }} __buttonStyle="black-solid" __onClick={newAddressAddCompleteButtonClick}>완료</Button>
            </BottomFixedOrRelativeBox>
          </Article>
          <div ref={lastBottomElementRef}></div>
        </WindowSizeContainer>
      </Modal>
    </>
  );
});
ModalAddressAdd.displayName = 'ModalAddressAdd';

export default ModalAddressAdd;