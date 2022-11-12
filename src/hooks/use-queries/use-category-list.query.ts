import { useQuery } from 'react-query';
import Config from '../../configs/config.export';
import { ICode } from '../../interfaces/code/code.interface';
import { ICommon } from '../../interfaces/common/common.interface';
import { IResponse } from '../../interfaces/response/response.interface';
import useAxios from '../use-axios-hook/use-axios.hook';

const QUERY_KEY = 'categoryList';

const useCategoryListQuery = () => {
  const axios = useAxios();

  return useQuery(QUERY_KEY, () => axios.getAxiosInstance<IResponse.CommonResponse<ICode.CodeItem[]>>({
    url: Config().api.user.category._,
    method: 'get',
    isAuth: true,
    data: {},
  }).then(response => {
    const codeList = response.data.data;
    const valueItems: ICommon.ValueItem[] = codeList.map(x => ({ text: x.name, value: x.id + '' }));
    return valueItems;
  }), {
    staleTime: 10000,
  });
};

export default useCategoryListQuery;