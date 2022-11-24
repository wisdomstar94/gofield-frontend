import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import BasketFormBox from "../../../components/boxes/basket-form-box/basket-form-box.component";
import BottomFixedOrRelativeBox from "../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import SearchFormBox from "../../../components/boxes/search-form-box/search-form-box.component";
import Button from "../../../components/forms/button/button.component";
import Checkbox from "../../../components/forms/checkbox/checkbox.component";
import { ICheckbox } from "../../../components/forms/checkbox/checkbox.interface";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";
import ModalSearch from "../../../components/modals/modal-search/modal-search.component";
import useCancelReasonListQuery from "../../../hooks/use-queries/use-cancel-reason-list.query";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 주문취소</title>
        <meta name="description" content="고필드 주문취소 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  const lastBottomElementRef = useRef<HTMLDivElement>(null);
  const [isBottomButtonFixed, setIsBottomButtonFixed] = useState<boolean>(false);
  const cancelReasonListQuery = useCancelReasonListQuery();

  const cancelReasonCheckboxChange = useCallback((info: ICheckbox.CheckboxChangeInfo) => {

  }, []);

  const windowSizeCheck = useCallback(() => {
    if (typeof window === undefined) {
      return;
    }

    if (lastBottomElementRef.current === null) {
      return;
    }

    const windowHeight = window.innerHeight;
    if (windowHeight - 70 < lastBottomElementRef.current?.getBoundingClientRect().top) {
      setIsBottomButtonFixed(false);
    } else {
      setIsBottomButtonFixed(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    window.removeEventListener('resize', windowSizeCheck);
    window.addEventListener('resize', windowSizeCheck);
    windowSizeCheck();

    return () => {
      window.removeEventListener('resize', windowSizeCheck);
    };
  }, [windowSizeCheck]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeA={{
            titleComponent: <>주문취소</>
          }} />
        <div className="w-full flex justify-center py-8 text-lg font-bold">
          취소 사유를 선택해주세요
        </div>
        <ul className="block m-0 px-6">
          {
            cancelReasonListQuery.data?.map((item, index) => {
              return (
                <li key={index} className="flex m-0 p-0 list-none items-center mb-6">
                  <div className="inline-flex mr-2.5">
                    <Checkbox __name="cancel-reason" __value={item.value} __checkState="none-checked" __onChange={cancelReasonCheckboxChange}>
                      <div className="inline-flex flex-wrap text-sm font-normal text-black-b">
                        { item.text }
                      </div>
                    </Checkbox>
                  </div>
                </li>     
              )
            })
          }
        </ul>
        <div ref={lastBottomElementRef}></div>
        <BottomFixedOrRelativeBox __isFixed={isBottomButtonFixed}>
          <div className="w-full px-6 pb-6 grid grid-cols-2 gap-2">
            <div>
              <Button __buttonStyle="white-solid-gray-stroke">이전단계</Button>
            </div>
            <div>
              <Button __buttonStyle="white-solid-gray-stroke">다음단계</Button>
            </div>
          </div>
        </BottomFixedOrRelativeBox>
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;