import { IVirtualbox } from "./virtual-box.interface";

const Virtualbox = (props: IVirtualbox.Props) => {
  return (
    <>
      { props.children }
    </>
  )
};

export default Virtualbox;