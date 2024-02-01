// import dummyData from "../../data/dummy_data";
// import { useEffect, useState } from "react";
import { TagsData } from "../../Api/Auth";
import TagItem from "../TagItem";

const TagList = ({ data, theme }: { data: TagsData[]; theme: string | undefined }) => {
  return (
    <div className=" w-full overflow-y-scroll px-6 hiddenScrollBar mt-4 h-[-webkit-fill-available] pb-[220px]">
      {data.map((items, index) => (
        <TagItem theme={theme} key={index} data={items} />
      ))}
    </div>
  );
};

export default TagList;
