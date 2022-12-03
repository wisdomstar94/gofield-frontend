import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useCodeShippingCommentListApi from '../use-apis/use-code-shipping-comment-list.api';

const QUERY_KEY = 'codeShippingCommentList';

const useCodeShippingCommentListQuery = () => {
  const codeShippingCommentListApi = useCodeShippingCommentListApi();
  
  return useQuery(QUERY_KEY, () => codeShippingCommentListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.name,
      value: item.code,
    } as ICommon.ValueItem;
  })), {
    staleTime: 100000,
  });
};

export default useCodeShippingCommentListQuery;