import { useRouter } from 'next/router';
import { ForwardedRef, forwardRef, useCallback, useRef } from 'react';
import useCartCountApi from '../../../hooks/use-apis/use-cart-count.api';
import useCartCountQuery from '../../../hooks/use-queries/use-cart-count.query';
import useUser from '../../../hooks/use-user-hook/use-user.hook';
import { getClasses } from '../../../librarys/string-util/string-util.library';
import ModalSignupNotice from '../../modals/modal-signup-notice/modal-signup-notice.component';
import { IModalSignupNotice } from '../../modals/modal-signup-notice/modal-signup-notice.interface';
import SvgBackIcon from '../../svgs/svg-back-icon/svg-back-icon.component';
import SvgMagnifyingGlassIcon from '../../svgs/svg-magnifying-glass-icon/svg-magnifying-glass-icon.component';
import SvgShoppingCartIcon from '../../svgs/svg-shopping-cart-icon/svg-shopping-cart-icon.component';
import styles from './top-bar.component.module.scss';
import { ITopbar } from './top-bar.interface';

const Topbar = forwardRef((props: ITopbar.Props, ref: ForwardedRef<ITopbar.RefObject>) => {
  const router = useRouter();
  const user = useUser();
  const cartCountQuery = useCartCountQuery();
  const modalSignupNoticeRef = useRef<IModalSignupNotice.RefObject>(null);

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

    if (document.referrer) {
      history.back();
    } else {
      router.push('/');
    }
  }, [props, router]);

  const searchIconClick = useCallback(() => {
    router.push('/search');
  }, [router]);

  const basketIconClick = useCallback(() => {
    if (!user.isLogined()) {
      modalSignupNoticeRef.current?.show();
      return;
    }

    router.push('/basket');
  }, [router, user]);

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
                    <div className={styles['button-item']} onClick={basketIconClick}>
                      <SvgShoppingCartIcon />
                      {
                        cartCountQuery.data !== undefined && cartCountQuery.data > 0 ? 
                        <div className={styles['cart-count-text-area']}>
                          { cartCountQuery.data }
                        </div> : <></>
                      }                      
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
      <ModalSignupNotice ref={modalSignupNoticeRef} />
    </>
  );
});
Topbar.displayName = 'Topbar';

export default Topbar;