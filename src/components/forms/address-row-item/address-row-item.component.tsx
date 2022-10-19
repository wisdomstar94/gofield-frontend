import { useEffect, useState } from "react";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import List, { ListItem } from "../../layouts/list/list.component";
import Button from "../button/button.component";
import styles from "./address-row-item.component.module.scss";
import { IAddressRowItem } from "./address-row-item.interface";

const AddressRowItem = (props: IAddressRowItem.Props) => {
  const [addressItemState, setAddressItemState] = useState<IAddressRowItem.AddressItemState>(props.__addressItemState ?? 'normal');

  useEffect(() => {
    setAddressItemState(props.__addressItemState ?? 'normal');
  }, [props.__addressItemState]);

  return (
    <>
      <div className={[
          styles['address-row-item'],
          props.__isNoneBorderBottom === true ? styles['none-border-bottom'] : '',
        ].join(' ')}>
        <List __width="100%" __direction="vertical">
          <ListItem __marginBottom="10px">
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#374553', letterSpacing: '-0.03rem' }}>
              홍길동
            </span>
            &nbsp;
            {
              addressItemState === 'default' ?
              <>
                <span className={[styles['default-address-symbol']].join(' ')}>기본주소</span>
              </>
              : <></>
            }
          </ListItem>
          <ListItem __marginBottom="24px">
            <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: '#1e2238', letterSpacing: '-0.03rem' }}>
              (00000) 서울특별시 강남구 역삼동 12345 123<br />
              010-0000-0000
            </span>
          </ListItem>
          <ListItem __marginBottom="0">
            <BothSidebox
              __leftComponent={<>
                <List __direction="horizontal" __defaultItemMarginRight="4px">
                  <ListItem>
                    <Button __buttonStyle="small-gray-stroke-radius">수정</Button>
                  </ListItem>
                  <ListItem>
                    <Button __buttonStyle="small-gray-stroke-radius">삭제</Button>
                  </ListItem>
                </List>
              </>}
              __rightComponent={<>
                <Button __buttonStyle="small-gray-solid-radius">선택</Button>
              </>} />
          </ListItem>
        </List>
      </div>
    </>
  );
};

export default AddressRowItem;