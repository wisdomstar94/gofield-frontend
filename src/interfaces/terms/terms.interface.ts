export declare namespace ITerms {
  export type TermType = 'SIGNUP' | 'PRIVACY';

  export interface TermItem {
    id: number;
    isEssential: boolean;
    termDate: string;
    type: TermType;
    url: string;
  }

  export interface TermListApiData {

  }
}