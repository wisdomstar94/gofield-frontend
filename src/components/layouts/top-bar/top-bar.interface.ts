import React from "react";

export declare namespace ITopbar {
  export type FlexAlign = 'flex-start' | 'center' | 'flex-end';

  export interface Props {
    __backButtonLink?: string;
    __backButtonClickCallback?: () => void;
    __onSearchValueChange?: (value: string) => void;

    __layoutTypeA?: {
      titleComponent?: React.ReactNode;
      bgColorTransparency?: boolean;
    };

    __layoutTypeB?: {
      titleComponent?: React.ReactNode;
      rightComponent?: React.ReactNode;
    };

    __layoutTypeC?: {

    };
  }
}