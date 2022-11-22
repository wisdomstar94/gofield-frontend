import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import ModalSearch from "../../modals/modal-search/modal-search.component";
import { ISearchFormBox } from "./search-form-box.interface";

const SearchFormBox = (props: ISearchFormBox.Props) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (router.isReady !== true) {
      return;
    }

    init();    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    console.log('@router.query', router.query);
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const init = useCallback(() => {
    const inSearchValue = router.query.searchValue;
    if (typeof inSearchValue === 'string' && inSearchValue.trim() !== '') {
      setSearchValue(inSearchValue);
    }
  }, [router.query.searchValue]);

  return (
    <>
      <ModalSearch __modalState="show" __searchValue={searchValue} __backButtonClick={() => history.back()} />
    </>
  );
};

export default SearchFormBox;