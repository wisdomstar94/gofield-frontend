import { IRandomUtilLibrary } from "./random-util.interface";

export const getRandomNumber = (params: IRandomUtilLibrary.NumberRangeItem): number => {
  return Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
};

export const getRandomNumberFromRange = (range: IRandomUtilLibrary.NumberRangeItem[]): number => {
  const random = getRandomNumber({ min: 0, max: range.length - 1});
  const randomValues = range.map(x => getRandomNumber({ min: x.min, max: x.max}));
  return randomValues[random];
};

export const getRandomString = (strLength: number): string => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < strLength; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const getRandomToken = (params: IRandomUtilLibrary.RandomTokenParams): string => {
  const timestamp = new Date().getTime();
  const timestamp_length = timestamp.toString().length;
  const str_max_length = params.strLength - timestamp_length;
  const first_length = getRandomNumber({ min: 1, max: str_max_length });
  const second_length = str_max_length - first_length;
  return ''.concat(
    getRandomString(first_length),
    new Date().getTime().toString(),
    getRandomString(second_length),
  );
};


