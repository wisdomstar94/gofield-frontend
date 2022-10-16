export declare namespace ICommonConfig {
  export type Mode = 'local' | 'development' | 'production';

  export interface Params {
    baseUrl: string;
    mode: Mode;
    apiVersion: string;
  }
}  

export default function getConfigs(params: ICommonConfig.Params) {
  const {
    baseUrl,
    mode,
    apiVersion,
  } = params;

  return {
    baseUrl,
    mode,

    test: {
      var1: 'apple',
      var2: 'banana',
      var3: 'kiwi',
      var4: 'melon',
    },

    api: {
      auth: {
        login: {
          _: baseUrl + `/api/auth/${apiVersion}/login`,
          auto:{ 
            _: baseUrl + `/api/auth/${apiVersion}/login/auto`,
          },
        },
        logout: {
          _: baseUrl + `/api/auth/${apiVersion}/logout`,
        },
        refresh: {
          _: baseUrl + `/api/auth/${apiVersion}/refresh`,
        },
        signup: {
          _: baseUrl + `/api/auth/${apiVersion}/signup`,
        },
      },
      
      third: {
        ready: {
          _: baseUrl + `/api/third/${apiVersion}/ready`,
        },
      },
    },
  };
}