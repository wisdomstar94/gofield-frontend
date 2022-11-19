import React from "react";

export declare namespace IFormListBox {
  export interface FormItem {
    titleComponent: React.ReactNode;
    contentComponent: React.ReactNode;
  }

  export interface Props {
    __formItems?: FormItem[];
    children?: React.ReactNode;
  }
}