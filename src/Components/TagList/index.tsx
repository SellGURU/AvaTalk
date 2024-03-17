import { Tag } from "../../Types";
import TagItem from "../TagItem";

const TagList = ({ data, theme ,removeTag }: { data: Tag[]; theme: string | undefined ,removeTag:(tag:Tag) => void}) => {
  return (
    <div className=" w-full overflow-y-scroll px-6 hiddenScrollBar mt-4 h-dvh pb-[220px]">
      {data.map((items, index) => (
        <TagItem removeTag={removeTag}  theme={theme} key={index} data={items} />
      ))}
    </div>
  );
};

export default TagList;
