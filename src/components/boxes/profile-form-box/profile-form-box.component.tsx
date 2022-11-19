import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import Input from "../../forms/input/input.component";
import Article from "../../layouts/article/article.component";
import FormListBox from "../form-list-box/form-list-box.component";
import ProfileImageEditBox from "../profile-image-edit-box/profile-image-edit-box.component";
import styles from "./profile-form-box.component.module.scss";
import { IProfileFormBox } from "./profile-form-box.interface";

const ProfileFormBox = forwardRef((props: IProfileFormBox.Props, ref: ForwardedRef<IProfileFormBox.RefObject>) => {
  const detailInfoRef = useRef<IProfileFormBox.DetailInfo | undefined>(props.__detailInfo ?? {});

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    getDetailInfo,
  }));

  const getDetailInfo = useCallback(() => {
    return detailInfoRef.current;
  }, []);

  useEffect(() => {
    detailInfoRef.current = props.__detailInfo ?? {};
  }, [props.__detailInfo]);

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

  return (
    <>
      <ProfileImageEditBox />
      <Article>
        <FormListBox
          __formItems={[
            {
              titleComponent: <>프로필 이름</>,
              contentComponent: <><Input __type="text" __value={props.__detailInfo?.profileName} __onChange={profileNameChange} /></>,
            },
            {
              titleComponent: <>이름</>,
              contentComponent: <><Input __type="text" __value={props.__detailInfo?.name} __onChange={nameChange} /></>,
            },
            {
              titleComponent: <>키</>,
              contentComponent: <><Input __type="number" __value={props.__detailInfo?.height} __onChange={heightChange} __rightLabel={{ width: 50, component: <>cm</> }} /></>,
            },
            {
              titleComponent: <>몸무게</>,
              contentComponent: <><Input __type="number" __value={props.__detailInfo?.weight} __onChange={weightChange} __rightLabel={{ width: 50, component: <>kg</> }} /></>,
            },
          ]} />
      </Article>
    </>
  );
});
ProfileFormBox.displayName = 'ProfileFormBox';

export default ProfileFormBox;