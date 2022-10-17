import { useCallback, useEffect, useState } from 'react';
import { ICommon } from '../../../interfaces/common/common.interface';
import styles from './multiple-check-items.component.module.scss';
import { IMultipleCheckItems } from "./multiple-check-items.interface";

const MultipleCheckItems = (props: IMultipleCheckItems.Props) => {
  const [valueItems, setValueItems] = useState<ICommon.ValueItem[]>(props.__valueItems);
  useEffect(() => {
    setValueItems(props.__valueItems);
  }, [props.__valueItems]);

  const itemClick = useCallback((item: ICommon.ValueItem) => {
    if (item.isActive === true) {
      item.isActive = false;
    } else {
      item.isActive = true;
    }

    const newValueItems = [ ...valueItems ];
    setValueItems(newValueItems);

    if (typeof props.__onChange === 'function') {
      props.__onChange({
        targetItem: item,
        currentCheckedValues: newValueItems.filter(x => x.isActive === true).map(x => x.value),
      });
    }
  }, [props, valueItems]);

  return (
    <>
      <ul className={[
          styles['multiple-check-items']
        ].join(' ')}>
        {
          valueItems.map((item, index) => {
            return (
              <li 
                key={index + item.value}
                data-value={item.value}
                className={[
                  styles['item'], 
                  item.isActive === true ? styles['active'] : '',
                ].join(' ')}
                onClick={e => itemClick(item)}>
                { item.text }
              </li>
            );
          })
        }
      </ul>
    </>
  );
};

export default MultipleCheckItems;