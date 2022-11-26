export declare namespace IMain {
  export interface Item {
    brandName: string;
    id: number;
    name: string;
    newLowestPrice: number;
    reviewCount: number;
    reviewScore: number;
    thumbnail: string;
    usedLowestPrice: number;
  }

  export interface ClassificationItem {
    brandName: string;
    name: string;
    classification: 'USED' | 'NEW';
    gender: string;
    id: number;
    itemNumber: string;
    likeId: number;
    // option: { key: string; value: string }[];
    tags: string[];
    price: number;
    thumbnail: string;
  }

  export interface MainItemApiData {
    categoryBundleList: Item[];
    classificationItemList: ClassificationItem[];
    popularBundleList: Item[];
    recommendBundleList: Item[];
  }
}