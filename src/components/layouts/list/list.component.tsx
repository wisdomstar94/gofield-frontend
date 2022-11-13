import React from 'react';
import { useCallback } from 'react';
import styles from './list.component.module.scss';
import { IList } from './list.interface';

export const List = (props: IList.Props) => {
  const getListClasses = useCallback(() => {
    const classes: string[] = [];

    classes.push(styles['list']);

    if (typeof props.__direction === 'string') {
      classes.push(styles[props.__direction]);
    } else {
      classes.push(styles['vertical']);
    }

    if (typeof props.__justifyContent === 'string') {
      classes.push(styles['justify-content']);
      classes.push(styles[props.__justifyContent]);
    }

    if (typeof props.__alignItems === 'string') {
      classes.push(styles['align-items']);
      classes.push(styles[props.__alignItems]);
    }

    return classes.join(' ');
  }, [props.__alignItems, props.__direction, props.__justifyContent]);

  const getListStyles = useCallback(() => {
    let obj: any = {};

    if (typeof props.__width === 'string') {
      obj['width'] = props.__width;
    }

    if (props.__style !== undefined) {
      obj = {
        ...obj,
        ...props.__style,
      };
    }

    return obj;
  }, [props.__style, props.__width]);

  const getListItemStyles = useCallback((item: IList.ItemProps) => {
    // const item = _item as IList.ItemProps;
    let obj: any = {};

    if (props.__direction === 'vertical') {
      obj['width'] = '100%';
    } else {
      obj['width'] = 'auto';
    }

    if (typeof item.__alignItems === 'string') {
      obj['alignItems'] = item.__alignItems;
    } else if (typeof props.__defaultItemAlignItems === 'string') {
      obj['alignItems'] = props.__defaultItemAlignItems;
    } else {
      obj['alignItems'] = 'center';
    }

    if (typeof item.__justifyContent === 'string') {
      obj['justifyContent'] = item.__justifyContent;
    } else if (typeof props.__defaultItemJustifyContent === 'string') {
      obj['justifyContent'] = props.__defaultItemJustifyContent;
    } else {
      obj['justifyContent'] = 'flex-start';
    }
    
    if (typeof item.__marginRight === 'string') {
      obj['marginRight'] = item.__marginRight;
    } else if (typeof props.__defaultItemMarginRight === 'string') {
      obj['marginRight'] = props.__defaultItemMarginRight;
    }

    if (typeof item.__marginBottom === 'string') {
      obj['marginBottom'] = item.__marginBottom;
    } else if (typeof props.__defaultItemMarginBottom === 'string') {
      obj['marginBottom'] = props.__defaultItemMarginBottom;
    }

    if (item.__style !== undefined) {
      obj = {
        ...obj,
        ...item.__style,
      };
    }

    return obj;
  }, [props.__defaultItemAlignItems, props.__defaultItemJustifyContent, props.__defaultItemMarginBottom, props.__defaultItemMarginRight, props.__direction]);

  return (
    <ul className={getListClasses()} style={getListStyles()}>
      {
        React.Children.map(props.children, function(_item) {
          const item = _item as { props: IList.ItemProps };
          return (
            <li className={styles['item']} style={getListItemStyles(item.props)}>
              {item.props.children}
            </li>
          );
        })
      }
    </ul>
  );
};

export const ListItem = (props: IList.ItemProps) => {
  return (
    <>
      {props.children}
    </>
  );
};

export default List;