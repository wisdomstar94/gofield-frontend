import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useCodeSubCategoryListApi from '../use-apis/use-code-sub-category-list.api';

const QUERY_KEY = 'codeSubCategoryList';

const useCodeSubCategoryListQuery = (categoryId: string | undefined) => {
  const QUERY_KEY_REAL = QUERY_KEY + categoryId;

  const codeSubCategoryListApi = useCodeSubCategoryListApi();

  function getPromise() {
    if (categoryId === undefined) {
      return Promise.resolve([]);
    } else {
      return codeSubCategoryListApi.getInstance(categoryId).then((response) => response.data.data.map((item) => {
        return {
          text: item.name,
          value: item.id + '',
        } as ICommon.ValueItem;
      }));
    }
  }

  return useQuery(QUERY_KEY_REAL, () => getPromise(), {
    staleTime: 1000 * 10,
  });
};

export default useCodeSubCategoryListQuery;