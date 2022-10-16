export declare namespace ICommonConfig {
  export type Mode = 'local' | 'development' | 'production';

  export interface Params {
    baseUrl: string;
    mode: Mode;
  }
}  

export default function getConfigs(params: ICommonConfig.Params) {
  const {
    baseUrl,
    mode,
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
      
    },
  };
}