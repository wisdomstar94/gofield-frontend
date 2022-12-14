import { useQuery } from 'react-query';
import Config from '../../configs/config.export';
import { ICode } from '../../interfaces/code/code.interface';
import { ICommon } from '../../interfaces/common/common.interface';
import { IResponse } from '../../interfaces/response/response.interface';
import useAxios from '../use-axios-hook/use-axios.hook';

const QUERY_KEY = 'categoryList';

const useCategoryListQuery = () => {
  const axios = useAxios();

  return useQuery(QUERY_KEY, () => axios.getAxiosInstance<IResponse.CommonResponse<ICode.CategoryCodeItem[]>>({
    url: Config().api.common.category._,
    method: 'get',
    isAuth: true,
    data: {},
  }).then(response => {
    const codeList = response.data.data;
    const valueItems: ICommon.ValueItem[] = codeList.map(x => ({ text: x.name, value: x.id + '', value2: x.thumbnail }));
    return valueItems;
  }), {
    staleTime: 1000 * 10 * 6,
  });
};

export default useCategoryListQuery;