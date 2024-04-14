/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "symphony-ui";
import { toast } from 'react-toastify';
import ToggleButton from "../ToggleButton";
import SearchBox from "../SearchBox";
import ContactList from "../ContactList";
// import dummyData from "../../data/dummy_data";
import { Outlet } from "react-router";
import { AddContact } from "../__Modal__";
import { useConstructor } from "../../help";
import { TagList } from "..";
import AddTag from "../__Modal__/AddTag";
import { Tag, Contact } from "../../Types";
import { Contacts } from "../../Api";
import { subscribe } from "../../utils/event";

interface Props {
  theme?: string;
}

const ContactsView: React.FC<Props> = ({ theme }) => {
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading] = useState(false);
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
  return (
    <div className={`${theme}-ContactsView-Container  `}>
      <Outlet></Outlet>
      <p className={`${theme}-ContactsView-contactText `}>Contacts</p>
      <div className={`${theme}-ContactsView-buttonsContainer w-full`}>
        <div className="w-[45%] min-w-[250px]">
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
            <SearchBox inputHeight="56px" onChange={handleSearchChange} value={searchQuery} theme="Carbon" placeholder="Search name or email..." />
          </div>
          {!(contacts.length > 0) && !isLoading ? (
            <div className={`${theme}-ContactsView-box w-[100%] mt-[20px]`}>
              <div data-testid="input-container" className={` w-[100%]  ${theme}-ContactsView-innerBox`}>
                No contact yet
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
                No tag yet
              </div>
            </div>
          ) : (
            <TagList editTag={(tag) => {
              const newTags = [...tags]
              const indexTag =newTags.findIndex((item) =>item.id == tag.id) 
              newTags[indexTag] = tag
              Contacts.updateTag(tag,contacts.filter((el) =>el.tags.map((val) =>val.id).includes(tag.id)))
              setTags([...newTags])
            }} removeTag={(tag) => {
              setTags([...tags.filter((item) =>item != tag)])             
              Contacts.deleteTag(tag)
            }} data={filteredTags} theme={theme} />
          )}
        </>
      )}

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
      ></AddContact>
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
            const newTag = tag
            tag.id = el.data
            setTags([...tags,newTag])
          })
        }}
      ></AddTag>
    </div>
  );
};

export default ContactsView;
