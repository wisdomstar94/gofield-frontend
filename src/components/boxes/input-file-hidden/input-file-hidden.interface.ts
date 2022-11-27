import React from "react";
import { IFile } from "../../../interfaces/file/file.interface";

export declare namespace IInputFileHidden {
  export interface RefObject {
    click: () => void;
    getFileInfo: () => IFile.FileInfo | undefined;
  }

  export interface Props {
    __fileInfo?: IFile.FileInfo;
    __isOnlyAllowImage?: boolean;
    __onChange?: (fileInfo: IFile.FileInfo) => void;
    children?: React.ReactNode;
  }
}