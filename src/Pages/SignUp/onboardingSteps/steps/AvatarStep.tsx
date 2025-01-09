/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import useModalAutoClose from "../../../../hooks/useModalAutoClose";
import { BeatLoader, RingLoader } from "react-spinners";
import { Button } from "symphony-ui";
import { toast } from "react-toastify";
import { Auth } from "../../../../Api";
import { useAuth } from "../../../../hooks/useAuth";
import CropperBox from "../../../../Components/CropperBox";
import { AddAvatar } from "../../../../Components/__Modal__";
import Camera from "react-html5-camera-photo";
import { BackIcon, BissinesCard } from "../../../../Components";
import { useConstructor } from "../../../../help";
interface AvatarStepProps {
    onSubmit:() => void
    avatarList:Array<Avatars>
    uploadedAvater:Avatars
    formik:any
    setUploadedAvater:(avatar:Avatars) => void
}

interface Avatars {
  photo: string;
  video: string;
  gender?:string
  type: "Api" | "Local";
}

const AvatarStep:React.FC<AvatarStepProps> = ({onSubmit,avatarList,uploadedAvater,formik,setUploadedAvater}) => {
    const [isLoading, setIsLoading] = useState(false);
    const authContext = useAuth()
    // const navigate = useNavigate();
    const [openCamera,setOpenCamera] = useState(false);
    const [currentAvatar,setCurrentAvatr] = useState<Avatars>({
        photo:"",
        type:'Local',
        video:''
    })
    // const formik = useFormik({
    //     initialValues:{
    //         avatar_pic_url:'',
    //         silent_video_avatar:'',
    //         gender:'Male'
    //     },
    //     onSubmit:() => {}
    // })
    const [asktakePhoto,setAskTakePhoto] = useState(false)
    const [Cropper, setCropper] = useState("");
    const handleTakePhoto =  (dataUri:string) => {
        // Do stuff with the photo...
        console.log(dataUri);
        setTimeout(() => {
        setOpenCamera(false)
        setCropper(dataUri)
        }, 1000);
    }  
    // const authContext = useAuth();
    const [addAvatar,setAddAvatar] =useState(false)  
    useEffect(() => {
        setCurrentAvatr({
        photo:"",
        type:"Api",
        video:""
        })
        setTimeout(() => {
        setCurrentAvatr({
            photo:formik.values.avatar_pic_url,
            type:'Api',
            video:formik.values.silent_video_avatar
        })      
        }, 300);
    },[formik.values.avatar_pic_url, formik.values.silent_video_avatar]) 
    const addAvatarRef =useRef<HTMLDivElement>(null)
    useModalAutoClose({
        refrence:addAvatarRef,
        close:() => {
        setAddAvatar(false)
        }
    })     
    const [showGudieLine,setShowGudieLine] = useState(false)
    const [isHaveImage,setIsHaveImgae] = useState(false)
    useConstructor(() => {
        if(uploadedAvater.photo!=''){
            setIsHaveImgae(true)
        }
    })
    return (
        <>
            <div className={`w-full ${showGudieLine?'visible':'hidden'} relative top-[0px] h-dvh z-40 bg-white hiddenScrollBar overflow-y-scroll`}>
                <div>
                <div
                    className={`text-gray-700  ${
                    window.innerWidth < 332 ? "mt-12" : "mt-2"
                    } ${
                    window.innerWidth < 420 ? "text-center" : "text-center"
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
                    <div className="text-gray-700 text-left font-semibold text-[14px]">
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
                        <div className=" text-[#374151] text-justify text-[12px] font-normal font-poppins">
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
                        <div className=" text-[#374151] text-justify text-[12px] font-normal font-poppins">
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
                        <div className=" text-[#374151] text-justify text-[12px] font-normal font-poppins">
                        Look directly into the camera to establish a clear,
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
            {!showGudieLine &&
                <>
                {isHaveImage?
                        <div className="mt-8">
                            <div className="px-5">
                                <div className="text-gray-700 text-center font-semibold text-base">
                                    Building Your Talking Avatar
                                </div>             
                                <div className="text-[#6B7280] text-[14px] text-center mt-2">You can edit your informations</div>
                                <div className="flex justify-center relative mt-6">
                                    <BissinesCard></BissinesCard>
                                </div>          

                                <div className="mt-6 flex items-center justify-between">
                                    {currentAvatar.video.length > 0 && !isLoading ? (
                                        <>
                                            <div className="w-[90px] h-[90px] relative object-cover boxShadow-Gray borderBox-Gray  rounded-[6.76px]  border border-white">
                                            <div className="absolute -right-1 -top-1 w-[14px] h-[14px] rounded-full flex items-center bg-green-500 justify-center">
                                                <img src="./icons/Vector.svg" alt="" />
                                            </div>
                                            <img
                                                className=" w-full rounded-[6.76px] h-full"
                                                src={formik.values.avatar_pic_url}
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

                                            <div className="w-[160px] h-[160px] relative overflow-hidden object-cover boxShadow-Gray borderBox-Gray rounded-[6.76px]  border border-white">
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
                                                    src={formik.values.silent_video_avatar}
                                                    type="video/mp4"
                                                    ></source>
                                                </video>
                                                <div onClick={() => {
                                                    setIsHaveImgae(false)
                                                }} className="absolute w-8 h-8 right-0 cursor-pointer rounded-full bg-white flex justify-center top-0">
                                                    <img className="w-6" src="./Carbon/user-edit2.svg" alt="" />
                                                </div>
                                            </div>
                                        </>
                                    ) : 
                                    <>
                                        <div className="w-[90px] h-[90px] flex justify-center items-center relative object-cover boxShadow-Gray borderBox-Gray  rounded-[6.76px]  border border-white">
                                        <RingLoader size={30}></RingLoader>
                                        </div>

                                        <div>
                                        <img
                                            className="w-10 h-10"
                                            src="./icons/fi-rr-arrow-right.svg"
                                            alt=""
                                        />
                                        </div>

                                        <div className="w-[160px] h-[160px] flex justify-center items-center overflow-hidden object-cover boxShadow-Gray borderBox-Gray rounded-[6.76px]  border border-white">
                                        <RingLoader></RingLoader>
                                        </div>
                                    </>            
                                    }                            
                                </div>     

                                <div className="mt-6 text-justify text-[#374151] text-[14px]">
                                    Your avatar has been created using your profile picture. Also, you can choose to upload a new photo or select from the default avatars. <span onClick={() => {
                                        setShowGudieLine(true)
                                    }} className="text-[#06B6D4] cursor-pointer">Photo Guidelines</span>                            
                                </div>       
                                <div className="mt-6">
                                    <Button onClick={() =>{
                                        onSubmit()                                
                                    }} theme="Carbon">Continue</Button>
                                </div>                     
                            </div>
                        </div>
                        :

                    <div className="mt-8">
                        <div className="px-5">
                        <div className="text-gray-700 text-center font-semibold text-base">
                            Building Your Talking Avatar
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            {currentAvatar.video.length > 0 && !isLoading ? (
                                <>
                                    <div className="w-[90px] h-[90px] relative object-cover boxShadow-Gray borderBox-Gray  rounded-[6.76px]  border border-white">
                                        <div className="absolute -right-1 -top-1 w-[14px] h-[14px] rounded-full flex items-center bg-green-500 justify-center">
                                        <img src="./icons/Vector.svg" alt="" />
                                        </div>
                                        <img
                                        className=" w-full rounded-[6.76px] h-full"
                                        src={formik.values.avatar_pic_url}
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

                                    <div className="w-[130px] h-[130px] overflow-hidden object-cover boxShadow-Gray borderBox-Gray rounded-[6.76px]  border border-white">
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
                                            src={formik.values.silent_video_avatar}
                                            type="video/mp4"
                                        ></source>
                                        </video>
                                    </div>
                                </>
                            ) : 
                            <>
                                <div className="w-[90px] h-[90px] flex justify-center items-center relative object-cover boxShadow-Gray borderBox-Gray  rounded-[6.76px]  border border-white">
                                <RingLoader size={30}></RingLoader>
                                </div>

                                <div>
                                <img
                                    className="w-10 h-10"
                                    src="./icons/fi-rr-arrow-right.svg"
                                    alt=""
                                />
                                </div>

                                <div className="w-[130px] h-[130px] flex justify-center items-center overflow-hidden object-cover boxShadow-Gray borderBox-Gray rounded-[6.76px]  border border-white">
                                <RingLoader></RingLoader>
                                </div>
                            </>            
                            }
                        </div>

                        <div>
                            <div className="text-[#374151] text-[14px] opacity-80 mt-8 text-justify">
                            Upload an image of yourself or choose among default picture
                            profile.{" "}
                            <span
                                onClick={() => {
                                    setShowGudieLine(true)
                                }}
                                className="text-[#06B6D4] cursor-pointer"
                            >
                                {" "}
                                Photo Guideline{" "}
                            </span>
                            </div>
                        </div>

                        <div className="w-full gap-8 mt-5 grid grid-cols-3 md:grid-cols-4 grid-flow-row">
                            <div
                            className="w-full  relative boxShadow-Gray flex justify-center items-center cursor-pointer borderBox-Gray rounded-[12px] "
                            onClick={() => {
                                if(uploadedAvater.photo.length != 0){
                                    // setAvatarVideo("")
                                    setTimeout(() => {
                                    // setAvatarVideo(uploadedAvater.video)
                                    formik.setFieldValue("avatar_pic_url",uploadedAvater.photo);
                                    formik.setFieldValue("silent_video_avatar",uploadedAvater.video);                      
                                    }, 300);
                                    // setSelectedAvatar(uploadedAvater.photo)
                                }else{
                                setAddAvatar(true)

                                }
                            }}
                            >
                                <div onClick={() => {
                                setAddAvatar(true)
                                }} className={`${
                                    uploadedAvater.photo.length > 0 ? "absolute rounded-full w-[30px] h-[30px] bg-white flex justify-center items-center -right-1 -top-1" : ""
                                }`}>
                                <img
                                className="w-[20px] h-[20px]"
                                src="./icons/gallery-add.svg"
                                alt=""
                                />
                            </div>
                            {uploadedAvater.photo.length > 0 ? (
                                <img className="w-full h-full rounded-[12px]" src={uploadedAvater.photo} alt="" />
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
                            {avatarList.filter(e => e.gender == authContext.siginUpOptions.gender).map((el) => {
                            return (
                                <>
                                <div
                                    onClick={() => {
                                    // setSelectedAvatar(el.photo);
                                    // setAvatarVideo("");
                                    if (el.video == "") {
                                        setIsLoading(true);
                                        toast.loading('Creating your Avatalk')
                                        Auth.createAvatarVideo(el.photo as string).then(
                                        (response) => {
                                            formik.setFieldValue(
                                            "avatar_pic_url",
                                            response.data.avatar_pic_link
                                            );
                                            // setAvatarVideo(response.data.silent_video_link);
                                            formik.setFieldValue(
                                            "silent_video_avatar",
                                            response.data.silent_video_link
                                            );
                                            setIsLoading(false);
                                        }
                                        ).finally(() => {
                                            setIsLoading(false)
                                        });
                                    } else {
                                        formik.setFieldValue("avatar_pic_url", el.photo);
                                        formik.setFieldValue("silent_video_avatar", el.video);
                                    }
                                    // Auth.createAvatarVideo(el).then((res) => {
                                    //   setAvatarVideo(res.data)
                                    //   formik.setFieldValue('silent_video_avatar',res.data)
                                    // })
                                    }}
                                    className={`w-full ${
                                    el.photo == formik.values.avatar_pic_url
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
                        <div className="mt-8 mb-3 px-4">
                        <Button
                            // disabled={formik.values.silent_video_avatar.length == 0}
                            onClick={() => {
                                onSubmit()
                            }}
                            theme="Carbon"
                        >
                            Continue
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
                            setAskTakePhoto(false)
                            // setSelectedAvatar(resolve as string);
                            
                            setIsLoading(true);
                            toast.loading('Creating your Avatalk')
                            Auth.createAvatarVideo(resolve as string).then((response) => {
                            if(response.data == 'No face detected' || !response.data.avatar_pic_link){
                            toast.warn(response.data )
                            setIsLoading(false)
                            }else{
                            formik.setFieldValue(
                                "avatar_pic_url",
                                response.data.avatar_pic_link
                            );
                            setUploadedAvater({
                                photo:response.data.avatar_pic_link as string,
                                type:'Local',
                                video:response.data.silent_video_link
                            })
                            // setAvatarVideo(response.data.silent_video_link);
                            formik.setFieldValue(
                                "silent_video_avatar",
                                response.data.silent_video_link
                            );
                            setIsLoading(false);

                            }              
                            }).finally(() => {
                                setIsLoading(false)
                            });
                        }}
                        onCancel={() => {
                            setCropper("");
                            if(asktakePhoto){
                            setOpenCamera(true)
                            }
                        }}
                        ></CropperBox>
                        {addAvatar?
                        <div className="absolute z-40 left-0  bottom-0 w-full flex justify-center items-center">
                            <AddAvatar
                            refEl={addAvatarRef}
                            onTakePhoto={() => {
                                setAddAvatar(false)
                                setOpenCamera(true)
                                setAskTakePhoto(true)
                            }}
                            isCanRemove={uploadedAvater.photo.length>0}
                            onRemove={() => {
                                // setSelectedAvatar("")
                                setUploadedAvater({
                                photo:'',
                                type:'Local',
                                video:""
                                })
                                
                                setAddAvatar(false)
                                // setAvatarVideo("")
                                formik.setFieldValue("avatar_pic_url", avatarList.filter(e => e.gender == authContext.siginUpOptions.gender)[0].photo);
                                formik.setFieldValue("silent_video_avatar", avatarList.filter(e => e.gender == authContext.siginUpOptions.gender)[0].video);
                            }}
                            name={"modal name"}
                            value={"editeValue"}
                            theme="Carbon"
                            isOpen={addAvatar}
                            onClose={() => {
                                setAddAvatar(false);
                            }}
                            onComplete={(data:any) => {

                                    // setAvatarVideo("");
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
                        :
                        undefined}
                        {addAvatar?
                            <div className="absolute w-full z-10 h-full bg-black opacity-60 top-0 left-0"></div>          
                        :undefined}                
                    </div>
                }
                </>
            }     
            {openCamera?
            <>
                <div className="absolute w-full z-40 flex justify-center items-center h-dvh top-0 left-0">
                    <div className="max-w-xl relative h-dvh flex justify-center items-center">
                    <Camera
                        isImageMirror
                        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                    />      
                    <div className="absolute z-50 top-7 left-[-4px]">
                        <BackIcon title="" action={()=>{setOpenCamera(false)}} theme="Carbon"></BackIcon>
                    </div>        

                    </div>
                </div>
                <div className="absolute w-full z-10 h-full bg-black opacity-60 top-0 left-0"></div>
            </>
            :
            undefined}            
        </>
    )
}

export default AvatarStep