import React from "react";

export declare namespace IAccessTokenCheck {
  export type CheckTarget = 'first-user' | 'signup-complete-user';
  export type AccessTokenInvalidType = 'expired' | 'not-jwt' | 'empty-jwt' | 'not-first-user' | 'not-signup-complete-user';

  export interface Props {
    __checkTarget: CheckTarget;
    children: React.ReactNode;
  }
}