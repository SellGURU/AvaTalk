import { useParams } from "react-router-dom";
import { Button } from "symphony-ui";
import { useState } from "react";
import { Auth } from "../../Api";
import { AddContact, DeleteContact } from "../__Modal__";
import { useConstructor } from "../../help";
import { Contact } from "../../Types";
import { BackIcon } from "..";

const ContactDetails = ({ theme }: { theme: string }) => {
  const [showMore, setShowMore] = useState(false);
  const [showExhibition, setShowExhibition] = useState(true);
  const [contact, setContact] = useState<Contact>();
  const [isLoading, setIsLoading] = useState(false);
  const [showEditContactModal, setShowEditContactModal] = useState(false);
  const [showDeleteContactModal, setShowDeleteContactModal] = useState(false);
  const { contactId } = useParams();

  useConstructor(() => {
    setIsLoading(true);
    if (contactId) {
      Auth.getContactDetails(contactId, (contactDetails) => {
        setContact(contactDetails);
        setIsLoading(false);
      });
    }
  });

  const handleEditContact = (updatedContactData: Contact) => {
    setContact(updatedContactData);
    // console.log(updatedContactData);
    if (contactId) {
      Auth.editContact(
        contactId,
        {
          fullName: updatedContactData.fullName,
          email: updatedContactData.email,
          photo: updatedContactData.photo,
          tags: updatedContactData.tags,
          isExchange: updatedContactData.isExchange,
          phone: updatedContactData.phone,
          location: updatedContactData.location,
          mapLocation: updatedContactData.mapLocation,
          company: updatedContactData.company,
          note: updatedContactData.note,
          addDate: updatedContactData.addDate,
          job: updatedContactData.job,
        },
        (res) => {
          console.log(res);
        }
      );
    }
    setShowEditContactModal(false);
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleShowLess = () => {
    setShowMore(false);
  };
  if (isLoading) return <p></p>;
  return (
    <div>
      <div className={`${theme}-ContactDetails-infoContainer`}>
        <BackIcon theme={theme} title="Contact info"></BackIcon>
      </div>
      <div className={`${theme}-ContactDetails-container2`}>
        <div className={`${theme}-ContactDetails-container3`}>
          <div className={`${theme}-ContactDetails-contactImageContainer`}>
            <img src={contact?.photo} alt={contact?.fullName} />
          </div>
          <div className={`${theme}-ContactDetails-importIconContainer`}>
            <div className={`${theme}-ContactDetails-importIcon`}></div>
            <div onClick={() => setShowEditContactModal(true)} className={`${theme}-ContactDetails-editIcon`}></div>
            <div onClick={() => setShowDeleteContactModal(true)} className={`${theme}-ContactDetails-recycleIcon`}></div>
          </div>
        </div>
        <p className={`${theme}-ContactDetails-nameItem`}>{contact?.fullName}</p>
        <p className={`${theme}-ContactDetails-jobItem`}>{contact?.job}</p>
        <div className={`${theme}-ContactDetails-showExibitionconContainer`}>
          {showExhibition && (
            <div className={`${theme}-ContactDetails-exibitionconContainer`}>
              <p className={`${theme}-ContactDetails-exibition`}>Exhibition</p>
              <div onClick={() => setShowExhibition(false)} className={` ${theme}-ContactDetails-crossIcon  `}></div>
            </div>
          )}

          <Button theme="Carbon-Show">Add Tag</Button>
        </div>
        <div className={`${theme}-ContactDetails-container4`}>
          <div className={`${theme}-ContactDetails-container5`}>
            <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
              <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-phoneIcon ${theme}-ContactDetails-ActiveVectors`}></div>
            </div>
            <p className={`${theme}-ContactDetails-textItem`}>{contact?.phone}</p>
          </div>
          <div className={`${theme}-ContactDetails-container5`}>
            <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
              <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-emailIcon ${theme}-ContactDetails-ActiveVectors`}></div>
            </div>
            <p className={`${theme}-ContactDetails-textItem`}>{contact?.email}</p>
          </div>

          {showMore && (
            <>
              <div className={`${theme}-ContactDetails-container5`}>
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-locationIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem`}>{contact?.location}</p>
              </div>
              <div className={`${theme}-ContactDetails-container5`}>
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-buildingIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem`}>{contact?.company}</p>
              </div>
              <div className={`${theme}-ContactDetails-container5`}>
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-meetingIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem`}>{contact?.note}</p>
              </div>
              <div className={`${theme}-ContactDetails-container5`}>
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-calendarIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem`}>{contact?.addDate}</p>
              </div>
            </>
          )}

          <Button onClick={showMore ? handleShowLess : handleShowMore} theme="Carbon-Show">
            {showMore ? "Show less" : "Show more"}
          </Button>
        </div>
      </div>
      <AddContact
        mode="edit"
        onEditContact={handleEditContact}
        contactData={contact}
        title="Edit Contact"
        onAddContact={() => {}}
        theme="Carbon"
        contactId={contactId}
        isOpen={showEditContactModal}
        onClose={() => {
          setShowEditContactModal(false);
        }}
      ></AddContact>
      <DeleteContact
        theme="Carbon"
        contactId={contactId}
        isOpen={showDeleteContactModal}
        onClose={() => {
          setShowDeleteContactModal(false);
        }}
      />
    </div>
  );
};

export default ContactDetails;
