/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-modal";

import "./index.scss";

import { ColorBox, Select, TextField } from "../..";
import { Button } from "symphony-ui";
import { useConstructor } from "../../../help";
import { Auth } from "../../../Api";
import { useState } from "react";
import { Contact } from "../../../Types";

interface AddContactProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: string;
  onAfterOpen?: () => void;
}

const AddTag: React.FC<AddContactProps> = ({ isOpen, onAfterOpen, onClose, theme }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useConstructor(() => {
    setIsLoading(true);
    Auth.getAllContacts((res) => {
      setContacts(res);
      setIsLoading(false);
    });
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onClose}
        style={{ content: { borderRadius: "24px", width: "100%", maxWidth: "450px", background: "rgba(255, 255, 255, 1)" }, overlay: { backgroundColor: "rgba(0,0,0,0.7)" } }}
        contentLabel="Example Modal"
      >
        <>
          <div className="h-[65vh] hiddenScrollBar overflow-y-scroll">
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div className="text-gray-700 text-left font-[600] text-[16px] leading-[24px]">Add Tag</div>
                <Button onClick={onClose} theme="Carbon-back">
                  <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
              </div>
              <div className="my-4">
                <TextField value="" onChange={() => {}} onBlur={() => {}} label="Title" placeholder="Enter title..." theme="Carbon" name="FullName" type="text" errorMessage="" inValid={false} />
              </div>
              <div>
                <ColorBox />
              </div>
              <div className="mt-4">
                <Select label="Tag" valueElement={<div></div>} placeholder="Select tag..." theme="Carbon">
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
                          <p className="leading-[21px] font-[400] text-[14px] text-gray-700">{contact.firstName + ' '+ contact.lastName}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </Select>
              </div>

              <div className="mt-4">
                <Button onClick={onClose} theme="Carbon">
                  <div>Add Tag</div>
                </Button>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default AddTag;
