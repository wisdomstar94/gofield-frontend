import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IFile } from "../../../interfaces/file/file.interface";
import ImageBox from "../image-box/image-box.component";
import InputFileHidden from "../input-file-hidden/input-file-hidden.component";
import { IInputFileHidden } from "../input-file-hidden/input-file-hidden.interface";
import styles from "./profile-image-edit-box.component.module.scss";
import { IProfileImageEditBox } from "./profile-image-edit-box.interface";

const ProfileImageEditBox = (props: IProfileImageEditBox.Props) => {
  const InputFileHiddenRef = useRef<IInputFileHidden.RefObject>(null);

  const [imageUrl, setImageUrl] = useState(props.__imageUrl);
  useEffect(() => { setImageUrl(props.__imageUrl) }, [props.__imageUrl]);

  const imageChangeButtonClick = useCallback(() => {
    InputFileHiddenRef.current?.click();
  }, []);

  const fileChange = useCallback((fileInfo: IFile.FileInfo) => {
    setImageUrl(fileInfo.fileUrl);
    if (typeof props.__onChange === 'function') {
      props.__onChange(fileInfo);
    }
  }, [props]);

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['profile-image-box']}>
          <div className={styles['image-box']}>
            { 
              imageUrl !== undefined && imageUrl !== null ? 
              <ImageBox
                mode="pure"
                src={imageUrl}
                alt="프로필 이미지"
                title="프로필 이미지"
                fill={true}
                sizes="100%"
                draggable={false}
                style={{
                  objectFit: 'cover',
                }} /> : <></>
            }
          </div>
          <div className={styles['edit-icon-box']} onClick={imageChangeButtonClick}>

          </div>
        </div>
      </div>
      <InputFileHidden ref={InputFileHiddenRef} __onChange={fileChange} />
    </>
  );
};

export default ProfileImageEditBox;