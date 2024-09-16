import { useState } from "react";
import { Tag } from "../../Types";
import AddTag from "../__Modal__/AddTag";
import { getTextColorFromBackground } from "../../help";

const TagItem = ({ data, theme ,removeTag,editTag}: { data: Tag; theme: string | undefined,removeTag:(tag:Tag) => void,editTag:(tag:Tag) => void}) => {
  const [showEditTag,setShowEditTag] = useState(false);
  return (
    <>
      <div className={`${theme}-ContactItem-container `} style={{height:'45px'}}>
        <div className="flex w-full justify-between items-center">
          <div className="borderBox-Gray boxShadow-Gray rounded-[47px]">
            <div style={{ backgroundColor: data.color }} className="flex overflow-x-hidden items-center justify-center w-[108px] space-x-[2px] h-8 rounded-[47px]">
              <p className={` leading-[20px] text-[14px] font-[500] tracking-tight`} style={{color:getTextColorFromBackground(data.color)}}>{data.name}</p>
            </div>
          </div>

          <p className="text-cyan-500 text-[14px] leading-[20px] font-[500] tracking-tight">{data.contacts} Contacts </p>

          <div className=" flex space-x-2 items-center ">
            <div onClick={() => setShowEditTag(true)} className={`${theme}-ContactDetails-editIcon`}></div>
            <div onClick={() => {
              removeTag(data)
            }} className={`${theme}-ContactDetails-recycleIcon`}></div>
          </div>
        </div>
      </div>
      <AddTag
        editTag={editTag}
        theme="Carbon"
        isOpen={showEditTag}
        onClose={() => {
          setShowEditTag(false)
          // setShowAddTagModal(false);
        }}
        mode="Edit"
        tag={data}
        addTag={() => {
          // setTags([...tags,tag])
        }}
      ></AddTag>      
    </>
  );
};

export default TagItem;
