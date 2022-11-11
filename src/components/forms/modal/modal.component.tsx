import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import styles from "./modal.component.module.scss";
import { IModal } from "./modal.interface";

const Modal = forwardRef((props: IModal.Props, ref: ForwardedRef<IModal.RefObject>) => {
  const [modalState, setModalState] = useState<IModal.ModalState>(props.__modalState ?? '');

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

  const backButtonClick = useCallback(() => {

  }, []);

  return (
    <>
      <div className={getClasses([styles['container'], modalState === 'show' ? styles['show'] : styles['hide']])}>
        { props.children }
      </div> 
    </>
  );
});
Modal.displayName = 'Modal';

export default Modal;