import { useEffect, useState } from "react";
import styles from "./qna-row-item.component.module.scss";
import { IQnaRowItem } from "./qna-row-item.interface";

const QnaRowItem = (props: IQnaRowItem.Props) => {
  const [qnaStatus, setQnaStatus] = useState<IQnaRowItem.QnaStatus | undefined>(props.__qnaStatus);
  useEffect(() => { setQnaStatus(props.__qnaStatus) }, [props.__qnaStatus]);

  const [question, setQuestion] = useState<string | undefined>(props.__question);
  useEffect(() => { setQuestion(props.__question) }, [props.__question]);

  const [answer, setAnswer] = useState<string | undefined>(props.__answer);
  useEffect(() => { setAnswer(props.__answer) }, [props.__answer]);

  const [isSecret, setIsSecret] = useState<boolean | undefined>(props.__isSecret);
  useEffect(() => { setIsSecret(props.__isSecret) }, [props.__isSecret]);

  return (
    <>
      <div className="w-full block box-sizing">
        <div className="block box-sizing px-6 py-4">
          <div className="w-full grid grid-cols-11">
            <div className="col-span-2 flex items-start">
              {
                (() => {
                  switch (qnaStatus) {
                    case 'answer-complete': return <span className="text-xs text-blue-a font-bold tracking-tighter">답변완료</span>;
                    case 'answer-expected': return <span className="text-xs text-orange-a font-bold tracking-tighter">답변예정</span>;
                  }
                  return <></>;
                })()
              }
            </div>
            <div className="col-span-9 flex flex-wrap items-start">
              <div className="w-full flex mb-1">
                <span className="font-bold text-sm text-black-a tracking-tighter">
                  { 
                  isSecret === true ? <>
                    비공개 문의입니다 &nbsp; <span>no-icon</span>  
                  </> : question }
                </span>
              </div>
              {
                isSecret !== true ? 
                <div className="w-full flex mb-1 flex-wrap">
                  <span className="font-normal text-sm text-gray-b tracking-tighter">몇번정도 사용하셨나요?</span>
                </div> : <></>
              }
              <div className="w-full flex mb-1 flex-wrap">
                <span className="text-xxs text-gray-b font-normal">2022.09.01 &nbsp;</span>
                <span className="text-xxs text-gray-b font-bold">james####</span>
              </div>
              {
                answer !== undefined ? 
                <div className="w-full flex flex-wrap mt-2 box-sizing pl-2">
                  <div className="w-full flex flex-wrap mb-1">
                    <span className="text-sm text-gray-b tracking-tighter">{ answer }</span>
                  </div>
                  <div className="w-full flex flex-wrap"> 
                    <span className="text-xxs text-gray-b font-normal">2022.09.01 &nbsp;</span>
                    <span className="text-xxs text-gray-b font-bold">kolog (판매자)</span>
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