import { Tag } from "../../Types";
import TagItem from "../TagItem";

const TagList = ({ data, theme }: { data: Tag[]; theme: string | undefined }) => {
  return (
    <div className=" w-full overflow-y-scroll px-6 hiddenScrollBar mt-4 h-dvh pb-[220px]">
      {data.map((items, index) => (
        <TagItem theme={theme} key={index} data={items} />
      ))}
    </div>
  );
};

export default TagList;
