/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { Contact } from "../../Types";
import { useNavigate } from "react-router-dom";
import { getTextColorFromBackground } from "../../help";
import useModalAutoClose from "../../hooks/useModalAutoClose";

const ContactItem = ({ data, theme }: { data: Contact; theme: string | undefined }) => {
  const [showMoreTages,setShowMoreTags] = useState(false)
  const navigate = useNavigate()
  const tagsRefrence = useRef(null)
  useModalAutoClose({
    refrence:tagsRefrence,
    close:() => {
      setShowMoreTags(false)
    }
  })
  return (
    <div onClick={(e:any) => {
      if(e.target.id != 'tags') {
        navigate(`/contacts/${data.id}`)
      }
    } } className={`${theme}-ContactItem-container relative  overflow-visible ${data.isExchange ?'items-center' : 'items-center'}`}>
      <div className={`${theme}-ContactItem-section `}>
        {data.isExchange && <p className={`${theme}-ContactItem-exchange `}>Exchange</p>}
        <img src={'https://ui-avatars.com/api/?name='+data.fullName} alt={data.fullName} className="w-[50px] h-[50px] rounded-full" />
        <div className={`${theme}-ContactItem-card `}>
          <div className={`${theme}-ContactItem-innerCard `}>
            <p  className={`${theme}-ContactItem-name `}>{data.fullName}</p>
            <div className={`${theme}-ContactItem-iconContainer  `}>
              {data.tags.length == 1 && <p className={`${theme}-ContactItem-exhibition cursor-pointer overflow-x-hidden `} style={{backgroundColor:data.tags[0].color,color:getTextColorFromBackground(data.tags[0].color)}}>{data.tags[0].name}</p>}
              {data.tags.length > 1 ?
                <div  onClick={() => {setShowMoreTags(!showMoreTages)}} className="flex items-center cursor-pointer justify-start">
                  {data.tags.map((item,index) => {
                    return (
                      <>
                        {index <3 ? 
                          <div id="tags" className={`w-6 h-6 rounded-full -ml-3 border-2 border-white`} style={{backgroundColor:item.color,color:getTextColorFromBackground(item.color)}}></div>
                        :undefined}
                        {index == 3 && <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center -ml-3">
                            <div id="tags" className="text-gray-700 -mt-2">...</div>
                          </div>}
                      </>
                    )
                  })}
                </div>
               :undefined}
               {showMoreTages && <div id="tags" ref={tagsRefrence}  className="bg-[#F3F4F6] hiddenScrollBar border-2 z-20 right-2 border-white rounded-[15px] absolute py-2 top-14 overflow-y-scroll max-h-[110px] w-[123px]">
                  {data.tags.map((item,index) => {
                    return (
                      <>
                        <div className="w-full items-center justify-center flex">
                          <div className={`${theme}-ContactItem-exhibition `} style={{backgroundColor:item.color,color:getTextColorFromBackground(item.color)}}>{item.name}</div>
                        </div>
                        {index < data.tags.length -1 && <div className="w-full my-1 border-white  border-t" />}
                        
                      </>
                    )
                  })}
                </div>}
              <div className={`${theme}-ContactItem-Vector`}></div>
            </div>
          </div>
          <p className={`${theme}-ContactItem-email `}>{data.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
