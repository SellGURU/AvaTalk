import dummyData from "../../data/dummy_data";
import ContactItem from "../ContactItem";

interface Props {
  theme?: string;
}

const ContactList: React.FC<Props> = ({ theme }) => {
  return (
    <div className="overflow-y-auto h-[380px] w-full hiddenScrollBar mt-4">
      {dummyData.map((data, index) => (
        <ContactItem theme={theme} key={index} data={data} />
      ))}
    </div>
  );
};

export default ContactList;
