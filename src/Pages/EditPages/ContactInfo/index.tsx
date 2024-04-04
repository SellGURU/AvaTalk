/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Button } from "symphony-ui";
import { BackIcon, TextField } from "../../../Components";
import LocationPicker from "react-leaflet-location-picker";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  job:Yup.string(),
  company:Yup.string(),
});

const EditContactInfo = () => {
  const auth = useAuth()
  const initialValue = {
    job:auth.currentUser.information?.job,
    company:auth.currentUser.information?.company,
    personlEmail:auth.currentUser.information?.personlEmail,
    workEmail:auth.currentUser.information?.workEmail,
    phone:auth.currentUser.information?.phone,
    workPhone:auth.currentUser.information?.workPhone
  };    
  const [location] = useState({
    lat: auth.currentUser.information?.location.lat,
    lng: auth.currentUser.information?.location.lng,
  });
  const formik = useFormik({
      initialValues: initialValue,
      validationSchema,
      onSubmit: (values) => {
      console.log(values);
      },
  });     
  const navigate = useNavigate();
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
  const submit = () => {
    auth.currentUser.updateInformation({
      job:formik.values.job as string,
      banelImage:auth.currentUser.information?.banelImage as string,
      company:formik.values.company as string ,
      firstName:auth.currentUser.information?.firstName as string,
      imageurl:auth.currentUser.information?.imageurl as string,
      lastName:auth.currentUser.information?.lastName as string,
      location:{
        lat:pointVals[0][0] as number,
        lng:pointVals[0][1] as number
      },
      phone:auth.currentUser.information?.phone as string,
      personlEmail:formik.values.personlEmail as string,
      workEmail:formik.values.workEmail as string,
      workPhone:formik.values.workPhone as string,
      userId:auth.currentUser.information?.userId 
    })
    navigate('/')
  }
  return (
    <>
      <div className=" absolute  hiddenScrollBar  h-dvh pb-[100px] hiddenScrollBar overflow-y-scroll w-full hiddenScrollBar  top-[30px] bg-white z-[12]">
        <BackIcon title="Contact Info" theme="Carbon"></BackIcon>
        <div className="mt-24 px-6">
          <TextField {...formik.getFieldProps("job")} theme="Carbon" label="Job Title" inValid={false} name="job"  type="text"  placeholder="Enter your job title..."></TextField>
        </div>
        <div className="mt-3 px-6">
          <TextField  {...formik.getFieldProps("company")} theme="Carbon" label="Company" inValid={false} name="company" type="text" placeholder="Enter your company name..."></TextField>
        </div>

        <div className="mt-3 px-6">
          <p className="Carbon-TextField-label mb-1">Your Location</p>
          <LocationPicker showInputs={false} geoURL="yazd" mapStyle={{ height: "211px", borderRadius: "27px" }} pointMode={pointMode} />
        </div>
        <div className="mt-3 px-6">
          <TextField
            {...formik.getFieldProps("personlEmail")}
            theme="Carbon"
            label="Personl Email"
            inValid={false}
            name="personlEmail"
            type="text"
            placeholder="Enter your personal Email..."
          ></TextField>
        </div>
        <div className="mt-3 px-6">
          <TextField {...formik.getFieldProps("workEmail")} theme="Carbon" label="Work Email" inValid={false} name="workEmail"  type="text"  placeholder="Enter your work Email..."></TextField>
        </div>
        {/* <div className="mt-3 px-6">
          <TextField
            {...formik.getFieldProps("phone")}
            label="Phone"
            placeholder="Enter your phone number..."
            theme="Carbon"
            name="phone"
            type="phone"
            setValue={(value) => {
              formik.setFieldValue('phone',value)
            }}            
            phoneCountry={country}
            setPhoneCountry={setCountry}
            errorMessage=""
            inValid=""
          ></TextField>
        </div> */}
        <div className="mt-3 px-6">
          <TextField
            {...formik.getFieldProps("workPhone")}
            label="Work Phone"
            placeholder="Enter your work phone number..."
            setValue={(value) => {
              formik.setFieldValue('workPhone',value)
            }}               
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
          <Button onClick={submit} theme="Carbon">Save Change</Button>
        </div>
      </div>
    </>
  );
};

export default EditContactInfo;
