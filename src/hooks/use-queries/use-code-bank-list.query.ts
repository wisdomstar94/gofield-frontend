import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useCodeBankListApi from '../use-apis/use-code-bank-list.api';

const QUERY_KEY = 'codeBankList';

const useCodeBankListQuery = () => {
  const codeBankListApi = useCodeBankListApi();

  return useQuery(QUERY_KEY, () => codeBankListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.name,
      value: item.code,
    } as ICommon.ValueItem;
  })), {
    staleTime: 1000 * 10,
  });
};

export default useCodeBankListQuery;