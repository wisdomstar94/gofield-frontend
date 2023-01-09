import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useEnumNoticeTypeListApi from '../use-apis/use-enum-notice-type-list.api';

const QUERY_KEY = 'enumNoticeTypeList';

const useEnumNoticeTypeListQuery = () => {
  const enumNoticeTypeListApi = useEnumNoticeTypeListApi();

  return useQuery(QUERY_KEY, () => enumNoticeTypeListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.description,
      value: item.key,
    } as ICommon.ValueItem;
  })), {
    staleTime: 1000 * 10,
  });
};

export default useEnumNoticeTypeListQuery;