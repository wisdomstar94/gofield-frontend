import styles from "./profile-image-edit-box.component.module.scss";
import { IProfileImageEditBox } from "./profile-image-edit-box.interface";

const ProfileImageEditBox = (props: IProfileImageEditBox.Props) => {
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['profile-image-box']}>
          <div className={styles['image-box']}>

          </div>
          <div className={styles['edit-icon-box']}>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileImageEditBox;