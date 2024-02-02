// import dummyData from "../../data/dummy_data";
// import { useEffect, useState } from "react";
import ChatItem from "../ChatItem";

// interface Props {
//   theme?: string;
// }
interface DataProps {
  id: string;
  name: string;
  content:string
}
const ChatList = ({ data, theme }: { data: DataProps[]; theme: string | undefined }) => {

  return (
    <div className=" w-full overflow-y-scroll hiddenScrollBar mt-4 h-[-webkit-fill-available] px-6 pb-[220px]">
      {data.map((items, index) => (
        <ChatItem theme={theme} key={index} data={items} />
      ))}
    </div>
  );
};

export default ChatList;
