import styles from "./form-list-box.component.module.scss";
import { IFormListBox } from "./form-list-box.interface";

const FormListBox = (props: IFormListBox.Props) => {
  return (
    <>
      <ul className={styles['form-list-box']}>
        {
          props?.__formItems?.map((item, index) => {
            return (
              <li key={index} className={styles['item']}>
                <div className={styles['title-row']}>
                  { item.titleComponent }
                </div>
                <div className={styles['content-row']}>
                  { item.contentComponent }
                </div>
              </li>
            );
          })
        }
      </ul>
    </>
  );
};

export default FormListBox;