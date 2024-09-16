/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Button } from "symphony-ui";
import { BackIcon, FileUploadr, TextArea, TextField } from "../../../Components";
// import LocationPicker from "react-leaflet-location-picker";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../../Api";
import { useConstructor } from "../../../help";

const validationSchema = Yup.object().shape({
  job:Yup.string().max(15),
  company:Yup.string().max(15),
});

const EditContactInfo = () => {
  const auth = useAuth()
  console.log(auth.currentUser.information)
  const initialValue = {
    job:auth.currentUser.information?.job,
    company:auth.currentUser.information?.company,
    personlEmail:auth.currentUser.information?.personlEmail,
    address :auth.currentUser.information?.address,
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
  const [icons,setIcons] = useState<Array<any>>([])
  const submit = () => {
    auth.currentUser.updateCustomInformation({
      job:formik.values.job as string,
      company:formik.values.company as string ,
      personlEmail:formik.values.personlEmail as string,
      workEmail:formik.values.workEmail as string,
      workPhone:formik.values.workPhone as string,
      referral_code:auth.currentUser.information?.referral_code,
      address:formik.values.address,
      logo:icons[0].url
    })
    Auth.updateContactInfo({
      company_name:formik.values.company as string,
      job_title:formik.values.job as string,
      location:{
        lat:pointMode.control.values[0][0],
        lng:pointMode.control.values[0][1]
      },
      logo:icons[0].url,
      work_email:formik.values.workEmail as string,
      address:formik.values.address,
      work_phone:formik.values.workPhone as string
    })
    navigate('/')
  }
  useConstructor(() => {
    Auth.getContactInfo().then(res => {
      formik.setFieldValue("job",res.data.job_title)
      formik.setFieldValue("company",res.data.company_name)
      formik.setFieldValue("address",res.data.address)
      setIcons([...icons,{name:"file",type:"image/png",url:res.data.logo}])
      // setPointVals([[res.data.location.lat,res.data.location.lng]])
    })
  })
  return (
    <>
      <div className=" absolute  hiddenScrollBar  h-dvh pb-[100px] hiddenScrollBar overflow-y-scroll w-full hiddenScrollBar  top-[30px] bg-white z-[12]">
        <div className="relative top-[3px]">
          <BackIcon title="Contact Info" theme="Carbon"></BackIcon>
        </div>
        <div className="mt-24 px-6">
          <TextField {...formik.getFieldProps("job")} theme="Carbon" label="Job Title" inValid={false} name="job"  type="text"  placeholder="Enter your job title..."></TextField>
        </div>
        <div className="mt-3 px-6">
          <TextField  {...formik.getFieldProps("company")} theme="Carbon" label="Company" inValid={false} name="company" type="text" placeholder="Enter your company name..."></TextField>
        </div>

        <div className="mt-3 px-6">
          <FileUploadr label="Logo" mod="profile" value={icons} uploades={(files) => {
            setIcons(files)
            console.log(files)
          }} accept=".png"></FileUploadr>
        </div>
        <div className="mt-3 px-6">
          {/* <p className="Carbon-TextField-label mb-1">Your Location</p> */}
          <TextArea inValid={false} textAreaHeight={'120px'} {...formik.getFieldProps("address")} placeholder="Enter your Address" label="Your Address" theme="Carbon" ></TextArea>
          {/* <LocationPicker showInputs={false} geoURL="yazd" mapStyle={{ height: "211px", borderRadius: "27px" }} pointMode={pointMode as any} /> */}
        </div>
        <div className="mt-3 px-6">
          <TextField
            {...formik.getFieldProps("personlEmail")}
            theme="Carbon"
            disabled
            label="Personal Email"
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
          <Button disabled={!formik.isValid} onClick={submit} theme="Carbon">Save Changes</Button>
        </div>
      </div>
    </>
  );
};

export default EditContactInfo;
