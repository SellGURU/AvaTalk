/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { FileUploadr, StepController } from "../../Components"
import { Button, TextField } from "symphony-ui";
import LocationPicker from "react-leaflet-location-picker";
import './index.scss'

const CreateAccount = () => {
    const [step,setStep] = useState<number>(1);
    const [location,setLocation] = useState(
        {
            lat: 51.5072,
            lng: 0.1276           
        }
    )
    const resolveStepContent = () => {
        switch (step) {
            case 1 : return <InfoStep setStep={setStep}></InfoStep> ;
            case 2 : return <LocationStep setLocation={setLocation} location={location} setStep={setStep}></LocationStep> ;
            case 3 : return <ProfileImageStep></ProfileImageStep> ;
        }
    }
    return (
        <>
            <div className="w-full px-4 h-max">
                <div className={`mb-10`}>
                    {step > 1 ?
                        <Button onClick={() => {
                            if(step >= 2) {
                                setStep(step -1);
                            }
                        }} theme="Carbon-back">
                            <div className="backIcon  w-[8px] h-[20px] bg-slate-400"></div>
                        </Button>
                    :
                        <div className=" h-10 mb-10"></div>
                    }
                </div>         
                <div className="">
                    <StepController theme="Carbon" steps={3} currentStep={step}></StepController>
                </div>       
                {
                    resolveStepContent()
                }

            </div>
        </>
    )
}
type stepsProps =  {
    setStep:(step:number) => void
}

type locationGoogleMap = {
    lat: number,
    lng: number
}

interface LocationStepProps extends stepsProps {
    location: locationGoogleMap,
    setLocation: (loc:locationGoogleMap) => void
}

const InfoStep:React.FC<stepsProps> = ({setStep}) => {
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
                    <TextField 
                        label="First Name"
                        placeholder="Enter your first name..."
                        theme="Carbon"
                        name="FistName"
                        type="text"
                        inValid={false}
                        onBlur={() => {}}
                        onChange={() => {}}
                        value=""
                    ></TextField>
                </div>

                <div className="mb-4">
                    <TextField 
                        label="Last Name "
                        placeholder="Enter your last name..."
                        theme="Carbon"
                        name="Last Name"
                        type="text"
                        inValid={false}
                        onBlur={() => {}}
                        onChange={() => {}}
                        value=""
                    ></TextField>
                </div>

                <div className="mb-4">
                    <TextField 
                        label="Phone"
                        placeholder="Enter your phone number..."
                        theme="Carbon"
                        name="Last Name"
                        type="text"
                        inValid={false}
                        onBlur={() => {}}
                        onChange={() => {}}
                        value=""
                    ></TextField>
                </div>
                <div className="mt-8">
                    <Button onClick={() => {
                        setStep(2)
                    }} theme="Carbon">
                        Continue
                    </Button>
                </div>                
            </div>
        </div>
        </>
    )
}

const LocationStep:React.FC<LocationStepProps> = ({setStep,location}) => {
  const [pointVals,setPointVals] = useState([
    [location.lat, location.lng]
  ]);
  const pointMode = {
    banner: false,
    control: {
      values: pointVals,
      onClick: (point: any) =>
        setPointVals([...[point]]),
      onRemove: (point: any) =>
        console.log("I've just been clicked for removal :(", point)
    }
  };
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
                        <TextField 
                            label="Job Title"
                            placeholder="Enter your job title..."
                            theme="Carbon"
                            name="Job"
                            type="text"
                            inValid={false}
                            onBlur={() => {}}
                            onChange={() => {}}
                            value=""
                        ></TextField>
                    </div>

                    <div className="mb-4">
                        <TextField 
                            label="Company Name"
                            placeholder="Enter your company name..."
                            theme="Carbon"
                            name="Company Name"
                            type="text"
                            inValid={false}
                            onBlur={() => {}}
                            onChange={() => {}}
                            value=""
                        ></TextField>
                    </div>

                    <div className="mb-4">
                        <TextField 
                            label="Your Location"
                            placeholder="Search your location..."
                            theme="Carbon"
                            name="Last Name"
                            type="text"
                            inValid={false}
                            onBlur={() => {}}
                            onChange={() => {}}
                            value=""
                        ></TextField>
                    </div>
                    <div>
                        <LocationPicker showInputs={false} mapStyle={{height:'211px',borderRadius:'27px'}} pointMode={pointMode} />
                    </div>
                    <div className="mt-8">
                        <Button onClick={() => {
                            setStep(3)
                        }} theme="Carbon">
                            Continue
                        </Button>
                    </div>                
                </div>        
            </div>
        </>
    )
}

const ProfileImageStep = () => {
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
                <FileUploadr uploades={() => {
                    // setFiles(res)
                }} theme="Carbon"></FileUploadr>
                <div className="mt-8">
                    <Button theme="Carbon">
                        Continue
                    </Button>
                </div>
            </div>        
        </div>
        </>
    )
}

export default CreateAccount