import { useCallback } from 'react';
import styles from './button.component.module.scss';
import { IButton } from './button.interface';

const Button = (props: IButton.Props) => {
  const buttonClick = useCallback(() => {
    if (props.__disable === true) {
      return;
    }

    if (typeof props.__onClick === 'function') {
      props.__onClick();
    }
  }, [props]);

  return (
    <>
      <button 
        className={[
          styles['button'],
          props.__disable === true ? styles['disable'] : '',
        ].join(' ')}
        onClick={buttonClick}>
        { props.children }
      </button>
    </>
  );
};

export default Button;