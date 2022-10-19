import { IStringUtilLibrary } from "./string-util.interface";

export const getAddCommaNumberString = (params: IStringUtilLibrary.AddCommaParams): string => {
  let returnValue = '';
  if (typeof params.numberValue === 'number') {
    returnValue = params.numberValue.toString().replace(/,/gi, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (typeof params.numberValue === 'string') {
    returnValue = params.numberValue.replace(/,/gi, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return returnValue;
};

export const getCharToCharCode = (char: string): number => {
  return char.charCodeAt(0);
};

export const getCharCodeToChar = (charCode: number): string => {
  return String.fromCharCode(charCode);
};

export const getStringToCharCodeArray = (text: string, fakeVariance?: number): number[] => {
  const charCodes: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    let charCode = getCharToCharCode(char);
    if (typeof fakeVariance === 'number') {
      charCode = charCode + fakeVariance;
    }
    charCodes.push(charCode);
  }
  return charCodes;
};

export const getCharCodeArrayToString = (charCodeArray: number[], variance?: number): string => {
  const chars: string[] = [];
  for (const charCodeArrayItem of charCodeArray) {
    let charCode = charCodeArrayItem;
    if (typeof variance === 'number') {
      charCode = charCode + variance;
    }
    chars.push(getCharCodeToChar(charCode));
  }
  return chars.join('');
};

export const isExistString = (v: any): boolean => {
  if (typeof v !== 'string') {
    return false;
  }

  if (v.trim() === '') {
    return false;
  }

  return true;
};

export const getNextRouterQueryToUrlQueryString = (query: { [key: string]: string | string[] | undefined }) => {
  const keys = Object.keys(query);

  const valueItems: { text: string; value: string }[] = [];
  for (const key of keys) {
    const value = query[key];

    if (key[0] === '_') {
      continue;
    }

    if (typeof value === 'string') {
      valueItems.push({ text: key, value: value });
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === 'string') {
          valueItems.push({ text: key, value: item });
        }
      }
    }
  }

  if (valueItems.length === 0) {
    return '';
  }

  return '?' + valueItems.map(x => `${x.text}=${x.value}`).join('&');
};