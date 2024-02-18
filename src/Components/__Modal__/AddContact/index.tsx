/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-modal";

import "./index.scss";
import { useState } from "react";

import LocationPicker from "react-leaflet-location-picker";
import { SearchBox, Select, TextArea, TextField } from "../..";
import { Button } from "symphony-ui";
import { generateSlugId } from "../../../help";
import { Tag } from "../../../Types";
import { useAuth } from "../../../hooks/useAuth";
import { GoogleMapBox } from "../../../Model";

interface ContactType {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  job: string;
  mapLocation: { lat: number | undefined; lng: number | undefined };
  tags: Tag[];
  note?: string;
}

interface AddContactProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: string;
  onAfterOpen?: () => void;
  onAddContact: (formData: ContactType) => void;
}

const AddContact: React.FC<AddContactProps> = ({ isOpen, onAfterOpen, onClose, theme, onAddContact }) => {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    mapLocation: { lat: 0, lng: 0 },
    job: "",
    tags: [],
    note: "",
  });

  const [pointVals, setPointVals] = useState([[auth.currentUser.information?.location.lat, auth.currentUser.information?.location.lng]]);
  const pointMode = {
    banner: false,
    control: {
      values: pointVals,
      onClick: (point: any) => setPointVals([...[point]]),
      onRemove: (point: any) => console.log("I've just been clicked for removal :(", point),
    },
  };
  let currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == "GoogleMapBox")[0] as GoogleMapBox;
  if (currentBox == undefined) {
    currentBox = new GoogleMapBox("", {
      lat: auth.currentUser.information?.location.lat as number,
      lan: auth.currentUser.information?.location.lng as number,
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAddContact = () => {
    const id = generateSlugId();

    const formDataWithId = { ...formData, id, mapLocation: { lat: pointVals[0][1], lng: pointVals[0][0] } }; // Add id to formData

    onAddContact(formDataWithId);
    console.log(formDataWithId);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      mapLocation: { lat: 0, lng: 0 },
      job: "",
      tags: [],
      note: "",
    });
    onClose();
  };

  const [country, setCountry] = useState<any>({
    codeName: "us",
    codePhone: "+1",
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onClose}
        style={{ content: { borderRadius: "24px", width: "100%", maxWidth: "450px", background: "rgba(255, 255, 255, 1)" }, overlay: { backgroundColor: "rgba(0,0,0,0.7)" } }}
        contentLabel="Example Modal"
      >
        <>
          <div className="h-[80vh] hiddenScrollBar overflow-y-scroll">
            <div className=""></div>
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div className="text-gray-700 text-left font-[600] text-[16px] leading-[24px]">Add Contact</div>
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
                <SearchBox onChange={() => {}} label="Your Location" inputHeight="44px" value="" theme="Carbon" placeholder="Search your location..." />
              </div>
              <div className="mt-4">
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
                    <div className={`cursor-pointer mt-[2px] flex justify-start items-center`}>
                      <div className="ml-1 text-gray-700 text-sm">dis</div>
                    </div>
                  }
                  label="Tag"
                  placeholder="Select tag..."
                  theme="Carbon"
                ></Select>
              </div>
              <div className="mt-4">
                <TextArea
                  inValid=""
                  placeholder="Enter your note..."
                  textAreaHeight="136px"
                  name="note"
                  onBlur={() => {}}
                  label="Note"
                  theme="Carbon"
                  onChange={handleInputChange}
                  value={formData.note}
                />
              </div>
              <div className="mt-4">
                <Button onClick={handleAddContact} theme="Carbon">
                  <div>Add Contact</div>
                </Button>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default AddContact;
