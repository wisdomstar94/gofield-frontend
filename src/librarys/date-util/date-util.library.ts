import { IDateUtilLibrary } from "./date-util.interface";

export const getDateInfoFromString = (params: IDateUtilLibrary.DateInfoFromStringParams): IDateUtilLibrary.DateInfoFromString => {
  const {
    value,
  } = params;

  const returnData = {
    isValid: false,
    year: 0,
    month: 0,
    date: 0,
    dateString: '',
  };

  if (typeof value !== 'string') {
    return returnData;
  }

  if (value.trim() === '') {
    return returnData;
  }

  const splitArray = value.split('-');
  if (splitArray.length !== 3) {
    returnData.isValid = false;
    return returnData;
  }

  const year = splitArray[0];
  if (year.length !== 4) {
    returnData.isValid = false;
    return returnData;
  }
  if (isNaN(Number(year))) {
    returnData.isValid = false;
    return returnData;
  }

  const month = splitArray[1];
  if (month.length !== 2) {
    returnData.isValid = false;
    return returnData;
  }
  if (isNaN(Number(month))) {
    returnData.isValid = false;
    return returnData;
  }

  const date = splitArray[2];
  if (date.length !== 2) {
    returnData.isValid = false;
    return returnData;
  }
  if (isNaN(Number(date))) {
    returnData.isValid = false;
    return returnData;
  }

  returnData.isValid = true;
  returnData.year = Number(year);
  returnData.month = Number(month);
  returnData.date = Number(date);
  returnData.dateString = year + '-' + month + '-' + date;
  return returnData;
};

export const getTimeInfoFromString = (params: IDateUtilLibrary.TimeInfoFromStringParams): IDateUtilLibrary.TimeInfoFromString => {
  const {
    value,
  } = params;

  const returnData = {
    isValid: false,
    hour: 0,
    minute: 0,
    second: 0,
    timeString: '',
  };

  if (typeof value !== 'string') {
    return returnData;
  }

  if (value.trim() === '') {
    return returnData;
  }

  const splitArray = value.split('-');
  if (splitArray.length !== 3) {
    returnData.isValid = false;
    return returnData;
  }

  const hourString = splitArray[0];
  if (hourString.length !== 2) {
    console.error('__timeString ?????? hour ??? 2????????? ????????????.');
    return returnData;
  }
  const hour = Number(hourString);
  if (isNaN(hour)) {
    console.error('__timeString ?????? hour ??? ?????? ???????????? ????????????.');
    return returnData;
  }
  if (hour < 0 || hour > 23) {
    console.error('__timeString ?????? hour ??? ?????? ????????? ??????????????????.');
    return returnData;
  }

  const minuteString = splitArray[1];
  if (minuteString.length !== 2) {
    console.error('__timeString ?????? minute ??? 2????????? ????????????.');
    return returnData;
  }
  const minute = Number(minuteString);
  if (isNaN(minute)) {
    console.error('__timeString ?????? minute ??? ?????? ???????????? ????????????.');
    return returnData;
  }
  if (minute < 0 || minute > 59) {
    console.error('__timeString ?????? minute ??? ?????? ????????? ??????????????????.');
    return returnData;
  }

  const secondString = splitArray[2];
  if (secondString.length !== 2) {
    console.error('__timeString ?????? second ??? 2????????? ????????????.');
    return returnData;
  }
  const second = Number(secondString);
  if (isNaN(second)) {
    console.error('__timeString ?????? second ??? ?????? ???????????? ????????????.');
    return returnData;
  }
  if (second < 0 || second > 59) {
    console.error('__timeString ?????? second ??? ?????? ????????? ??????????????????.');
    return returnData;
  }

  returnData.isValid = true;
  returnData.hour = Number(hour);
  returnData.minute = Number(minute);
  returnData.second = Number(second);
  returnData.timeString = hour + ':' + minute + ':' + second;
  return returnData;
};

