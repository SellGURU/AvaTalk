/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, Button } from "symphony-ui";
import { BackIcon, SearchBox } from "../../../Components";
import LocationPicker from "react-leaflet-location-picker";
import { useState } from "react";

const EditContactInfo = () => {
  const [location] = useState({
    lat: 51.5072,
    lng: 0.1276,
  });
  const [pointVals, setPointVals] = useState([[location.lat, location.lng]]);
  const [phone, setPhone] = useState("");
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
      <div className=" absolute  hiddenScrollBar  h-[-webkit-fill-available] px-6 pb-[100px] hiddenScrollBar overflow-y-scroll w-full hiddenScrollBar  top-[30px] bg-white z-[12]">
        <BackIcon title="Contact Info" theme="Carbon"></BackIcon>
        <div className="mt-24 px-6">
          <TextField theme="Carbon" label="Job Title" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="Enter your job title..."></TextField>
        </div>
        <div className="mt-3 px-6">
          <TextField theme="Carbon" label="Company" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="Enter your company name..."></TextField>
        </div>
        <div className="mt-3 px-6">
          <SearchBox onChange={() => {}} label="Location" inputHeight="44px" value="" theme="Carbon" placeholder="Enter your location..." />
        </div>
        <div className="mt-3 px-6">
          <LocationPicker showInputs={false} geoURL="yazd" mapStyle={{ height: "211px", borderRadius: "27px" }} pointMode={pointMode} />
        </div>
        <div className="mt-3 px-6">
          <TextField
            theme="Carbon"
            label="Personl Email"
            inValid={false}
            name="title"
            onBlur={() => {}}
            onChange={() => {}}
            type="text"
            value=""
            placeholder="Enter your personal Email..."
          ></TextField>
        </div>
        <div className="mt-3 px-6">
          <TextField theme="Carbon" label="Work Email" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="Enter your work Email..."></TextField>
        </div>
        <div className="mt-3 px-6">
          <TextField
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
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
        <div className="mt-3 px-6">
          <TextField
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            onBlur={() => {}}
            label="Work Phone"
            placeholder="Enter your work phone number..."
            theme="Carbon"
            name="workPhone"
            type="phone"
            phoneCountry={country}
            setPhoneCountry={setCountry}
            errorMessage=""
            inValid=""
          ></TextField>
        </div>
        <div className="px-6 mt-10">
          <Button theme="Carbon">Save Change</Button>
        </div>
      </div>
    </>
  );
};

export default EditContactInfo;
