import React from "react";
import { IFile } from "../../../interfaces/file/file.interface";

export declare namespace ISmallImageFormBox {
  export interface RefObject {
    getImageItems: () => IFile.FileInfo[] | undefined;
  }

  export interface Props {
    __isEditable?: boolean;
    __imageItems?: IFile.FileInfo[];
    __onChange?: (items: IFile.FileInfo[] | undefined) => void;
    children?: React.ReactNode;
  }
}