export const getDateBetweenMonthCount = (params: IDateUtilLibrary.DateBetweenMonthCountParams): number => {
  const startDateInfo = getDateInfoFromString({ value: params.startDate });
  if (!startDateInfo.isValid) {
    throw new Error(`startDate ??? date ????????? ????????????.`);
  }

  const endDateInfo = getDateInfoFromString({ value: params.endDate });
  if (!endDateInfo.isValid) {
    throw new Error(`endDate ??? date ????????? ????????????.`);
  }

  const startDateObj = new Date();
  startDateObj.setFullYear(startDateInfo.year);
  startDateObj.setMonth(startDateInfo.month - 1);
  startDateObj.setDate(1);

  const endDateObj = new Date();
  endDateObj.setFullYear(endDateInfo.year);
  endDateObj.setMonth(endDateInfo.month - 1);
  endDateObj.setDate(27);

  let monthCount = 0;
  let checkCount = 0;

  for (let i = 0; i < 100000; i++) {
    checkCount++;
    endDateObj.setMonth(endDateObj.getMonth() - 1);

    if (startDateObj.getTime() < endDateObj.getTime()) {
      monthCount++;
    } else {
      break;
    }
  }

  return monthCount;
};

export const getTimeInfoFromTimestamp = (params: IDateUtilLibrary.TimeInfoFromTimestampParams): IDateUtilLibrary.TimeInfo => {
  const {
    remainTimestamp,
  } = params;

  // hour ?????????
  let hour = Math.floor(remainTimestamp / (1000 * 60 * 60));

  // minute ?????????
  const hourRemain = hour * (1000 * 60 * 60);
  let minute = Math.floor((remainTimestamp - hourRemain) / (1000 * 60));

  // second ?????????
  const minuteRemain = minute * (1000 * 60);
  let second = Math.floor((remainTimestamp - (hourRemain + minuteRemain)) / 1000);

  let status: 'high' | 'middle' | 'low' = 'low';
  if (hour > 1) {
    status = 'high';
  } else if (minute > 5) {
    status = 'middle';
  }

  if (hour < 0) {
    hour = 0;
    minute = 0;
    second = 0;
  }

  return {
    hour,
    minute,
    second,
    status,
    text: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`,
  };
};

class CustomDateClass {
  _dateValue: string | Date;

  /**
   * @param {string | Date=} _dateValue ?????? ???
   */
  constructor(_dateValue: string | Date) {
    this._dateValue = _dateValue;
    if (_dateValue === undefined) {
      // this._dateValue = new Date();
      this._dateValue = '*';
    } else if (this._dateValue instanceof Date) {
      // ...
    } else if (typeof this._dateValue !== 'string') {
      throw new Error('myDate??? _dateValue ????????? ???????????? ???????????? ?????????.');
    }

    return this;
  }

  /** @function isValid
   * @returns {boolean}
   */
  isValid(): boolean {
    if (typeof this._dateValue === 'string') {
      // console.log('isValid() this._dateValue', this._dateValue);
      if (this._dateValue.length === 24) {
        const tempDateObj = new Date(this._dateValue);
        if (isNaN(tempDateObj.getFullYear())) {
          return false;
        } else {
          return true;
        }
      }

      // _dateValue ?????? ???????????? ??????
      const date_space_split = this._dateValue.split(' ');
      if (date_space_split.length !== 2) {
        return false;
      }

      // date ?????? ??????
      const only_date = date_space_split[0];
      const only_date_stroke_split = only_date.split('-');
      if (only_date_stroke_split.length !== 3) {
        return false;
      }
      const year = Number(only_date_stroke_split[0]); // ex) 2020
      const month = Number(only_date_stroke_split[1]); // ex) 5 (????????? 5??? ?????? ?????? 5???)
      const date = Number(only_date_stroke_split[2]); // ex) 11
      if (isNaN(year) || year <= 1800) {
        return false;
      }
      if (isNaN(month) || (month < 1 || month > 12)) {
        return false;
      }
      if (isNaN(date) || (date < 1 || date > 31)) {
        return false;
      }

      const dateObject = new Date();
      dateObject.setFullYear(year);
      const setYearAfterYear = dateObject.getFullYear();

      dateObject.setMonth(month - 1);
      const setMonthAfterYear = dateObject.getFullYear();
      const setMonthAfterMonth = dateObject.getMonth() + 1;

      if (setYearAfterYear !== setMonthAfterYear) {
        return false;
      }

      dateObject.setDate(date);
      const setDateAfterYear = dateObject.getFullYear();
      const setDateAfterMonth = dateObject.getMonth() + 1;
      // const setDateAfterDate = dateObject.getDate();

      if (setYearAfterYear !== setDateAfterYear) {
        return false;
      }

      if (setMonthAfterMonth !== setDateAfterMonth) {
        return false;
      }


      // time ?????? ??????
      const only_time = date_space_split[1];
      const only_time_colon_split = only_time.split(':');
      if (only_time_colon_split.length !== 3) {
        return false;
      }
      const hour = Number(only_time_colon_split[0]);
      const minute = Number(only_time_colon_split[1]);
      const second = Number(only_time_colon_split[2]);
      if (isNaN(hour) || (hour < 0 || hour > 23)) {
        return false;
      }
      if (isNaN(minute) || (minute < 0 || minute > 59)) {
        return false;
      }
      if (isNaN(second) || (second < 0 || second > 59)) {
        return false;
      }

      const test = new Date(this._dateValue);
      if (isNaN(test.getDay())) {
        return false;
      }

      return true;
    }




    if (typeof this._dateValue === 'object') {
      // _dateValue ?????? ??????????????? ??????
      if (typeof this._dateValue.getFullYear !== 'function') {
        return false;
      }
      if (typeof this._dateValue.getMonth !== 'function') {
        return false;
      }
      if (typeof this._dateValue.getDate !== 'function') {
        return false;
      }
      if (typeof this._dateValue.getHours !== 'function') {
        return false;
      }
      if (typeof this._dateValue.getMinutes !== 'function') {
        return false;
      }
      if (typeof this._dateValue.getSeconds !== 'function') {
        return false;
      }

      return true;
    }




    return false;
  }

  /** @function add
   * @param {number} value ?????? ?????? ???
   * @param {'year' | 'years' | 'month' | 'months' | 'date' | 'dates' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds'} unit ?????? ?????? ?????? (???, ???, ??? ???)
   * @returns {CustomDateClass}
   */
  add(value: number, unit: IDateUtilLibrary.IDay.Unit): CustomDateClass {
    const t = this;

    if (value === undefined) {
      throw new Error('myDate??? add????????? value????????? ???????????????.');
    }

    if (typeof value !== 'number') {
      throw new Error('myDate??? add????????? value????????? ??????????????? ?????????.');
    }

    const allow_unit = [
      'year', 'years',
      'month', 'months',
      'date', 'dates',
      'hour', 'hours',
      'minute', 'minutes',
      'second', 'seconds'
    ];

    if (unit === undefined) {
      throw new Error('myDate??? add????????? unit????????? ???????????????.');
    }

    if (typeof unit !== 'string') {
      throw new Error('myDate??? add????????? unit????????? ??????????????? ?????????.');
    }

    if (!allow_unit.includes(unit)) {
      throw new Error('myDate??? add????????? unit????????? ' + allow_unit.join(',') + '?????? ??????????????? ?????????.');
    }

    if (!t.isValid()) {
      throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : C');
    }


    const current_dateObject = t.getDateInfo().dateObject;

    switch (unit) {
      case 'year':
      case 'years':
        // ?????? ??????
        const current_year = current_dateObject.getFullYear();
        const after_year = current_year + value;
        current_dateObject.setFullYear(after_year);
        break;

      case 'month':
      case 'months':
        // ??? ??????
        const current_month_index = current_dateObject.getMonth();
        const after_month_index = current_month_index + value;
        current_dateObject.setMonth(after_month_index);
        break;

      case 'date':
      case 'dates':
        // ??? ??????
        const current_date = current_dateObject.getDate();
        const after_date = current_date + value;
        current_dateObject.setDate(after_date);
        break;

      case 'hour':
      case 'hours':
        // ??? ??????
        const current_hour = current_dateObject.getHours();
        const after_hour = current_hour + value;
        current_dateObject.setHours(after_hour);
        break;

      case 'minute':
      case 'minutes':
        // ??? ??????
        const current_minute = current_dateObject.getMinutes();
        const after_minute = current_minute + value;
        current_dateObject.setMinutes(after_minute);
        break;

      case 'second':
      case 'seconds':
        // ??? ??????
        const currentSecond = current_dateObject.getSeconds();
        const afterSecond = currentSecond + value;
        current_dateObject.setSeconds(afterSecond);
        break;
    }

    t._dateValue = current_dateObject;

    return t;
  }

  /** @function getDateInfo
   * @returns {DateInfo}
   */
  getDateInfo() {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : A');
    }

    if (typeof this._dateValue === 'string') {
      let dateObject, year, month, date, hour, minute, second, day;

      if (this._dateValue.length === 24) {
        dateObject = new Date(this._dateValue);

        year = dateObject.getFullYear();
        month = dateObject.getMonth() + 1;
        date = dateObject.getDate();

        hour = dateObject.getHours();
        minute = dateObject.getMinutes();
        second = dateObject.getSeconds();

        day = dateObject.getDay();
      } else {
        const date_space_split = this._dateValue.split(' ');

        const only_date = date_space_split[0];
        const only_date_stroke_split = only_date.split('-');
        year = Number(only_date_stroke_split[0]); // ex) 2020
        month = Number(only_date_stroke_split[1]); // ex) 5 (????????? 5??? ?????? ?????? 5???)
        date = Number(only_date_stroke_split[2]); // ex) 11
        const only_time = date_space_split[1];
        const only_time_colon_split = only_time.split(':');
        hour = Number(only_time_colon_split[0]);
        minute = Number(only_time_colon_split[1]);
        second = Number(only_time_colon_split[2]);

        dateObject = new Date();
        dateObject.setFullYear(year);
        dateObject.setMonth(month - 1);
        dateObject.setDate(date);
        dateObject.setHours(hour);
        dateObject.setMinutes(minute);
        dateObject.setSeconds(second);

        day = dateObject.getDay();
      }

      return {
        year: year,
        month: month,
        date: date,
        hour: hour,
        minute: minute,
        second: second,
        day: day,
        dateObject: dateObject
      };
    }

    if (typeof t._dateValue === 'object') {
      return {
        year: t._dateValue.getFullYear(),
        month: (t._dateValue.getMonth() + 1),
        date: t._dateValue.getDate(),
        hour: t._dateValue.getHours(),
        minute: t._dateValue.getMinutes(),
        second: t._dateValue.getSeconds(),
        day: t._dateValue.getDay(),
        dateObject: t._dateValue
      };
    }

    throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : B');
  }


  /** @function getTime
   * @returns {number}
   */
  getTime(): number {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : F');
    }

    const dateInfo = t.getDateInfo();
    return dateInfo.dateObject.getTime();
  }

  /** @function getDay
   * @param {'ko' | 'korean' | 'en' | 'english'=} type
   * @returns {number | string}
   */
  getDay(type: IDateUtilLibrary.IDay.DayType): number | string {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : G');
    }

    const day_ko = ['???', '???', '???', '???', '???', '???', '???'];
    const day_korean = ['?????????', '?????????', '?????????', '?????????', '?????????', '?????????', '?????????'];
    const day_en = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day_english = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day: number = t.getDateInfo().dateObject.getDay();
    let return_day: string | number = day;

    if (type === 'ko') {
      return_day = day_ko[day];
    }

    if (type === 'korean') {
      return_day = day_korean[day];
    }

    if (type === 'en') {
      return_day = day_en[day];
    }

    if (type === 'english') {
      return_day = day_english[day];
    }

    return return_day;
  }

  /** @function getYear
   * @param {'YY'=} type
   * @returns {number | string}
   */
  getYear(type?: 'YY'): string | number {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : K');
    }

    const dateInfo = t.getDateInfo();
    const year = dateInfo.year;
    let return_year: string | number = year;

    if (type === 'YY') {
      return_year = (return_year + '').substr(2, 2);
    }

    return return_year;
  }

  /** @function getMonth
   * @param {'MM'=} type
   * @returns {number | string}
   */
  getMonth(type?: 'MM') {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : L');
    }

    const dateInfo = t.getDateInfo();
    const month = dateInfo.month;
    let return_month: string | number = month;

    if (type === 'MM') {
      return_month = t.zeroFill(month);
    }

    return return_month;
  }

  /** @function getDate
   * @param {'DD' | 'dd'=} type
   * @returns {number | string}
   */
  getDate(type?: 'DD' | 'dd'): string | number {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : M');
    }

    const dateInfo = t.getDateInfo();
    const date = dateInfo.date;
    let return_date: string | number = date;

    if (type === 'DD' || type === 'dd') {
      return_date = t.zeroFill(date);
    }

    return return_date;
  }

  /** @function getHour
   * @param {'HH' | 'hh'=} type
   * @returns {number | string}
   */
  getHour(type?: 'HH' | 'hh'): string | number {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : H');
    }

    const dateInfo = t.getDateInfo();
    const hour = dateInfo.hour;
    let return_hour: string | number = hour;

    if (type === 'HH' || type === 'hh') {
      return_hour = t.zeroFill(hour);
    }

    return return_hour;
  }

  /** @function getMinute
   * @param {'mm' | 'ii'=} type
   * @returns {number | string}
   */
  getMinute(type: 'mm' | 'ii'): string | number {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : I');
    }

    const dateInfo = t.getDateInfo();
    const minute = dateInfo.minute;
    let return_minute: string | number = minute;

    if (type === 'mm' || type === 'ii') {
      return_minute = t.zeroFill(minute);
    }

    return return_minute;
  }

  /** @function getSecond
   * @param {'ss'=} type
   * @returns {number | string}
   */
  getSecond(type?: 'ss'): string | number {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : J');
    }

    const dateInfo = t.getDateInfo();
    const second = dateInfo.second;
    let return_second: string | number = second;

    if (type === 'ss') {
      return_second = t.zeroFill(second);
    }

    return return_second;
  }

  /** @function format
   * @param {string} format_string
   * @returns {string}
   */
  format(format_string: string): string {
    const t = this;

    if (!t.isValid()) {
      return '';
      // throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : D');
    }

    if (format_string === undefined) {
      throw new Error('myDate????????? format_string????????? ???????????????.');
    }

    if (typeof format_string !== 'string') {
      throw new Error('myDate????????? format_string????????? ?????????????????? ?????????.');
    }

    // const allow_format_unit = [
    //   'yy', 'YY', 'yyyy', 'YYYY', // ??????
    //   'M', 'MM', // ???
    //   'd', 'dd', 'D', 'DD', // ???
    //   'h', 'hh', 'H', 'HH', // ???
    //   'm', 'mm', 'i', 'ii', // ???
    //   's', 'ss', // ???
    //   'L', 'l', // ????????????
    // ];

    let return_format = format_string;
    const dateInfo = t.getDateInfo();

    // ?????? ??????
    return_format = return_format.replace(/YYYY/g, (dateInfo.year + ''));
    return_format = return_format.replace(/yyyy/g, (dateInfo.year + ''));
    return_format = return_format.replace(/YY/g, (dateInfo.year + '').substring(2, 4));
    return_format = return_format.replace(/yy/g, (dateInfo.year + '').substring(2, 4));

    // ??? ??????
    return_format = return_format.replace(/MM/g, t.zeroFill(dateInfo.month));
    return_format = return_format.replace(/M/g, dateInfo.month + '');

    // ??? ??????
    return_format = return_format.replace(/DD/g, t.zeroFill(dateInfo.date));
    return_format = return_format.replace(/dd/g, t.zeroFill(dateInfo.date));
    return_format = return_format.replace(/D/g, dateInfo.date + '');
    return_format = return_format.replace(/d/g, dateInfo.date + '');

    // ??? ??????
    return_format = return_format.replace(/HH/g, t.zeroFill(dateInfo.hour));
    return_format = return_format.replace(/hh/g, t.zeroFill(dateInfo.hour));
    return_format = return_format.replace(/H/g, dateInfo.hour + '');
    return_format = return_format.replace(/h/g, dateInfo.hour + '');

    // ??? ??????
    return_format = return_format.replace(/mm/g, t.zeroFill(dateInfo.minute));
    return_format = return_format.replace(/ii/g, t.zeroFill(dateInfo.minute));
    return_format = return_format.replace(/m/g, dateInfo.minute + '');
    return_format = return_format.replace(/i/g, dateInfo.minute + '');

    // ??? ??????
    return_format = return_format.replace(/ss/g, t.zeroFill(dateInfo.second));
    return_format = return_format.replace(/s/g, dateInfo.second + '');

    // ???????????? ??????
    return_format = return_format.replace(/LL/g, t.zeroFill(this.getLastDate()));
    return_format = return_format.replace(/l/g, this.getLastDate() + '');

    return return_format;
  }

  /** @function getLastDate
   * @returns {number}
   */
  getLastDate(): number {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : Q');
    }

    const dateInfo = t.getDateInfo();
    const currentYear = Number(dateInfo.year);
    let targetYear = Number(currentYear);

    const currentMonth = Number(dateInfo.month); // ????????? ??????.. ??? 5?????? 5????????? ???????????? ????????? 4
    let targetNextMonth = currentMonth + 1;
    if (targetNextMonth > 12) {
      targetNextMonth = 1;
      targetYear += 1;
    }

    const zeroDateObject = new Date(dateInfo.dateObject);

    zeroDateObject.setFullYear(targetYear);
    zeroDateObject.setMonth(targetNextMonth - 1);
    zeroDateObject.setDate(0);

    const lastDate = zeroDateObject.getDate();
    return Number(lastDate);
  }

  /** @function getLastDate
   * @returns {string[]}
   */
  getDately(): string[] {
    const t = this;

    if (!t.isValid()) {
      throw new Error('myDate??? ?????? ?????? ????????? ????????? ????????????. Error-Type : P');
    }

    const lastDate = t.getLastDate();

    const dately: string[] = [];
    for (let i = 1; i <= lastDate; i++) {
      dately.push(t.format('YYYY-MM-') + t.zeroFill(i));
    }

    return dately;
  }

  getWeekStartAndEndInfo(): IDateUtilLibrary.IDay.WeekStartAndEndInfo {
    const info: IDateUtilLibrary.IDay.WeekStartAndEndInfo = {
      startDate: '',
      endDate: '',
    };

    const dateInfo = { ...this.getDateInfo() };
    const dateObject = dateInfo.dateObject;
    for (let i = 0; i < 7; i++) {
      if (dateObject.getDay() === 1) {
        const startDate = new CustomDateClass(dateObject);
        const endDate = new CustomDateClass(new Date(dateObject)).add(6, 'date');
        info.startDate = startDate.format('YYYY-MM-DD');
        info.endDate = endDate.format('YYYY-MM-DD');
        break;
      }

      dateObject.setDate(dateObject.getDate() - 1);
    }

    return info;
  }

  getISOString(): string {
    return this.getDateInfo().dateObject.toISOString();
  }

  /** @function zeroFill
   * @param {number} number_value
   * @returns {string}
   */
  zeroFill(number_value: number): string {
    if (number_value === undefined) {
      throw new Error('myDate????????? zeroFill????????? number_value????????? ???????????????.');
    }

    if (typeof number_value !== 'number') {
      throw new Error('myDate????????? zeroFill????????? number_value????????? ??????????????? ?????????.');
    }

    let return_number_string = number_value + '';

    if (number_value < 10) {
      return '0' + return_number_string;
    }

    return return_number_string;
  }
}
export const day = (v: string | Date): CustomDateClass => {
  return new CustomDateClass(v);
};

export const isValidDatetimeString = (v: string): boolean => {
  // ex) v = '2022-01-22 21:46:12'
  if (typeof v !== 'string') {
    return false;
  }

  if (v.trim() === '') {
    return false;
  }

  if (v.length !== 19) {
    return false;
  }

  const date_space_split = v.split(' ');
  if (date_space_split.length !== 2) {
    return false;
  }

  // date ?????? ??????
  const only_date = date_space_split[0];
  const only_date_stroke_split = only_date.split('-');
  if (only_date_stroke_split.length !== 3) {
    return false;
  }
  const year = Number(only_date_stroke_split[0]); // ex) 2020
  const month = Number(only_date_stroke_split[1]); // ex) 5 (????????? 5??? ?????? ?????? 5???)
  const date = Number(only_date_stroke_split[2]); // ex) 11
  if (isNaN(year) || year <= 1800) {
    return false;
  }
  if (isNaN(month) || (month < 1 || month > 12)) {
    return false;
  }
  if (isNaN(date) || (date < 1 || date > 31)) {
    return false;
  }

  const dateObject = new Date();
  dateObject.setFullYear(year);
  const setYearAfterYear = dateObject.getFullYear();

  dateObject.setMonth(month - 1);
  const setMonthAfterYear = dateObject.getFullYear();
  const setMonthAfterMonth = dateObject.getMonth() + 1;

  if (setYearAfterYear !== setMonthAfterYear) {
    return false;
  }

  dateObject.setDate(date);
  const setDateAfterYear = dateObject.getFullYear();
  const setDateAfterMonth = dateObject.getMonth() + 1;
  // const setDateAfterDate = dateObject.getDate();

  if (setYearAfterYear !== setDateAfterYear) {
    return false;
  }

  if (setMonthAfterMonth !== setDateAfterMonth) {
    return false;
  }

  {
    const test = new Date();
    test.setFullYear(year);
    if (test.getFullYear() !== year) {
      return false;
    }
  }

  {
    const test = new Date();
    test.setMonth(month - 1);
    if (test.getMonth() !== (month - 1)) {
      return false;
    }
  }

  {
    const test = new Date();
    test.setDate(date);
    if (test.getDate() !== date) {
      return false;
    }
  }


  // time ?????? ??????
  const only_time = date_space_split[1];
  const only_time_colon_split = only_time.split(':');
  if (only_time_colon_split.length !== 3) {
    return false;
  }
  const hour = Number(only_time_colon_split[0]);
  const minute = Number(only_time_colon_split[1]);
  const second = Number(only_time_colon_split[2]);
  if (isNaN(hour) || (hour < 0 || hour > 23)) {
    return false;
  }
  if (isNaN(minute) || (minute < 0 || minute > 59)) {
    return false;
  }
  if (isNaN(second) || (second < 0 || second > 59)) {
    return false;
  }

  {
    const test = new Date();
    test.setHours(hour);
    if (test.getHours() !== hour) {
      return false;
    }
  }

  {
    const test = new Date();
    test.setMinutes(minute);
    if (test.getMinutes() !== minute) {
      return false;
    }
  }

  {
    const test = new Date();
    test.setSeconds(second);
    if (test.getSeconds() !== second) {
      return false;
    }
  }

  return true;
};

export const getDatetimeInfoFromString = (v: string): IDateUtilLibrary.IDay.DatetimeInfo | null => {
  if (!isValidDatetimeString(v)) {
    return null;
  }

  // const dateObject = new Date();
  const date_space_split = v.split(' ');

  const only_date = date_space_split[0];
  const only_date_stroke_split = only_date.split('-');
  const year = Number(only_date_stroke_split[0]); // ex) 2020
  const month = Number(only_date_stroke_split[1]); // ex) 5 (????????? 5??? ?????? ?????? 5???)
  const date = Number(only_date_stroke_split[2]); // ex) 11
  const only_time = date_space_split[1];
  const only_time_colon_split = only_time.split(':');
  const hour = Number(only_time_colon_split[0]);
  const minute = Number(only_time_colon_split[1]);
  const second = Number(only_time_colon_split[2]);

  return {
    year,
    month,
    date,
    hour,
    minute,
    second,
  };
};
