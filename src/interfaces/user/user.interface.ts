import { IFile } from "../file/file.interface";

export declare namespace IUser {
  export interface ProfileDetailInfo {
    thumbnailFileInfo?: IFile.FileInfo;
    profileName?: string;
    name?: string;
    height?: string;
    weight?: string;
  }

  export interface ProfileApiData {
    name: string;
    nickName: string;
    thumbnail: string;
    height: number;
    weight: number;
  }
}