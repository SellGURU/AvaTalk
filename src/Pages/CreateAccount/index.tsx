/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { StepController, TextField } from "../../Components";
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
// import CropperBox from "../../Components/CropperBox";

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
  avatar_pic_url:'',
  silent_video_avatar:'',
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
      Auth.register(
        { first_name: values.FirstName,
          last_name: values.LastName,
          mobile_number:authContext.varification.emailOrPhone.includes('@')? values.Phone:authContext.varification.emailOrPhone,
          job_title: values.JobTitle,
          company_name: values.CompanyName, 
          location: values.YourLocation, 
          profile_pic: values.avatar_pic_url,
          avatar_pic_url:values.avatar_pic_url,
          silent_video_avatar:values.silent_video_avatar,
          email:authContext.varification.emailOrPhone.includes('@')? authContext.varification.emailOrPhone:values.email
        }).then((res) => {
        const newUser = new User({
          firstName:values.FirstName,
          lastName:values.LastName,
          phone:values.Phone,
          banelImage:'',
          company:values.CompanyName,
          imageurl: values.avatar_pic_url,
          job:values.JobTitle,
          location:location,
          personlEmail:'',
          workEmail:'',
          workPhone:'',
          silent_video_avatar:values.silent_video_avatar
        })
        authContext.setUser(newUser)
        authContext.login(res.data.access_token)
        navigate('/?splash=false')
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
        return <AvatarStep formik={formik} setStep={setStep} onSubmit={formik.handleSubmit}></AvatarStep>
        // return <ProfileImageStep formik={formik} setStep={setStep} onSubmit={formik.handleSubmit}></ProfileImageStep>;
    }
  };
  const [showGudieLine] = useState(false)
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
        {showGudieLine? 
        <>
        </>
        :
        <>
          {resolveStepContent()}
        </>
        }
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
            <TextField {...formik.getFieldProps("email")} label="Email" required placeholder="Enter your email ..." theme="Carbon" name="email" type="email"  errorMessage={formik.errors.email} inValid={formik.errors.email && formik.touched?.email}></TextField>
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

// const ProfileImageStep:React.FC<UploadStepProps> = ({formik,onSubmit}) => {
//   const [avatarUrl,setAvatarUrl] = useState('')

//   return (
//     <>
//       <div className="h-[65vh] hiddenScrollBar overflow-y-scroll">
//         <div className="">
//           <div className="text-gray-700 text-center font-semibold text-base">Upload Profile Image</div>
//           <div className="w-full flex justify-center items-center mt-2 mb-6">
//             <div className="text-sm text-gray-700 max-w-[228px] opacity-80 text-center">Here you’ll be able to upload your profile image</div>
//           </div>
//         </div>
//         <div className="px-4">
//           <FileUploadr
//             mod="profile"
//             uploades={(res) => {
//               setAvatarUrl(res[0].url)
//             }}
//             theme="Carbon"
//           ></FileUploadr>
//           <div className="mt-8">
//             <Button onClick={onSubmit} theme="Carbon">
//               Continue
//             </Button>
//           </div>
//         </div>
//       </div>
//       <CropperBox url={avatarUrl} onResolve={(resolve: string | ArrayBuffer | null) => {
//         // shareUser.updateImageurl(resolve)
//         formik.setFieldValue('PrifileImage',resolve)
//         setAvatarUrl('')
//       }}></CropperBox>        
//     </>
//   );
// };

