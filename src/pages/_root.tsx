import React, { useEffect } from "react";
import { useRecoilState } from 'recoil';
import { axiosGloballErrorAtom, axiosGlobalResponseAtom } from "../atoms/axios.atom";

const RootComponent: React.FC<{ children: React.ReactNode; }> = (props) => {
  const [axiosGloballError, setAxiosGloballError] = useRecoilState(axiosGloballErrorAtom);
  const [axiosGloballResponse, setAxiosGloballResponse] = useRecoilState(axiosGlobalResponseAtom);

  useEffect(() => {
    if (axiosGloballError === null) {
      return;
    }

    console.log('root.axiosGloballError.emit!!!', axiosGloballError?.response?.data);
  }, [axiosGloballError]);

  useEffect(() => {
    if (axiosGloballResponse === null) {
      return;
    }

    console.log('root.axiosGloballResponse.emit!!!', axiosGloballResponse?.data);
  }, [axiosGloballResponse]);

  return (
    <>
      {props.children}
    </>
  );
};

export default RootComponent;
