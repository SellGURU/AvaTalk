/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "symphony-ui";
import { BackIcon, SearchBox } from "../../../Components";
import LocationPicker from "react-leaflet-location-picker";
import { useState } from "react";

const EditGoogleMap = () => {
  const [pointVals, setPointVals] = useState([[33, 33]]);
  const pointMode = {
    banner: false,
    control: {
      values: pointVals,
      onClick: (point: any) => setPointVals([...[point]]),
      onRemove: (point: any) => console.log("I've just been clicked for removal :(", point),
    },
  };
  return (
    <>
      <div className="w-full absolute h-screen top-[20px] bg-white z-[12]">
        <BackIcon title="Google Map" theme="Carbon"></BackIcon>
        <div className="mt-24 px-6">
          <TextField theme="Carbon" label="Title" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="Enter title..."></TextField>
        </div>
        <div className="px-6 mt-3">
          <SearchBox onChange={() => {}} label="Your Location" inputHeight="44px" value="" theme="Carbon" placeholder="Search your location..." />
        </div>
        <div className="px-6 mt-3">
          <LocationPicker showInputs={false} geoURL="yazd" mapStyle={{ height: "211px", borderRadius: "27px" }} pointMode={pointMode} />
        </div>
        <div className="px-6 mt-10">
          <Button theme="Carbon">Save Change</Button>
        </div>
      </div>
    </>
  );
};
export default EditGoogleMap;
