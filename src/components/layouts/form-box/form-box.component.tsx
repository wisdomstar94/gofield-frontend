import styles from './form-box.component.module.scss';
import { IFormbox } from "./form-box.interface";

const Formbox = (props: IFormbox.Props) => {
  return (
    <>
      <div className={[
          styles['form-box'],
        ].join(' ')}>
        { props.children }
      </div>
    </>
  );
};

export const FormboxItem = (props: IFormbox.FormboxItemProps) => {
  return (
    <>
      <div className={[
          styles['form-box-item']
        ].join(' ')}>
        <div
          className={[
              styles['title-row']
            ].join(' ')}>
          { props.__titleComponent }
        </div>
        <div
          className={[
              styles['content-row']
            ].join(' ')}>
          { props.__contentComponent }
        </div>
      </div>
    </>
  );
};

export default Formbox;