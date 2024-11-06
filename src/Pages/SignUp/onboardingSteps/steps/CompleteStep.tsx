/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "symphony-ui"
import { BissinesCard } from "../../../../Components"
import { useNavigate } from "react-router-dom";
import { Auth } from "../../../../Api";
import { useAuth } from "../../../../hooks/useAuth";
import { Box } from "../../../../Model";
import { boxProvider } from "../../../../help";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";

const CompleteStep = () => {
    const navigate = useNavigate();
    const authContext = useAuth()
    const videoRef = useRef(null);
    const [step,setStep] = useState(1)
    const [isviewVideo,setIsViewVideo] = useState(false)
    const [totorialVideo,setTotorialVideo] = useState('')
    const handleFullscreen = () => {
    const videoElement:any = videoRef.current;
    if (videoElement) {
        // Trigger fullscreen mode
        if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
        } else if (videoElement.mozRequestFullScreen) { // For Firefox
        videoElement.mozRequestFullScreen();
        } else if (videoElement.webkitRequestFullscreen) { // For Chrome, Safari, and Opera
        videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) { // For IE/Edge
        videoElement.msRequestFullscreen();
        }

        // Optionally auto-play the video when fullscreen is entered
        videoElement.play();
    }
    };  
    const handleFullscreenChange = () => {
        const videoElement:any = videoRef.current;
        if (document.fullscreenElement === null && videoElement) {
        // Exit fullscreen: stop the video and hide it
        videoElement.pause();
        setIsViewVideo(true)
        videoElement.currentTime = 0; // Reset the video to the start
        // navigate("/?splash=false&signup_success=true");
        }
    };  
    const handleVideoEnd = () => {
        // Exit fullscreen when the video ends
        if (document.fullscreenElement) {
        document.exitFullscreen();
        }
        setIsViewVideo(true)
        // navigate("/?splash=false&signup_success=true");
    };
    useEffect(() => {
        // Add event listener for fullscreen change
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        // Clean up the event listener when the component unmounts
        return () => {
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);     
    const complete = (res:any) => {
        if(res.data.access_token){
            setTotorialVideo(res.data.video_link)
            localStorage.setItem("token",res.data.access_token)
            authContext.login(res.data.access_token)
            const resolveSocial: Array<Box> = [];
            Auth.showProfile((data) => {
                data.boxs.map((item:any) => {
                    const newBox = boxProvider(item);
                    resolveSocial.push(newBox);
                })
                authContext.currentUser.updateInformation({
                    firstName:data.information.first_name,
                    lastName:data.information.last_name,
                    phone:data.information.mobile_number,
                    personlEmail:data.information.email,
                    company:data.information.company_name,
                    job:data.information.job_title,
                    banelImage:data.information.back_ground_pic,
                    imageurl:data.information.profile_pic,
                    location:{
                        lat:33,
                        lng:33
                    },
                    unique_id:data.information.unique_id,
                    workEmail:data.information.work_email,
                    workPhone:data.information.work_mobile_number,
                    userId:data.information.created_userid,
                    gender:data.information.gender
                })
                authContext.currentUser.setBox(resolveSocial)
                setStep(2)
            })                                  
            // handleFullscreen()
            //  navigate("/?splash=false");
        }else{
            toast.error(res.data)
        }           
    }
    useEffect(() => {
        if(isviewVideo){
            setTimeout(() => {
                navigate("/?splash=false&signup_success=true");                
            }, 5000);
        }
    })
    return (
        <>
            {
                step == 1 ?
                <>
                    <div className="mt-8">
                        <div className="text-text-primary font-semibold text-center">Your Profile completed.</div>
                        <div className="flex justify-center">
                            <div className="text-[#6B7280] text-[14px] mt-2 text-center w-[256px]">
                                You're all set to start using avatalk .                  
                            </div>
                        </div> 
                        <div className="flex justify-center my-6">
                            <div className="">
                                <BissinesCard></BissinesCard>
                            </div>
                        </div>          
                        <Button onClick={() => {
                            // setStep(2)
                            if(authContext.googleInformation!= null) {
                                Auth.RegisterWithGoogle({
                                    first_name:authContext.siginUpOptions.firstName,
                                    last_name:authContext.siginUpOptions.lastName,
                                    avatar_pic_url:authContext.siginUpOptions.avatar_pic_url,
                                    company_name:authContext.siginUpOptions.company,
                                    google_json:authContext.googleInformation,
                                    email:authContext.siginUpOptions.email,
                                    gender:authContext.siginUpOptions.gender,
                                    job_title:authContext.siginUpOptions.job,
                                    mobile_number:authContext.siginUpOptions.phone,
                                    nfc_id:authContext.nfc_id != ''?authContext.nfc_id :null,
                                    profile_pic:authContext.siginUpOptions.avatar_pic_url,
                                    silent_video_avatar:authContext.siginUpOptions.silent_video_avatar,
                                    referral_code:authContext.refrealCode                         
                                }).then((res) => {
                                    complete(res)
                                })
                            }else {
                                Auth.register({
                                    first_name:authContext.siginUpOptions.firstName,
                                    last_name:authContext.siginUpOptions.lastName,
                                    avatar_pic_url:authContext.siginUpOptions.avatar_pic_url,
                                    company_name:authContext.siginUpOptions.company,
                                    confirm_password:authContext.siginUpOptions.conFirmPassword,
                                    password:authContext.siginUpOptions.password,
                                    email:authContext.siginUpOptions.email,
                                    gender:authContext.siginUpOptions.gender,
                                    job_title:authContext.siginUpOptions.job,
                                    mobile_number:authContext.siginUpOptions.phone,
                                    nfc_id:authContext.nfc_id != ''?authContext.nfc_id :null,
                                    profile_pic:authContext.siginUpOptions.avatar_pic_url,
                                    silent_video_avatar:authContext.siginUpOptions.silent_video_avatar,
                                    referral_code:authContext.refrealCode
                                }).then((res) => {
                                    complete(res)
                                })                    
                            }
                        
                        }} theme="Carbon">Get Started</Button>      
                    </div>        
                
                </>
                :
                <>
                <div className="mt-8">
                    <div className="text-text-primary font-semibold text-center">Welcome to Avatalk!</div>
                    <div className="flex justify-center">
                        <div className="text-[#6B7280] text-[14px] mt-2  text-justify px-4">
                            Whether it’s a quick chat or staying updated with your contact, AVATALK makes it easy to stay connected with everyone who matters.              
                        </div>
                    </div>    

                    <div className="px-4 mt-8">
                        <div className={"Carbon-ContentCard-Container text-right  space-y-5 w-full"} style={{width:'100%',boxShadow:'4px 4px 20px 0px #886FB069'}}>
                            <div className={"space-y-5 w-full"}>
                                <video onPlay={handleFullscreen} id={'welcomVideo'} onEnded={() => handleVideoEnd()} ref={videoRef}   poster={'./icons/baner.png'} className={"rounded-xl w-full h-[180px]"}   controls>
                                    <source src={totorialVideo} type="video/mp4"/>
                                </video>
                                <p className={"text-[12px] text-[#374151] font-normal text-left"}>
                                    Have a quick look at the features of Avatalk to learn how to use it
                                </p>
                            </div>
 
                        </div>                        
                    </div>

                    <div className="flex justify-start px-4 mt-8">
                        <div className="text-[#6B7280] text-[14px] mt-2  text-justify ">
                            Prefer to explore on your own? <span onClick={() => {
                               navigate("/?splash=false&signup_success=true");
                            }} className="text-[#31C1DB] cursor-pointer underline">Skip for now</span> 
                            <div>You can watch this anytime in the Help section.      </div>   
                        </div>
                    </div>             
                </div>
                {/* <video onEnded={handleVideoEnd}  ref={videoRef} src={'https://codieblob.blob.core.windows.net/avatalk/Videos/full_tut.mp4'} style={{display:isVisible?'block':'none'}} /> */}
                </>
            }
        </>
    )
}

export default CompleteStep