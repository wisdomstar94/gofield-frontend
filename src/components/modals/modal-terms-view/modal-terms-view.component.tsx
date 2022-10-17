import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { useTermList } from '../../../hooks/use-api-hook/use-api.hook';
import useAxios from '../../../hooks/use-axios-hook/use-axios.hook';
import Topbar from '../../layouts/top-bar/top-bar.component';
import WindowSizeContainer from '../../layouts/window-size-container/window-size-container.component';
import styles from './modal-terms-view.component.module.scss';
import { IModalTermsView } from './modal-terms-view.interface';

const ModalTermsView = forwardRef((props: IModalTermsView.Props, ref: ForwardedRef<IModalTermsView.RefObject>) => {
  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    show,
    hide,
  }));

  const axios = useAxios();

  const show = useCallback(() => {
    setModalState('show');
  }, []);

  const hide = useCallback(() => {
    setModalState('hide');
  }, []);

  const termList = useTermList();

  const [termHtmlContent, setTermHtmlContent] = useState<string>('');

  const [modalState, setModalState] = useState<IModalTermsView.ModalState>('');
  useEffect(() => {
    termList.getInstance(props.__termType).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      const termList = response.data.data;
      const recentTerm = termList[0];
      if (recentTerm === undefined) {
        return;
      }

      if (typeof props.__onRecentId === 'function') {
        props.__onRecentId(recentTerm.id);
      }
      // setIframeUrl(recentTerm.url);
      // setIframeUrl('/terms/privacy/privacy-20221101');

      axios.getAxiosInstance<any>({
        // url: '/terms/privacy/privacy-20221101',
        url: recentTerm.url,
        method: 'get',
      }).then((response) => {
        // console.log('response.data', response.data);
        const domParser = new DOMParser();
        const dom = domParser.parseFromString(response.data, "text/html");
        const htmlContent = dom.querySelector('.terms-content-area')?.innerHTML;
        if (typeof htmlContent === 'string') {
          setTermHtmlContent(htmlContent);
        }
        // setTermHtmlContent(response.data);
      });
      
    }).catch((error) => {

    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backButtonClick = useCallback(() => {
    setModalState('hide');
  }, []);

  return (
    <>
      {
        modalState === 'show'  ?
        <WindowSizeContainer __zIndex={1}>
          <Topbar 
            __backButtonClickCallback={backButtonClick}
            __layoutTypeA={{
              titleComponent: <>
                { props.__termType === 'PRIVACY' ? '개인정보 처리방침' : '' }
                { props.__termType === 'SIGNUP' ? '이용약관' : '' }
              </>,
            }}/>
          <div className="terms-content-area" dangerouslySetInnerHTML={{ __html: termHtmlContent }}></div>
        </WindowSizeContainer>
        :
        <></>
      }
    </>
  );  
});
ModalTermsView.displayName = 'ModalTermsView';

export default ModalTermsView;