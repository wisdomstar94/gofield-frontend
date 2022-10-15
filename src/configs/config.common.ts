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

    api: {
      
    },
  };
}