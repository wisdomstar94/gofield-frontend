export declare namespace IBanner {
  export interface BannerItem {
    description: string;
    linkUrl: string;
    thumbnail: string;
    title: string;
  }

  export interface BannerListApiData {
    topBannerList: BannerItem[];
    middleBannerList: BannerItem[];
  }
}