import React from "react";
import { Button, TextField } from "symphony-ui";
import Footer from "../Footer";
import ToggleButton from "../ToggleButton";
import SearchBox from "../SearchBox";

interface ProfileProps {
  theme?: string;
}

const ContactsView: React.FC<ProfileProps> = ({ theme }) => {
  return (
    <div className={`${theme}-ContactsView-Container `}>
      <p className={`${theme}-ContactsView-contactText `}>Contacts</p>
      {/* </div> */}
      <div className={`${theme}-ContactsView-buttonsContainer `}>
        <ToggleButton leftText="Contact List" rightText="Tag List" theme="Carbon" />
        <Button theme="Carbon">
          <div>Add Contact</div>
        </Button>
      </div>
      <div className="mt-8">
        <SearchBox value="" theme="Carbon" placeholder="Search name or email..." />
      </div>
      <div className="mt-[20px]">
        <TextField theme="Carbon" name="contact" value="" onChange={() => {}} onBlur={() => {}} errorMessage={""} placeholder="No contact yet" type="email" inValid={false}></TextField>
      </div>
      <Footer activeItem="contacts" theme="Carbon" />
    </div>
  );
};

export default ContactsView;
