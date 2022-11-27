
export declare namespace IDateUtilLibrary {
  export interface DateInfoFromStringParams {
    /**
     * @description YYYY-MM-DD ex) "2022-08-29"
     */
    value: string;
  }

  export interface DateInfoFromString {
    isValid: boolean;
    year: number;
    month: number;
    date: number;
    dateString: string;
  }

  export interface TimeInfoFromStringParams {
    /**
     * @description HH:mm:ss ex) "23:15:18"
     */
    value: string;
  }

  export interface TimeInfoFromString {
    isValid: boolean;
    hour: number;
    minute: number;
    second: number;
    timeString: string;
  }

  export interface DateBetweenMonthCountParams {
    startDate: string;
    endDate: string;
  }

  export type TimeInfoStatus = 'high' | 'middle' | 'low';
  export interface TimeInfo {
    hour: number;
    minute: number;
    second: number;
    status: TimeInfoStatus;
    text: string;
  }

  export interface TimeInfoFromTimestampParams {
    remainTimestamp: number;
  }

  export namespace IDay {
    export type Unit = 'year' | 'years' | 'month' | 'months' | 'date' | 'dates' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds';
    export type DayType = 'ko' | 'korean' | 'en' | 'english';
    export interface DatetimeInfo {
      year: number;
      month: number;
      date: number;
      hour: number;
      minute: number;
      second: number;
    }

    export interface WeekStartAndEndInfo {
      startDate: string;
      endDate: string;
    }
  }
}
