export declare namespace ICommonConfig {
  export type Mode = 'local' | 'development' | 'production';

  export interface Params {
    baseUrl: string;
    signNotInUserJwt: string;
    mode: Mode;
    apiVersion: string;
  }
}  

export default function getConfigs(params: ICommonConfig.Params) {
  const {
    baseUrl,
    signNotInUserJwt,
    mode,
    apiVersion,
  } = params;

  return {
    baseUrl,
    signNotInUserJwt,
    mode,

    test: {
      var1: 'apple',
      var2: 'banana',
      var3: 'kiwi',
      var4: 'melon',
    },

    api: {
      /*
      app: {
        banner: {
          _: baseUrl + `/api/app/${apiVersion}/banner`,
        },
        category: {
          _: baseUrl + `/api/app/${apiVersion}/category`,
        },
        health: {
          _: baseUrl + `/api/app/${apiVersion}/health`,
        },
        term: {
          _: baseUrl + `/api/app/${apiVersion}/term`,
        },
        version: {
          _: baseUrl + `/api/app/${apiVersion}/version`,
        },
      },
      */

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
      
      search: {
        _: baseUrl + `/api/search/${apiVersion}`,
        keyword: {
          _: baseUrl + `/api/search/${apiVersion}/keyword`,
        },
      },

      main: {
        error: {
          _: baseUrl + `/api/main/${apiVersion}/error`,
        },
        banner: {
          _: baseUrl + `/api/main/${apiVersion}/banner`,
        },
        item: {
          _: baseUrl + `/api/main/${apiVersion}/item`,
        },
      },

      cart: {
        _: baseUrl + `/api/cart/${apiVersion}`,
      },

      item: {
        _: baseUrl + `/api/item/${apiVersion}`,
        bundle: {
          _: baseUrl + `/api/item/${apiVersion}/bundle`,
        },
        other: {
          _: baseUrl + `/api/item/${apiVersion}/other`,
        },
        like: {
          _: baseUrl + `/api/item/${apiVersion}/like`,
        },
        popular: {
          _: baseUrl + `/api/item/${apiVersion}/popular`,
        },
        recommend: {
          _: baseUrl + `/api/item/${apiVersion}/recommend`,
        },
      },

      order: {
        _: baseUrl + `/api/order/${apiVersion}`,
        sheet: {
          _: baseUrl + `/api/order/${apiVersion}/sheet`,
        },
        payment: {
          _: baseUrl + `/api/order/${apiVersion}/payment`,
        },
        carrier: {
          _: baseUrl + `/api/order/${apiVersion}/carrier`,
          track: {
            _: (carrierId: number | string, trackId: number | string) => {
              return baseUrl + `/api/order/${apiVersion}/carrier/${carrierId}/track/${trackId}`;
            },
          }
        },
        review: {
          _: baseUrl + `/api/order/${apiVersion}/review`,
          write: (orderItemId: number | string) => {
            return baseUrl + `/api/order/${apiVersion}/review/${orderItemId}`;
          },
        },
        item: {
          orderItem: (orderNumber: string, orderItemId: string | number) => {
            return baseUrl + `/api/order/${apiVersion}/${orderNumber}/item/${orderItemId}`;
          },
        },
      },

      third: {
        ready: {
          _: baseUrl + `/api/third/${apiVersion}/ready`,
        },
      },

      user: {
        account: {
          _: baseUrl + `/api/user/${apiVersion}/account`,
        },
        address: {
          _: baseUrl + `/api/user/${apiVersion}/address`,
        },
        category: {
          _: baseUrl + `/api/user/${apiVersion}/category`,
        },
        profile: {
          _: baseUrl + `/api/user/${apiVersion}/profile`,
          upload: {
            _: baseUrl + `/api/user/${apiVersion}/profile/upload`,
          },
        },
        push: {
          _: baseUrl + `/api/user/${apiVersion}/push`,
        },
        sms: {
          _: baseUrl + `/api/user/${apiVersion}/sms`,
        },
        term: {
          _: baseUrl + `/api/user/${apiVersion}/term`,
        },
        withdraw: {
          _: baseUrl + `/api/user/${apiVersion}/withdraw`,
        },
      },

      code: {
        code: {
          _: baseUrl + `/api/code/${apiVersion}/code`,
        },
        category: {
          _: baseUrl + `/api/code/${apiVersion}/category`,
        },
      },
    },
  };
}