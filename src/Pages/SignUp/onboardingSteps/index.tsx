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
import CompleteStep from "./steps/CompleteStep"
import { useNavigate} from "react-router-dom"

interface Avatars {
  photo: string;
  video: string;
  gender?:string
  type: "Api" | "Local";
}

const OnBoarding = () => {
    const [step ,setStep] = useState(0)
    const authContext = useAuth()
    const navigate = useNavigate()
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
            console.log(response)
            if(response.data == 'No face detected'){
            // setIsLoading(false)
            toast.dismiss()
            formik.setFieldValue('silent_video_avatar',replaceAvatar.video)
            formik.setFieldValue('avatar_pic_url',replaceAvatar.photo)                  
            }else if(response.data.avatar_pic_link){
                formik.setFieldValue('avatar_pic_url',response.data.avatar_pic_link)
                setUploadedAvater({
                    photo:response.data.avatar_pic_link,
                    video:response.data.silent_video_link,
                    type:'Api'
                })
                formik.setFieldValue('silent_video_avatar',response.data.silent_video_link)
            // setIsLoading(false)
            }else{
                toast.dismiss()
                formik.setFieldValue('silent_video_avatar',replaceAvatar.video)
                formik.setFieldValue('avatar_pic_url',replaceAvatar.photo)   
            }
        }).catch(() => {
        // setIsLoading(false)
        toast.dismiss()
        formik.setFieldValue('silent_video_avatar',replaceAvatar.video)
        formik.setFieldValue('avatar_pic_url',replaceAvatar.photo)   
                
        })     
    }      
    useConstructor(() => {
        Auth.avatarList(authContext.googleInformation?.email ? {google_json:authContext.googleInformation}:{}).then(res => {
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
                        <CreatePasswordStep onSubmit={() => {
                            setStep(step+1)
                        }}></CreatePasswordStep>
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
                            authContext.siginupHandler({
                                silent_video_avatar:formik.values.silent_video_avatar,
                                avatar_pic_url:formik.values.avatar_pic_url
                            })
                        }}></AvatarStep>
                    </>
                }   
                {step == 5 &&
                    <>
                        <CompleteStep></CompleteStep>
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
                        if(step>0){
                            setStep(step -1)
                        }else{
                            navigate('/signup')
                        }
                    }} theme="Carbon-Google" data-mode="profile-review-button-2">
                        <div className="Carbon-back-Button-vector"></div>
                    </Button>

                    <div className={`mt-10 ${step>0 && step < 5?'visible':'invisible'}`}>
                            <StepController
                                theme="Carbon"
                                steps={4}
                                currentStep={step}
                            ></StepController>                    
                    </div>

                    <div onClick={() => {
                        
                    }} className={`text-text-primary cursor-pointer ${step< 5?'visible':'invisible'} font-semibold`}>Skip</div>
                </div>
                {
                    resolveStep()
                }
            </div>
        </>
    )
}

export default OnBoarding