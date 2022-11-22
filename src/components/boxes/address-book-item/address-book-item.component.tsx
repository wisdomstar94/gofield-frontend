import Button from "../../forms/button/button.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import List, { ListItem } from "../../layouts/list/list.component";
import styles from "./address-book-item.component.module.scss";
import { IAddressBookItem } from "./address-book-item.interface";

const AddressBookItem = (props: IAddressBookItem.Props) => {
  return (
    <>
      <List __style={{ padding: '16px 24px' }} __direction="vertical" __width="100%" __defaultItemMarginBottom="4px">
        <ListItem>
          <div className={styles['getter-name-text']}>홍길동</div>
        </ListItem>
        <ListItem>
          <div className={styles['address-text']}>(00000) 서울특별시 상남구 역삼로 434, 302호</div>
        </ListItem>
        <ListItem __marginBottom="10px">
          <div className={styles['cp-text']}>01022224444</div>
        </ListItem>
        <ListItem __marginBottom="0">
          <BothSidebox
            __leftComponent={<>
              <Button __buttonStyle="gray-solid-radius" __style={{ width: 'auto', padding: '8px 16px' }}>
                수정
              </Button>&nbsp;
              <Button __buttonStyle="gray-solid-radius" __style={{ width: 'auto', padding: '8px 16px' }}>
                <span style={{ color: '#ff6247' }}>삭제</span>
              </Button>
            </>}
            __rightComponent={<>
              <Button __buttonStyle="black-solid-radius" __style={{ width: 'auto', padding: '8px 16px' }}>
                선택
              </Button>
            </>} />
        </ListItem>
      </List>
      <div className={styles['border-bottom-box']}></div>
    </>
  );
};

export default AddressBookItem;