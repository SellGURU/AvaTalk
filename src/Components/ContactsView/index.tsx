/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Button } from "symphony-ui";
import { toast } from 'react-toastify';
import ToggleButton from "../ToggleButton";
import SearchBox from "../SearchBox";
import ContactList from "../ContactList";
import { mkConfig, generateCsv, download } from "export-to-csv";
// import dummyData from "../../data/dummy_data";
import { Outlet } from "react-router";
import { AddContactNew } from "../__Modal__";
import { useConstructor } from "../../help";
import { TagList } from "..";
import AddTag from "../__Modal__/AddTag";
import { Tag, Contact } from "../../Types";
import { Contacts } from "../../Api";
import { subscribe } from "../../utils/event";
import useModalAutoClose from "../../hooks/useModalAutoClose";

interface Props {
  theme?: string;
}

const ContactsView: React.FC<Props> = ({ theme }) => {
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const csvConfig = mkConfig({ useKeysAsHeaders: true });
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading] = useState(false);
  const [showMoreModal,setShowMoreModal] = useState(false);
  const [activeView, setActiveView] = useState("Contact List");
  const getContacts = () => {
      Contacts.showContactList((res) => {
        if (typeof res === 'object') {
          console.log(res)
          setContacts(res.map((el:any) => {
            const newContact:Contact = {
              company:el.company,
              email:el.email,
              fullName:el.full_name,
              id:el.created_contact_id,
              job:'',
              address :'',
              isExchange:el.adding_method == 'exchange'?el.adding_method:'',
              mapLocation:{
                lat:0,
                lng:0
              },
              note:'',
              phone:'',
              tags:el.tags.map((val:any) => {
                const newTag:Tag = {
                  color:val.color,
                  contacts:0,
                  id:val.created_tag_id,
                  name:val.title
                }
                return newTag
              }),
              addDate:el.date_added
            }
            return newContact
          }));
        } else {
          toast.warning(res);
        }
      })
  }
  useConstructor(() => {
    getContacts()
  });

  subscribe('contactChange',() => {
    setContacts([])
    getContacts()
  })
  useConstructor(() => {
    Contacts.showTags((resolveTags) => {
      setTags(resolveTags.map((el) => {
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

    // Promise.all([Auth.getAllContacts((data) => setContacts(data)), Auth.getAllTags((data) => setTags(data))])
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  });
  const handleAddContact = (formData: Contact) => {
    const formDataWithPhoto = { ...formData, photo: "/Acord/person.png", isExchange: false };

    setContacts([...contacts, formDataWithPhoto]);
  };
  // useConstructor(() => {
  //   setIsLoading(true);
  //   Auth.getAllContacts((res) => {
  //     setContacts(res);
  //     setIsLoading(false);
  //   });

  //   Auth.getAllTags((res) => {
  //     setTags(res);
  //     setIsLoading(false);
  //   });
  // });
  // console.log(contacts);
  // console.log(tags);
  const filteredContacts = contacts.filter((item) => item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || item.email.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredTags = tags.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleToggleButtonClick = (buttonText: string) => {
    setActiveView(buttonText);
  };
  const moreModalRef= useRef<HTMLDivElement>(null)
  const ButtonmoreModalRef= useRef<HTMLDivElement>(null)
  useModalAutoClose({
    refrence:moreModalRef,
    buttonRefrence:ButtonmoreModalRef,
    close:() => {
      setShowMoreModal(false)
    }
  })
  return (
    <div className={`${theme}-ContactsView-Container  `}>
      <Outlet></Outlet>
      <div className="flex w-full items-center relative justify-between mb-[22px] pr-6">
        <p className={`${theme}-ContactsView-contactText mb-0 `}>Contacts</p>
        <div ref={ButtonmoreModalRef}>
          <Button onClick={() => {setShowMoreModal(!showMoreModal)}} theme="Carbon-back">
            {/* <img src="./Carbon/more.svg" alt="" /> */}
            <div className={`${theme}-ContactList-Vector-more`}></div>
          </Button>

        </div>
        {
          showMoreModal ?
            <>
              <div ref={moreModalRef} className="w-[210px] -top-2 text-sm right-16  absolute border border-gray-200 py-2 bg-gray-100 rounded-[27px]">
                {/* <div className="flex opacity-50 items-center justify-start px-4 py-2 border-b border-b-white">
                  <img className={`${theme}-ContactsView-scan`} alt="" />
                  <div className="text-gray-700 ml-2">Scan Business Card</div>
                </div>    */}
                <div onClick={() => {
                  const csv = generateCsv(csvConfig)(contacts.map((el) => {
                    return {
                      name:el.fullName,
                      email:el.email,
                      phone:el.phone,
                      note:el.note,
                      company:el.company,                      
                    }
                  }));
                  download(csvConfig)(csv)
                  setShowMoreModal(false)
                }} className="flex items-center cursor-pointer justify-start px-4 py-2">
                  <img className={`${theme}-ContactsView-exportIcon`} alt="" />
                  <div className="text-gray-700 ml-2">Export as CSV</div>
                </div>                
              </div>
            </>
          :
          undefined
        }        
      </div>
      <div className={`${theme}-ContactsView-buttonsContainer w-full`}>
        <div className="w-[45%] min-w-[205px] invisible">
          <ToggleButton onButtonClick={handleToggleButtonClick} leftText="Contact List" rightText="Tag List" theme="Carbon" />
        </div>
        <div className="w-[30%] min-w-[100px]">
          <Button onClick={activeView === "Contact List" ? () => setShowAddContactModal(true) : () => setShowAddTagModal(true)} theme="Carbon">
            {activeView === "Contact List" ? "Add Contact" : "Add Tag"}
          </Button>

        </div>
      </div>
      {activeView === "Contact List" ? (
        <>
          <div className="mt-8 px-6">
            <SearchBox inputHeight="56px" onChange={handleSearchChange} value={searchQuery} theme="Carbon" placeholder="Search for Name or Email..." />
          </div>
          {!(contacts.length > 0) && !isLoading ? (
            <div className={`${theme}-ContactsView-box w-[100%] mt-[10px]`}>
              <div data-testid="input-container" className={` w-[100%]  ${theme}-ContactsView-innerBox`}>
                No Contact Yet
              </div>
            </div>
          ) : (
            <ContactList data={filteredContacts} theme={theme} />
          )}
        </>
      ) : (
        <>
          <div className="mt-8 px-6">
            <SearchBox inputHeight="56px" onChange={handleSearchChange} value={searchQuery} theme="Carbon" placeholder="Search tag..." />
          </div>
          {!(tags.length > 0) && !isLoading ? (
            <div className={`${theme}-ContactsView-box w-[100%] mt-[20px]`}>
              <div data-testid="input-container" className={` w-[100%]  ${theme}-ContactsView-innerBox`}>
                No Tag Yet
              </div>
            </div>
          ) : (
            <TagList editTag={(tag) => {
              const newTags = [...tags]
              const indexTag =newTags.findIndex((item) =>item.id == tag.id) 
              newTags[indexTag] = tag
              Contacts.updateTag(tag,contacts.filter((el) =>el.tags.map((val) =>val.id).includes(tag.id))).then(() => {
                getContacts()
              })
              setTags([...newTags])
              
            }} removeTag={(tag) => {
              setTags([...tags.filter((item) =>item != tag)])             
              Contacts.deleteTag(tag)
            }} data={filteredTags} theme={theme} />
          )}
        </>
      )}
     {showAddContactModal &&
     <>
        <div className="fixed w-full z-[1201] left-0 bottom-0 flex justify-center">
            <AddContactNew onAddContact={handleAddContact} onClose={() => setShowAddContactModal(false)} title="Add Contact">

            </AddContactNew>
        </div>
        <div className="fixed w-full z-[1200] h-full bg-black opacity-60 top-0 left-0"></div>
     </>
     }
{/* 
      <AddContact
        allTags={tags}
        title="Add Contact"
        theme="Carbon"
        mode="add"
        onEditContact={() => {}}
        isOpen={showAddContactModal}
        onAddContact={handleAddContact}
        onClose={() => {
          setShowAddContactModal(false);
        }}
      ></AddContact> */}
      <AddTag
        theme="Carbon"
        isOpen={showAddTagModal}
        onClose={() => {
          setShowAddTagModal(false);
        }}
        addTag={(tag) => {
          Contacts.addTag({
            title:tag.name,
            color:tag.color
          }).then(el => {
            if(el.data.error){
              toast.warn(el.data.error)
            }else {
              const newTag = tag
              tag.id = el.data
              setTags([...tags,newTag])
            }
          })
        }}
      ></AddTag>
    </div>
  );
};

export default ContactsView;
