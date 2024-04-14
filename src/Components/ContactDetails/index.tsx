/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "symphony-ui";
import { useState } from "react";
import { Auth, Contacts } from "../../Api";
import { AddContact, DeleteContact } from "../__Modal__";
import { useConstructor } from "../../help";
import { Contact, Tag } from "../../Types";
import { BackIcon } from "..";
import AddTagContact from "../__Modal__/AddTagContact";
import { publish } from "../../utils/event";


const ContactDetails = ({ theme }: { theme: string }) => {
  const [showMore, setShowMore] = useState(false);
  const [contact, setContact] = useState<Contact>();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [showEditContactModal, setShowEditContactModal] = useState(false);
  const [showDeleteContactModal, setShowDeleteContactModal] = useState(false);
  const { contactId } = useParams();
  const navigate = useNavigate()

  useConstructor(() => {
    setIsLoading(true);
    if (contactId) {
      Auth.getContactDetails(contactId, (contactDetails) => {
        const newContact:Contact = {
          id:contactId,
          company:contactDetails.company,
          email:contactDetails.email,
          fullName:contactDetails.full_name,
          job:contactDetails.job_title,
          note:contactDetails.note,
          mapLocation:{
            lat:0,
            lng:0
          },
          phone:contactDetails.phone,
          tags:contactDetails?.tag_list.map((el:any) => {
            const newTag:Tag = {
              color:el.color,
              contacts:0,
              id:el.created_tag_id,
              name:el.title
            }
            return newTag
          }),
          photo:contactDetails.profile_pic? contactDetails.profile_pic :'https://ui-avatars.com/api/?name='+contactDetails.full_name,
          addDate:contactDetails.date_added
        }        
        setContact(newContact);
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
    Contacts.updateContact(contac as Contact)
    publish('contactChange',{})
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
            <div className={`${theme}-ContactDetails-importIcon cursor-not-allowed opacity-50`}></div>
            <div onClick={() => setShowEditContactModal(false)} className={`${theme}-ContactDetails-editIcon cursor-not-allowed opacity-50`}></div>
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
        <div className={`${theme}-ContactDetails-container4 min-w-64`}>
          {contact?.phone ?
            <div className={`${theme}-ContactDetails-container5`} onClick={() => {
                  window.open(contact?.phone); 
                }}>
              <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-phoneIcon ${theme}-ContactDetails-ActiveVectors`}></div>
              </div>
              <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{contact?.phone}</p>
            </div>
          :undefined}
          {contact?.email?
            <div className={`${theme}-ContactDetails-container5`} onClick={() => {
                  window.open(contact?.email); 
                }}>
              <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-emailIcon ${theme}-ContactDetails-ActiveVectors`}></div>
              </div>
              <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>{contact?.email}</p>
            </div>
          :undefined}

          {showMore && (
            <>
            {contact?.location ?
              <div className={`${theme}-ContactDetails-container5`}>
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-locationIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem`}>{contact?.location}</p>
              </div>
            :undefined}
            {contact?.company?
              <div className={`${theme}-ContactDetails-container5`}>
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-buildingIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem`}>{contact?.company}</p>
              </div>
            :undefined}
            {contact?.note?
              <div className={`${theme}-ContactDetails-container5`}>
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-meetingIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem`}>{contact?.note}</p>
              </div>
            :undefined}
            {contact?.addDate?
              <div className={`${theme}-ContactDetails-container5`}>
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-calendarIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem`}>{contact?.addDate}</p>
              </div>
            :undefined}
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
        onDelete={() => {
          Contacts.deleteContact(contactId as string).then(() => {
            publish('contactChange',{})
            navigate('/contacts')
          })
          setShowDeleteContactModal(false);
        }}
        contactId={contactId}
        isOpen={showDeleteContactModal}
        onClose={() => {
          setShowDeleteContactModal(false);
        }}
      />
      {/* <AddTag
        theme="Carbon"
        isOpen={showAddTagModal}
        onClose={() => {
          setShowAddTagModal(false);
        }}
        addTag={(tag) => {
          setTags([...tags,tag])
        }}
      ></AddTag> */}
      <AddTagContact 
      theme="Carbon"
      selected={contact?.tags as Array<Tag>}
      isOpen={showAddTagModal} 
      onClose={() => {setShowAddTagModal(false);}}
      onSubmit={(newTags:Array<Tag>) => {
        const newContact = contact  as Contact
        newContact.tags = newTags
        Contacts.updateContact(newContact)
        publish('contactChange',{})
      }}
      ></AddTagContact>
    </div>
  );
};

export default ContactDetails;
