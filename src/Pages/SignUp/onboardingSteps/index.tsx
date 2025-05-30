/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "symphony-ui"
import { useEffect, useState } from "react"
import {AvatarStep, BusinessStep, CreatePasswordStep, InformationStep} from "./steps"
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
    const [isCreated,setISCreated] = useState(false)
    const [avatarList, setAvaterList] = useState<Array<Avatars>>(
    [
        {
            "photo": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_611d4f0aee44fc1c503a66639ff66162.jpg",
            "video": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_611d4f0aee44fc1c503a66639ff66162.mp4",
            "gender": "male",
            "type": "Api"
        },
        {
            "photo": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_66d922698b23946a549a7d36e834066f.jpg",
            "video": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_66d922698b23946a549a7d36e834066f.mp4",
            "gender": "female",
            "type": "Api"
        },
        {
            "photo": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_47713f79ace5f77d90afbe27ef70ad40.jpg",
            "video": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_47713f79ace5f77d90afbe27ef70ad40.mp4",
            "gender": "female",
            "type": "Api"
        },
        {
            "photo": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_026c1b6ef578c603affa316e32ae813c.jpg",
            "video": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_026c1b6ef578c603affa316e32ae813c.mp4",
            "gender": "male",
            "type": "Api"
        },
        {
            "photo": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_8ed59025c692e93af81708e939da2e03.jpg",
            "video": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_8ed59025c692e93af81708e939da2e03.mp4",
            "gender": "male",
            "type": "Api"
        },
        {
            "photo": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_d233420a77456bbacf345f434f643e8d.jpg",
            "video": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_d233420a77456bbacf345f434f643e8d.mp4",
            "gender": "female",
            "type": "Api"
        },
        {
            "photo": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_e0557adb983e4db6ae07514e7bf846ab.jpg",
            "video": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_e0557adb983e4db6ae07514e7bf846ab.mp4",
            "gender": "male",
            "type": "Api"
        },
        {
            "photo": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_d3cb0f89126260375cf4b21a262c50c8.jpg",
            "video": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_d3cb0f89126260375cf4b21a262c50c8.mp4",
            "gender": "male",
            "type": "Api"
        },
        {
            "photo": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_fd3e7b9da124ca035ed0fe5ba5108d5c.jpg",
            "video": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_fd3e7b9da124ca035ed0fe5ba5108d5c.mp4",
            "gender": "female",
            "type": "Api"
        },
        {
            "photo": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_cc6c779cb843035abc4e239b9f80105f.jpg",
            "video": "https://ugc-idle.s3-us-west-2.amazonaws.com/est_cc6c779cb843035abc4e239b9f80105f.mp44",
            "gender": "female",
            "type": "Api"
        }
    ]        
    );
    const [uploadedAvater,setUploadedAvater] = useState<Avatars>({
        photo:"",
        type:'Local',
        video:''
    });      

    const [canSkips,setCanSkips] = useState([
        {
            name:"password",
            value:false
        }
    ])
    const skipMannager = () => {
        if(step == 0){
            if(canSkips.filter((el) => el.name == "password")[0].value == true){
                setStep(step+1)
            }
        }
    }
    const formik = useFormik({
        initialValues:{
            silent_video_avatar:'',
            avatar_pic_url:'',
        },
        onSubmit:() =>{}
    })
    const createAvatarVideo = (photo:string,replaceAvatar:Avatars) => {
        toast.loading('Creating your Avatalk')
        // mock 
        console.log(photo,replaceAvatar)
        // const mockData = {
        //     "silent_video_link": "https://storage.googleapis.com/yepic-generated-videos/a680aef3-0db3-4682-8293-a6ffc68821b9/downloads/avatar/468190d9-bbf8-b7a0-e6fb-00a6a26aaf5b/a680aef3-0db3-4682-8293-a6ffc68821b9.mp4",
        //     "avatar_pic_link": "https://codieblob.blob.core.windows.net/avatalk/Pictures/5708967d40.jpg"
        // }
        // formik.setFieldValue('avatar_pic_url',mockData.avatar_pic_link)
        // setUploadedAvater({
        //     photo:mockData.avatar_pic_link,
        //     video:mockData.silent_video_link,
        //     type:'Api'
        // })
        // formik.setFieldValue('silent_video_avatar',mockData.silent_video_link)
        // end mock
        Auth.createAvatarVideo(photo).then((response) => {
            console.log(response)
            if(response.data == 'No face detected'){
            // setIsLoading(false)
            toast.dismiss()
            // formik.setFieldValue('silent_video_avatar',replaceAvatar.video)
            // formik.setFieldValue('avatar_pic_url',replaceAvatar.photo)                  
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
                // formik.setFieldValue('silent_video_avatar',replaceAvatar.video)
                // formik.setFieldValue('avatar_pic_url',replaceAvatar.photo)   
            }
        }).catch(() => {
        toast.dismiss()
        // formik.setFieldValue('silent_video_avatar',replaceAvatar.video)
        // formik.setFieldValue('avatar_pic_url',replaceAvatar.photo)       
        })     
    }    
    useEffect(() => {
        if(authContext.googleInformation == null && authContext.varification.emailOrPhone.length ==0){
            navigate('/signup')
        }        
    })  
    useConstructor(() => {

        if(authContext.googleInformation!= null){
            setStep(1)
        }
        Auth.avatarList(authContext.googleInformation?.email ? {google_json:authContext.googleInformation}:{}).then(res => {
        // setAllAvatar(res.data)
        if(res.data[res.data.length -1].video == ''){
            createAvatarVideo(res.data[res.data.length -1].photo,res.data[0])
            setAvaterList(res.data.filter((el:any) =>el.photo != res.data[res.data.length -1].photo))  
        }else{
            setAvaterList(res.data)
            // setIsLoading(false)
            formik.setFieldValue('silent_video_avatar',res.data.filter((el:any) =>el.gender =='female')[0].video)
            formik.setFieldValue('avatar_pic_url',res.data.filter((el:any) =>el.gender =='female')[0].photo)
        }     
        })    
    })    
    const resolveStep = () => {
        return (
            <>
                {step == 0 &&
                    <>
                        <CreatePasswordStep canskip={(action) => {
                            setCanSkips((pre) => {
                                return pre.map((el) => {
                                    if (el.name == "password") {
                                        return {
                                            ...el,
                                            value: action
                                        }
                                    }
                                    return el
                                })
                            })
                        }} onSubmit={() => {
                            setStep(step+1)
                        }}></CreatePasswordStep>
                    </>
                }
                {step == 1 &&
                    <>
                        <InformationStep onSubmit={(gender:string) => {
                            if(uploadedAvater.photo == '' ){
                                formik.setFieldValue('silent_video_avatar',avatarList.filter((el:any) =>el.gender ==gender)[0].video)
                                formik.setFieldValue('avatar_pic_url',avatarList.filter((el:any) =>el.gender ==gender)[0].photo)                            
                            }
                            setStep(step+1)
                        }}></InformationStep>
                    </>
                }      
                {/* {step == 2 &&
                    <>
                        <ContactStep onSubmit={() => {
                            setStep(step+1)
                        }}></ContactStep>
                    </>
                }    */}
                {step == 2&&
                    <>
                        <BusinessStep onSubmit={() => {
                            setStep(step+1)
                        }}></BusinessStep>
                    </>
                }      
                {step == 3 &&
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
                {step == 4 &&
                    <>
                        <CompleteStep setISCreated={setISCreated}></CompleteStep>
                    </>
                }                                                                            
            </>
        )
    }
    return (
        <>
            <div className="w-full h-screen  px-4">
                <div className="h-[98vh] py-5 hiddenScrollBar overflow-y-scroll w-full">
                    {!isCreated &&
                        <div className="flex justify-between items-center w-full">
                            {(authContext.googleInformation!= null && step >1 )||  authContext.googleInformation == null ?
                                <Button onClick={() =>{
                                    if(step>0){
                                        setStep(step -1)
                                    }else{
                                        navigate('/signup')
                                    }
                                }} theme="Carbon-Google" data-mode="profile-review-button-2">
                                    <div className="Carbon-back-Button-vector"></div>
                                </Button>
                                :
                                <div className="invisible">
                                    <Button onClick={() =>{
                                        if(step>0){
                                            setStep(step -1)
                                        }else{
                                            navigate('/signup')
                                        }
                                    }} theme="Carbon-Google" data-mode="profile-review-button-2">
                                        <div className="Carbon-back-Button-vector"></div>
                                    </Button>                        

                                </div>
                            }

                            <div className={`mt-10 ${step>0 && step < 5?'visible':'invisible'}`}>
                                    <StepController
                                        theme="Carbon"
                                        steps={4}
                                        currentStep={step}
                                    ></StepController>                    
                            </div>

                            <div onClick={() => {
                                skipMannager()
                            }} className={`text-text-primary invisible cursor-pointer ${step< 5?'visible':'invisible'} font-semibold`}>Skip</div>
                        </div>
                    }
                    {
                        resolveStep()
                    }

                </div>
            </div>
        </>
    )
}

export default OnBoarding