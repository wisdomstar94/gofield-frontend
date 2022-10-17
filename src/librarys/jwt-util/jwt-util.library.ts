import jwt_decode from "jwt-decode";
import { IJwtUtilLibrary } from "./jwt-util.interface";

export function getJwtPayload<T>(jwt: string): T | null {
  if (typeof jwt !== 'string') {
    return null;
  }

  if (jwt.trim() === '') {
    return null;
  }

  let payload: any = {};
  payload = jwt_decode(jwt);

  return payload;
};

export const isJwtExpired = (jwt: string): boolean => {
  let payload: any = {};
  try {
    payload = getJwtPayload(jwt);
  } catch (e) {
    return true;
  }

  if (payload === null) {
    return true;
  }

  const currentDate = (new Date()).getTime();
  const tempDate = (new Date(payload.exp)).getTime();
  const expiredDateString = tempDate + '';
  const expiredDate = Number(expiredDateString.concat('000'));

  return expiredDate <= currentDate;
};

export const getJwtStatus = (jwt: string): IJwtUtilLibrary.JwtStatus => {
  let payload: any = {};
  try {
    payload = jwt_decode(jwt);
  } catch (e) {
    return 'not-jwt-structure';
  }

  if (payload === null) {
    return 'not-jwt-structure';
  }

  const currentTimestamp = new Date().getTime();
  let expireAtTimestamp = new Date(payload.exp).getTime();

  const diffSize = currentTimestamp.toString().length - expireAtTimestamp.toString().length;
  let addedZero = '';
  for (let i = 0; i < diffSize; i++) {
    addedZero += '0';
  }
  expireAtTimestamp = Number(expireAtTimestamp + addedZero);

  if (expireAtTimestamp <= currentTimestamp) {
    return 'expired-jwt';
  }

  return 'valid-jwt';
};
