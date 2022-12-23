import styles from "./modal-signup-notice.component.module.scss";
import { IModalSignupNotice } from "./modal-signup-notice.interface";
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useState } from "react";
import WindowSizeContainer from "../../layouts/window-size-container/window-size-container.component";
import Modal from "../../forms/modal/modal.component";
import { IModal } from "../../forms/modal/modal.interface";
import BottomFixedOrRelativeBox from "../../boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import useUser from "../../../hooks/use-user-hook/use-user.hook";
import { ILogin } from "../../../interfaces/login/login.interface";
import Script from "next/script";
import useKakaoLoginSdk from "../../../hooks/use-kakao-login-sdk/use-kakao-login-sdk.hook";
import Config from "../../../configs/config.export";

const ModalSignupNotice = forwardRef((props: IModalSignupNotice.Props, ref: ForwardedRef<IModalSignupNotice.RefObject>) => {
  const [modalState, setModalState] = useState<IModal.ModalState>(props.__modalState ?? '');
  const user = useUser();
  const kakaoLoginSdk = useKakaoLoginSdk();

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    show,
    hide,
  }));

  const show = useCallback(() => {
    setModalState('show');
  }, []);

  const hide = useCallback(() => {
    setModalState('hide');
  }, []);

  const closeButtonClick = useCallback(() => {
    hide();
  }, [hide]);

  const snsLoginButtonClick = useCallback((socialType: ILogin.SocialType) => {
    if (socialType === 'KAKAO') {
      kakaoLoginSdk.kakaoLoginStart({
        redirectUri: Config().kakao.redirectUrl,
      });
      return;
    }

    // const url = user.getLoginRequestUrl(socialType);
    // if (url === undefined) {
    //   return;
    // }

    // location.href = url;
  }, [kakaoLoginSdk]);

  return (
    <>
      <Script 
        src={Config().kakaoSdkJavascriptUrl} 
        integrity={Config().kakaoSdkJavascriptIntegrity} 
        crossOrigin={Config().kakaoSdkJavascriptCrossOrigin}
        defer
        onLoad={() => kakaoLoginSdk.init()}></Script>

      <Modal __modalState={modalState}>
        <WindowSizeContainer __bgColor="rgba(0, 0, 0, 0.7)">
          <div data-name="close-button" className="absolute top-4 right-4 text-white cursor-pointer text-xl" onClick={closeButtonClick}>
            x
          </div>
          <div data-name="logo-row" className="w-full flex mt-24 flex-wrap justify-center ttems-center">
            <span className="text-white text-4xl font-bold">GOFIELD</span>
          </div>
          <div data-name="description-row" className="w-full flex my-12 flex-wrap justify-center ttems-center">
            <span className="text-white text-base font-normal">로그인이 필요합니다.</span>
          </div>

          <BottomFixedOrRelativeBox __heightToRelative={140}>
            <div data-name="sns-login-button-row" className="w-full flex flex-wrap justify-center ttems-center mb-12">
              <ul className="w-full block m-0 p-0">
                <li data-name="button-item" className="w-full block list-none px-8 box-sizing mb-4">
                  <button className="w-full border-0 block bg-kakao-color rounded p-2" onClick={e => snsLoginButtonClick('KAKAO')}>카카오톡으로 로그인 하기</button>
                </li>
                <li data-name="button-item" className="w-full block list-none px-8 box-sizing">
                  <button className="w-full border-0 block bg-naver-color rounded p-2" onClick={e => snsLoginButtonClick('NAVER')}>네이버로 로그인 하기</button>
                </li>
              </ul>
            </div>
          </BottomFixedOrRelativeBox>
        </WindowSizeContainer>
      </Modal>
    </>
  );
});
ModalSignupNotice.displayName = 'ModalSignupNotice';

export default ModalSignupNotice;