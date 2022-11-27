import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useRefreshAccessTokenApi from "../../../hooks/use-apis/use-refresh-access-token.api";
import useUser from "../../../hooks/use-user-hook/use-user.hook";
import { ILogin } from "../../../interfaces/login/login.interface";
import { getJwtPayload, isJwtExpired } from "../../../librarys/jwt-util/jwt-util.library";
import { IAccessTokenCheck } from "./access-token-check.interface";

const AccessTokenCheck = (props: IAccessTokenCheck.Props) => {
  const [validState, setValidState] = useState<'' | 'valid' | 'invalid'>('');
  const user = useUser();
  const refreshAccessTokenApi = useRefreshAccessTokenApi();
  const router = useRouter();

  useEffect(() => {
    const accessToken = user.getAccessToken();
    // const refreshToken = user.getRefreshToken();

    if (typeof accessToken !== 'string') {
      accessTokenInvalid('empty-jwt');
      return;
    }

    if (isJwtExpired(accessToken)) {
      // refresh 시도..
      refreshAccessTokenApi.start((result) => {
        if (result !== true) {
          accessTokenInvalid('expired');
          return;
        }

        accessTokenCheck();
      });
      return;
    }

    accessTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accessTokenInvalid = useCallback((accessTokenInvalidType: IAccessTokenCheck.AccessTokenInvalidType) => {
    switch (accessTokenInvalidType) {
      case 'empty-jwt': {
        console.error('empty-jwt');
        user.removeAll();
        router.push('/login');
      } break;
      case 'expired': {
        console.error('expired');
        user.removeAll();
        router.push('/login');
      } break;
      case 'not-first-user': {
        console.error('not-first-user');
        router.push('/');
      } break;
      case 'not-jwt': {
        console.error('not-jwt');
        user.removeAll();
        router.push('/login');
      } break;
      case 'not-signup-complete-user': {
        console.error('not-signup-complete-user');
        router.push('/signup');
      } break;
    }
  }, [router, user]);

  const accessTokenCheck = useCallback(() => {
    const accessToken = user.getAccessToken();

    if (typeof accessToken !== 'string') {
      accessTokenInvalid('empty-jwt');
      return;
    }

    const payload = getJwtPayload<ILogin.JwtPayload>(accessToken);
    if (payload === null) {
      accessTokenInvalid('empty-jwt');
      return;
    }

    if (props.__checkTarget === 'first-user') {
      if (payload.isSign === false) {
        setValidState('valid');
      } else {
        accessTokenInvalid('not-first-user');
      }
    } else if (props.__checkTarget === 'signup-complete-user') {
      if (payload.isSign !== false) {
        setValidState('valid');
      } else {
        accessTokenInvalid('not-signup-complete-user');
      }
    }
  }, [accessTokenInvalid, props.__checkTarget, user]);

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

export default AccessTokenCheck;