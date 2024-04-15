/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-modal";

import "./index.scss";

import { Button } from "symphony-ui";
import { useConstructor } from "../../../help";
import Select from "../../Select";
import { useState } from "react";
import { Tag } from "../../../Types";
import { Contacts } from "../../../Api";

interface AddContactProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: string;
  onSubmit:(tags:Array<Tag>) =>void;
  onAfterOpen?: () => void;
  mode?:'Edit' | 'Add'
  selected:Array<Tag>
}

const AddTagContact: React.FC<AddContactProps> = ({ isOpen,onAfterOpen,onSubmit,selected, onClose, theme,mode }) => {
  // const [contacts, setContacts] = useState<Contact[]>([]);
  // const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
//   const [title,setTitle] = useState(tag?tag.name:'')
  const [selectedTags,setSelectedTags] = useState<Array<Tag>>(selected)
  const [allTags,setAllTags] = useState<Array<Tag>>([])
  useConstructor(() => {
    Contacts.showTags((resolveTags) => {
      setAllTags(resolveTags.map((el) => {
        const newTag:Tag = {
          name:el.title,
          color:el.color,
          contacts:el.count,
          id:el.created_tag_id
        }
        return newTag
      }))
    })    
    // setIsLoading(true);
    // Auth.getAllContacts((res) => {
    //   // setContacts(res);
    //   setIsLoading(false);
    // });
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={() => {
            setSelectedTags(selected)
          onClose()}}
        style={{ content: { borderRadius: "24px", width: "100%", maxWidth: "360px", background: "rgba(243, 244, 246, 1)" }, overlay: { backgroundColor: "rgba(0,0,0,0.7)" } }}
        contentLabel="Example Modal"
      >
        <>
          <div className="flex w-full justify-between items-center">
            <div className="text-gray-700 text-left font-[600] text-[16px] leading-[24px]">{mode == 'Edit' ? 'Edit' : 'Add'} Tag</div>
            <Button onClick={() => {
                setSelectedTags(selected)
              onClose()
              }} theme="Carbon-back">
              <div className={`${theme}-Profile-closeIcon`}></div>
            </Button>
          </div>
          {/* <div className="h-[65vh] hiddenScrollBar overflow-y-scroll"> */}
          <div>
            {/* <div className="my-4">
              <TextField value={title} onChange={(e) => {setTitle(e.target.value)}} onBlur={() => {}} label="Title" placeholder="Enter title..." theme="Carbon" name="FullName" type="text" errorMessage="" inValid={false} />
            </div> */}
            {/* <div>
              <ColorBox color={tag?.color} resolveColor={(color:string) => {
                setColorCode(color)
              }}/>
            </div> */}
            {/* <div className="mt-4">
              <Select label="Contacts" valueElement={<div></div>} placeholder="Select Contacts..." theme="Carbon">
                {isLoading ? (
                  <p></p>
                ) : (
                  <ul>
                    {contacts.map((contact) => (
                      <li key={contact.id} className=" flex px-[20px]  h-[50px] items-center border border-white">
                        <div
                          onClick={() => {
                            // Toggle selection of the contact
                            if (selectedContacts.includes(contact.id)) {
                              setSelectedContacts(selectedContacts.filter((id) => id !== contact.id));
                            } else {
                              setSelectedContacts([...selectedContacts, contact.id]);
                            }
                          }}
                          className={`w-6 h-6 mr-2 cursor-pointer boxShadow-Gray  border border-white rounded-md ${selectedContacts.includes(contact.id) ? "bg-primary-color" : "bg-gray-100"}`}
                        >
                          {selectedContacts.includes(contact.id) && (
                            <div className=" flex items-center justify-center">
                              <span className="text-white">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="leading-[21px] font-[400] text-[14px] text-gray-700">{contact.fullName}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </Select>
            </div> */}
            <div className="mt-4">
            <Select
                valueElement={
                <div className={`${theme}-AddContact-selectItems gap-2`}>
                    {selectedTags.length == 0 && <div className={`text-[13px] text-gray-700 font-thin opacity-80`}>Select tag ...</div>}
                    {selectedTags.map((item,index) => {
                    return (
                        <>
                        {index < 2 &&
                        <div onClick={() => {
                            setSelectedTags([...selectedTags.filter((el) =>el.id != item.id)])
                        }} className={`${theme}-ContactDetails-exibitionconContainer gap-2 flex max-w-[120px] justify-between px-2 mt-[-6px]`} style={{backgroundColor:item.color}}>
                            <p className={`${theme}-ContactDetails-exibition`} >{item.name}</p>
                            <div className={` ${theme}-ContactDetails-crossIcon  `}></div>
                        </div>
                        }
                        {index == 2 &&  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 mt-[-6px] border-white flex items-center justify-center ">
                                <div id="tags" className="text-gray-700 -mt-2">...</div>
                            </div>}
                        </>
                    )
                    })}
                </div>
                }
                label="Tag"
                placeholder="Select tag..."
                theme="Carbon"
            >
                <div className="flex hiddenScrollBar justify-start overflow-x-scroll max-h-[120px] items-baseline flex-wrap py-4 gap-2 px-2">
                {allTags.filter((el) =>!selectedTags.map(va =>va.id).includes(el.id)).map((item) => {
                    return (
                    <>
                        <div onClick={() => {
                        setSelectedTags([...selectedTags,item])
                        }} className={`${theme}-ContactDetails-exibitionconContainer cursor-pointer min-w-20`} style={{backgroundColor:item.color}}>
                            <p className={`${theme}-ContactDetails-exibition`} >{item.name}</p>
                        </div>
                    </>
                    )
                })}
                {allTags.length == 0 ?
                <option className={`text-sm text-gray-700`}>No tag yet...</option>
                :undefined}
                </div>
            </Select>
            </div>
            <div className="mt-10">
              <Button onClick={() => {
                onSubmit(selectedTags)
                onClose()
                }} theme="Carbon">
                <div>{mode == 'Edit' ? 'Edit' : 'Add'} Tag</div>
              </Button>
            </div>
          </div>
          {/* </div> */}
        </>
      </Modal>
    </>
  );
};

export default AddTagContact;
