// import dummyData from "../../data/dummy_data";
// import { useEffect, useState } from "react";
import { Contact } from "../../Types";
import ContactItem from "../ContactItem";

// interface Props {
//   theme?: string;
// }
// interface DataProps {
//   id: string;
//   fullName: string;
//   email: string;
//   image: string;
//   Exhibition: boolean;
//   Exchange: boolean;
// }
const ContactList = ({ data, theme }: { data: Contact[]; theme: string | undefined }) => {
  return (
    <div className={`${theme}-ContactList-container`}>
      {data.sort((a, b) =>
      a.fullName.localeCompare(b.fullName)
    ).map((items, index) => (
        <ContactItem theme={theme} key={index} data={items} />
      ))}
    </div>
  );
};

export default ContactList;
