import { IRegularExpressionUtilLibrary } from "./regular-expression-util.interface";

/**
 * @function getRemoveNumberString
 * @description 문자열에서 숫자를 제거한 문자열을 반환하는 함수
 * @returns
 */
export const getRemoveNumberString = (text: string): string => {
  return text.replace(new RegExp('\\d', 'gi'), '');
};

/**
 * @function getRemoveNotNumberString
 * @description 문자열에서 숫자를 제외한 나머지 모든 문자를 제거한 문자열을 반환하는 함수
 * @returns
 */
export const getRemoveNotNumberString = (text: string): string => {
  return text.replace(new RegExp('[^\\d]', 'gi'), '');
};

/**
 * @function getRemoveCharString
 * @description 문자열에서 특정 문자를 제거한 문자열을 반환하는 함수
 * @returns
 */
export const getRemoveCharString = (text: string, char: string): string => {
  return text.replace(new RegExp(char, 'gi'), '');
};

/**
 * @function getRemoveSpecialCharString
 * @description 문자열에서 특수문자를 제거한 문자열을 반환하는 함수
 * @returns
 */
export const getRemoveSpecialCharString = (text: string, isSpaceRemove?: boolean): string => {
  // return text.replace(new RegExp('[`~!@#$%^&*()_|+-=\?;:\'",.\<\>\{\}\[\]\\\/\\s]', 'gi'), '');
  /*
    숫자가 아니고, 영문이 아니고, 한글이 아닌 모든 문자를 제거.
    특수문자만 제거하지 않고 아래와 같이 숫자/영문/한글 을 제외한 모든 문자를 제거하도록 한 이유는,
    특수문자 외에 이모지 등과 같은 특수문자 정규식 조건에 걸리지 않는 예상치 못한 문자도 제외하기 위함.
  */
  if (isSpaceRemove === true) {
    // 공백 부분도 모두 제거
    return text.replace(new RegExp('[^a-zA-Z\\d\\s가-힣ㄱ-ㅎㅏ-ㅣ]', 'gi'), '');
  }

  // 공백은 제거하지 않음
  return text.replace(new RegExp('[^a-zA-Z\\d가-힣ㄱ-ㅎㅏ-ㅣ]', 'gi'), '');
};

/**
 * @function getRemoveNotInputRulesString
 * @description 문자열에서 inputRules 의 규칙들과 일치하지 않는 모든 문자를 제거한 문자열을 반환하는 함수.
 * @returns
 */
export const getRemoveNotInputRulesString = (text: string, inputRules: IRegularExpressionUtilLibrary.InputRule[], inputCharRules: null | string[]): string => {
  if (!Array.isArray(inputRules)) {
    return text;
  }

  if (inputRules.includes('allow-all')) {
    return text;
  }

  const regExpStringItems: string[] = [];

  for (const inputRule of inputRules) {
    switch (inputRule) {
      case 'allow-english':
        regExpStringItems.push('a-zA-Z');
        break;
      case 'allow-korean':
        regExpStringItems.push('가-힣ㄱ-ㅎㅏ-ㅣ');
        break;
      case 'allow-enter':
        regExpStringItems.push('\\n');
        break;
      case 'allow-number':
        regExpStringItems.push('\\d');
        break;
      case 'allow-space':
        regExpStringItems.push('\\s');
        break;
      case 'allow-dash':
        regExpStringItems.push('\-');
        break;
    }
  }

  if (Array.isArray(inputCharRules)) {
    for (const inputCharRule of inputCharRules) {
      regExpStringItems.push(inputCharRule);
    }
  }

  const regExpString = '[^' + regExpStringItems.join('') + ']';
  return text.replace(new RegExp(regExpString, 'gi'), '');
};

/**
 * @function getRemoveEnglishString
 * @description 문자열에서 영문을 제거한 문자열을 반환하는 함수
 * @returns
 */
export const getRemoveEnglishString = (text: string): string => {
  return text.replace(new RegExp('[a-z][A-Z]', 'gi'), '');
};

/**
 * @function getRemoveNotTelCharString
 * @description 문자열에서 숫자와 '-' 문자를 제외한 문자를 제거한 문자열을 반환하는 함수
 */
export const getRemoveNotTelCharString = (text: string): string => {
  return text.replace(/[^\d\-]/gi, '');
};

/**
 * @function getAutoHyphenPhoneNumberString
 * @description 문자열을 000-0000-0000 형태로 변환하여 반환하는 함수
 */
export const getAutoHyphenPhoneNumberString = (text: string) => {
  return text
    .replace(/[^\d]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
};

export const getAutoHyphenPhoneNumberString2 = (text: string) => {
  const onlyTelString = getRemoveNotTelCharString(text);
  const onlyNumber = getRemoveNotNumberString(onlyTelString);
  const convertValue = getAutoHyphenPhoneNumberString(onlyNumber);
  return convertValue;
};






export const isEmail = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) !== null) {
    return true;
  }

  return false;
}

/**
 * @function isPasswordType1
 * @description 비밀번호 형식 1번 : 숫자, 영문 반드시 포함되어 있는지 체크
 * @returns {boolean}
 */
export const isPasswordType1 = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/\d/) && ( text.match(/[a-z]/) || text.match(/[A-Z]/) )) {
    return true;
  }

  return false;
}

/**
 * @function isPasswordType2
 * @description 비밀번호 형식 2번 : 숫자, 영문, 특수기호 반드시 포함되어 있는지 체크
 * @returns {boolean}
 */
