/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "symphony-ui"
import { useState } from "react"
import {AvatarStep, BusinessStep, ContactStep, CreatePasswordStep, InformationStep} from "./steps"
import { StepController } from "../../../Components"
import { useConstructor } from "../../../help"
import { Auth } from "../../../Api"
import { useAuth } from "../../../hooks/useAuth"
import { toast } from "react-toastify"
import { useFormik } from "formik"

interface Avatars {
  photo: string;
  video: string;
  gender?:string
  type: "Api" | "Local";
}

const OnBoarding = () => {
    const [step ,setStep] = useState(1)
    const authContext = useAuth()
    const [avatarList, setAvaterList] = useState<Array<Avatars>>([]);
    const [uploadedAvater,setUploadedAvater] = useState<Avatars>({
        photo:"",
        type:'Local',
        video:''
    });      
    const formik = useFormik({
        initialValues:{
            silent_video_avatar:'',
            avatar_pic_url:'',
        },
        onSubmit:() =>{}
    })
    const createAvatarVideo = (photo:string,replaceAvatar:Avatars) => {
        toast.loading('Creating your Avatalk')
        Auth.createAvatarVideo(photo).then((response) => {
            if(response.data == 'No face detected'){
            // setIsLoading(false)
            toast.dismiss()
            formik.setFieldValue('silent_video_avatar',replaceAvatar.video)
            formik.setFieldValue('avatar_pic_url',replaceAvatar.photo)                  
            }else{
            formik.setFieldValue('avatar_pic_url',response.data.avatar_pic_link)
            setUploadedAvater({
                photo:response.data.avatar_pic_link,
                video:response.data.silent_video_link,
                type:'Api'
            })
            formik.setFieldValue('silent_video_avatar',response.data.silent_video_link)
            // setIsLoading(false)
            }
        }).catch(() => {
        // setIsLoading(false)
        toast.dismiss()
        formik.setFieldValue('silent_video_avatar',replaceAvatar.video)
        formik.setFieldValue('avatar_pic_url',replaceAvatar.photo)   
                
        })     
    }      
    useConstructor(() => {
        Auth.avatarList(authContext.varification?.googleJson.email ? {google_json:authContext.varification.googleJson}:{}).then(res => {
        // setAllAvatar(res.data)
        if(res.data[res.data.length -1].video == ''){
            createAvatarVideo(res.data[res.data.length -1].photo,res.data[0])
            setAvaterList(res.data.filter((el:any) =>el.photo != res.data[res.data.length -1].photo))  
        }else{
            setAvaterList(res.data)
            // setIsLoading(false)
            formik.setFieldValue('silent_video_avatar',res.data[0].video)
            formik.setFieldValue('avatar_pic_url',res.data[0].photo)
        }     
        })            
    })    
    const resolveStep = () => {
        return (
            <>
                {step == 0 &&
                    <>
                        <CreatePasswordStep></CreatePasswordStep>
                    </>
                }
                {step == 1 &&
                    <>
                        <InformationStep onSubmit={() => {
                            setStep(step+1)
                        }}></InformationStep>
                    </>
                }      
                {step == 2 &&
                    <>
                        <ContactStep onSubmit={() => {
                            setStep(step+1)
                        }}></ContactStep>
                    </>
                }   
                {step == 3 &&
                    <>
                        <BusinessStep onSubmit={() => {
                            setStep(step+1)
                        }}></BusinessStep>
                    </>
                }      
                {step == 4 &&
                    <>
                        <AvatarStep setUploadedAvater={setUploadedAvater} formik={formik} avatarList={avatarList} uploadedAvater={uploadedAvater} onSubmit={() => {
                            setStep(step+1)
                        }}></AvatarStep>
                    </>
                }                                                             
            </>
        )
    }
    return (
        <>
            <div className="w-full min-h-screen py-8 px-4">
                <div className="flex justify-between items-center w-full">
                    <Button onClick={() =>{
                        setStep(step -1)
                    }} theme="Carbon-Google" data-mode="profile-review-button-2">
                        <div className="Carbon-back-Button-vector"></div>
                    </Button>
                    <div className="mt-10">
                        <StepController
                            theme="Carbon"
                            steps={4}
                            currentStep={step}
                        ></StepController>                    
                    </div>
                    <div className="text-text-primary font-semibold">Skip</div>
                </div>
                {
                    resolveStep()
                }
            </div>
        </>
    )
}

export default OnBoarding