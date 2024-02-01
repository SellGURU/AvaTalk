import React, { useState } from "react";
import { Button } from "symphony-ui";
import ToggleButton from "../ToggleButton";
import SearchBox from "../SearchBox";
import ContactList from "../ContactList";
// import dummyData from "../../data/dummy_data";
import { Outlet } from "react-router";
import { AddContact } from "../__Modal__";
import { useConstructor } from "../../help";
import { Auth } from "../../Api";
// import { useAuth } from "../../hooks/useAuth";
import { ContactData, TagsData } from "../../Api/Auth";
import { TagList } from "..";

interface Props {
  theme?: string;
}

const ContactsView: React.FC<Props> = ({ theme }) => {
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [tags, setTags] = useState<TagsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState("Contact List");

  useConstructor(() => {
    setIsLoading(true);

    Promise.all([Auth.getAllContacts((data) => setContacts(data)), Auth.getAllTags((data) => setTags(data))])
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

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
  console.log(contacts);
  console.log(tags);
  const filteredContacts = contacts.filter((item) => item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || item.email.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredTags = tags.filter((item) => item.tag.toLowerCase().includes(searchQuery.toLowerCase()));

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
      <div className={`${theme}-ContactsView-buttonsContainer `}>
        <ToggleButton onButtonClick={handleToggleButtonClick} leftText="Contact List" rightText="Tag List" theme="Carbon" />
        <Button onClick={activeView === "Contact List" ? () => setShowAddContactModal(true) : () => console.log("Tag Modal")} theme="Carbon">
          {activeView === "Contact List" ? "Add Contact" : "Add Tag"}
        </Button>
      </div>
      {activeView === "Contact List" ? (
        <>
          <div className="mt-8 px-6">
            <SearchBox inputHeight="56px" onChange={handleSearchChange} value={searchQuery} theme="Carbon" placeholder="Search name or email..." />
          </div>
          {!(contacts.length > 0) && isLoading ? (
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
          {!(tags.length > 0) && isLoading ? (
            <div className={`${theme}-ContactsView-box w-[100%] mt-[20px]`}>
              <div data-testid="input-container" className={` w-[100%]  ${theme}-ContactsView-innerBox`}>
                No tag yet
              </div>
            </div>
          ) : (
            <TagList data={filteredTags} theme={theme} />
          )}
        </>
      )}

      <AddContact
        theme="Carbon"
        isOpen={showAddContactModal}
        onClose={() => {
          setShowAddContactModal(false);
        }}
      ></AddContact>
    </div>
  );
};

export default ContactsView;
