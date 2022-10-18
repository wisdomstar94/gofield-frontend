import Virtualbox from '../../layouts/virtual-box/virtual-box.component';
import styles from './step-items.component.module.scss';
import { IStepItems } from './step-items.interface';

const StepItems = (props: IStepItems.Props) => {
  return (
    <>
      <ul className={[
          styles['step-items']
        ].join(' ')}>
        {
          props.__stepItems.map((item, index) => {
            return (
              <Virtualbox key={index}>
                <li
                  key={index} 
                  className={[
                    styles['item'], styles[item.state] ?? ''
                  ].join(' ')}>
                  { item.textComponent }
                </li>
                {
                  index !== (props.__stepItems.length - 1) ?
                  <li className={[
                      styles['item'], styles['between-area']
                    ].join(' ')}>
                    <div className={[
                        styles['circle']
                      ].join(' ')}></div>
                    <div className={[
                        styles['circle']
                      ].join(' ')}></div>
                    <div className={[
                        styles['circle']
                      ].join(' ')}></div>
                  </li>
                  : <></>
                }
              </Virtualbox>
            );
          })
        }
      </ul>
    </>
  );
};

export default StepItems;
