import { useCallback, useEffect, useRef, useState } from 'react';
import { ITerms } from '../../../interfaces/terms/terms.interface';
import ModalTermsView from '../../modals/modal-terms-view/modal-terms-view.component';
import { IModalTermsView } from '../../modals/modal-terms-view/modal-terms-view.interface';
import SvgArrowRightIcon from '../../svgs/svg-arrow-right-icon/svg-arrow-right-icon.component';
import SvgCheckIcon from '../../svgs/svg-check-icon/svg-check-icon.component';
import styles from './terms-check.component.module.scss';
import { ITermsCheck } from './terms-check.interface';

const TermsCheck = (props: ITermsCheck.Props) => {
  const modalTermsViewSignupRef = useRef<IModalTermsView.RefObject>(null);
  const modalTermsViewPrivacyRef = useRef<IModalTermsView.RefObject>(null);

  const [requiredTermAccordionState, setRequiredTermAccordionState] = useState<ITermsCheck.AccordionState>('');
  const [freeTermAccordionState, setFreeTermAccordionState] = useState<ITermsCheck.AccordionState>('');

  // 필수
  const privacyTermRecentIdRef = useRef<number>(0);
  const serviceUseTermRecentIdRef = useRef<number>(0);

  const [serviceUseTermAgreeState, setServiceUseTermAgreeState] = useState(false);
  const [privacyTermAgreeState, setPrivacyTermAgreeState] = useState(false);

  // 선택
  const [appPushAgreeState, setAppPushAgreeState] = useState(false);
  const [smsAgreeState, setSmsAgreeState] = useState(false);
  const [emailAgreeState, setEmailAgreeState] = useState(false);

  const isRequiredTermAllAgree = useCallback(() => {
    if (!serviceUseTermAgreeState) {
      return false;
    }

    if (!privacyTermAgreeState) {
      return false;
    }

    return true;
  }, [privacyTermAgreeState, serviceUseTermAgreeState]);

  const isFreeTermAllAgree = useCallback(() => {
    if (!appPushAgreeState) {
      return false;
    }

    if (!smsAgreeState) {
      return false;
    }

    if (!emailAgreeState) {
      return false;
    }

    return true;
  }, [appPushAgreeState, emailAgreeState, smsAgreeState]);

  const requiredTermItemClick = useCallback(() => {
    if (serviceUseTermAgreeState || privacyTermAgreeState) {
      setServiceUseTermAgreeState(false);
      setPrivacyTermAgreeState(false);
      if (typeof props.__onAgreeListChange === 'function') {
        props.__onAgreeListChange([]);
      }
    } else {
      setServiceUseTermAgreeState(true);
      setPrivacyTermAgreeState(true);
      if (typeof props.__onAgreeListChange === 'function') {
        if (privacyTermRecentIdRef.current !== 0 && serviceUseTermRecentIdRef.current !== 0) {
          props.__onAgreeListChange([ privacyTermRecentIdRef.current, serviceUseTermRecentIdRef.current ]);
        }
      }
    }
  }, [privacyTermAgreeState, props, serviceUseTermAgreeState]);

  const requiredTermArrowIconClick = useCallback(() => {
    if (requiredTermAccordionState === 'show') {
      setRequiredTermAccordionState('hide');
    } else {
      setRequiredTermAccordionState('show');
    }
  }, [requiredTermAccordionState]);

  const freeTermItemClick = useCallback(() => {
    if (isFreeTermAllAgree()) {
      setAppPushAgreeState(false);
      setSmsAgreeState(false);
      setEmailAgreeState(false);
    } else {
      setAppPushAgreeState(true);
      setSmsAgreeState(true);
      setEmailAgreeState(true);
    }
  }, [isFreeTermAllAgree]);

  const freeTermItemArrowIconClick = useCallback(() => {
    if (freeTermAccordionState === 'show') {
      setFreeTermAccordionState('hide');
    } else {
      setFreeTermAccordionState('show');
    }
  }, [freeTermAccordionState]);

  const appPushItemClick = useCallback(() => {
    setAppPushAgreeState(!appPushAgreeState);
  }, [appPushAgreeState]);

  const smsItemClick = useCallback(() => {
    setSmsAgreeState(!smsAgreeState);
  }, [smsAgreeState]);

  const emailItemClick = useCallback(() => {
    setEmailAgreeState(!emailAgreeState);
  }, [emailAgreeState]);

  useEffect(() => {
    if (typeof props.__onSelectionListChange === 'function') {
      const list: ITerms.TermSelectionType[] = [];
      if (appPushAgreeState) { list.push('PUSH'); }
      if (smsAgreeState) { list.push('SMS'); }
      if (emailAgreeState) { list.push('EMAIL'); }
      props.__onSelectionListChange(list);
    }
  }, [appPushAgreeState, smsAgreeState, emailAgreeState, props]);

  return (
    <>
      <ul className={[
          styles['terms-check']
        ].join(' ')}>
        
        {/* 필수 약관 */}
        <li className={[
            styles['item'],
            styles[requiredTermAccordionState],
          ].join(' ')}>
          <div className={[
              styles['item-box']
            ].join(' ')}>
            <div className={[
                styles['common-area'], styles['check-icon-area']
              ].join(' ')}
              onClick={requiredTermItemClick}>
              <SvgCheckIcon __isActive={isRequiredTermAllAgree()} />
            </div>
            <div className={[
                styles['common-area'], styles['text-area']
              ].join(' ')}
              onClick={requiredTermItemClick}>
              (필수) 만 14세 이상이며 모두 동의합니다.
            </div>
            <div className={[
                styles['common-area'], styles['arrow-icon-area']
              ].join(' ')}
              onClick={requiredTermArrowIconClick}>
              <span className={[
                  styles['icon']
                ].join(' ')}>
                <SvgArrowRightIcon />
              </span>
            </div>
          </div>
          <div className={[
              styles['accordion-box'],
            ].join(' ')}>
            <ul className={[
                styles['row-list']
              ].join(' ')}>
              {/* 이용약관 동의 */}
              <li className={[
                  styles['item']
                ].join(' ')}>
                <div className={[
                    styles['common-area'], styles['left-area']
                  ].join(' ')}> 
                  &nbsp;
                </div>
                <div className={[
                    styles['common-area'], styles['center-area']
                  ].join(' ')}> 
                  이용약관 동의
                </div>
                <div className={[
                    styles['common-area'], styles['right-area']
                  ].join(' ')}> 
                  <span 
                    className={[
                      styles['contents-view-button']
                    ].join(' ')}
                    onClick={e => { modalTermsViewSignupRef.current?.show() }}>내용 보기</span>
                </div>
              </li>
              {/* 개인 정보 수집 및 이용 동의 */}
              <li className={[
                  styles['item']
                ].join(' ')}>
                <div className={[
                    styles['common-area'], styles['left-area']
                  ].join(' ')}> 
                  &nbsp;
                </div>
                <div className={[
                    styles['common-area'], styles['center-area']
                  ].join(' ')}> 
                  개인 정보 수집 및 이용 동의
                </div>
                <div className={[
                    styles['common-area'], styles['right-area']
                  ].join(' ')}> 
                  <span 
                    className={[
                      styles['contents-view-button']
                    ].join(' ')}
                    onClick={e => { modalTermsViewPrivacyRef.current?.show() }}>내용 보기</span>
                </div>
              </li>
            </ul>
          </div>
        </li>
        {/* 선택 약관 */}
        <li className={[
            styles['item'],
            styles[freeTermAccordionState],
          ].join(' ')}>
          <div className={[
              styles['item-box']
            ].join(' ')}>
            <div className={[
                styles['common-area'], styles['check-icon-area']
              ].join(' ')}
              onClick={freeTermItemClick}>
              <SvgCheckIcon
                __isActive={isFreeTermAllAgree()} />
            </div>
            <div className={[
                styles['common-area'], styles['text-area']
              ].join(' ')}
              onClick={freeTermItemClick}>
              (선택) 광고성 정보 수신에 모두 동의합니다.
            </div>
            <div className={[
                styles['common-area'], styles['arrow-icon-area']
              ].join(' ')}
              onClick={freeTermItemArrowIconClick}>
              <span className={[
                  styles['icon']
                ].join(' ')}>
                <SvgArrowRightIcon />
              </span>
            </div>
          </div>
          <div className={[
              styles['accordion-box'],
            ].join(' ')}>
            <ul className={[
                styles['row-list']
              ].join(' ')}>
              <li className={[
                  styles['item']
                ].join(' ')}
                onClick={appPushItemClick}>
                <div className={[
                    styles['common-area'], styles['left-area']
                  ].join(' ')}>
                  &nbsp;
                </div>
                <div className={[
                    styles['common-area'], styles['terms-type-text-area']
                  ].join(' ')}>
                  <div className={[
                      styles['check-icon-area']
                    ].join(' ')}>
                    <SvgCheckIcon
                      __isActive={appPushAgreeState} />
                  </div>
                  <div className={[
                      styles['text-area']
                    ].join(' ')}>
                    앱푸시 
                    {/* PUSH */}
                  </div>
                </div>
              </li>
              <li className={[
                  styles['item']
                ].join(' ')}
                onClick={smsItemClick}>
                <div className={[
                    styles['common-area'], styles['left-area']
                  ].join(' ')}>
                  &nbsp;
                </div>
                <div className={[
                    styles['common-area'], styles['terms-type-text-area']
                  ].join(' ')}>
                  <div className={[
                      styles['check-icon-area']
                    ].join(' ')}>
                    <SvgCheckIcon
                      __isActive={smsAgreeState} />
                  </div>
                  <div className={[
                      styles['text-area']
                    ].join(' ')}>
                    문자메시지
                    {/* SMS */}
                  </div>
                </div>
              </li>
              <li className={[
                  styles['item']
                ].join(' ')}
                onClick={emailItemClick}>
                <div className={[
                    styles['common-area'], styles['left-area']
                  ].join(' ')}>
                  &nbsp;
                </div>
                <div className={[
                    styles['common-area'], styles['terms-type-text-area']
                  ].join(' ')}>
                  <div className={[
                      styles['check-icon-area']
                    ].join(' ')}>
                    <SvgCheckIcon
                      __isActive={emailAgreeState} />
                  </div>
                  <div className={[
                      styles['text-area']
                    ].join(' ')}>
                    이메일
                    {/* EMAIL */}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <ModalTermsView ref={modalTermsViewPrivacyRef} __termType="PRIVACY" __onRecentId={ id => privacyTermRecentIdRef.current = id } />
      <ModalTermsView ref={modalTermsViewSignupRef} __termType="SIGNUP" __onRecentId={ id => serviceUseTermRecentIdRef.current = id } />
    </>
  );
};

export default TermsCheck;