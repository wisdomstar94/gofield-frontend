import styles from "./input-file-hidden.component.module.scss";
import { IInputFileHidden } from "./input-file-hidden.interface";
import { ChangeEvent, ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { getBlobToImgUrl } from "../../../librarys/blob-util/blob-util.library";
import { IFile } from "../../../interfaces/file/file.interface";

const InputFileHidden = forwardRef((props: IInputFileHidden.Props, ref: ForwardedRef<IInputFileHidden.RefObject>) => {
  const [fileInfo, setFileInfo] = useState(props.__fileInfo);
  useEffect(() => { setFileInfo(props.__fileInfo) }, [props.__fileInfo]);

  const [isOnlyAllowImage, setIsOnlyAllowImage] = useState(props.__isOnlyAllowImage);
  useEffect(() => { setIsOnlyAllowImage(props.__isOnlyAllowImage) }, [props.__isOnlyAllowImage]);

  const inputFileElementRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    click,
    getFileInfo,
  }));

  const click = useCallback(() => {
    inputFileElementRef.current?.click();
  }, []);

  const getFileInfo = useCallback(() => {
    return fileInfo;
  }, [fileInfo]);

  const fileChange = useCallback(async(event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files === null) {
      return;
    }

    const file = files[0];
    if (file === undefined) {
      return;
    }

    if (typeof props.__onChange === 'function') {
      let fileUrl: string | undefined = undefined;
      if (file.type.toLowerCase().includes('image')) {
        fileUrl = (await getBlobToImgUrl({ blob: file }))?.toString();
      }
      const fileInfo: IFile.FileInfo = {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        file: file,
        fileUrl,
      };
      setFileInfo(fileInfo);
      props.__onChange(fileInfo);
      if (inputFileElementRef.current !== null) {
        inputFileElementRef.current.value = '';
      }
    }
  }, [props]);

  return (
    <>
      <input 
        ref={inputFileElementRef} 
        className="w-0 h-0 opacity-0	overflow-hidden absolute" 
        type="file" 
        accept={isOnlyAllowImage === true ? 'image/png, image/jpeg' : undefined}
        onChange={fileChange} />
    </>
  );
});
InputFileHidden.displayName = 'InputFileHidden';

export default InputFileHidden;