import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { useRecoilState } from "recoil";
import { deviceTypeAtom } from "../../../atoms/device-type.atom";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import styles from "./modal-bottom.component.module.scss";
import { IModalBottom } from "./modal-bottom.interface";

const ModalBottom = forwardRef((props: IModalBottom.Props, ref: ForwardedRef<IModalBottom.RefObject>) => {
  const [modalState, setModalState] = useState<IModalBottom.ModalState>(props.__modalState ?? '');
  const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);
  
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
    setModalState(props.__modalState ?? '');
  }, [props.__modalState]);

  return (
    <>
      <div className={getClasses([styles['background'], styles[modalState], styles[deviceType]])}>

      </div>
      <div className={getClasses([styles['modal'], styles[modalState], styles[deviceType]])}>
        { props.children }
      </div>
    </>
  );
});
ModalBottom.displayName = 'ModalBottom';

export default ModalBottom;