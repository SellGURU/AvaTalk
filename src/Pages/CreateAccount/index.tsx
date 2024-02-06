/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { FileUploadr, StepController, TextField } from "../../Components";
import { Button } from "symphony-ui";
// import LocationPicker from "react-leaflet-location-picker";
import styles from "./CreateAccount.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PhoneCountry } from "../../Types";
import { Auth } from "../../Api";
import { useNavigate } from "react-router";
import {User} from "../../Model";
import { useAuth } from "../../hooks/useAuth";
import { useConstructor } from "../../help";

const initialValue = {
  FirstName: "",
  LastName: "",
  Phone: "",
  JobTitle: "",
  CompanyName: "",
  email:"",
  YourLocation: {
    lat: 33,
    lng: 33,
  },
  PrifileImage: "",
};
const validationSchema = Yup.object().shape({
  FirstName: Yup.string().required("Required"),
  LastName: Yup.string().required("Required"),
  JobTitle: Yup.string(),
  CompanyName: Yup.string(),
  email:Yup.string().email()
});

const CreateAccount = () => {
  const navigate = useNavigate();
  const authContext = useAuth()
  useConstructor(() => {
    if(authContext.varification.emailOrPhone.length == 0){
      setTimeout(() => {
        navigate('/login')
      }, 200);
    }
  })
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      Auth.register({ first_name: values.FirstName, last_name: values.LastName, mobile_number: values.Phone, job_title: values.JobTitle, company_name: values.CompanyName, location: values.YourLocation, profile_pic: values.PrifileImage }).then(() => {
        const newUser = new User({
          firstName:values.FirstName,
          lastName:values.LastName,
          phone:values.Phone,
          banelImage:'',
          company:values.CompanyName,
          imageurl:values.PrifileImage,
          job:values.JobTitle,
          location:location
        })
        authContext.setUser(newUser)
        navigate('/')
      });
    },
  });
  const [country, setCountry] = useState<any>({
    codeName: "us",
    codePhone: "+1",
  });
  const [step, setStep] = useState<number>(1);
  const [location, setLocation] = useState({
    lat: 51.5072,
    lng: 0.1276,
  });
  
  const resolveStepContent = () => {
    switch (step) {
      case 1:
        return <InfoStep country={country} setCountry={setCountry} formik={formik} setStep={setStep}></InfoStep>;
      case 2:
        return <LocationStep formik={formik} setLocation={setLocation} location={location} setStep={setStep}></LocationStep>;
      case 3:
        return <ProfileImageStep formik={formik} setStep={setStep} onSubmit={formik.handleSubmit}></ProfileImageStep>;
    }
  };
  return (
    <>
      <div className="w-full px-4 h-max">
        <div className={`mb-10`}>
          {step > 1 ? (
            <Button
              onClick={() => {
                if (step >= 2) {
                  setStep(step - 1);
                }
              }}
              theme="Carbon-back"
            >
              <div className={styles.backIcon + " w-[8px] h-[20px] bg-slate-400"}></div>
            </Button>
          ) : (
            <div className=" h-10 mb-10"></div>
          )}
        </div>
        <div className="">
          <StepController theme="Carbon" steps={3} currentStep={step}></StepController>
        </div>
        {resolveStepContent()}
      </div>
    </>
  );
};
type stepsProps = {
  setStep: (step: number) => void;
  formik: any;
};

type locationGoogleMap = {
  lat: number;
  lng: number;
};

interface LocationStepProps extends stepsProps {
  location: locationGoogleMap;
  setLocation: (loc: locationGoogleMap) => void;
}

interface InfoStepProps extends stepsProps {
  country: PhoneCountry;
  setCountry: (country: PhoneCountry) => void;
}

interface UploadStepProps extends stepsProps {
  onSubmit: () => void
}

