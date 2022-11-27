import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import useUserProfileApi from "../../../hooks/use-apis/use-user-profile.api";
import { IFile } from "../../../interfaces/file/file.interface";
import { IUser } from "../../../interfaces/user/user.interface";
import Input from "../../forms/input/input.component";
import Article from "../../layouts/article/article.component";
import FormListBox from "../form-list-box/form-list-box.component";
import { IInputFileHidden } from "../input-file-hidden/input-file-hidden.interface";
import ProfileImageEditBox from "../profile-image-edit-box/profile-image-edit-box.component";
import styles from "./profile-form-box.component.module.scss";
import { IProfileFormBox } from "./profile-form-box.interface";

const ProfileFormBox = forwardRef((props: IProfileFormBox.Props, ref: ForwardedRef<IProfileFormBox.RefObject>) => {
  const detailInfoRef = useRef<IUser.ProfileDetailInfo | undefined>(props.__detailInfo ?? {});
  const userProfileApi = useUserProfileApi();
  const [timestamp, setTimestamp] = useState(0);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    getDetailInfo,
  }));

  const getDetailInfo = useCallback(() => {
    return detailInfoRef.current;
  }, []);

  useEffect(() => {
    // detailInfoRef.current = props.__detailInfo ?? {};
    userProfileApi.getInstance().then((response) => {
      detailInfoRef.current = {
        thumbnailFileInfo: {
          fileUrl: response.data.data.thumbnail,
          fileName: '',
        },
        name: response.data.data.name,
        profileName: response.data.data.nickName,
        height: response.data.data?.height?.toString(),
        weight: response.data.data?.weight?.toString(),
      };
      setTimestamp(new Date().getTime());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profileNameChange = useCallback((value: string) => {
    if (detailInfoRef.current !== undefined) {
      detailInfoRef.current.profileName = value;
    }
  }, []); 

  const nameChange = useCallback((value: string) => {
    if (detailInfoRef.current !== undefined) {
      detailInfoRef.current.name = value;
    }
  }, []); 

  const heightChange = useCallback((value: string) => {
    if (detailInfoRef.current !== undefined) {
      detailInfoRef.current.height = value;
    }
  }, []); 

  const weightChange = useCallback((value: string) => {
    if (detailInfoRef.current !== undefined) {
      detailInfoRef.current.weight = value;
    }
  }, []); 

  const profileImageChange = useCallback((fileInfo: IFile.FileInfo) => {
    if (detailInfoRef.current !== undefined) {
      detailInfoRef.current.thumbnailFileInfo = fileInfo;
    }
  }, []);

  return (
    <>
      <ProfileImageEditBox __imageUrl={detailInfoRef.current?.thumbnailFileInfo?.fileUrl} __onChange={profileImageChange} />
      <Article>
        <FormListBox
          __formItems={[
            {
              titleComponent: <>프로필 이름</>,
              contentComponent: <><Input __type="text" __value={detailInfoRef.current?.profileName} __onChange={profileNameChange} /></>,
            },
            {
              titleComponent: <>이름</>,
              contentComponent: <><Input __type="text" __value={detailInfoRef.current?.name} __onChange={nameChange} /></>,
            },
            {
              titleComponent: <>키</>,
              contentComponent: <><Input __type="number" __value={detailInfoRef.current?.height} __onChange={heightChange} __rightLabel={{ width: 50, component: <>cm</> }} /></>,
            },
            {
              titleComponent: <>몸무게</>,
              contentComponent: <><Input __type="number" __value={detailInfoRef.current?.weight} __onChange={weightChange} __rightLabel={{ width: 50, component: <>kg</> }} /></>,
            },
          ]} />
      </Article>
    </>
  );
});
ProfileFormBox.displayName = 'ProfileFormBox';

export default ProfileFormBox;