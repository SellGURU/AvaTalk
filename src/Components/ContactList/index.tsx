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
    <div className=" w-full overflow-y-scroll px-6 hiddenScrollBar mt-4 h-[-webkit-fill-available] pb-[220px]">
      {data.map((items, index) => (
        <ContactItem theme={theme} key={index} data={items} />
      ))}
    </div>
  );
};

export default ContactList;
