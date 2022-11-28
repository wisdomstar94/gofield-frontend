import { ICommon } from "../common/common.interface";

export declare namespace IAccount {
  export interface RefundAccountDetailInfo {
    accountHolderName?: string;
    bankValueItem?: ICommon.ValueItem;
    accountNumber?: string;
    privacyTermAgree?: boolean;
  }

  export interface RefundAccountInfoApiData {
    bankName: string | null;
    bankCode: string | number;
    bankHolderName: string | null;
    bankAccountNumber: string | null;
  }
}