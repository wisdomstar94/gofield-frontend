import React, { useEffect, useRef } from "react";
import { useRecoilState } from 'recoil';
import { axiosGloballErrorAtom, axiosGlobalResponseAtom } from "../atoms/axios.atom";
import { deviceTypeAtom } from "../atoms/device-type.atom";
import { globalModalDefaultModalItemAtom } from "../atoms/global-modal-default.atom";
import ModalDefault from "../components/modals/modal-default/modal-default.component";
import { IModalDefault } from "../components/modals/modal-default/modal-default.interface";
import { getDeviceInfo } from "../librarys/client-util/client-util.library";

const RootComponent: React.FC<{ children: React.ReactNode; }> = (props) => {
  const [axiosGloballError, setAxiosGloballError] = useRecoilState(axiosGloballErrorAtom);
  const [axiosGloballResponse, setAxiosGloballResponse] = useRecoilState(axiosGlobalResponseAtom);
  const [globalModalDefaultModalItem, setGlobalModalDefaultModalItem] = useRecoilState(globalModalDefaultModalItemAtom);
  const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);

  const modalDefaultComponentRef = useRef<IModalDefault.RefObject>(null);

  const notShowErrorCode = useRef(new Set(['F4300']));

  useEffect(() => {
    if (axiosGloballError === null) {
      return;
    }
    
    const code = axiosGloballError.response?.data.error?.code;
    const message = axiosGloballError.response?.data.error?.message;
    
    if (notShowErrorCode.current.has(code + '')) {
      return;
    }

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

  useEffect(() => {
    function onResize() {
      const deviceInfo = getDeviceInfo();
      // console.log('deviceInfo', deviceInfo);

      if (deviceInfo.type === undefined) {
        // pc
        setDeviceType('pc');
      } else {
        // mobile
        setDeviceType('mobile');
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize);
    }
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {props.children}
      <ModalDefault
        ref={modalDefaultComponentRef} />
    </>
  );
};

export default RootComponent;
