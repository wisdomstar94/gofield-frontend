import React from "react";

export declare namespace IStepItems {
  export type StepState = '' | 'pass' | 'current' | 'yet';

  export interface StepItem {
    textComponent: React.ReactNode;
    state: StepState;
  }

  export interface Props {
    __stepItems: StepItem[];
  }
}