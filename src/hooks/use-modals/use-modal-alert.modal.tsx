import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { globalModalDefaultModalItemAtom } from "../../atoms/global-modal-default.atom";
import { IModalDefault } from "../../components/modals/modal-default/modal-default.interface";

const useModalAlert = () => {
  const [_, setGlobalModalDefaultModalItem] = useRecoilState(globalModalDefaultModalItemAtom);

  const show = useCallback((params: {
    title: string;
    content: string;
  }) => {
    const modalItem: IModalDefault.ModalItem = {
      titleStyleA: {
        component: <>{ params.title }</>
      },
      negativeButtonState: 'hide',
      positiveButtonState: 'show',
      contentComponent: <>{ params.content }</>,
    };
    setGlobalModalDefaultModalItem(modalItem);
  }, [setGlobalModalDefaultModalItem]);

  return {
    show,
  };
};

export default useModalAlert;