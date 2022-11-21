import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./text-area.component.module.scss";
import { ITextArea } from "./text-area.interface";

const TextArea = (props: ITextArea.Props) => {
  const [value, setValue] = useState<string>(props.__value ?? '');
  useEffect(() => {
    setValue(props.__value ?? '');
  }, [props.__value]);

  const textareaChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (typeof props.__onChange === 'function') {
      props.__onChange(newValue);
    }
  }, [props]);

  return (
    <>
      <textarea className={styles['textarea']} value={value} onChange={textareaChange} style={props.__style} />
    </>
  );
};

export default TextArea;