import { useRouter } from 'next/router';
import { ForwardedRef, forwardRef, useCallback } from 'react';
import { getClasses } from '../../../librarys/string-util/string-util.library';
import SvgBackIcon from '../../svgs/svg-back-icon/svg-back-icon.component';
import SvgMagnifyingGlassIcon from '../../svgs/svg-magnifying-glass-icon/svg-magnifying-glass-icon.component';
import SvgShoppingCartIcon from '../../svgs/svg-shopping-cart-icon/svg-shopping-cart-icon.component';
import styles from './top-bar.component.module.scss';
import { ITopbar } from './top-bar.interface';

const Topbar = forwardRef((props: ITopbar.Props, ref: ForwardedRef<ITopbar.RefObject>) => {
  const router = useRouter();

  // useImperativeHandle(ref, () => ({
  //   searchModalHide,
  // }));

  const backButtonClick = useCallback(() => {
    if (typeof props.__backButtonClickCallback === 'function') {
      props.__backButtonClickCallback();
      return;
    }

    if (typeof props.__backButtonLink === 'string') {
      router.push(props.__backButtonLink);
      return;
    }

    history.back();
  }, [props, router]);

  const searchIconClick = useCallback(() => {
    router.push('/search');
  }, [router]);

  return (
    <>
      <div className={styles['top-bar']}>
        {
          props.__layoutTypeA !== undefined ? 
          <>
            <div className={getClasses([styles['layout-type-a'], props.__layoutTypeA.bgColorTransparency === true ? styles['bg-color-transparency'] : ''])}>
              <div className={getClasses([styles['common-area'], styles['left-area']])}>
                <button className={styles['back-button']} onClick={backButtonClick}>
                  <SvgBackIcon />
                </button>    
              </div>
              <div className={getClasses([styles['common-area'], styles['center-area']])}>
                { props.__layoutTypeA.titleComponent }
              </div>
            </div>
          </>
          : <></>
        }

        {
          props.__layoutTypeB !== undefined ?
          <>
            <div className={styles['layout-type-b']}>
              <div className={styles['left-area']}>
                {
                  props.__layoutTypeB.titleComponent !== undefined ?
                  <>
                    {/* 뒤로가기 버튼 + 타이틀 */}
                    <button className={styles['back-button']} onClick={backButtonClick}>
                      <SvgBackIcon />
                    </button> 
                    <div className="font-bold">{ props.__layoutTypeB.titleComponent }</div>
                  </>
                  :
                  <>
                    {/* logo */}
                    <div className={styles['logo-area']}>GOFIELD</div>
                  </>
                }
              </div>
              <div className={styles['right-area']}>
                {
                  props.__layoutTypeB.rightComponent !== undefined ? 
                  props.__layoutTypeB.rightComponent : 
                  <>
                    <div className={styles['button-item']}>
                      <SvgShoppingCartIcon />
                    </div>
                    <div className={getClasses([styles['button-item']])} onClick={searchIconClick}>
                      <SvgMagnifyingGlassIcon />
                    </div> 
                  </>
                }
              </div>
            </div>
          </>
          : <></>
        }
      </div>
    </>
  );
});
Topbar.displayName = 'Topbar';

export default Topbar;