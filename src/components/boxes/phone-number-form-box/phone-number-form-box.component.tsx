import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import useUserPhoneNumberCertNumberCheckApi from "../../../hooks/use-apis/use-user-phone-number-cert-number-check.api";
import useUserPhoneNumberChangeRequestApi from "../../../hooks/use-apis/use-user-phone-number-change-request.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import useSetInterval from "../../../hooks/use-set-interval/use-set-interval.hook";
import { IUser } from "../../../interfaces/user/user.interface";
import { getTimeInfoFromTimestamp } from "../../../librarys/date-util/date-util.library";
import { isExistOnlyNumber } from "../../../librarys/regular-expression-util/regular-expression-util.library";
import Button from "../../forms/button/button.component";
import Input from "../../forms/input/input.component";
import Article from "../../layouts/article/article.component";
import styles from "./phone-number-form-box.component.module.scss";
import { IPhoneNumberFormBox } from "./phone-number-form-box.interface";

const PhoneNumberFormBox = forwardRef((props: IPhoneNumberFormBox.Props, ref: ForwardedRef<IPhoneNumberFormBox.RefObject>) => {
  const detailInfoRef = useRef<IUser.PhoneNumberChangeDetailInfo>(props.__detailInfo ?? {});
  const [isCertCheckPossible, setIsCertCheckPossible] = useState(false);
  const userPhoneNumberChangeRequestApi = useUserPhoneNumberChangeRequestApi();
  const userPhoneNumberCertNumberCheckApi = useUserPhoneNumberCertNumberCheckApi();
  const [certRemainTime, setCertRemainTime] = useState(-1);
  const certRemainTimeDecreaseIntervalRef = useRef<number>(-1);
  const modalAlert = useModalAlert();

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    getDetailInfo,
  }));

  const getDetailInfo = useCallback(() => {
    return detailInfoRef.current;
  }, []);

  const phoneNumberChange = useCallback((value: string) => {
    detailInfoRef.current.phoneNumber = value;
  }, []);

  const certNumberChange = useCallback((value: string) => {
    detailInfoRef.current.certNumber = value;
  }, []);

  const certRemainTimeDecreaseInterval = useSetInterval(() => {
    setCertRemainTime(certRemainTime - 1000);
  }, 1000);

  const startCertCountDown = useCallback(() => {
    setCertRemainTime(1000 * 60 * 3);
    // clearInterval(certRemainTimeDecreaseIntervalRef.current);
    certRemainTimeDecreaseInterval.start();
  }, [certRemainTimeDecreaseInterval]);

  const certNumberSendButtonClick = useCallback(() => {
    // startCertCountDown();
    if (typeof detailInfoRef.current.phoneNumber !== 'string') {
      modalAlert.show({ title: '안내', content: '휴대폰 번호를 입력해주세요.' });
      return;
    }

    if (detailInfoRef.current.phoneNumber.trim() === '') {
      modalAlert.show({ title: '안내', content: '휴대폰 번호를 입력해주세요.' });
      return;
    }

    if (!isExistOnlyNumber(detailInfoRef.current.phoneNumber)) {
      modalAlert.show({ title: '안내', content: '휴대폰 번호에는 숫자만 입력해주세요.' });
      return;
    }

    if (detailInfoRef.current.phoneNumber.length !== 11) {
      modalAlert.show({ title: '안내', content: '휴대폰 번호 자리수가 올바르지 않습니다.' });
      return;
    }

    userPhoneNumberChangeRequestApi.getInstance(detailInfoRef.current).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '요청에 실패하였습니다.' });
        return;
      }

      modalAlert.show({ title: '안내', content: '인증번호가 발송되었습니다. 인증번호를 인증한 뒤 변경을 완료해주세요.' });
      startCertCountDown();
    });
  }, [modalAlert, startCertCountDown, userPhoneNumberChangeRequestApi]);

  useEffect(() => {
    if (certRemainTime <= 0) {
      clearInterval(certRemainTimeDecreaseIntervalRef.current);
    }
  }, [certRemainTime]);

  const getCertRemainTimeString = useCallback(() => {
    const info = getTimeInfoFromTimestamp({ remainTimestamp: certRemainTime });
    return `${info.minute.toString().padStart(2, '0')}:${info.second.toString().padStart(2, '0')}`;
  }, [certRemainTime]);

  const certExecuteButtonClick = useCallback(() => {
    if (typeof detailInfoRef.current.certNumber !== 'string') {
      modalAlert.show({ title: '안내', content: '인증 번호를 입력해주세요.' });
      return;
    }

    if (!isExistOnlyNumber(detailInfoRef.current.certNumber)) {
      modalAlert.show({ title: '안내', content: '인증 번호에 숫자만 입력해주세요.' });
      return;
    }

    if (detailInfoRef.current.certNumber.trim() === '') {
      modalAlert.show({ title: '안내', content: '인증 번호를 입력해주세요.' });
      return;
    }

    userPhoneNumberCertNumberCheckApi.getInstance(detailInfoRef.current).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '인증에 실패하였습니다.' });
        return;
      }

      modalAlert.show({ title: '안내', content: '인증이 완료되었습니다.' });
      detailInfoRef.current.phoneNumber = '';
      detailInfoRef.current.certNumber = '';
      setCertRemainTime(-1);
    });
  }, [modalAlert, userPhoneNumberCertNumberCheckApi]);

  return (
    <>
      <Article>
        <div className={styles['phone-number-input-row']}>
          <div className={styles['left-area']}>
            <Input __width="100%" __type="number" __value={detailInfoRef.current.phoneNumber ?? ''} __placeholder="변경 할 휴대폰 번호 입력" __onChange={phoneNumberChange} />
          </div>
          <div className={styles['right-area']}>
            <Button __style={{ padding: '10px 14px' }} __buttonStyle="gray-solid-radius" __onClick={certNumberSendButtonClick}>인증번호 전송</Button>
          </div>
        </div>
        <div className={styles['cert-number-input-row']}>
          <div className={styles['left-area']}>
            <Input 
              __width="100%" 
              __type="number" 
              __placeholder="인증번호를 입력해 주세요" 
              __onChange={certNumberChange}
              __value={detailInfoRef.current.certNumber ?? ''}
              __rightLabel={{
                width: 40,
                component: certRemainTime >= 0 ?
                <span className="text-orange-a">
                  { getCertRemainTimeString() }
                </span> : undefined
              }} />
          </div>
          <div className={styles['right-area']}>
            <Button __style={{ padding: '10px 14px' }} __buttonStyle="gray-solid-radius" __disable={certRemainTime < 0} __onClick={certExecuteButtonClick}>인증하기</Button>
          </div>
        </div>
      </Article>
    </>
  );
});
PhoneNumberFormBox.displayName = 'PhoneNumberFormBox';

export default PhoneNumberFormBox;