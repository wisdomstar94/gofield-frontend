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
import { IAddress } from "../../../interfaces/address/address.interface";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import useUserAddressUploadApi from "../../../hooks/use-apis/use-user-address-upload.api";
import useUserAddressEditApi from "../../../hooks/use-apis/use-user-address-edit.api";
import Script from "next/script";

const ModalAddressAdd = forwardRef((props: IModalAddressAdd.Props, ref: ForwardedRef<IModalAddressAdd.RefObject>) => {
  const userAddressUploadApi = useUserAddressUploadApi();
  const userAddressEditApi = useUserAddressEditApi();
  const modalAlert = useModalAlert();
  const isUploadingRef = useRef(false);
  
  const [submitText, setSubmitText] = useState('등록');

  const [mode, setMode] = useState<IModalAddressAdd.Mode>(props.__mode ?? 'new');
  useEffect(() => { setMode(props.__mode ?? 'new'); }, [props.__mode]);

  useEffect(() => {
    if (mode === 'edit') {
      setSubmitText('수정');
    } else {
      setSubmitText('등록');
    }
  }, [mode]);

  const [modalState, setModalState] = useState<IModal.ModalState | undefined>(props.__modalState);
  useEffect(() => { setModalState(props.__modalState) }, [props.__modalState]);

  const [_, setTimestamp] = useState(0);

  const detailInfoRef = useRef<IAddress.AddressForm>({
    id: 0,
    address: '',
    addressExtra: '',
    isMain: false,
    name: '',
    tel: '',
    zipCode: '',
  });
  useEffect(() => {
    if (props.__detailInfo === undefined) {
      return;
    }

    detailInfoRef.current = { ...props.__detailInfo };
    setTimestamp(new Date().getTime());
  }, [props.__detailInfo])

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
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  const postNumberSearchButtonClick = useCallback(() => {
    new (window as any).daum.Postcode({
      oncomplete: function(data: IDaum.AddrInfo) {
        console.log('data', data);
        console.log('data', JSON.stringify(data, undefined, 2));

        detailInfoRef.current.address = data.address;
        detailInfoRef.current.zipCode = data.zonecode;
        setTimestamp(new Date().getTime());
      },
    }).open();
  }, []);

  const clear = useCallback(() => {
    detailInfoRef.current = {
      id: 0,
      address: '',
      addressExtra: '',
      isMain: false,
      name: '',
      tel: '',
      zipCode: '',
    };
    setTimestamp(new Date().getTime());
  }, []);

  const newAddressAddCompleteButtonClick = useCallback(() => {
    // console.log('detailInfoRef', detailInfoRef);
    if (isUploadingRef.current) {
      modalAlert.show({ title: '안내', content: '잠시 후 다시 시도해주세요.' });
      return;
    }

    if (typeof detailInfoRef.current.name !== 'string' || detailInfoRef.current.name.trim() === '') {
      modalAlert.show({ title: '안내', content: '수령인을 입력해주세요.' });
      return;
    }

    if (typeof detailInfoRef.current.tel !== 'string' || detailInfoRef.current.tel.trim() === '') {
      modalAlert.show({ title: '안내', content: '휴대폰번호를 입력해주세요.' });
      return;
    }

    if (typeof detailInfoRef.current.zipCode !== 'string' || detailInfoRef.current.zipCode.trim() === '') {
      modalAlert.show({ title: '안내', content: '우편번호 검색을 통해 우편번호를 입력해주세요.' });
      return;
    }

    if (typeof detailInfoRef.current.address !== 'string' || detailInfoRef.current.address.trim() === '') {
      modalAlert.show({ title: '안내', content: '우편번호 검색을 통해 기본주소를 입력해주세요.' });
      return;
    }

    if (typeof detailInfoRef.current.addressExtra !== 'string' || detailInfoRef.current.addressExtra.trim() === '') {
      modalAlert.show({ title: '안내', content: '상세주소를 입력해주세요.' });
      return;
    }

    isUploadingRef.current = true;
    if (mode === 'new') {
      // 주소 등록
      userAddressUploadApi.getInstance(detailInfoRef.current).then((response) => {
        if (response.data.status !== true) {
          modalAlert.show({ title: '안내', content: `주소 ${submitText}에 실패하였습니다.` });
          return;
        }

        modalAlert.show({ title: '안내', content: `주소가 ${submitText}되었습니다.` });
        if (typeof props.__onSubmitComplete === 'function') {
          props.__onSubmitComplete();
        }
        hide();
        clear();
      }).finally(() => {
        isUploadingRef.current = false;
      });
    } else {
      // 주소 수정
      userAddressEditApi.getInstance(detailInfoRef.current).then((response) => {
        if (response.data.status !== true) {
          modalAlert.show({ title: '안내', content: `주소 ${submitText}에 실패하였습니다.` });
          return;
        }

        modalAlert.show({ title: '안내', content: `주소가 ${submitText}되었습니다.` });
        if (typeof props.__onSubmitComplete === 'function') {
          props.__onSubmitComplete();
        }
      }).finally(() => {
        isUploadingRef.current = false;
      });
    }
  }, [clear, hide, modalAlert, mode, props, submitText, userAddressEditApi, userAddressUploadApi]);

  const getterNameChange = useCallback((value: string) => {
    detailInfoRef.current.name = value;
  }, []);

  const cpChange = useCallback((value: string) => {
    detailInfoRef.current.tel = value;
  }, []);

  const addrDetailChange = useCallback((value: string) => {
    detailInfoRef.current.addressExtra = value;
  }, []);

  const isDefaultAddrChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {
    detailInfoRef.current.isMain = changeInfo.checkState === 'checked';
  }, []);

  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" defer={true}></Script>
      <Modal __modalState={modalState}>
        <WindowSizeContainer __bgColor="#fff">
          <Topbar
            __backButtonClickCallback={() => { setModalState('hide') }}
            __layoutTypeB={{
              titleComponent: <>주소 { submitText }</>,
              rightComponent: <></>,
            }} />
          <Article>
            <FormListBox
              __formItems={[
                {
                  titleComponent: <>수령인</>,
                  contentComponent: <><Input __type="text" __value={detailInfoRef.current?.name ?? ''} __placeholder="이름을 입력해 주세요" __onChange={getterNameChange} /></>,
                },
                {
                  titleComponent: <>휴대폰번호</>,
                  contentComponent: <><Input __type="number" __maxLength={11} __value={detailInfoRef.current?.tel ?? ''} __placeholder="01000000000" __onChange={cpChange} /></>,
                },
                {
                  titleComponent: <>우편번호</>,
                  contentComponent: <>
                    <BothSidebox
                      __leftComponentStyle={{ width: 'calc(100% - 132px)' }}
                      __leftComponent={<><Input __type="number" __disable={true} __placeholder="00000" __value={detailInfoRef.current.zipCode ?? ''} __onChange={() => {  }} /></>}
                      __rightComponentStyle={{ width: '132px' }}
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
                    <Input __type="text" __disable={true} __placeholder="기본 주소" __value={detailInfoRef.current.address ?? ''} __onChange={() => {  }} />
                    <EmptyRow __style={{ height: '10px' }} />
                    <Input __type="text" __placeholder="나머지 주소를 입력해주세요" __value={detailInfoRef.current.addressExtra ?? ''} __onChange={addrDetailChange} />
                    <EmptyRow __style={{ height: '10px' }} />
                    <Checkbox 
                      __name="is-default" 
                      __checkState={detailInfoRef.current.isMain === true ? 'checked' : 'none-checked'}
                      __value="is-default"
                      __onChange={isDefaultAddrChange}>기본배송지로 설정</Checkbox>
                  </>,
                },
              ]} />
            <BottomFixedOrRelativeBox __heightToRelative={100}>
              <Button __style={{ marginTop: '20px' }} __buttonStyle="black-solid" __onClick={newAddressAddCompleteButtonClick}>완료</Button>
            </BottomFixedOrRelativeBox>
          </Article>
        </WindowSizeContainer>
      </Modal>
    </>
  );
});
ModalAddressAdd.displayName = 'ModalAddressAdd';

export default ModalAddressAdd;