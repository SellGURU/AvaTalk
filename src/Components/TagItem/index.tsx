import { TagsData } from "../../Api/Auth";

const TagItem = ({ data, theme }: { data: TagsData; theme: string | undefined }) => {
  return (
    <div className={`${theme}-ContactItem-container `}>
      <div className="flex w-full justify-between items-center">
        <div style={{ backgroundColor: data.color }} className="flex items-center justify-center w-[108px] space-x-[2px] h-8 rounded-[47px]  ">
          <p className={`${data.color === "#6366F1" ? "text-white" : "text-gray-700"}  leading-[20px] text-[14px] font-[500] tracking-tight`}>{data.tag}</p>
        </div>

        <p className="text-cyan-500 text-[14px] leading-[20px] font-[500] tracking-tight">{data?.contacts?.length} Contacts </p>

        <div className=" flex space-x-2 items-center ">
          <div className={`${theme}-ContactDetails-editIcon`}></div>
          <div className={`${theme}-ContactDetails-recycleIcon`}></div>
        </div>
      </div>
    </div>
  );
};

export default TagItem;
