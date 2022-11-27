import Article from "../../layouts/article/article.component";
import styles from "./profile-info-box.component.module.scss";
import { IProfileInfoBox } from "./profile-info-box.interface";
import Image from 'next/image';
import { useEffect, useState } from "react";
import useUserProfileQuery from "../../../hooks/use-queries/use-user-profile.query";

const ProfileInfoBox = (props: IProfileInfoBox.Props) => {
  const userProfileQuery = useUserProfileQuery();

  return (
    <>
      <Article __style={{ borderBottom: '1px solid #e9ebee' }}>
        <div className={styles['container']}>
          <div className={styles['profile-image-area']}>
            {
              userProfileQuery.data?.thumbnail !== undefined && userProfileQuery.data?.thumbnail !== null ? 
              <Image
                src={userProfileQuery.data?.thumbnail}
                alt="프로필 이미지"
                title="프로필 이미지"
                layout="fill"
                objectFit="contain" />
              : <></>
            }
          </div>
          <div className={styles['profile-user-name-area']}>
            { userProfileQuery.data?.nickName }
          </div>
        </div>
      </Article>
    </>
  );
};

export default ProfileInfoBox;