const AvatarStep:React.FC<UploadStepProps> = ({onSubmit,formik}) => {
  const [avatarList,setAvaterList] = useState(
    [])  
  const [avatarVideo,setAvatarVideo] = useState('')
  const [selectedAvatar,setSelectedAvatar]= useState('')
  const authContext = useAuth()
  useConstructor(() => {
    Auth.avatarList(authContext.varification?.googleJson.email ? {google_json:authContext.varification.googleJson}:{}).then(res => {
      setAvaterList(res.data)
      setSelectedAvatar(res.data[0])
      formik.setFieldValue('avatar_pic_url',res.data[0])
    })
  })
  return (
    <>
      <div className="h-[65vh] hiddenScrollBar overflow-y-scroll">
       <div className="">
          <div className="text-gray-700 text-center font-semibold text-base">Building Your Talking Profile</div>

          <div className="mt-6 px-6 flex items-center justify-between">
            {avatarVideo.length > 0 ?
            <>
              <div className="w-[80px] relative object-cover boxShadow-Gray borderBox-Gray h-[80px] rounded-[6.76px]  border border-white">
                  <div className="absolute -right-1 -top-1 w-[14px] h-[14px] rounded-full flex items-center bg-green-500 justify-center">
                    <img src="./icons/Vector.svg" alt="" />
                  </div>
                  <img className=" w-full rounded-[6.76px] h-full" src={selectedAvatar} alt="" />          
              </div>

              <div>
                <img className="w-10 h-10" src="./icons/fi-rr-arrow-right.svg" alt="" />
              </div>

              <div className="w-[160px] h-[160px] overflow-hidden object-cover boxShadow-Gray borderBox-Gray rounded-[6.76px]  border border-white">
                <video id="dragAbleAi" playsInline  style={{}} width={'100%'} height={'50%'}  preload="auto" autoPlay={true} loop muted >
                    <source id="videoPlayer"  src={avatarVideo} type="video/mp4"></source>
                </video>               
              </div>
            </>
            :undefined}
          </div>

          <div>
            <div className="text-[#374151] text-[14px] opacity-80 mt-8 px-2">Upload image, or choose avatar, we will convert it to talking profile. <span className="text-[#06B6D4]"> learn more </span></div>
          </div>

          <div className="flex flex-wrap gap-8 px-6 mt-2">
            <div className="w-[85px]  relative boxShadow-Gray flex justify-center items-center cursor-pointer borderBox-Gray rounded-[12px] h-[73px]">
              <img src="./icons/gallery-add.svg" alt="" />
              <input  onChange={(res:any) => {
                  // setisLoading(true)
                  // getBase64(res.target.files[0],res.target.value)   
                  setAvatarVideo('')
                  const reader = new FileReader();
                  reader.readAsDataURL(res.target.files[0]);
                  reader.onload = function () {
                    setSelectedAvatar(reader.result as string)
                    formik.setFieldValue('avatar_pic_url',reader.result)   
                    Auth.createAvatarVideo(reader.result as string).then((response) => {
                      setAvatarVideo(response.data)
                      formik.setFieldValue('silent_video_avatar',response.data)
                    })                        
                  };
                  reader.onerror = function (error) {
                      console.log('Error: ', error);
                  };

                  // setSelectedAvatar(res.target.files[0])
                  // formik.setFieldValue('avatar_pic_url',res.target.files[0])
              
              }}  className={`Carbon-ImageUploader-uploader-input`} type="file" accept="*" />                   
            </div>
            {avatarList.map((el) => {
              return (
                <>
                <div onClick={() => {
                  setSelectedAvatar(el)
                  formik.setFieldValue('avatar_pic_url',el)
                  setAvatarVideo('')
                  Auth.createAvatarVideo(el).then((res) => {
                    setAvatarVideo(res.data)
                    formik.setFieldValue('silent_video_avatar',res.data)
                  })
                }} className={`w-[85px] ${el == selectedAvatar ?'borderBox-primary' :'borderBox-Gray '} boxShadow-Gray  border-3 overflow-hidden flex justify-center items-center cursor-pointer  rounded-[12px] h-[73px]`}>
                  <img src={el} className="w-full  h-full" alt="" />
                </div>                
                </>
              )
            })}
          </div>

        </div>        
        <div className="mt-8 mb-3 px-12">
          <Button disabled={avatarVideo.length == 0} onClick={onSubmit} theme="Carbon">
            Submit AI Profile
          </Button>
        </div>
      </div>
    </>
  )
}

export default CreateAccount;
