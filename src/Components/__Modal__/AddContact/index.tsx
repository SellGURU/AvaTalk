/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-modal";
import "./index.scss";
import { useState, useEffect } from "react";
import { Contact, Tag } from "../../../Types";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "symphony-ui";
import { Select, TextArea, TextField } from "../..";
import LocationPicker from "react-leaflet-location-picker";
import { Contacts } from "../../../Api";

interface AddContactProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  title: string;
  theme?: string;
  contactData?: Contact;
  onAddContact: (formData: Contact) => void;
  onEditContact: (formData: Contact) => void;
  contactId?: string | undefined;
  allTags:Array<Tag>
}

const AddContact: React.FC<AddContactProps> = ({ isOpen, allTags,theme, onClose, mode, title, contactData, onAddContact, onEditContact }) => {
  const auth = useAuth();
  const [selectedTags,setSelectedTags] = useState<Array<Tag>>([])
  const [formData, setFormData] = useState<Contact>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    mapLocation: { lat: 0, lng: 0 },
    job: "",
    note: "",
    tags: [],
    id: "",
  });

  useEffect(() => {
    if (mode === "edit" && contactData) {
      setFormData(contactData);
      setPointVals([[contactData.mapLocation.lat, contactData.mapLocation.lng]]);
    }
  }, [mode, contactData]);
  console.log("formData", formData);
  const [pointVals, setPointVals] = useState([[auth.currentUser.information?.location.lat, auth.currentUser.information?.location.lng]]);
  const pointMode = {
    banner: false,
    control: {
      values: pointVals,
      onClick: (point: any) => setPointVals([...[point]]),
      onRemove: (point: any) => console.log("I've just been clicked for removal :(", point),
    },
  };
  // console.log("pointVals", pointVals);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAction = () => {
    if (mode === "add") {
      Contacts.addContact({
        full_name:formData.fullName as string,
        email: formData.email as string,
        phone: formData.phone as string,
        company: formData.company as string,
        job_title: formData.job as string,
        note: formData.note as string,
        tag:selectedTags.map(el => el.id)
      }).then((res:any) => {
        const id = res.data;
        const formDataWithId = { ...formData,
           id,
            mapLocation: { lat: pointVals[0][1], lng: pointVals[0][0] },
            tags:selectedTags
           };
        onAddContact(formDataWithId);
        setFormData({} as Contact)
        setSelectedTags([])
        onClose();        
      })
      // console.log(formDataWithId);
      // console.log(formData);
    } else if (mode === "edit") {
      const formDatawithMaplocation = { ...formData, mapLocation: { lat: pointVals[0][1], lng: pointVals[0][0] } };
      onEditContact(formDatawithMaplocation);
      setFormData({} as Contact)
      setSelectedTags([])
      onClose();      
      // console.log(formDatawithMaplocation);
    }

  };

  const [country, setCountry] = useState<any>({
    codeName: "us",
    codePhone: "+1",
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{ content: { borderRadius: "24px", width: "100%", maxWidth: "450px", background: "rgba(255, 255, 255, 1)" }, overlay: { backgroundColor: "rgba(0,0,0,0.7)" } }}
      contentLabel="Example Modal"
    >
      <div className={`${theme}-AddContact-container`}>
        <div className={`${theme}-AddContact-buttonContainer`}>
          <div className={`${theme}-AddContact-title`}>{title}</div>
          <Button onClick={onClose} theme="Carbon-back">
            <div className={`${theme}-Profile-closeIcon`}></div>
          </Button>
        </div>
        <div className="mb-4 mt-14">
          <TextField
            value={formData.fullName}
            onChange={handleInputChange}
            onBlur={() => {}}
            label="Full Name"
            placeholder="Enter your first and last name..."
            theme="Carbon"
            name="fullName"
            type="text"
            errorMessage=""
            inValid={false}
            required
          />
        </div>

        <div className="mb-4">
          <TextField
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => {}}
            label="Email Address"
            placeholder="Enter your email address..."
            theme="Carbon"
            name="email"
            type="text"
            errorMessage=""
            inValid={false}
            required
          />
        </div>

        <div className="mb-4">
          <TextField
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={() => {}}
            label="Phone"
            placeholder="Enter your phone number..."
            theme="Carbon"
            name="phone"
            type="phone"
            phoneCountry={country}
            setPhoneCountry={setCountry}
            errorMessage=""
            inValid=""
            required
          ></TextField>
        </div>
        <div className="mt-4">
          <p className="Carbon-TextField-label mb-1">Your Location</p>
          <LocationPicker showInputs={false} geoURL="yazd" mapStyle={{ height: "211px", borderRadius: "27px" }} pointMode={pointMode} />
        </div>
        <div className="mt-4">
          <TextField
            value={formData.company}
            onChange={handleInputChange}
            onBlur={() => {}}
            label="Company"
            placeholder="Enter your company name..."
            theme="Carbon"
            name="company"
            type="text"
            errorMessage=""
            inValid=""
          ></TextField>
        </div>
        <div className="mt-4">
          <TextField
            value={formData.job}
            onChange={handleInputChange}
            onBlur={() => {}}
            label="Job Title"
            placeholder="Enter your job title..."
            theme="Carbon"
            name="job"
            type="text"
            errorMessage=""
            inValid=""
          ></TextField>
        </div>

        <div className="mt-4">
          <Select
            valueElement={
              <div className={`${theme}-AddContact-selectItems gap-2`}>
                {selectedTags.length == 0 && <div className={`text-[13px] text-gray-700 font-thin opacity-80`}>Select tag ...</div>}
                {selectedTags.map((item,index) => {
                  return (
                    <>
                    {index < 2 &&
                      <div onClick={() => {
                        setSelectedTags([...selectedTags.filter((el) =>el.id != item.id)])
                      }} className={`${theme}-ContactDetails-exibitionconContainer gap-2 flex max-w-[120px] justify-between px-2 mt-[-6px]`} style={{backgroundColor:item.color}}>
                        <p className={`${theme}-ContactDetails-exibition`} >{item.name}</p>
                        <div className={` ${theme}-ContactDetails-crossIcon  `}></div>
                      </div>
                    }
                    {index == 2 &&  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 mt-[-6px] border-white flex items-center justify-center ">
                            <div id="tags" className="text-gray-700 -mt-2">...</div>
                          </div>}
                    </>
                  )
                })}
              </div>
            }
            label="Tag"
            placeholder="Select tag..."
            theme="Carbon"
          >
            <div className="flex hiddenScrollBar justify-start overflow-x-scroll max-h-[120px] items-baseline flex-wrap py-4 gap-2 px-2">
              {allTags.filter((el) =>!selectedTags.includes(el)).map((item) => {
                return (
                  <>
                    <div onClick={() => {
                      setSelectedTags([...selectedTags,item])
                    }} className={`${theme}-ContactDetails-exibitionconContainer cursor-pointer min-w-20`} style={{backgroundColor:item.color}}>
                        <p className={`${theme}-ContactDetails-exibition`} >{item.name}</p>
                    </div>
                  </>
                )
              })}
              {allTags.length == 0 ?
              <option className={`text-sm text-gray-700`}>No tag yet...</option>
              :undefined}
            </div>
          </Select>
        </div>
        <div className="mt-4">
          <TextArea inValid="" placeholder="Enter your note..." textAreaHeight="136px" name="note" value={formData.note} onBlur={() => {}} label="Note" theme="Carbon" onChange={handleInputChange} />
        </div>
        <div className="mt-10 mb-6">
          <Button onClick={handleAction} theme="Carbon">
            <div>{mode === "add" ? "Add Contact" : "Save Changes"}</div>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddContact;
