import { useCallback, useEffect, useState } from "react";
import Config from "../../configs/config.export";
import { ICommon } from "../../interfaces/common/common.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

// Domain 값을 가져오는 api hook sample
export const useSampleValueItems = () => {
  const [valueItems, setValueItems] = useState<ICommon.ValueItem[]>([]);

  const axios = useAxios();
  
  useEffect(() => {
    // axios.getAxiosInstance<any>({
    //   url: '',
    //   method: 'post',
    //   data: {},
    // }).then(response => {
    //   const codeList: { code: string; name: string; }[] = response.data.codeList;
    //   setValueItems(codeList.map(x => ({ text: x.name, value: x.code })));
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return valueItems;
};

// 상세정보 값을 가져오는 api hook sample
export const useSampleDetailInfo = () => {
  const axios = useAxios();

  const then = useCallback((callback: (info: unknown) => void) => {
    // axios.getAxiosInstance<any>({
    //   url: '',
    //   method: 'post',
    //   data: {},
    // }).then(response => {
    //   const data = response...;
    //   callback(data);
    // });
  }, []);

  return {
    then,
  };
};