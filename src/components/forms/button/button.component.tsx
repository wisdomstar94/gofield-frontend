import { useCallback, useEffect, useState } from 'react';
import styles from './button.component.module.scss';
import { IButton } from './button.interface';

const Button = (props: IButton.Props) => {
  const [buttonStyle, setButtonStyle] = useState<IButton.ButtonStyle>(props.__buttonStyle ?? 'black-solid');

  useEffect(() => {
    setButtonStyle(props.__buttonStyle ?? 'black-solid');
  }, [props.__buttonStyle]);

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
          styles[buttonStyle],
          props.__disable === true ? styles['disable'] : '',
        ].join(' ')}
        style={props.__style}
        onClick={buttonClick}>
        { props.children }
      </button>
    </>
  );
};

export default Button;