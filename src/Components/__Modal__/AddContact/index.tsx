/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "react-modal";

import "./index.scss";
import { useState } from "react";

import LocationPicker from "react-leaflet-location-picker";
import { SearchBox, Select, TextArea, TextField } from "../..";
import { Button } from "symphony-ui";

interface AddContactProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: string;
  onAfterOpen?: () => void;
}

const AddContact: React.FC<AddContactProps> = ({ isOpen, onAfterOpen, onClose, theme }) => {
  const [location, setLocation] = useState({
    lat: 51.5072,
    lng: 0.1276,
  });
  const [pointVals, setPointVals] = useState([[location.lat, location.lng]]);
  const pointMode = {
    banner: false,
    control: {
      values: pointVals,
      onClick: (point: any) => setPointVals([...[point]]),
      onRemove: (point: any) => console.log("I've just been clicked for removal :(", point),
    },
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
            <div className="">
              {/* <div className="w-full flex justify-center items-center mt-2 mb-6">
                <div className="text-sm text-gray-700 max-w-[228px] opacity-80 text-center">Tell us more about yourself</div>
              </div> */}
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div className="text-gray-700 text-left font-[600] text-[16px] leading-[24px]">Add Contact</div>
                <Button onClick={onClose} theme="Carbon-back">
                  <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
              </div>
              <div className="my-4">
                <TextField
                  value=""
                  onChange={() => {}}
                  onBlur={() => {}}
                  label="Full Name"
                  placeholder="Enter your first and last name..."
                  theme="Carbon"
                  name="FullName"
                  type="text"
                  errorMessage=""
                  inValid={false}
                />
              </div>

              <div className="mb-4">
                <TextField
                  value=""
                  onChange={() => {}}
                  onBlur={() => {}}
                  label="Email Address"
                  placeholder="Enter your email address..."
                  theme="Carbon"
                  name="EmailAddress"
                  type="text"
                  errorMessage=""
                  inValid={false}
                />
              </div>

              <div className="mb-4">
                <TextField
                  value=""
                  onChange={() => {}}
                  onBlur={() => {}}
                  label="Phone"
                  placeholder="Enter your phone number..."
                  theme="Carbon"
                  name="Phone"
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
                  value=""
                  onChange={() => {}}
                  onBlur={() => {}}
                  label="Company"
                  placeholder="Enter your company name..."
                  theme="Carbon"
                  name="Phone"
                  type="text"
                  errorMessage=""
                  inValid=""
                ></TextField>
              </div>
              <div className="mt-4">
                <TextField
                  value=""
                  onChange={() => {}}
                  onBlur={() => {}}
                  label="Job Title"
                  placeholder="Enter your job title..."
                  theme="Carbon"
                  name="Phone"
                  type="text"
                  errorMessage=""
                  inValid=""
                ></TextField>
              </div>

              <div className="mt-4">
                <Select valueElement="" label="Tag" placeholder="Select tag..." theme="Carbon" />
              </div>
              <div className="mt-4">
                <TextArea inValid="" placeholder="Enter your note..." textAreaHeight="136px" name="" onBlur={() => {}} label="Note" theme="Carbon" onChange={() => {}} value="" />
              </div>
              <div className="mt-4">
                <Button onClick={onClose} theme="Carbon">
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
