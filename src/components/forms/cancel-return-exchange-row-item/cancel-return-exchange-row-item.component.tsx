import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import EmptyRow from "../../layouts/empty-row/empty-row.component";
import List, { ListItem } from "../../layouts/list/list.component";
import Button from "../button/button.component";
import LinkText from "../link-text/link-text.component";
import styles from "./cancel-return-exchange-row-item.component.module.scss";
import { ICancelReturnExchangeRowItem } from "./cancel-return-exchange-row-item.interface";

const CancelReturnExchangeRowItem = (props: ICancelReturnExchangeRowItem.Props) => {
  return (
    <>
      <div className={[
          styles['cancel-return-exchange-row-item']
        ].join(' ')}>
        <List __width="100%" __direction="vertical">
          <ListItem __marginBottom="24px">
            <BothSidebox
              __leftComponent={<>
                <span style={{ fontSize: '0.8rem', color: '#374553', fontWeight: 'bold' }}>2022/5/7</span>
              </>}
              __rightComponent={<>
                <LinkText __onClick={() => {  }}>취소상세보기</LinkText>
              </>} />
          </ListItem>
          <ListItem __marginBottom="24px">
            <span style={{ fontSize: '0.8rem', color: '#1e2238', fontWeight: 'normal' }}>
              페르마 플러스 드라이버 헤드 (9.5도 단품) <br />
              두줄의경우
            </span>
          </ListItem>
          <ListItem __marginBottom="24px">
            <EmptyRow __style={{ height: '1px', backgroundColor: '#e9ebee' }} />
          </ListItem>
          <ListItem __marginBottom="14px">
            <BothSidebox
              __leftComponentStyle={{ width: '70px' }}
              __rightComponentStyle={{ width: 'calc(100% - 70px)', justifyContent: 'flex-start' }}
              __leftComponent={<>
                <span style={{ fontSize: '0.8rem', color: '#374553', fontWeight: 'bold' }}>취소완료</span>
              </>}
              __rightComponent={<>
                <span style={{ fontSize: '0.8rem', color: '#1e2238', fontWeight: 'normal' }}>
                  5/7(토)이내 카드사 환불 완료 예정
                </span>
              </>} />
          </ListItem>
          <ListItem>
            <Button __buttonStyle="small-gray-stroke-radius">
              장바구니 담기
            </Button>
          </ListItem>
        </List>
      </div>
    </>
  );
};

export default CancelReturnExchangeRowItem;