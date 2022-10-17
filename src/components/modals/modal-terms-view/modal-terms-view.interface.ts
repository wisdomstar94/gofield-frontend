import { ITerms } from "../../../interfaces/terms/terms.interface";

export declare namespace IModalTermsView {
  export type ModalState = '' | 'show' | 'hide';

  export interface RefObject {
    show: () => void;
    hide: () => void;
  }

  export interface Props {
    __termType: ITerms.TermType;
  }
}