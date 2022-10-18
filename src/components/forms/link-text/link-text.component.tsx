import { useCallback } from 'react';
import styles from './link-text.component.module.scss';
import { ILinkText } from './link-text.interface';

const LinkText = (props: ILinkText.Props) => {
  const linkClick = useCallback(() => {
    if (typeof props.__onClick === 'function') {
      props.__onClick();
    }
  }, [props]);

  return (
    <>
      <a
        href="#"
        onClick={linkClick}
        className={[
          styles['link-text'],
          styles[props.__linkStyleType ?? ''] ?? styles['normal'],
        ].join(' ')}>{ props.children }</a>    
    </>
  );
};

export default LinkText;