import React, { useState } from "react";
import { Button } from "symphony-ui";
import ToggleButton from "../ToggleButton";
import SearchBox from "../SearchBox";
import ContactList from "../ContactList";
import dummyData from "../../data/dummy_data";
import { Outlet } from "react-router";
import { AddContact } from "../__Modal__";
interface ProfileProps {
  theme?: string;
}

const ContactsView: React.FC<ProfileProps> = ({ theme }) => {
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = dummyData.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.email.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className={`${theme}-ContactsView-Container  `}>
      <Outlet></Outlet>
      <p className={`${theme}-ContactsView-contactText `}>Contacts</p>
      <div className={`${theme}-ContactsView-buttonsContainer `}>
        <ToggleButton leftText="Contact List" rightText="Tag List" theme="Carbon" />
        <Button onClick={() => setShowAddContactModal(true)} theme="Carbon">
          <div>Add Contact</div>
        </Button>
      </div>
      <div className="mt-8">
        <SearchBox inputHeight="56px" onChange={handleSearchChange} value={searchQuery} theme="Carbon" placeholder="Search name or email..." />
      </div>
      {!(dummyData.length > 0) ? (
        <div className={`${theme}-ContactsView-box w-[100%] mt-[20px]`}>
          <div data-testid="input-container" className={` w-[100%]  ${theme}-ContactsView-innerBox`}>
            No contact yet
          </div>
        </div>
      ) : (
        <ContactList data={filteredData} theme={theme} />
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
