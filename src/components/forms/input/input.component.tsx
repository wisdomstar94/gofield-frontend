import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import useAddEventListener from '../../../hooks/use-add-event-listener/use-add-event-listener.hook';
import styles from './input.component.module.scss';
import { IInput } from './input.interface';

const Input = (props: IInput.Props) => {
  const [value, setValue] = useState<string | undefined>(props.__value);
  useEffect(() => {
    setValue(props.__value);
  }, [props.__value]);

  const [focusState, setFocusState] = useState<IInput.FocusState>('focusout');

  const inputElementRef = useRef<HTMLInputElement>(null);

  useAddEventListener(inputElementRef, 'focus', (event) => {
    setFocusState('focus');
  });

  useAddEventListener(inputElementRef, 'focusout', (event) => {
    setFocusState('focusout');
  });

  const valueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (typeof props.__onChange === 'function') {
      props.__onChange(newValue);
      setValue(newValue);
    }
  }, [props]);

  return (
    <>
      <div 
        className={[
          styles['input-container'],
          styles[focusState],
          props.__disable === true ? styles['disable'] : '',
        ].join(' ')}
        style={{
          width: props.__width,
        }}>
        <input
          ref={inputElementRef}
          className={[
            styles['input'],
          ].join(' ')}
          value={value}
          placeholder={props.__placeholder}
          readOnly={props.__disable}
          onChange={valueChange}
          type={props.__type} />
      </div>
    </>
  );
};

export default Input;