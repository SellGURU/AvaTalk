// import dummyData from "../../data/dummy_data";
// import { useEffect, useState } from "react";
import ContactItem from "../ContactItem";

// interface Props {
//   theme?: string;
// }
interface DataProps {
  id: string;
  fullName: string;
  email: string;
  image: string;
  Exhibition: boolean;
  Exchange: boolean;
}
const ContactList = ({ data, theme }: { data: DataProps[]; theme: string | undefined }) => {
  // const [boxHeight, setBoxHeight] = useState(window.innerHeight);
  // const [variable, setVariable] = useState(boxHeight > 700 ? 0.63 : boxHeight > 650 ? 0.6 : boxHeight > 600 ? 0.55 : boxHeight > 530 ? 0.5 : 0.45);
  // const handleResize = () => {
  //   setBoxHeight(window.innerHeight);
  //   setVariable(window.innerHeight > 700 ? 0.63 : window.innerHeight > 650 ? 0.6 : window.innerHeight > 600 ? 0.55 : window.innerHeight > 530 ? 0.5 : 0.45);
  // };
  // useEffect(() => {
  //   setBoxHeight(window.innerHeight);
  //   setVariable(window.innerHeight > 700 ? 0.63 : window.innerHeight > 650 ? 0.6 : window.innerHeight > 600 ? 0.55 : window.innerHeight > 530 ? 0.5 : 0.45);
  //   window.addEventListener("resize", handleResize, false);

  //   return () => {
  //     window.removeEventListener("resize", handleResize, false);
  //   };
  // }, []);

  // console.log("boxHeight", boxHeight);
  return (
    <div className=" w-full overflow-y-scroll px-6 hiddenScrollBar mt-4 h-[-webkit-fill-available] pb-[220px]">
      {data.map((items, index) => (
        <ContactItem theme={theme} key={index} data={items} />
      ))}
    </div>
  );
};

export default ContactList;
