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
          _: `/api/auth/${apiVersion}/login`,
          auto:{ 
            _: `/api/auth/${apiVersion}/login/auto`,
          },
        },
        logout: {
          _: `/api/auth/${apiVersion}/logout`,
        },
        refresh: {
          _: `/api/auth/${apiVersion}/refresh`,
        },
        signup: {
          _: `/api/auth/${apiVersion}/signup`,
        },
      },
      
      third: {
        ready: {
          _: `/api/third/${apiVersion}/ready`,
        },
      },
    },
  };
}