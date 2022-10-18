import styles from './title-box.component.module.scss';
import { ITitlebox } from './title-box.interface';

const Titlebox = (props: ITitlebox.Props) => {
  return (
    <>
      <div className={[
          styles['title-box']
        ].join(' ')}>
        {
          props.__titleStyleA !== undefined ?
          <div className={[
              styles['style-a']
            ].join(' ')}>
            { props.__titleStyleA.component }
          </div>
          : ''
        }
      </div>
    </>
  );
};

export default Titlebox;