export const isPasswordType2 = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (( text.match(/\d/) && ( text.match(/[a-z]/) || text.match(/[A-Z]/) ) && text.match(/[\!\@\#\$\%\^\&\*\(\)\_\-\+\=\\\`\~\[\]\{\}\;\'\"\/\.\,]/) )) {
    return true;
  }

  return false;
};

/**
 * @function isPasswordType3
 * @description 비밀번호 형식 3번 : 숫자, 소문자, 대문자, 특수기호 반드시 포함되어 있는지 체크
 * @returns {boolean}
 */
export const isPasswordType3 = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (( text.match(/\d/) && text.match(/[a-z]/) && text.match(/[A-Z]/) && text.match(/[\!\@\#\$\%\^\&\*\(\)\_\-\+\=\\\`\~\[\]\{\}\;\'\"\/\.\,]/) )) {
    return true;
  }

  return false;
};

/**
 * @function isExistKoreanCharEucKr
 * @description 한글이 포함되어 있는지 체크 (euc-kr 인 경우)
 * @returns {boolean}
 */
export const isExistKoreanCharEucKr = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/[가-힣]/) !== null) {
    return true;
  }

  return false;
};

/**
 * @function isExistKoreanCharUtf8
 * @description 한글이 포함되어 있는지 체크 (utf-8 인 경우)
 * @returns {boolean}
 */
export const isExistKoreanCharUtf8 = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/[ㄱ-ㅎ]|[ㅏ-ㅣ]|[가-힣]/) != null) {
    return true;
  }

  return false;
};

/**
 * @function isExistEnglishChar
 * @description 영문이 포함되어 있는지 체크
 * @returns {boolean}
 */
export const isExistEnglishChar = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/[a-z]/) !== null) {
    return true;
  }

  if (text.match(/[A-Z]/) !== null) {
    return true;
  }

  return false;
};

/**
 * @function isExistEnglishUpperCase
 * @description 영 대문자가 포함되어 있는지 체크
 * @returns {boolean}
 */
export const isExistEnglishUpperCase = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/[A-Z]/) !== null) {
    return true;
  }

  return false;
};

/**
 * @function isExistEnglishLowerCase
 * @description 영 소문자가 포함되어 있는지 체크
 * @returns {boolean}
 */
export const isExistEnglishLowerCase = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/[a-z]/) !== null) {
    return true;
  }

  return false;
};

/**
 * @function isExistOnlyEnglish
 * @description 영문만 있는지 체크
 * @returns {boolean}
 */
export const isExistOnlyEnglish = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/[^a-zA-Z]/) === null) {
    return true;
  }

  return false;
};

/**
 * @function isExistOnlyEnglishOrNumber
 * @description 영문 또는 숫자만 있는지 체크
 * @returns {boolean}
 */
export const isExistOnlyEnglishOrNumber = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/[^a-zA-Z0-9]/) === null) {
    return true;
  }

  return false;
};

/**
 * @function isExistOnlyEnglishAndNumber
 * @description 영문과 숫자만 있는지 체크
 * @returns {boolean}
 */
export const isExistOnlyEnglishAndNumber = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/[^a-zA-Z0-9]/) === null && text.match(/[a-zA-Z]/) !== null && text.match(/\d/) !== null) {
    return true;
  }

  return false;
};

/**
 * @function isExistNumber
 * @description 숫자가 포함되어 있는지 체크
 * @returns {boolean}
 */
export const isExistNumber = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/\d/) !== null) {
    return true;
  }

  return false;
};

/**
 * @function isExistOnlyNumber
 * @description 숫자만 있는지 체크
 * @returns {boolean}
 */
export const isExistOnlyNumber = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/[^\d]/) === null && text !== '') {
    return true;
  }

  return false;
};

/**
 * @function isExistSpecialChar
 * @description 특수기호가 포함되어 있는지 체크
 * @returns {boolean}
 */
export const isExistSpecialChar = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/[\!\@\#\$\%\^\&\*\(\)\_\-\+\=\\\`\~\[\]\{\}\;\'\"\/\.\,]/) !== null) {
    return true;
  }

  return false;
};


/**
 * @function isExistOnlySpecialChar
 * @description 특수기호만 있는지 체크
 * @returns {boolean}
 */
export const isExistOnlySpecialChar = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/[^\!\@\#\$\%\^\&\*\(\)\_\-\+\=\\\`\~\[\]\{\}\;\'\"\/\.\,]/) === null) {
    return true;
  }

  return false;
};

/**
 * @function isTelOrPhoneNumber
 * @description 전화번호 형식이 맞는지 체크 (지역 전화번호, 휴대폰 번호 모두 허용)
 * @returns {boolean}
 */
export const isTelOrPhoneNumber = (text: string): boolean => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.match(/^\d{2,3}-\d{3,4}-\d{4}$/)) {
    return true;
  }

  return false;
};

/**
 * @description 휴대폰 번호 형식이 맞는제 체크 (- 가 있던 없던 상관 없음)
 * @param {string} text
 * @returns {boolean}
 */
export const isPhoneNumber = (text: string, isAllowDash?: boolean): boolean => {
  if (isAllowDash === false) {
    if (text.indexOf('-') !== -1) {
      return false;
    }
  }

  const regPhone = /^01([0|1|6|7|8|9])-?(\d{3,4})-?(\d{4})$/;
  return regPhone.test(text);
};
