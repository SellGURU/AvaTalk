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
import { BackIcon } from "../../../../Components";

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
    return (
        <>
            <div className="mt-8">
                <div className="px-5">
                <div className="text-gray-700 text-center font-semibold text-base">
                    Building Your Talking Avatar
                </div>

                <div className="mt-6 flex items-center justify-between">
                    {currentAvatar.video.length > 0 && !isLoading ? (
                    <>
                        <div className="w-[90px] relative object-cover boxShadow-Gray borderBox-Gray  rounded-[6.76px]  border border-white">
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

                        <div className="w-[160px] h-[80px] overflow-hidden object-cover boxShadow-Gray borderBox-Gray rounded-[6.76px]  border border-white">
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
                        <div className="w-[90px] h-[57px] flex justify-center items-center relative object-cover boxShadow-Gray borderBox-Gray  rounded-[6.76px]  border border-white">
                        <RingLoader size={30}></RingLoader>
                        </div>

                        <div>
                        <img
                            className="w-10 h-10"
                            src="./icons/fi-rr-arrow-right.svg"
                            alt=""
                        />
                        </div>

                        <div className="w-[160px] h-[103px] flex justify-center items-center overflow-hidden object-cover boxShadow-Gray borderBox-Gray rounded-[6.76px]  border border-white">
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
                        // setshowGudie(true);
                        }}
                        className="text-[#06B6D4] cursor-pointer"
                    >
                        {" "}
                        picture guidline{" "}
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
                                );
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
                        formik.setFieldValue("avatar_pic_url","")
                        formik.setFieldValue("silent_video_avatar","")
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