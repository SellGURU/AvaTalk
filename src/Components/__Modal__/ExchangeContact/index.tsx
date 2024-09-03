/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-modal";
import "./index.scss";
import { useState, useEffect } from "react";
import { Contact } from "../../../Types";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "symphony-ui";
import {  TextArea, TextField } from "../..";
import ConfettiExplosion from 'react-confetti-explosion';
import { generateSlugId } from "../../../help";

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
    address :'',
  });

  useEffect(() => {
    if (mode === "edit" && contactData) {
      setFormData(contactData);
      setPointVals([[contactData.mapLocation.lat, contactData.mapLocation.lng]]);
    }
  }, [mode, contactData]);
  const [step,setStep] = useState(0)
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
    setStep(1)
    // onClose();
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
      {step == 0 
      ?
        <div>
          <div className='flex w-full justify-between items-start'>
              <Button onClick={onClose} theme="Carbon-back">
                  <div className={`${theme}-back-Button-vector`}></div>
              </Button>
              <div>
                  <div className='text-text-primary text-[14px] font-semibold contactNameShadow'>{title}</div>
                  <div className='text-text-primary text-center text-xs '>{auth.currentUser.information?.firstName+'  '+auth.currentUser.information?.lastName}</div>
              </div>
              <div className="invisible">
                <Button onClick={onClose} theme="Carbon-back">
                    <div className={`${theme}-back-Button-vector`}></div>
                </Button>
              </div>
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
              required
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
              required
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
            <div className="text-[12px] text-[#6B7280] text-center mt-2 mb-5">We don’t sell your contact details</div>
          </div>
        </div>      
      :
        <div>
          <div className='flex w-full justify-between items-center'>
              <div className="invisible">
                <Button onClick={() => {
                  setStep(0)
                  onClose()
                  }} theme="Carbon-back">
                    <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
              </div>
              <div>
                  <div className='text-text-primary text-[14px] font-semibold contactNameShadow'>Contact Exchanged!</div>
              </div>
              <div className="z-30">
                <Button onClick={onClose} theme="Carbon-back">
                    <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
              </div>

          </div>
          <div className="text-[14px] mt-6 text-center text-text-primary">
            Keep the momentum going—create your Avatalk in minutes with our free trial."
          </div>
          <div className="w-full flex justify-center mt-5">
            <div className="w-[240px] h-[368px] bg-primary-color rounded-[30px]">
              <div className="w-full flex justify-center mt-4">
                <img className="ml-[-30px]" src="./icons/CardProf.png" alt="" />
              </div>
              <div>
                <div className="text-white text-[18px] font-semibold  text-center">{formData.fullName}</div>
                <div className="text-white text-[10px] font-medium  text-center">Job Title/ Company</div>
              </div>
              <div className="w-full flex justify-center mt-4">
                <img src="./icons/qrcode.png" alt="" />
              </div>
            </div>
            <ConfettiExplosion zIndex={40} />
          </div>
          <div className='absolute w-full flex justify-center pt-28 top-0 left-0'>
              <img className='' src="./icons/illo.png" alt="" />
          </div>          
          <div className="mt-10 mb-4">
            <Button disabled={formData.fullName == '' || formData.email == ''} onClick={() => {
              onClose()
              setStep(0)
              }} theme="Carbon">
              <div >Create Your Avatalk for Free</div>
            </Button>
            {/* <div className="text-[12px] text-[#6B7280] text-center mt-2 mb-5">We don’t sell your contact details</div> */}
          </div>
        </div>         
      }

    </Modal>
  );
};

export default ExchangeContact;
