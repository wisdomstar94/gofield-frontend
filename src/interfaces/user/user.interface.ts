import { IFile } from "../file/file.interface";

export declare namespace IUser {
  export interface ProfileDetailInfo {
    thumbnailFileInfo?: IFile.FileInfo;
    profileName?: string;
    name?: string;
    height?: string;
    weight?: string;
  }

  export interface PhoneNumberChangeDetailInfo {
    phoneNumber?: string;
    certNumber?: string;
  }

  export interface ProfileApiData {
    name: string;
    nickName: string;
    thumbnail: string;
    height: number;
    weight: number;
  }

  export interface AlertValueApiData {
    isAlertPromotion: boolean;
  }

  export interface AccountInfo {
    bankAccountNumber: string;
    bankCode: string;
    bankHolderName: string;
    bankName: string;
    id: number;
  }

  export interface TelInfo {
    tel: string;
  }
}