import { useParams } from "react-router-dom";
import { Button } from "symphony-ui";
import { useState } from "react";
import { Auth } from "../../Api";
import { AddContact, DeleteContact } from "../__Modal__";
import { useConstructor } from "../../help";
import { Contact, Tag } from "../../Types";
import { BackIcon } from "..";
import AddTag from "../__Modal__/AddTag";

const ContactDetails = ({ theme }: { theme: string }) => {
  const [showMore, setShowMore] = useState(false);
  const [contact, setContact] = useState<Contact>();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
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
  const removeTag = (tag:Tag) => {
    const contac = contact
    // confirm('delete tag')
    if(contac?.tags) {
     contac.tags = contac.tags.filter((el) =>el != tag)
    }
    setContact({...contac} as Contact)

    // setShowEditContactModal(false)
  }
  const handleShowLess = () => {
    setShowMore(false);
  };
  const [showMoreTages,setShowMoreTags] = useState(false)
  if (isLoading) return <p></p>;
  return (
    <div>
      <div className={`${theme}-ContactDetails-infoContainer`}>
        <BackIcon theme={theme} title="Contact info" ></BackIcon>
      </div>
      <div className={`${theme}-ContactDetails-container2`}>
        <div className={`${theme}-ContactDetails-container3`}>      
          <div className={`${theme}-Profile-ProfilePictureSection`}>
            <img src={contact?.photo} alt={contact?.fullName} className={`${theme}-Profile-ProfilePicture`} />
          </div>
          <div className={`${theme}-ContactDetails-importIconContainer`}>
            <div className={`${theme}-ContactDetails-importIcon`}></div>
            <div onClick={() => setShowEditContactModal(true)} className={`${theme}-ContactDetails-editIcon`}></div>
            <div onClick={() => setShowDeleteContactModal(true)} className={`${theme}-ContactDetails-recycleIcon`}></div>
          </div>
        </div>
        <p className={`${theme}-ContactDetails-nameItem`}>{contact?.fullName}</p>
        <p className={`${theme}-ContactDetails-jobItem`}>{contact?.job}</p>
        <div className={`${theme}-ContactDetails-showExibitionconContainer `}>
          {/* {showExhibition && (
            <div className={`${theme}-ContactDetails-exibitionconContainer`}>
              <p className={`${theme}-ContactDetails-exibition`}>Exhibition</p>
              <div onClick={() => setShowExhibition(false)} className={` ${theme}-ContactDetails-crossIcon  `}></div>
            </div>
          )} */}
          {contact?.tags.map((item,index) => {
            return (
              <>
              {index < 2 ?
              <div onClick={() =>{removeTag(item)}} className={`${theme}-ContactDetails-exibitionconContainer px-2`} style={{backgroundColor:item.color}}>
                <p className={`${theme}-ContactDetails-exibition`} >{item.name}</p>
                <div className={` ${theme}-ContactDetails-crossIcon  `}></div>
              </div>
              :undefined}
              {index == 2 && <div onClick={() => setShowMoreTags(!showMoreTages)} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center cursor-pointer">
                <div id="tags" className="text-gray-700 -mt-2">...</div>
              </div>}
              </>
            )
          })}
          {showMoreTages && <div id="tags"  className="bg-[#F3F4F6] border-2 z-20 right-0 border-white rounded-[15px] absolute py-2 top-10 overflow-y-scroll hiddenScrollBar max-h-[110px] w-[123px]">
            {contact?.tags.map((item,index) => {
              return (
                <>
                  {index >= 2 ?
                    <>
                      <div className="w-full items-center justify-center flex">
                        <div className={`${theme}-ContactItem-exhibition `} style={{backgroundColor:item.color}}>{item.name}</div>
                      </div>
                      {index < contact.tags.length -1 && <div className="w-full my-1 border-white  border-t" />}
                    </>
                  :undefined}
                </>
              )
            })}
          </div>}          
          <Button theme="Carbon-Show"  onClick={ () => setShowAddTagModal(true)}>Add Tag</Button>
        </div>
        <div className={`${theme}-ContactDetails-container4`}>
          <div className={`${theme}-ContactDetails-container5`} onClick={() => {
                window.open(contact?.phone); 
              }}>
            <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
              <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-phoneIcon ${theme}-ContactDetails-ActiveVectors`}></div>
            </div>
            <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{contact?.phone}</p>
          </div>
          <div className={`${theme}-ContactDetails-container5`} onClick={() => {
                window.open(contact?.email); 
              }}>
            <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
              <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-emailIcon ${theme}-ContactDetails-ActiveVectors`}></div>
            </div>
            <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{contact?.email}</p>
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
        allTags={[]}
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
      <AddTag
        theme="Carbon"
        isOpen={showAddTagModal}
        onClose={() => {
          setShowAddTagModal(false);
        }}
        addTag={(tag) => {
          setTags([...tags,tag])
        }}
      ></AddTag>
    </div>
  );
};

export default ContactDetails;
