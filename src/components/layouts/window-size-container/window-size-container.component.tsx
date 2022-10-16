import styles from './window-size-container.component.module.scss';
import { IWindowSizeContainer } from './window-size-container.interface';

const WindowSizeContainer = (props: IWindowSizeContainer.Props) => {
  return (
    <>
      <div 
        className={styles['window-size-container']}
        style={{
          backgroundColor: props.__bgColor,
          padding: props.__padding,
        }}>
        { props.children }
      </div>
    </>
  );
};

export default WindowSizeContainer;