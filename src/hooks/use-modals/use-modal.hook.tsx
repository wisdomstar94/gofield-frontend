import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { globalModalDefaultModalItemAtom } from "../../atoms/global-modal-default.atom";
import { IModalDefault } from "../../components/modals/modal-default/modal-default.interface";

const useModalDeliveryHistoryDetailInfo = () => {
  const [_, setGlobalModalDefaultModalItem] = useRecoilState(globalModalDefaultModalItemAtom);

  const show = useCallback(() => {
    const modalItem: IModalDefault.ModalItem = {
      titleStyleA: {
        component: <>
          <div className="w-full flex justify-start font-normal">
            운송장 번호 &nbsp; <span className="text-blue-a">123354325</span>
          </div>
        </>
      },
      negativeButtonState: 'hide',
      positiveButtonState: 'show',
      contentComponent: <>
        <div className="w-full block box-sizing px-6">
          <table className="w-full table-style-a">
            <thead>
              <tr>
                <th>
                  시간
                </th>
                <th>
                  현재위치
                </th>
                <th>
                  배송상태
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  05/09 오후 4:21
                </td>
                <td>
                  부산 수영 남천
                </td>
                <td>
                  집하
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>,
    };
    setGlobalModalDefaultModalItem(modalItem);
  }, [setGlobalModalDefaultModalItem]);

  return {
    show,
  };
};

export default useModalDeliveryHistoryDetailInfo;