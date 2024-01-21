import React from "react";
import { Button } from "symphony-ui";
import Footer from "../Footer";
import ToggleButton from "../ToggleButton";

interface ProfileProps {
  theme?: string;
}

const ContactsView: React.FC<ProfileProps> = ({ theme }) => {
  return (
    <div>
      <div className={`${theme}-Profile-Content`}>
        <p className=" leading-[24px] text-[16px] font-[600]">Contacts</p>
      </div>
      <div className=" flex justify-between items-center">
        <ToggleButton />
        <Button theme="Carbon">
          <div>Add Contact</div>
        </Button>
      </div>
      <Footer activeItem="contacts" theme="Carbon" />
    </div>
  );
};

export default ContactsView;
