import styles from './both-side-box.component.module.scss';
import { IBothSidebox } from './both-side-box.interface';

const BothSidebox = (props: IBothSidebox.Props) => {
  return (
    <>
      <div className={[
          styles['both-side-box']
        ].join(' ')}
        style={props.__style}>
        <div className={[
            styles['common-area'], styles['left']
          ].join(' ')}
          style={props.__leftComponentStyle}>
          { props.__leftComponent }
        </div>
        <div className={[
            styles['common-area'], styles['right']
          ].join(' ')}
          style={props.__rightComponentStyle}>
          { props.__rightComponent }
        </div>
      </div>
    </>
  );
};

export default BothSidebox;
