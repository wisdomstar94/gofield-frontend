import Article from "../../layouts/article/article.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import styles from "./profile-info-box.component.module.scss";
import { IProfileInfoBox } from "./profile-info-box.interface";
import Image from 'next/image';
import { useEffect, useState } from "react";

const ProfileInfoBox = (props: IProfileInfoBox.Props) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>();
  const [profileUserName, setProfileUserName] = useState<string | undefined>();

  useEffect(() => {
    setProfileUserName('홍길동');
  }, []);

  return (
    <>
      <Article __style={{ borderBottom: '1px solid #e9ebee' }}>
        <div className={styles['container']}>
          <div className={styles['profile-image-area']}>
            {
              profileImageUrl !== undefined ? 
              <Image
                src={profileImageUrl}
                alt="프로필 이미지"
                title="프로필 이미지"
                layout="fill"
                objectFit="contain" />
              : <></>
            }
          </div>
          <div className={styles['profile-user-name-area']}>
            { profileUserName }
          </div>
        </div>
      </Article>
    </>
  );
};

export default ProfileInfoBox;