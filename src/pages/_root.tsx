import React, { useEffect, useRef } from "react";
import { useRecoilState } from 'recoil';
import { axiosGloballErrorAtom, axiosGlobalResponseAtom } from "../atoms/axios.atom";
import { globalModalDefaultModalItemAtom } from "../atoms/global-modal-default.atom";
import ModalDefault from "../components/modals/modal-default/modal-default.component";
import { IModalDefault } from "../components/modals/modal-default/modal-default.interface";

const RootComponent: React.FC<{ children: React.ReactNode; }> = (props) => {
  const [axiosGloballError, setAxiosGloballError] = useRecoilState(axiosGloballErrorAtom);
  const [axiosGloballResponse, setAxiosGloballResponse] = useRecoilState(axiosGlobalResponseAtom);
  const [globalModalDefaultModalItem, setGlobalModalDefaultModalItem] = useRecoilState(globalModalDefaultModalItemAtom);

  const modalDefaultComponentRef = useRef<IModalDefault.RefObject>(null);

  useEffect(() => {
    if (axiosGloballError === null) {
      return;
    }
    
    const code = axiosGloballError.response?.data.error?.code;
    const message = axiosGloballError.response?.data.error?.message;
    
    modalDefaultComponentRef.current?.show({
      titleStyleA: {
        component: code,
      },
      contentComponent: message,
      negativeButtonState: 'hide',
      positiveButtonState: 'show',
    });
  }, [axiosGloballError]);

  useEffect(() => {
    if (axiosGloballResponse === null) {
      return;
    }
  }, [axiosGloballResponse]);

  useEffect(() => {
    if (globalModalDefaultModalItem === null) {
      return;
    }

    modalDefaultComponentRef.current?.show(globalModalDefaultModalItem);
  }, [globalModalDefaultModalItem]);

  return (
    <>
      {props.children}
      <ModalDefault
        ref={modalDefaultComponentRef} />
    </>
  );
};

export default RootComponent;
