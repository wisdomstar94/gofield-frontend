import styles from './stroke-buttons.component.module.scss';
import { IStrokeButtons } from "./stroke-buttons.interface";

const StrokeButtons = (props: IStrokeButtons.Props) => {
  return (
    <>
      <div className={[
          styles['stroke-buttons'],
          styles['button-count-' + props.__buttonItems.length]
        ].join(' ')}>
        {
          props.__buttonItems.map((item, index) => {
            return (
              <button key={index} className={[
                  styles['button']
                ].join(' ')} onClick={item.onClick}>
                { item.textComponent }
              </button>
            );
          })
        }
      </div>
    </>
  );
};

export default StrokeButtons;