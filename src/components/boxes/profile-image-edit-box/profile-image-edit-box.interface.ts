import React from "react";
import { IFile } from "../../../interfaces/file/file.interface";
import { IInputFileHidden } from "../input-file-hidden/input-file-hidden.interface";

export declare namespace IProfileImageEditBox {
  export interface Props {
    __imageUrl?: string;
    __onChange?: (fileInfo: IFile.FileInfo) => void;

    children?: React.ReactNode;
  }
}