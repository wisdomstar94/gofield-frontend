import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styles from './top-bar.component.module.scss';
import { ITopbar } from './top-bar.interface';

const Topbar = (props: ITopbar.Props) => {
  const router = useRouter();

  const backButtonClick = useCallback(() => {
    if (typeof props.__backButtonClickCallback === 'function') {
      props.__backButtonClickCallback();
      return;
    }

    if (typeof props.__backButtonLink === 'string') {
      router.push(props.__backButtonLink, undefined, { shallow: true });
      return;
    }

    history.back();
  }, [props, router]);

  return (
    <>
      <div 
        className={[
          styles['top-bar'],
        ].join(' ')}>
        
        {
          props.__layoutTypeA !== undefined ? 
          <>
            <div
              className={[
                  styles['layout-type-a'],
                  props.__layoutTypeA.bgColorTransparency === true ? styles['bg-color-transparency'] : '',
                ].join(' ')}>
              <div
                className={[
                    styles['common-area'], styles['left-area'],
                  ].join(' ')}>
                <button className={[
                    styles['back-button'],
                  ].join(' ')}
                  onClick={backButtonClick}>
                  <span>icon<br />없음</span>  
                </button>    
              </div>
              <div
                className={[
                    styles['common-area'], styles['center-area'],
                  ].join(' ')}>
                { props.__layoutTypeA.titleComponent }
              </div>
            </div>
          </>
          : ''
        }

      </div>
    </>
  );
};

export default Topbar;