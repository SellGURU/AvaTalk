/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { StepController,Select, TextField } from "../../Components";
import { Button } from "symphony-ui";
// import LocationPicker from "react-leaflet-location-picker";
import styles from "./CreateAccount.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PhoneCountry } from "../../Types";
import { Auth } from "../../Api";
import { useNavigate } from "react-router";
import { User } from "../../Model";
import { useAuth } from "../../hooks/useAuth";
import { useConstructor } from "../../help";
import { toast } from "react-toastify";
import CropperBox from "../../Components/CropperBox";
import { BeatLoader } from "react-spinners";
import { AddAvatar } from "../../Components/__Modal__";

const initialValue = {
  FirstName: "",
  LastName: "",
  Gender: "",
  Phone: "",
  JobTitle: "",
  CompanyName: "",
  email: "",
  YourLocation: {
    lat: 33,
    lng: 33,
  },
  avatar_pic_url: "",
  silent_video_avatar: "",
  PrifileImage: "",
};
const validationSchema = Yup.object().shape({
  FirstName: Yup.string().required("Required"),
  LastName: Yup.string().required("Required"),
  Gender: Yup.string().required("Required"),
  JobTitle: Yup.string(),
  CompanyName: Yup.string(),
  email: Yup.string().email(),
});

const CreateAccount = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  useConstructor(() => {
    if (authContext.varification.emailOrPhone.length == 0) {
      setTimeout(() => {
        navigate("/login");
      }, 200);
    }
  });
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      Auth.register({
        first_name: values.FirstName,
        last_name: values.LastName,
        Gender: values.Gender,
        mobile_number: authContext.varification.emailOrPhone.includes("@")
          ? values.Phone
          : authContext.varification.emailOrPhone,
        job_title: values.JobTitle,
        company_name: values.CompanyName,
        location: values.YourLocation,
        profile_pic: values.avatar_pic_url,
        avatar_pic_url: values.avatar_pic_url,
        silent_video_avatar: values.silent_video_avatar,
        email: authContext.varification.emailOrPhone.includes("@")
          ? authContext.varification.emailOrPhone
          : values.email,
      }).then((res) => {
        const newUser = new User({
          firstName: values.FirstName,
          lastName: values.LastName,
          phone: values.Phone,
          banelImage: "",
          company: values.CompanyName,
          imageurl: values.avatar_pic_url,
          job: values.JobTitle,
          location: location,
          personlEmail: "",
          workEmail: "",
          workPhone: "",
          silent_video_avatar: values.silent_video_avatar,
        });
        if (!res.data.access_token) {
          toast.warning(res.data);
        }
        authContext.setUser(newUser);
        authContext.login(res.data.access_token);
        navigate("/?splash=false");
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
  const [showGudieLine, setShowGudieLine] = useState(false);
  const resolveStepContent = () => {
    switch (step) {
      case 1:
        return (
          <InfoStep
            country={country}
            setCountry={setCountry}
            formik={formik}
            setStep={setStep}
          ></InfoStep>
        );
      case 2:
        return (
          <LocationStep
            formik={formik}
            setLocation={setLocation}
            location={location}
            setStep={setStep}
          ></LocationStep>
        );
      case 3:
        return (
          <AvatarStep
            setshowGudie={(action) => setShowGudieLine(action)}
            formik={formik}
            setStep={setStep}
            onSubmit={formik.handleSubmit}
          ></AvatarStep>
        );
      // return <ProfileImageStep formik={formik} setStep={setStep} onSubmit={formik.handleSubmit}></ProfileImageStep>;
    }
  };

  return (
    <>
      <div className="w-full px-4 h-max">
        {!showGudieLine ? (
          <div className={`mb-10`}>
            {step > 1 && !showGudieLine ? (
              <Button
                onClick={() => {
                  if (step >= 2) {
                    setStep(step - 1);
                  }
                }}
                theme="Carbon-back"
              >
                <div
                  className={styles.backIcon + " w-[8px] h-[20px] bg-slate-400"}
                ></div>
              </Button>
            ) : (
              <div className=" h-10 mb-10"></div>
            )}
          </div>
        ) : undefined}

        {showGudieLine ? (
          <>
            <div className="w-full relative h-dvh pt-6 hiddenScrollBar overflow-y-scroll">
              <div>
                <div className="absolute right-6 top-6">
                  <Button
                    onClick={() => {
                      setShowGudieLine(false);
                    }}
                    theme="Carbon-back"
                  >
                    <div className={`Carbon-Profile-closeIcon`}></div>
                  </Button>
                </div>
                <div
                  className={`text-gray-700 ${
                    window.innerWidth < 332 ? "mt-12" : "mt-2"
                  } ${
                    window.innerWidth < 420 ? "text-left" : "text-center"
                  } font-semibold text-base`}
                >
                  Photo Guidelines for AI Profile
                </div>
                <div className="mt-6 flex relative justify-center">
                  <div className="relative">
                    <div className="absolute w-10 flex items-center justify-center h-10 bg-[#16A34A] rounded-full -right-3 -top-3">
                      <img src="./icons/Vector2.svg" alt="" />
                    </div>
                    <img src="./icons/gudei1.png" alt="" />
                  </div>
                </div>

                <div className="mt-8 px-6">
                  <div className="text-gray-700 text-left font-semibold text-base">
                    Common Mistakes{" "}
                  </div>
                  <div className="mt-4 flex justify-start items-start">
                    <div className="relative min-w-[60px]">
                      <div className="absolute w-6 h-6 flex items-center justify-center bg-[#DC2626] rounded-full -right-[3px] -top-[3px]">
                        <img
                          className="ml-[1px]"
                          src="./icons/Add.svg"
                          alt=""
                        />
                      </div>
                      <img src="./icons/1.png" alt="" />
                    </div>
                    <div className="ml-3 max-w-[283px]">
                      <div className=" text-[#374151] text-[13px] font-medium font-poppins">
                        Not Neutral Expression
                      </div>
                      <div className=" text-[#374151] text-[12px] font-normal font-poppins">
                        Your photo must feature a neutral facial expression.
                        Ensure your mouth is closed and avoid smiling or
                        frowning.
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-start items-start">
                    <div className="relative min-w-[60px]">
                      <div className="absolute w-6 h-6 flex items-center justify-center bg-[#DC2626] rounded-full -right-[3px] -top-[3px]">
                        <img
                          className="ml-[1px]"
                          src="./icons/Add.svg"
                          alt=""
                        />
                      </div>
                      <img src="./icons/2.png" alt="" />
                    </div>
                    <div className="ml-3 max-w-[283px]">
                      <div className=" text-[#374151] text-[13px] font-medium font-poppins">
                        Distracting Background
                      </div>
                      <div className=" text-[#374151] text-[12px] font-normal font-poppins">
                        Use a simple, uncluttered background to avoid any
                        distractions from the primary focus—your face.
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-start items-start">
                    <div className="relative min-w-[60px]">
                      <div className="absolute w-6 h-6 flex items-center justify-center bg-[#DC2626] rounded-full -right-[3px] -top-[3px]">
                        <img
                          className="ml-[1px]"
                          src="./icons/Add.svg"
                          alt=""
                        />
                      </div>
                      <img src="./icons/3.png" alt="" />
                    </div>
                    <div className="ml-3 max-w-[283px]">
                      <div className=" text-[#374151] text-[13px] font-medium font-poppins">
                        Indirect Camera Gaze{" "}
                      </div>
                      <div className=" text-[#374151] text-[12px] font-normal font-poppins">
                        Look directly into the camera lens to establish a clear,
                        forward-facing base for your AI profile.
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-5 ${
                    window.innerWidth < 400 ? "px-2" : "px-6"
                  }`}
                >
                  <Button
                    onClick={() => setShowGudieLine(false)}
                    theme="Carbon"
                  >
                    Got it
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="">
              <StepController
                theme="Carbon"
                steps={3}
                currentStep={step}
              ></StepController>
            </div>
            {resolveStepContent()}
          </>
        )}
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
  onSubmit: () => void;
  setshowGudie: (action: boolean) => void;
}

const InfoStep: React.FC<InfoStepProps> = ({
  setStep,
  formik,
  country,
  setCountry,
}) => {
  const authContext = useAuth();
  
  const GenderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];
  const [selectedGender, setSelectedGender] = useState(GenderOptions[0]);

  return (
    <>
      <div className="h-[65vh] hiddenScrollBar overflow-y-scroll">
        <div className="">
          <div className="text-gray-700 text-center font-semibold text-base">
            Create Your Account
          </div>
          <div className="w-full flex justify-center items-center mt-2 mb-6">
            <div className="text-sm text-gray-700 max-w-[228px] opacity-80 text-center">
              Tell us more about yourself
            </div>
          </div>
        </div>
        <div className="px-4">
          <div className="mb-4">
            <TextField
              {...formik.getFieldProps("FirstName")}
              label="First Name"
              placeholder="Enter your first name..."
              theme="Carbon"
              name="FirstName"
              type="text"
              required
              errorMessage={formik.errors.FirstName}
              inValid={formik.errors.FirstName && formik.touched?.FirstName}
            ></TextField>
          </div>

          <div className="mb-4">
            <TextField
              {...formik.getFieldProps("LastName")}
              label="Last Name"
              placeholder="Enter your last name..."
              theme="Carbon"
              name="LastName"
              type="text"
              required
              errorMessage={formik.errors.LastName}
              inValid={formik.errors.LastName && formik.touched?.LastName}
            ></TextField>
          </div>
          <div className="mb-4">
            <Select
              label="Gender"
              valueElement={<div>{selectedGender.label}</div>}
              placeholder="Select your gender ..."
              theme="Carbon"
            >
              {GenderOptions.map((Gender, index: number) => (
                <>
                  <option
                    key={Gender.value}
                    onClick={() => {
                      setSelectedGender(Gender);
                    }}
                    className="ml-4 cursor-pointer"
                    value={Gender.value}
                  >
                    {Gender.label}
                  </option>
                  {index <= GenderOptions.length - 2 ? <hr /> : undefined}
                </>
              ))}
            
            </Select>
          </div>
          {/* {authContext.varification.emailOrPhone} */}
          {authContext.varification.emailOrPhone.includes("@") ? (
            <div className="mb-4">
              <TextField
                {...formik.getFieldProps("Phone")}
                label="Phone"
                placeholder="Enter your phone number..."
                theme="Carbon"
                name="Phone"
                type="phone"
                phoneCountry={country}
                setPhoneCountry={setCountry}
                errorMessage={formik.errors.Phone}
                inValid={formik.errors.Phone && formik.touched?.Phone}
              ></TextField>
            </div>
          ) : (
            <div className="mb-4">
              <TextField
                {...formik.getFieldProps("email")}
                label="Email"
                required
                placeholder="Enter your email ..."
                theme="Carbon"
                name="email"
                type="email"
                errorMessage={formik.errors.email}
                inValid={formik.errors.email && formik.touched?.email}
              ></TextField>
            </div>
          )}
          <div className="mt-8">
            <Button
              disabled={
                formik.errors.Phone ||
                formik.errors.LastName ||
                formik.errors.FirstName ||
                !formik.touched.FirstName ||
                !formik.touched.LastName
              }
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
          <div className="text-gray-700 text-center font-semibold text-base">
            Create Your Profile
          </div>
          <div className="w-full flex justify-center items-center mt-2 mb-6">
            <div className="text-sm text-gray-700 max-w-[228px] opacity-80 text-center">
              Enter the information you’ll be sharing with others
            </div>
          </div>
        </div>
        <div className="px-4">
          <div className="mb-4">
            <TextField
              {...formik.getFieldProps("JobTitle")}
              label="Job Title"
              placeholder="Enter your job title..."
              theme="Carbon"
              name="JobTitle"
              type="text"
              errorMessage={formik.errors.JobTitle}
              inValid={formik.errors.JobTitle && formik.touched?.JobTitle}
            ></TextField>
          </div>

          <div className="mb-4">
            <TextField
              {...formik.getFieldProps("CompanyName")}
              label="Company Name"
              placeholder="Enter your company name..."
              theme="Carbon"
              name="CompanyName"
              type="text"
              inValid={false}
            ></TextField>
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
interface Avatars {
  photo: string;
  video: string;
  type: "Api" | "Local";
}

const AvatarStep: React.FC<UploadStepProps> = ({
  onSubmit,
  formik,
  setshowGudie,
}) => {
  const [avatarList, setAvaterList] = useState<Array<Avatars>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarVideo, setAvatarVideo] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [uploadedAvater] = useState("");
  const [Cropper, setCropper] = useState("");
  const authContext = useAuth();
  const [addAvatar,setAddAvatar] =useState(false)
  useConstructor(() => {
    setIsLoading(true)
    Auth.avatarList(authContext.varification?.googleJson.email ? {google_json:authContext.varification.googleJson}:{}).then(res => {
      setAvaterList(res.data)
      if(res.data[res.data.length -1].video == ''){
        // setUploadedAvater(res.data[res.data.length -1].photo)
        Auth.createAvatarVideo(res.data[res.data.length -1].photo as string).then((response) => {
            if(response.data == 'No face detected'){
              setIsLoading(false)
              toast.dismiss()
              setSelectedAvatar(res.data[0].photo)   
              setAvatarVideo(res.data[0].video)
              formik.setFieldValue('silent_video_avatar',res.data[0].video)
              formik.setFieldValue('avatar_pic_url',res.data[0].photo)   
              setAvaterList(res.data.filter((el:any) =>el.photo != res.data[res.data.length -1].photo))   
            }else{
              setSelectedAvatar(res.data[res.data.length -1].photo)   
              formik.setFieldValue('avatar_pic_url',response.data.avatar_pic_link)
              setAvatarVideo(response.data.silent_video_link)
    
              setIsLoading(false)
              formik.setFieldValue('silent_video_avatar',response.data.silent_video_link)

            }
        }).catch(() => {
          setIsLoading(false)
          toast.dismiss()
          setSelectedAvatar(res.data[0].photo)   
          setAvatarVideo(res.data[0].video)
          formik.setFieldValue('silent_video_avatar',res.data[0].video)
          formik.setFieldValue('avatar_pic_url',res.data[0].photo)   
          setAvaterList(res.data.filter((el:any) =>el.photo != res.data[res.data.length -1].photo))       
        })           
      }else{
        setIsLoading(false)
        setSelectedAvatar(res.data[0].photo)   
        setAvatarVideo(res.data[0].video)
        formik.setFieldValue('silent_video_avatar',res.data[0].video)
        formik.setFieldValue('avatar_pic_url',res.data[0].photo)
      }
      // Auth.createAvatarVideo(res.data[0] as string).then((response) => {
      // })       
    })
  })
  // useEffect(() => {
  //   const vid = document.getElementById('dragAbleAi')
  //   if(vid) {
  //     vid.addEventListener('error',() => {
  //       alert('error');
  //       setSelectedAvatar('')   
  //       formik.setFieldValue('avatar_pic_url','')
  //       setAvatarVideo('')
  //       formik.setFieldValue('silent_video_avatar','')        
  //     },true)
  //   }
  // })
  return (
    <>
      <div className="h-[65vh] hiddenScrollBar overflow-y-scroll">
        <div className="px-5">
          <div className="text-gray-700 text-center font-semibold text-base">
            Building Your Talking Profile
          </div>

          <div className="mt-6 flex items-center justify-between">
            {avatarVideo.length > 0 ? (
              <>
                <div className="w-[90px] relative object-cover boxShadow-Gray borderBox-Gray  rounded-[6.76px]  border border-white">
                  <div className="absolute -right-1 -top-1 w-[14px] h-[14px] rounded-full flex items-center bg-green-500 justify-center">
                    <img src="./icons/Vector.svg" alt="" />
                  </div>
                  <img
                    className=" w-full rounded-[6.76px] h-full"
                    src={selectedAvatar}
                    alt=""
                  />
                </div>

                <div>
                  <img
                    className="w-10 h-10"
                    src="./icons/fi-rr-arrow-right.svg"
                    alt=""
                  />
                </div>

                <div className="w-[160px]  overflow-hidden object-cover boxShadow-Gray borderBox-Gray rounded-[6.76px]  border border-white">
                  <video
                    id="dragAbleAi"
                    playsInline
                    style={{}}
                    width={"100%"}
                    preload="auto"
                    autoPlay={true}
                    loop
                    muted
                  >
                    <source
                      id="videoPlayer"
                      src={avatarVideo}
                      type="video/mp4"
                    ></source>
                  </video>
                </div>
              </>
            ) : undefined}
          </div>

          <div>
            <div className="text-[#374151] text-[14px] opacity-80 mt-8 text-justify">
              Upload image, or choose avatar, we will convert it to talking
              profile.{" "}
              <span
                onClick={() => {
                  setshowGudie(true);
                }}
                className="text-[#06B6D4] cursor-pointer"
              >
                {" "}
                learn more{" "}
              </span>
            </div>
          </div>

          <div className="w-full gap-8 mt-5 grid grid-cols-4 grid-flow-row">
            <div
              className="w-full  relative boxShadow-Gray flex overflow-hidden justify-center items-center cursor-pointer borderBox-Gray rounded-[12px] "
              onClick={() => setAddAvatar(true)}
            >
              <img
                className={`${
                  uploadedAvater.length > 0 ? "absolute right-1 top-1" : ""
                }`}
                src="./icons/gallery-add.svg"
                alt=""
              />
              {uploadedAvater.length > 0 ? (
                <img className="w-full h-full" src={uploadedAvater} alt="" />
              ) : undefined}

              {/* // */}
              {/* <input
                onChange={(res: any) => {
                  // setisLoading(true)
                  // getBase64(res.target.files[0],res.target.value)
                  setAvatarVideo("");
                  const reader = new FileReader();
                  reader.readAsDataURL(res.target.files[0]);
                  reader.onload = function () {
                    setCropper(reader.result as string);
                  };
                  reader.onerror = function (error) {
                    console.log("Error: ", error);
                  };

                  // setSelectedAvatar(res.target.files[0])
                  // formik.setFieldValue('avatar_pic_url',res.target.files[0])
                }}
                className={`Carbon-ImageUploader-uploader-input invisible`}
                type="file"
                accept="*"
              /> */}
              {/* // */}
            </div>
            {avatarList.map((el) => {
              return (
                <>
                  <div
                    onClick={() => {
                      setSelectedAvatar(el.photo);
                      setAvatarVideo("");
                      if (el.video == "") {
                        setIsLoading(true);
                        Auth.createAvatarVideo(el.photo as string).then(
                          (response) => {
                            formik.setFieldValue(
                              "avatar_pic_url",
                              response.data.avatar_pic_link
                            );
                            setAvatarVideo(response.data.silent_video_link);
                            formik.setFieldValue(
                              "silent_video_avatar",
                              response.data.silent_video_link
                            );
                            setIsLoading(false);
                          }
                        );
                      } else {
                        setTimeout(() => {
                          setAvatarVideo(el.video);
                          formik.setFieldValue("avatar_pic_url", el.photo);
                          formik.setFieldValue("silent_video_avatar", el.video);
                        }, 200);
                      }
                      // Auth.createAvatarVideo(el).then((res) => {
                      //   setAvatarVideo(res.data)
                      //   formik.setFieldValue('silent_video_avatar',res.data)
                      // })
                    }}
                    className={`w-full ${
                      el.photo == selectedAvatar
                        ? "borderBox-primary"
                        : "borderBox-Gray "
                    } boxShadow-Gray  border-3 overflow-hidden flex justify-center items-center cursor-pointer  rounded-[12px] `}
                  >
                    {/* <img src="" alt="" /> */}
                    <img src={el.photo} className="w-full  h-full" alt="" />
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="mt-8 mb-3 px-11">
          <Button
            disabled={avatarVideo.length == 0}
            onClick={onSubmit}
            theme="Carbon"
          >
            Get Started
          </Button>
        </div>
        {isLoading ? (
          <>
            <div className="absolute z-50 w-full h-full left-0 top-0 flex justify-center items-center">
              <BeatLoader size={8} color="#FFFFFF"></BeatLoader>
            </div>
            <div className="absolute w-full h-full bg-black opacity-60 top-0 left-0"></div>
          </>
        ) : undefined}
        <CropperBox
          url={Cropper}
          onResolve={(resolve: string | ArrayBuffer | null) => {
            // shareUser.updateImageurl(resolve)
            //  formik.setFieldValue('PrifileImage',resolve)
            // setAvatarUrl('')
            setCropper("");
            setSelectedAvatar(resolve as string);
            // setUploadedAvater(resolve as string)
            setIsLoading(true);
            Auth.createAvatarVideo(resolve as string).then((response) => {
              formik.setFieldValue(
                "avatar_pic_url",
                response.data.avatar_pic_link
              );
              setAvaterList([
                {
                  photo: response.data.avatar_pic_link,
                  video: response.data.silent_video_link,
                  type: "Local",
                },
                ...avatarList,
              ]);
              setAvatarVideo(response.data.silent_video_link);
              formik.setFieldValue(
                "silent_video_avatar",
                response.data.silent_video_link
              );
              setIsLoading(false);
            });
          }}
        ></CropperBox>
        <AddAvatar
          name={"modal name"}
          value={"editeValue"}
          theme="Carbon"
          isOpen={addAvatar}
          onClose={() => {
            setAddAvatar(false);
          }}
          onComplete={(data:any) => {

                  setAvatarVideo("");
                  const reader = new FileReader();
                  reader.readAsDataURL(data);
                  reader.onload = function () {
                    setCropper(reader.result as string);
                  };
                  reader.onerror = function (error) {
                    console.log("Error: ", error);
                  };
                  setAddAvatar(false)
          
          }}
          title="Link"
        ></AddAvatar>
      </div>
    </>
  );
};

export default CreateAccount;
