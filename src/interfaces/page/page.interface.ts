export declare namespace IPage {
  export interface Page {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    pageGroupSize?: number;
  }

  export interface PageItem {
    page: number;
    isActive: boolean;
  }

  export interface PaginationInfo {
    isPrev: boolean;
    isNext: boolean;
    pageItems: PageItem[];
    prevPageNumber: number;
    bestPrevPageNumber: number;
    nextPageNumber: number;
    bestNextPageNumber: number;
  }
}