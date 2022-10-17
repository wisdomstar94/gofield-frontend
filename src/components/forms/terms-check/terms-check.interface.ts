import { ITerms } from "../../../interfaces/terms/terms.interface";

export declare namespace ITermsCheck {
  export type AccordionState = '' | 'show' | 'hide';

  // export interface ChangeInfo {
  //   agreeList: number[];
  //   selectionList: ITerms.TermSelectionType[];
  // }

  export interface Props {
    __onAgreeListChange: (agreeList: number[]) => void;
    __onSelectionListChange: (selectionList: ITerms.TermSelectionType[]) => void;
  }
}