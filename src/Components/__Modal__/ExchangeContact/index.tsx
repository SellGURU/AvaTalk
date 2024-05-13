/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-modal";
import "./index.scss";
import { useState, useEffect } from "react";
import { generateSlugId } from "../../../help";
import { Contact } from "../../../Types";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "symphony-ui";
import {  TextArea, TextField } from "../..";

interface ExchangeContactProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  title: string;
  theme?: string;
  contactData?: Contact;
  onAddContact: (formData: Contact) => void;
  onEditContact: (formData: Contact) => void;
  contactId?: string | undefined;
}

const ExchangeContact: React.FC<ExchangeContactProps> = ({ isOpen, theme, onClose, mode, title, contactData, onAddContact, onEditContact }) => {
  const auth = useAuth();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAction = () => {
    if (mode === "add") {
      const id = generateSlugId();
      const formDataWithId = { ...formData, id, mapLocation: { lat: pointVals[0][1], lng: pointVals[0][0] } };
      onAddContact(formDataWithId);
    } else if (mode === "edit") {
      const formDatawithMaplocation = { ...formData, mapLocation: { lat: pointVals[0][1], lng: pointVals[0][0] } };
      onEditContact(formDatawithMaplocation);
    }
    onClose();
  };

  const [country, setCountry] = useState<any>({
    codeName: "us",
    codePhone: "+1",
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{ content: { borderRadius: "24px", width: "100%", maxWidth: "450px", background:'rgba(243, 244, 246, 1)'},overlay:{backgroundColor:'rgba(0,0,0,0.7)'} }}
      
      contentLabel="Example Modal"
    >
      <div>
        <div className='flex w-full justify-between items-start'>
            <div>
                <div className='text-gray-700 text-base font-semibold contactNameShadow'>{title}</div>
                <div className='text-gray-400 text-xs font-medium'>{auth.currentUser.information?.firstName+'  '+auth.currentUser.information?.lastName}</div>
            </div>
            <Button onClick={onClose} theme="Carbon-back">
                <div className={`${theme}-Profile-closeIcon`}></div>
            </Button>
        </div>

        <div className="my-4">
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
          ></TextField>
        </div>

        <div className="mt-4">
          <TextArea inValid="" placeholder="Enter your note..." textAreaHeight="136px" name="note" value={formData.note} onBlur={() => {}} label="Note" theme="Carbon" onChange={handleInputChange} />
        </div>
        <div className="mt-10">
          <Button disabled={formData.fullName == '' || formData.email == ''} onClick={handleAction} theme="Carbon">
            <div >Exchange Contact</div>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExchangeContact;
