import { IPage } from "../../interfaces/page/page.interface";

const usePagination = () => {
  const getPaginationInfo = (page: IPage.Page): IPage.PaginationInfo => {
    const pageGroupSize = page.pageGroupSize ?? 5;

    let startPageNumber = page.page;
    for (let i = 0; i < pageGroupSize; i++) {
      if ((startPageNumber - 1) % pageGroupSize === 0) {
        break;
      }
      startPageNumber--;
    }

    let endPageNumber = startPageNumber;
    // 이 부분 로직 재정리 필요..........
    for (let i = 0; i < pageGroupSize - 1; i++) {
      if ((endPageNumber * page.size) >= page.totalElements) {
        break;
      } else {
        endPageNumber++;
      }
    }

    const isPrev = startPageNumber !== 1;
    const isNext = ((startPageNumber + pageGroupSize) * page.size) - page.size < page.totalElements;

    const pageItems: IPage.PageItem[] = [];
    for (let i = startPageNumber; i <= endPageNumber; i++) {
      pageItems.push({
        page: i,
        isActive: i === page.page,
      });
    }

    const prevPageNumber = startPageNumber - 1;
    const bestPrevPageNumber = 1;

    const nextPageNumber = endPageNumber + 1;
    const bestNextPageNumber = Math.ceil(page.totalElements / page.size);

    return {
      isNext,
      isPrev,
      pageItems,
      prevPageNumber,
      bestPrevPageNumber,
      nextPageNumber,
      bestNextPageNumber, 
    }
  };

  return {
    getPaginationInfo,
  };
};

export default usePagination;