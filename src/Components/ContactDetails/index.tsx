import { useNavigate, useParams } from "react-router-dom";
import styles from "./ContatDetails.module.css";
import { Button } from "symphony-ui";
// import dummyData from "../../data/dummy_data";
import { useState } from "react";
import { Auth } from "../../Api";
import { ContactData } from "../../Api/Auth";
import { useConstructor } from "../../help";

const ContactDetails = ({ theme }: { theme: string }) => {
  const [showMore, setShowMore] = useState(false);
  const [showExhibition, setShowExhibition] = useState(true);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useConstructor(() => {
    setIsLoading(true);
    Auth.contactBoxs((res) => {
      setContacts(res);
      setIsLoading(false);
    });
  });

  const { contactId } = useParams();
  const selectedContact = contacts.find((item) => item.id.toString() === contactId);

  const navigate = useNavigate();

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleShowLess = () => {
    setShowMore(false);
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <div className="flex items-center space-x-4 absolute  top-8">
        <Button onClick={() => navigate(-1)} theme="Carbon-back">
          <div className={styles.backIcon + " w-[8px] h-[20px] bg-slate-400"}></div>
        </Button>
        <p className="text-gray-700 leading-[24px] text-[16px] font-[600] contactNameShadow">Contact info</p>
      </div>
      <div className="h-screen flex flex-col items-center mt-[60px]">
        <div className="flex items-center space-x-4 mb-[8px] -mr-9">
          <img src={selectedContact?.image} alt={selectedContact?.name} />
          <div className=" flex flex-col items-center space-y-[9px]">
            <div className={`${theme}-ContactDetails-importIcon`}></div>
            <div className={`${theme}-ContactDetails-editIcon`}></div>
            <div className={`${theme}-ContactDetails-recycleIcon`}></div>
          </div>
        </div>
        <p className={`${theme}-ContactDetails-nameItem`}>{selectedContact?.name}</p>
        <p className={`${theme}-ContactDetails-jobItem`}>{selectedContact?.job}</p>
        <div className="flex items-center justify-between mb-[20px]">
          {showExhibition && (
            <div className="flex items-center justify-center w-[108px] space-x-[2px] h-8 rounded-[47px] bg-amber-400 ">
              <p className="text-gray-700 leading-[20px] text-[14px] font-[500] tracking-tight">Exhibition</p>
              <div onClick={() => setShowExhibition(false)} className={` ${theme}-ContactDetails-crossIcon  `}></div>
            </div>
          )}

          <Button theme="Carbon-Show">Add Tag</Button>
        </div>
        <div className="flex flex-col   space-y-3">
          <div className="flex items-center space-x-2">
            <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
              <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-phoneIcon ${theme}-ContactDetails-ActiveVectors`}></div>
            </div>
            <p className={`${theme}-ContactDetails-textItem`}>{selectedContact?.phone}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
              <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-emailIcon ${theme}-ContactDetails-ActiveVectors`}></div>
            </div>
            <p className={`${theme}-ContactDetails-textItem`}>{selectedContact?.email}</p>
          </div>

          {showMore && (
            <>
              <div className="flex items-center space-x-2">
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-locationIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem`}>{selectedContact?.location}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-buildingIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem`}>{selectedContact?.company}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-meetingIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem`}>{selectedContact?.meetDate}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-calendarIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem`}>{selectedContact?.addDate}</p>
              </div>
            </>
          )}

          <Button onClick={showMore ? handleShowLess : handleShowMore} theme="Carbon-Show">
            {showMore ? "Show less" : "Show more"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
