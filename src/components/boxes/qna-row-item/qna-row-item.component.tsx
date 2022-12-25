import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import useItemProductQnaDetailApi from "../../../hooks/use-apis/use-item-product-qna-detail.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import { IQna } from "../../../interfaces/qna/qna.interface";
import { day } from "../../../librarys/date-util/date-util.library";
import styles from "./qna-row-item.component.module.scss";
import { IQnaRowItem } from "./qna-row-item.interface";

const QnaRowItem = (props: IQnaRowItem.Props) => {
  const itemProductQnaDetailApi = useItemProductQnaDetailApi();
  const isGettingInfoRef = useRef(false);
  const router = useRouter();
  const modalAlert = useModalAlert();

  const [item, setItem] = useState(props.__item);
  useEffect(() => { setItem(props.__item); }, [props.__item]);

  const [detailInfo, setDetailInfo] = useState<IQna.QnaDetailInfoApiData>();

  const [isAnswerShow, setIsAnswerShow] = useState(false);

  const questionClick = useCallback(() => {
    if (detailInfo !== undefined) {
      return;
    }

    if (isGettingInfoRef.current) {
      return;
    }

    if (detailInfo === undefined) {
      isGettingInfoRef.current = true;
      const itemId = router.query._itemId?.toString();
      if (itemId !== undefined) {
        itemProductQnaDetailApi.getInstance(itemId, item?.id + '').then((response) => {
          if (response.data.status !== true) {
            modalAlert.show({ title: '안내', content: '' });
            return;
          }

          setDetailInfo(response.data.data);
          setIsAnswerShow(true);
        }).finally(() => {
          isGettingInfoRef.current = false;
        });
      }
    }
  }, [detailInfo, item?.id, itemProductQnaDetailApi, modalAlert, router.query._itemId]);

  return (
    <>
      <div className="w-full block box-sizing">
        <div className="block box-sizing px-6 py-4">
          <div className="w-full grid grid-cols-11">
            <div className="col-span-2 flex items-start">
              {
                (() => {
                  switch (item?.status) {
                    case 'COMPLETE': return <span className="text-xs text-blue-a font-bold tracking-tighter">답변완료</span>;
                    case 'RECEIPT': return <span className="text-xs text-orange-a font-bold tracking-tighter">답변예정</span>;
                  }
                  return <></>;
                })()
              }
            </div>
            
            <div className="col-span-9 flex flex-wrap items-start">
              <div className="w-full flex flex-wrap" onClick={questionClick}>
                <div className="w-full flex mb-1">
                  <span className="font-bold text-sm text-black-a tracking-tighter">
                    { item?.title }
                    {
                      item?.isVisible === false && item?.isMe === true ? 
                      <span className={styles['secret-me-text']}>&nbsp;* (나에게만 보입니다.)</span> : 
                      <></>
                    }
                  </span>
                </div>
                {
                  isAnswerShow ? 
                  <>
                    <div className="w-full flex mb-1 flex-wrap">
                      <span className="font-normal text-sm text-gray-b tracking-tighter">{ detailInfo?.description }</span>
                    </div>
                    <div className="w-full flex mb-1 flex-wrap">
                      <span className="text-xxs text-gray-b font-normal">{ day(new Date(detailInfo?.createDate + '')).format('YYYY-MM-DD HH:mm:ss') } &nbsp;</span>
                      <span className="text-xxs text-gray-b font-bold">{ item?.nickName}</span>
                    </div>
                  </> : <></>
                }
              </div>
              {
                typeof detailInfo?.answer === 'string' && isAnswerShow ? 
                <div className="w-full flex flex-wrap mt-2 box-sizing pl-2">
                  <div className="w-full flex flex-wrap mb-1">
                    <span className="text-sm text-gray-b tracking-tighter">{ detailInfo?.answer }</span>
                  </div>
                  <div className="w-full flex flex-wrap"> 
                    <span className="text-xxs text-gray-b font-normal">{ day(new Date(detailInfo.answerDate + '')).format('YYYY-MM-DD HH:mm:ss') } &nbsp;</span>
                    <span className="text-xxs text-gray-b font-bold">(판매자)</span>
                  </div>
                </div> : <></>
              }
            </div>
          </div>
        </div>
        <div className="block mx-4 h-px bg-gray-a"></div>
      </div>
    </>
  );
};

export default QnaRowItem;