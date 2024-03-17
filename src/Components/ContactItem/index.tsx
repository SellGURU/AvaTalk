import { useState } from "react";
import { Contact } from "../../Types";
import { useNavigate } from "react-router-dom";

const ContactItem = ({ data, theme }: { data: Contact; theme: string | undefined }) => {
  const [showMoreTages,setShowMoreTags] = useState(false)
  const navigate = useNavigate()
  return (
    <div className={`${theme}-ContactItem-container relative `}>
      <div className={`${theme}-ContactItem-section `}>
        {data.isExchange && <p className={`${theme}-ContactItem-exchange `}>Exchange</p>}
        <img src={data.photo} alt={data.fullName} className="w-[50px] h-[50px]" />
        <div className={`${theme}-ContactItem-card `}>
          <div className={`${theme}-ContactItem-innerCard `}>
            <p onClick={() =>navigate(`/contacts/${data.id}`)} className={`${theme}-ContactItem-name `}>{data.fullName}</p>
            <div className={`${theme}-ContactItem-iconContainer  `}>
              {data.tags.length == 1 && <p className={`${theme}-ContactItem-exhibition `}>{data.tags[0].name}</p>}
              {data.tags.length > 1 ?
                <div onClick={() => {setShowMoreTags(!showMoreTages)}} className="flex items-center cursor-pointer justify-start">
                  {data.tags.map((item,index) => {
                    return (
                      <>
                        {index <3 ? 
                          <div className={`w-6 h-6 rounded-full -ml-3 border-2 border-white`} style={{backgroundColor:item.color}}></div>
                        :undefined}
                        {index == 3 && <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center -ml-3">
                            <div className="text-gray-700 -mt-2">...</div>
                          </div>}
                      </>
                    )
                  })}
                </div>
               :undefined}
               {showMoreTages && <div className="bg-[#F3F4F6] border-2 z-20 right-2 border-white rounded-[15px] absolute py-2 top-14 overflow-y-scroll max-h-[110px] w-[123px]">
                  {data.tags.map((item,index) => {
                    return (
                      <>
                        <div className="w-full items-center justify-center flex">
                          <div className={`${theme}-ContactItem-exhibition `} style={{backgroundColor:item.color}}>{item.name}</div>
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
