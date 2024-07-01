// import dummyData from "../../data/dummy_data";
// import { useEffect, useState } from "react";
import ChatItem from "../ChatItem";

// interface Props {
//   theme?: string;
// }
interface DataProps {
  id: string;
  chat_list_id: string;
  entry_date: string;
  entry_time:string;
  response:string;
  date_group:string; 
  title:string;
}
const ChatList = ({ data, theme }: { data: DataProps[]; theme: string | undefined }) => {
  const lastDateRender: Array<string> = [];
  const mustBeRenderDate2 = (date1: string) => {
      // let
      // console.log(new Date(date1))
      if (date1 == "Today" && !lastDateRender.includes("Today")) {
        lastDateRender.push("Today");
        return true;
      }
      if (date1 == "Yesterday" && !lastDateRender.includes("Yesterday")) {
        lastDateRender.push("Yesterday");
        return true;
      }
      if (date1 == "Two days ago" && !lastDateRender.includes("Two days ago")) {
        lastDateRender.push("Two days ago");
        return true;
      }
      if (date1 == "Three days ago" && !lastDateRender.includes("Three days ago")) {
        lastDateRender.push("Three days ago");
        return true;
      }
      if (date1 == "Four days ago" && !lastDateRender.includes("Four days ago")) {
        lastDateRender.push("Four days ago");
        return true;
      }      
      if (date1 == "Five days ago" && !lastDateRender.includes("Five days ago")) {
        lastDateRender.push("Five days ago");
        return true;
      }     
      if (date1 == "Six days ago" && !lastDateRender.includes("Six days ago")) {
        lastDateRender.push("Six days ago");
        return true;
      }         
     if (date1 == "Seven days ago" && !lastDateRender.includes("Seven days ago")) {
        lastDateRender.push("Seven days ago");
        return true;
      }           
     if (date1 == "Last Month" && !lastDateRender.includes("Last Month")) {
        lastDateRender.push("Last Month");
        return true;
      }         
     if (date1 == "Olden" && !lastDateRender.includes("Olden")) {
        lastDateRender.push("Olden");
        return true;
      }                    
      // Last Month
      return false;
      // return mustBeRenderDate(new Date(date1))
  };  
  return (
    <div className=" w-full overflow-y-scroll hiddenScrollBar mt-4 h-dvh px-6 pb-[220px]">
      {data.map((items, index) => (
        <>
          <ChatItem visibleDate={mustBeRenderDate2(items.date_group)} theme={theme} key={index} data={items} />
        </>
      ))}
    </div>
  );
};

export default ChatList;
