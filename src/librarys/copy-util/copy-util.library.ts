import ClipboardJS from "clipboard";
import { checkChildDom } from "../dom-util/dom-util.library";
import { ICopyUtilLibrary } from "./copy-util.interface";

export const copyToClipboard = (params: ICopyUtilLibrary.CopyParams): Promise<ICopyUtilLibrary.TextCopyResult> => {
  const btnElement = document.createElement('button');
  btnElement.classList.add('btn');
  btnElement.setAttribute('data-clipboard-text', params.text);
  btnElement.style.opacity = '0';
  btnElement.style.position = 'fixed';
  btnElement.style.top = '0';
  btnElement.style.left = '-9000px';
  btnElement.style.width = '1px';
  btnElement.style.height = '1px';
  btnElement.style.overflow = 'hidden';

  const disposeFinally = (observer: MutationObserver | null) => {
    document.querySelector('body')?.removeChild(btnElement);
    if (observer !== null) {
      observer.disconnect();
    }
  };

  return new Promise(function(resolve, reject) {
    const observer = checkChildDom({
      target: document.querySelector('body'),
      callback: (event: any) => {
        // btnElement 추가시 호출되는 콜백함수
        const clipboard = new ClipboardJS(btnElement);
        clipboard.on('success', function (e: ICopyUtilLibrary.TextCopyResult) {
          disposeFinally(observer);
          e.result = 'success';
          resolve(e);
          e.clearSelection();
        });

        clipboard.on('error', function (e: ICopyUtilLibrary.TextCopyResult) {
          disposeFinally(observer);
          e.result = 'error';
          reject(e);
        });

        btnElement.click();
      },
      options: undefined,
    });

    document.querySelector('body')?.appendChild(btnElement);
  });
};
