import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import Button from "../../forms/button/button.component";
import Input from "../../forms/input/input.component";
import Article from "../../layouts/article/article.component";
import styles from "./phone-number-form-box.component.module.scss";
import { IPhoneNumberFormBox } from "./phone-number-form-box.interface";

const PhoneNumberFormBox = forwardRef((props: IPhoneNumberFormBox.Props, ref: ForwardedRef<IPhoneNumberFormBox.RefObject>) => {
  const detailInfoRef = useRef<IPhoneNumberFormBox.DetailInfo | undefined>(props.__detailInfo ?? {});
  const [isCertCheckPossible, setIsCertCheckPossible] = useState(false);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    getDetailInfo,
  }));

  const getDetailInfo = useCallback(() => {
    return detailInfoRef.current;
  }, []);

  const phoneNumberChange = useCallback((value: string) => {
    
  }, []);

  const certNumberChange = useCallback((value: string) => {

  }, []);

  return (
    <>
      <Article>
        <div className={styles['phone-number-input-row']}>
          <div className={styles['left-area']}>
            <Input __width="100%" __type="number" __placeholder="변경 할 휴대폰 번호 입력" __onChange={phoneNumberChange} />
          </div>
          <div className={styles['right-area']}>
            <Button __buttonStyle="gray-solid-radius">인증번호 전송</Button>
          </div>
        </div>
        <div className={styles['cert-number-input-row']}>
          <div className={styles['left-area']}>
            <Input __width="100%" __type="number" __placeholder="인증번호를 입력해 주세요" __onChange={certNumberChange} />
          </div>
          <div className={styles['right-area']}>
            <Button __buttonStyle="gray-solid-radius" __disable={!isCertCheckPossible}>인증하기</Button>
          </div>
        </div>
      </Article>
    </>
  );
});
PhoneNumberFormBox.displayName = 'PhoneNumberFormBox';

export default PhoneNumberFormBox;