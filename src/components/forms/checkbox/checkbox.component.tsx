import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SvgCheckIcon from "../../svgs/svg-check-icon/svg-check-icon.component";
import { checkboxChangeInfoAtom } from "./checkbox.component.atom";
import styles from "./checkbox.component.module.scss";
import { ICheckbox } from "./checkbox.interface";

const Checkbox = (props: ICheckbox.Props) => {
  // const [checkMode, setCheckMode] = useState<ICheckbox.CheckMode>(props.__checkMode ?? 'multiple');
  
  const [checkState, setCheckState] = useState<ICheckbox.CheckState>(props.__checkState ?? 'none-checked');
  useEffect(() => { setCheckState(props.__checkState) }, [props.__checkState]);

  // const [checkboxChangeInfo, setCheckboxChangeInfo] = useRecoilState(checkboxChangeInfoAtom);

  // useEffect(() => {
  //   if (checkboxChangeInfo === null) {
  //     return;
  //   }

  //   if (checkMode === 'single') {
  //     if (checkboxChangeInfo.value === props.__value) {
  //       setCheckState('checked');
  //     } else {
  //       setCheckState('none-checked');
  //     }
  //   } else {

  //   }
  // }, [checkboxChangeInfo, checkMode, props.__value]);

  const checkboxItemClick = useCallback(() => {
    let newCheckState: ICheckbox.CheckState = 'checked';
    if (checkState === 'checked') {
      newCheckState = 'none-checked';
    }
    setCheckState(newCheckState);

    const changeInfo: ICheckbox.CheckboxChangeInfo = {
      name: props.__name,
      value: props.__value,
      checkState: newCheckState,
    };
    // setCheckboxChangeInfo(changeInfo);
    if (typeof props.__onChange === 'function') {
      props.__onChange(changeInfo);
    }
  }, [checkState, props]);

  return (
    <>
      <div className={[
          styles['check-box'],
          styles[checkState],
        ].join(' ')}>
        <div className={[
            styles['check-icon-area']
          ].join(' ')}
          onClick={checkboxItemClick}>
          <SvgCheckIcon
            __isActive={checkState === 'checked'} />
        </div>
        {
          props.children !== undefined ? 
          <div className={[
              styles['check-text-area']
            ].join(' ')}
            onClick={checkboxItemClick}>
            { props.children }
          </div>
          : <></>
        }
      </div>
    </>
  );
};

export default Checkbox;