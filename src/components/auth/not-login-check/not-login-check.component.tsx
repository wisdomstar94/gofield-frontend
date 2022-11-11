import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useUser from "../../../hooks/use-user-hook/use-user.hook";
import { getJwtStatus } from "../../../librarys/jwt-util/jwt-util.library";
import { INotLoginCheck } from "./not-login-check.interface";

const NotLoginCheck = (props: INotLoginCheck.Props) => {
  const [validState, setValidState] = useState<'' | 'valid' | 'invalid'>('');
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log('@@@router.isReady', router.isReady);
    if (router.isReady !== true) {
      return;
    }

    const accessToken = user.getAccessToken();
    if (typeof accessToken !== 'string') {
      setValidState('valid');
      return;
    }

    if (accessToken.trim() === '') {
      setValidState('valid');
      return;
    }

    const result = getJwtStatus(accessToken);
    if (result === 'not-jwt-structure') {
      setValidState('valid');
      return;
    }

    if (result === 'expired-jwt') {
      setValidState('valid');
      return;
    }

    doneLoginState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doneLoginState = useCallback(() => {
    alert('로그인 되어 있는 상태에서는 접근할 수 없는 페이지 입니다. 메인 화면으로 이동합니다.');
    router.push('/');
  }, [router]);

  return (
    <>
      {
        validState === 'valid' ? 
        props.children 
        : 
        <>

        </>
      }
    </>
  );
};

export default NotLoginCheck;