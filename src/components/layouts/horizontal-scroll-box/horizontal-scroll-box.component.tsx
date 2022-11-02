import { IHorizontalScrollBox } from "./horizontal-scroll-box.interface";
import styled from 'styled-components';

const HorizontalScrollBox = (props: IHorizontalScrollBox.Props) => {
  return (
    <>
      <StyleIn.Container style={props.__style}>
        <StyleIn.InlineBox>
          { props.children }
        </StyleIn.InlineBox>
      </StyleIn.Container>
    </>
  );
};

const StyleIn = {
  Container: styled.div<IHorizontalScrollBox.Props>`
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      width: 0;
      height: 1px;
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.05);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
    }

    @media all and (max-width: 800px) {
      &::-webkit-scrollbar {
        height: 0;
      }
    }
  `,
  InlineBox: styled.div<IHorizontalScrollBox.Props>`
    width: auto;
    display: inline-flex;
    flex-wrap: nowrap;
    position: relative;
  `,
};

export default HorizontalScrollBox;