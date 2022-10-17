export declare namespace IInput {
  export type InputType = 'text' | 'number' | 'password' | 'date' | 'time';
  export type FocusState = 'focus' | 'focusout';

  export interface Props {
    __type: InputType;
    __width?: string;
    __disable?: boolean;
    __placeholder?: string;
    __value?: string;
    __onChange: (value: string) => void;
  }
}