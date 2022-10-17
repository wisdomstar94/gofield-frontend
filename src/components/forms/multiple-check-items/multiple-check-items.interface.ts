import { ICommon } from "../../../interfaces/common/common.interface";

export declare namespace IMultipleCheckItems {
  export interface ChangeInfo {
    targetItem: ICommon.ValueItem;
    currentCheckedValues: string[];
  }

  export interface Props {
    __valueItems: ICommon.ValueItem[];
    __onChange: (info: ChangeInfo) => void;
  }
}