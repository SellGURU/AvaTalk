/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "symphony-ui";
import { useEffect, useRef, useState } from "react";
import { Auth, Contacts } from "../../Api";
import { DeleteContact } from "../__Modal__";
import EditContact from "../__Modal__/AddContact/editContact";
import { getTextColorFromBackground, useConstructor } from "../../help";
import { Contact, Tag } from "../../Types";
import { BackIcon } from "..";
// import AddTagContact from "../__Modal__/AddTagContact";
// import { publish } from "../../utils/event";
// import AddTagContact from "../__Modal__/AddTagContact";
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'
import { TagPicker } from 'rsuite';
import useModalAutoClose from "../../hooks/useModalAutoClose";
import { TimeManegar } from "../../Model";

const ContactDetails = ({ theme }: { theme: string }) => {
  // const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  //   item => ({ label: item, value: item })
  // );

  const [showMore, setShowMore] = useState(false);
  const [contact, setContact] = useState<Contact>();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [showEditContactModal, setShowEditContactModal] = useState(false);
  const [showDeleteContactModal, setShowDeleteContactModal] = useState(false);
  const { contactId } = useParams();
  const [tags, setTags] = useState<Tag[]>([]);
  const navigate = useNavigate()
  useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.key === 'Tab') {
        event.preventDefault(); // Prevent the Tab key behavior globally
      }
    };

    // Add the event listener globally when the app mounts
    window.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);  
  useConstructor(() => {
    setIsLoading(true);
    if (contactId) {
      Auth.getContactDetails(contactId, (contactDetails) => {
        const newContact:Contact = {
          id:contactId,
          address :contactDetails.address,
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
    Contacts.showTags((resolveTags) => {
      setTags(resolveTags.map((el) => {
        const newTag:Tag = {
          name:el.title,
          color:el.color,
          contacts:el.count,
          id:el.created_tag_id
        }
        return newTag
      }))
    })    
  });

  const handleEditContact = (updatedContactData: Contact) => {
    setContact(updatedContactData);
    // console.log(updatedContactData);
    console.log(updatedContactData.tags)
    if (contactId) {
      Auth.editContact(
        contactId,
        {
          full_name:updatedContactData.fullName,
          email: updatedContactData.email,
          phone: updatedContactData.phone,
          address: updatedContactData.address,
          company: updatedContactData.company,
          job_title: updatedContactData.job,
          note: updatedContactData.note,
          tags: updatedContactData.tags,
          profile_pic:updatedContactData.photo,
          state:true,
          created_contact_id:contactId
        },
        (res) => {
          console.log(res);
        }
      );
      // const contact2 = contact
      // if(contact2){
      //   contact2.tags = updatedContactData.tags
      // }
      // setContact(contact2)
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
    // publish('contactChange',{})
    // setShowEditContactModal(false)
  }
  const handleShowLess = () => {
    setShowMore(false);
  };
  const [showMoreTages,setShowMoreTags] = useState(false)
  const showMoreRefrence = useRef(null)
  useModalAutoClose({
    refrence:showMoreRefrence,
    close:() => {
      setShowAddTagModal(false)
    }
  })
  if (isLoading) return <p></p>;
  return (
    <div>
      <div className={`${theme}-ContactDetails-infoContainer`}>
        <BackIcon theme={theme} title="Contact Info" ></BackIcon>
      </div>
      <div className={`${theme}-ContactDetails-container2`}>
        <div className={`${theme}-ContactDetails-container3`}>      
          <div className={`${theme}-Profile-ProfilePictureSection`}>
            <img src={`https://ui-avatars.com/api/?name=`+contact?.fullName} alt={contact?.fullName} className={`${theme}-Profile-ProfilePicture `} />
          </div>
          <div className={`${theme}-ContactDetails-importIconContainer`}>
            <div onClick={() => {
                      const vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:" + contact?.fullName + "\nTEL;TYPE=work,voice:" + contact?.phone+ "\nEMAIL:" + contact?.email+ "\nEND:VCARD";
                      const blob = new Blob([vcard], { type: "text/vcard" });
                      const url = URL.createObjectURL(blob);

                      const newLink = document.createElement('a');
                      newLink.download = contact?.fullName + ".vcf";
                      newLink.textContent = contact?.fullName+"";
                      newLink.href = url;
                      newLink.click();              
                      // onClose()                  
            }} className={`${theme}-ContactDetails-importIcon `}></div>
            <div onClick={() => setShowEditContactModal(true)} className={`${theme}-ContactDetails-editIcon`}></div>
            <div onClick={() => setShowDeleteContactModal(true)} className={`${theme}-ContactDetails-recycleIcon`}></div>
          </div>
        </div>
        <p className={`${theme}-ContactDetails-nameItem mt-2`}>{contact?.fullName}</p>
        <p className={`${theme}-ContactDetails-jobItem`}>{contact?.job}</p>
        <div className={`${theme}-ContactDetails-showExibitionconContainer `}>
          {/* {showExhibition && (
            <div className={`${theme}-ContactDetails-exibitionconContainer`}>
              <p className={`${theme}-ContactDetails-exibition`}>Exhibition</p>
              <div onClick={() => setShowExhibition(false)} className={` ${theme}-ContactDetails-crossIcon  `}></div>
            </div>
          )} */}
          {!showAddTagModal && 
            <>
              {contact?.tags.map((item,index) => {
                return (
                  <>
                  {index < 2 ?
                  <div  className={`${theme}-ContactDetails-exibitionconContainer px-2`} style={{backgroundColor:item.color}}>
                    <p className={`${theme}-ContactDetails-exibition`} style={{color:getTextColorFromBackground(item.color)}} >{item.name}</p>
                    <div onClick={() =>{removeTag(item)}} className={` ${theme}-ContactDetails-crossIcon  `} style={{width:'24px'}}></div>
                  </div>
                  :undefined}
                  {index == 2 && <div onClick={() => setShowMoreTags(!showMoreTages)} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center cursor-pointer">
                    <div id="tags" className="text-gray-700 -mt-2">...</div>
                  </div>}
                  </>
                )
              })}
              {showMoreTages && <div id="tags" ref={showMoreRefrence}  className="bg-[#F3F4F6] border-2 z-20 right-0 border-white rounded-[15px] absolute py-2 top-10 overflow-y-scroll hiddenScrollBar max-h-[110px] w-[123px]">
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
            </>
          }
          {!showAddTagModal &&
            <div onClick={ () => setShowAddTagModal(true)} className="text-[#06B6D4] hidden text-[14px] font-medium cursor-pointer">Add Tag</div>     
          }    
          {
            showAddTagModal &&  
            <>
              <div className="w-full flex  invisible justify-center items-center">
                <TagPicker 
                defaultValue={contact?.tags.map(el => el.name)}
                onChange={(e:Array<any>) => {
                  const selected = tags.filter((el) => {
                    return e.includes(el.name)
                  })
                  const newContact = contact  as Contact
                  newContact.tags = selected
                  Contacts.updateContact(newContact)
                  // publish('contactChange',{})                  
                }} data={tags.map((e) => {
                  return {
                    label:e.name,
                    value:e.name,

                  }
                })} style={{ width: 300 }} />
              </div>
              <div className="w-[80px]">
                <Button onClick={() => {
                    setShowAddTagModal(false)
                  }} theme="Carbon-back">
                  <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
              </div>
            </>
          }
          {/* <Button theme="Carbon-Show"  onClick={ () => setShowAddTagModal(true)}>Add Tag</Button> */}
        </div>
        <div className={`${theme}-ContactDetails-container4 min-w-64`}>
        {contact?.phone ? (
    <a
      href={`tel:${contact.phone}`}
      className={`${theme}-ContactDetails-container5`}
    >
      <div
        className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}
      >
        <div
          className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-phoneIcon ${theme}-ContactDetails-ActiveVectors`}
        ></div>
      </div>
      <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>
        {contact.phone}
      </p>
    </a>
  ) : undefined}
         {contact?.email ? (
    <a
      href={`mailto:${contact.email}`}
      className={`${theme}-ContactDetails-container5`}
    >
      <div
        className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}
      >
        <div
          className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-emailIcon ${theme}-ContactDetails-ActiveVectors`}
        ></div>
      </div>
      <p className={`${theme}-ContactDetails-textItem cursor-pointer`}>
        {contact.email}
      </p>
    </a>
  ) : undefined}
            {contact?.address ?
              <div className={`${theme}-ContactDetails-container5`}>
                <div className={`${theme}-ContactDetails-VectorSection ${theme}-ContactDetails-ActiveVectorSection`}>
                  <div className={`${theme}-ContactDetails-Vectors ${theme}-ContactDetails-locationIcon ${theme}-ContactDetails-ActiveVectors`}></div>
                </div>
                <p className={`${theme}-ContactDetails-textItem max-w-[350px] `} style={{
                    wordWrap: "break-word", // Ensures long words break to the next line
                    overflowWrap: "break-word", // Handles long unbroken strings
                }}>{contact?.address}</p>
              </div>
            :undefined}
          {showMore && (
            <>

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
                <p className={`${theme}-ContactDetails-textItem`}> Added on {TimeManegar.formatDate(contact?.addDate)}</p>
              </div>
            :undefined}
            </>
          )}

          <Button onClick={showMore ? handleShowLess : handleShowMore} theme="Carbon-Show">
            {showMore ? "Show less" : "Show more"}
          </Button>
        </div>
      </div>
      {/* <AddContact
        allTags={tags}
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
      ></AddContact> */}
      {showEditContactModal && 
      <>
      <div className="fixed w-full z-[1201] left-0 bottom-0 flex justify-center">
        <EditContact
          contact={contact}
          title="Edit Contact"  
          onAddContact={handleEditContact}
          onClose={() => {
            setShowEditContactModal(false)
          }}
        ></EditContact>
      </div>
       <div className="fixed w-full z-[1200] h-full bg-black opacity-60 top-0 left-0"></div>
      </>
      }
      <DeleteContact
        theme="Carbon"
        onDelete={() => {
          Contacts.deleteContact(contactId as string).then(() => {
            // publish('contactChange',{})
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
      {/* {showAddTagModal &&
        <div>
          <TagPicker data={data} style={{ width: 300 }} />

        </div>
      } */}
      {/* <AddTagContact 
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
      ></AddTagContact> */}
    </div>
  );
};

export default ContactDetails;
