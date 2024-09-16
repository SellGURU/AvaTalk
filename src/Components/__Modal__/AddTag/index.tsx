/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-modal";

import "./index.scss";

import { ColorBox, TextField } from "../..";
import { Button } from "symphony-ui";
import { generateSlugId, useConstructor } from "../../../help";
import { useState } from "react";
import { Tag } from "../../../Types";

interface AddContactProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: string;
  addTag:(tag:Tag) =>void
  editTag?:(tag:Tag) => void
  onAfterOpen?: () => void;
  mode?:'Edit' | 'Add'
  tag?:Tag
}

const AddTag: React.FC<AddContactProps> = ({ isOpen, editTag,onAfterOpen,addTag, onClose, theme,mode,tag }) => {
  // const [contacts, setContacts] = useState<Contact[]>([]);
  // const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [title,setTitle] = useState(tag?tag.name:'')
  const [colorCode,setColorCode] = useState(tag?tag.color:'')
  useConstructor(() => {
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
          if(tag) {
            setTitle(tag.name)
          }
          onClose()}}
        style={{ content: { borderRadius: "24px", width: "100%", maxWidth: "360px", background: "rgba(243, 244, 246, 1)" }, overlay: { backgroundColor: "rgba(0,0,0,0.7)" } }}
        contentLabel="Example Modal"
      >
        <>
          <div className="flex w-full justify-between items-center">
            <div className="text-gray-700 text-left font-[600] text-[16px] leading-[24px]">{mode == 'Edit' ? 'Edit' : 'Add'} Tag</div>
            <Button onClick={() => {
              if(tag) {
                setTitle(tag.name)
              }
              onClose()
              }} theme="Carbon-back">
              <div className={`${theme}-Profile-closeIcon`}></div>
            </Button>
          </div>
          {/* <div className="h-[65vh] hiddenScrollBar overflow-y-scroll"> */}
          <div>
            <div className="my-4">
              <TextField value={title} onChange={(e) => {setTitle(e.target.value)}} onBlur={() => {}} label="Title" placeholder="Enter title..." theme="Carbon" name="FullName" type="text" errorMessage="Title must be 10 characters" inValid={title.length > 10} />
            </div>
            <div>
              <ColorBox color={tag?.color} resolveColor={(color:string) => {
                setColorCode(color)
              }}/>
            </div>
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

            <div className="mt-10">
              <Button disabled={title.length == 0 || title.length> 10} onClick={() => {
                const newTag:Tag = {
                  color:colorCode,
                  contacts:0,
                  id:generateSlugId(),
                  name:title
                }
                if(mode == 'Edit' && tag && editTag){
                    editTag({
                      color:colorCode,
                      contacts:tag?.contacts,
                      id:tag?.id,
                      name:title
                    })
                }else{
                  addTag(newTag)
                }
                setTitle('')
                setColorCode('')
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

export default AddTag;
