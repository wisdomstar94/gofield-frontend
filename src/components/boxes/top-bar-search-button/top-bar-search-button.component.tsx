import { useCallback, useRef } from "react";
import ModalSearch from "../../modals/modal-search/modal-search.component";
import { IModalSearch } from "../../modals/modal-search/modal-search.interface";
import SvgMagnifyingGlassIcon from "../../svgs/svg-magnifying-glass-icon/svg-magnifying-glass-icon.component";
import styles from "./top-bar-search-button.component.module.scss";
import { ITopBarSearchButton } from "./top-bar-search-button.interface";

const TopBarSearchButton = (props: ITopBarSearchButton.Props) => {
  const modalSearchRef = useRef<IModalSearch.RefObject>(null);

  const searchButtonClick = useCallback(() => {
    modalSearchRef.current?.getModal()?.show();
  }, []);

  return (
    <>
      <span style={{ display: 'inline-flex', cursor: 'pointer' }} onClick={searchButtonClick}><SvgMagnifyingGlassIcon /></span>
      <ModalSearch ref={modalSearchRef} __modalState="hide" />
    </>
  );
};

export default TopBarSearchButton;