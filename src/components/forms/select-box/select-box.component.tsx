import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ICommon } from "../../../interfaces/common/common.interface";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import SvgArrowBottomIcon from "../../svgs/svg-arrow-bottom-icon/svg-arrow-bottom-icon.component";
import styles from "./select-box.component.module.scss";
import { ISelectBox } from "./select-box.interface";

const SelectBox = (props: ISelectBox.Props) => {
  const [valueItems, setValueItems] = useState<ICommon.ValueItem[] | undefined>(props.__valueItems);
  const [value, setValue] = useState<string | undefined>(props.__value);
  const [placeholder, setPlaceholder] = useState<string | undefined>(props.__placeholder);

  useEffect(() => {
    setValueItems(props.__valueItems);
  }, [props.__valueItems]);

  useEffect(() => {
    setValue(props.__value);
  }, [props.__value]);

  useEffect(() => {
    setPlaceholder(props.__placeholder);
  }, [props.__placeholder]);

  const getSelectedValueText = useCallback(() => {
    return valueItems?.find(x => x.value === value)?.text;
  }, [value, valueItems]);

  const selectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);

    if (typeof props.__onChange === 'function') {
      props.__onChange(selectedValue);
    }
  }, [props]);

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['select-box']}>
          <div className={getClasses([styles['current-value-text'], getSelectedValueText() === undefined ? styles['placeholder'] : styles['current-value']])}>
            { getSelectedValueText() === undefined ? placeholder : getSelectedValueText() }
          </div>
          <div className={styles['bottom-arrow-icon-area']}>
            <SvgArrowBottomIcon />
          </div>
        </div>
        <select className={styles['hidden-select-box']} onChange={selectChange}>
          {
            valueItems?.map((item, index) => {
              return (
                <option key={index} value={item.value}>{ item.text }</option>
              );
            })
          }
        </select>
      </div>
    </>
  );
};

export default SelectBox;