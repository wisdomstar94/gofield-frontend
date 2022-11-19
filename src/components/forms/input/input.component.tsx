import { ChangeEvent, CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import useAddEventListener from '../../../hooks/use-add-event-listener/use-add-event-listener.hook';
import styles from './input.component.module.scss';
import { IInput } from './input.interface';

const Input = (props: IInput.Props) => {
  const [value, setValue] = useState<string | undefined>(props.__value ?? '');
  useEffect(() => {
    setValue(props.__value ?? '');
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

  const inputStyles = useCallback(() => {
    const obj: CSSProperties = {};

    if (props.__rightLabel !== undefined) {
      obj.paddingRight = (props.__rightLabel.width + 16) + 'px';
    }

    return obj;
  }, [props.__rightLabel]);

  const rightLabelStyles = useCallback(() => {
    const obj: CSSProperties = {};

    if (props.__rightLabel !== undefined) {
      obj.width = props.__rightLabel?.width + 'px';
    }

    return obj;
  }, [props.__rightLabel]);

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
          style={inputStyles()}
          value={value}
          placeholder={props.__placeholder}
          readOnly={props.__disable}
          onChange={valueChange}
          type={props.__type} />
        {
          props.__rightLabel !== undefined ? 
          <>
            <div className={styles['right-label']} style={rightLabelStyles()}>
              { props.__rightLabel.component }
            </div>
          </> 
          : <></>
        }
      </div>
    </>
  );
};

export default Input;