import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { globalModalDefaultModalItemAtom } from "../../atoms/global-modal-default.atom";
import { IModalDefault } from "../../components/modals/modal-default/modal-default.interface";

const useModalConfirm = () => {
  const [_, setGlobalModalDefaultModalItem] = useRecoilState(globalModalDefaultModalItemAtom);

  const show = useCallback((params: {
    title: string;
    content: string;
    negativeButtonText?: string;
    negativeCallback?: (hide: IModalDefault.HideFunction, modalItem: IModalDefault.ModalItem) => void;
    positiveButtonText?: string;
    positiveCallback: (hide: IModalDefault.HideFunction, modalItem: IModalDefault.ModalItem) => void;
  }) => {
    const modalItem: IModalDefault.ModalItem = {
      titleStyleA: {
        component: <>{ params.title }</>
      },
      negativeButtonState: 'show',
      positiveButtonState: 'show',
      contentComponent: <><div className="w-full block box-sizing px-6">{ params.content }</div></>,
      onNegativeButtonClick(hide, modalItem) {
        if (typeof params.negativeCallback === 'function') {
          params.negativeCallback(hide, modalItem);
        } else {
          hide(modalItem);
        }
      },
      onPositiveButtonClick(hide, modalItem) {
        params.positiveCallback(hide, modalItem);
      },
    };
    setGlobalModalDefaultModalItem(modalItem);
  }, [setGlobalModalDefaultModalItem]);

  return {
    show,
  };
};

export default useModalConfirm;