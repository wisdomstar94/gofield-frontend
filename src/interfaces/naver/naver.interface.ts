export declare namespace INaver {
  export interface InitOptions {
    clientId: string;
    callbackUrl: string;
  }

  export interface OauthParams {
    access_token: string;
    expires_in: string;
    state: string;
    token_type: 'bearer';
  }
}