const InfoStep: React.FC<InfoStepProps> = ({ setStep, formik, country, setCountry }) => {
  const authContext = useAuth()
  return (
    <>
      <div className="h-[65vh] hiddenScrollBar overflow-y-scroll">
        <div className="">
          <div className="text-gray-700 text-center font-semibold text-base">Create Your Account</div>
          <div className="w-full flex justify-center items-center mt-2 mb-6">
            <div className="text-sm text-gray-700 max-w-[228px] opacity-80 text-center">Tell us more about yourself</div>
          </div>
        </div>
        <div className="px-4">
          <div className="mb-4">
            <TextField {...formik.getFieldProps("FirstName")} label="First Name" placeholder="Enter your first name..." theme="Carbon" name="FirstName" type="text" required errorMessage={formik.errors.FirstName} inValid={formik.errors.FirstName && formik.touched?.FirstName}></TextField>
          </div>

          <div className="mb-4">
            <TextField {...formik.getFieldProps("LastName")} label="Last Name" placeholder="Enter your last name..." theme="Carbon" name="LastName" type="text" required errorMessage={formik.errors.LastName} inValid={formik.errors.LastName && formik.touched?.LastName}></TextField>
          </div>
          {/* {authContext.varification.emailOrPhone} */}
          {authContext.varification.emailOrPhone.includes('@')?
          <div className="mb-4">
            <TextField {...formik.getFieldProps("Phone")} label="Phone" placeholder="Enter your phone number..." theme="Carbon" name="Phone" type="phone" phoneCountry={country} setPhoneCountry={setCountry} errorMessage={formik.errors.Phone} inValid={formik.errors.Phone && formik.touched?.Phone}></TextField>
          </div>
          :
          <div className="mb-4">
            <TextField {...formik.getFieldProps("email")} label="email" placeholder="Enter your email ..." theme="Carbon" name="email" type="email"  errorMessage={formik.errors.email} inValid={formik.errors.email && formik.touched?.email}></TextField>
          </div>          
          }
          <div className="mt-8">
            <Button
              disabled={formik.errors.Phone || formik.errors.LastName || formik.errors.FirstName || !formik.touched.FirstName || !formik.touched.LastName}
              onClick={() => {
                setStep(2);
              }}
              theme="Carbon"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const LocationStep: React.FC<LocationStepProps> = ({ setStep, formik }) => {
  // const [pointVals, setPointVals] = useState([[location.lat, location.lng]]);
  // const pointMode = {
  //   banner: false,
  //   control: {
  //     values: pointVals,
  //     onClick: (point: any) => setPointVals([...[point]]),
  //     onRemove: (point: any) => console.log("I've just been clicked for removal :(", point),
  //   },
  // };
  return (
    <>
      <div className="h-[65vh] hiddenScrollBar overflow-y-scroll">
        <div className="">
          <div className="text-gray-700 text-center font-semibold text-base">Create Your Profile</div>
          <div className="w-full flex justify-center items-center mt-2 mb-6">
            <div className="text-sm text-gray-700 max-w-[228px] opacity-80 text-center">Enter the information you’ll be sharing with others</div>
          </div>
        </div>
        <div className="px-4">
          <div className="mb-4">
            <TextField {...formik.getFieldProps("JobTitle")} label="Job Title" placeholder="Enter your job title..." theme="Carbon" name="JobTitle" type="text" errorMessage={formik.errors.JobTitle} inValid={formik.errors.JobTitle && formik.touched?.JobTitle}></TextField>
          </div>

          <div className="mb-4">
            <TextField {...formik.getFieldProps("CompanyName")} label="Company Name" placeholder="Enter your company name..." theme="Carbon" name="CompanyName" type="text" inValid={false}></TextField>
          </div>

          {/* <div className="mb-4">
            <TextField label="Your Location" placeholder="Search your location..." theme="Carbon" name="Last Name" type="text" inValid={false} onBlur={() => {}} onChange={() => {}} value=""></TextField>
          </div> */}
          {/* <div>
            <LocationPicker showInputs={false} geoURL="yazd" mapStyle={{ height: "211px", borderRadius: "27px" }} pointMode={pointMode} />
          </div> */}
          <div className="mt-8">
            <Button
              onClick={() => {
                setStep(3);
              }}
              theme="Carbon"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const ProfileImageStep:React.FC<UploadStepProps> = ({formik,onSubmit}) => {
  return (
    <>
      <div className="h-[65vh] hiddenScrollBar overflow-y-scroll">
        <div className="">
          <div className="text-gray-700 text-center font-semibold text-base">Upload Profile Image</div>
          <div className="w-full flex justify-center items-center mt-2 mb-6">
            <div className="text-sm text-gray-700 max-w-[228px] opacity-80 text-center">Here you’ll be able to upload your profile image</div>
          </div>
        </div>
        <div className="px-4">
          <FileUploadr
            mod="profile"
            uploades={(res) => {
              formik.setFieldValue('PrifileImage',res[0].url)
            }}
            theme="Carbon"
          ></FileUploadr>
          <div className="mt-8">
            <Button onClick={onSubmit} theme="Carbon">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
