/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "symphony-ui"
import { BissinesCard } from "../../../../Components"
import { useNavigate } from "react-router-dom";
import { Auth } from "../../../../Api";
import { useAuth } from "../../../../hooks/useAuth";
import { Box } from "../../../../Model";
import { boxProvider } from "../../../../help";
import { toast } from "react-toastify";

const CompleteStep = () => {
    const navigate = useNavigate();
    const authContext = useAuth()
    return (
        <>
            <div className="mt-8">
                <div className="text-text-primary font-semibold text-center">Your Profile completed</div>
                <div className="flex justify-center">
                    <div className="text-[#6B7280] text-[14px] mt-2 text-center w-[256px]">
                        You're all set to start using avatalk                   
                    </div>
                </div> 
                <div className="flex justify-center my-6">
                    <div className="">
                        <BissinesCard></BissinesCard>
                    </div>
                </div>          
                <Button onClick={() => {
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
                            if(res.data.access_token){
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
                                })                                  
                                 navigate("/?splash=false");
                            }else{
                                toast.error(res.data)
                            }                            
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
                            if(res.data.access_token){
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
                                        unique_id:data.information.unique_id,
                                        banelImage:data.information.back_ground_pic,
                                        imageurl:data.information.profile_pic,
                                        location:{
                                            lat:33,
                                            lng:33
                                        },
                                        workEmail:data.information.work_email,
                                        workPhone:data.information.work_mobile_number,
                                        userId:data.information.created_userid,
                                        gender:data.information.gender
                                    })
                                    authContext.currentUser.setBox(resolveSocial)
                                })                                  
                                 navigate("/?splash=false&signup_success=true");
                            }else{
                                toast.error(res.data)
                            }
                        })                    
                    }
                   
                }} theme="Carbon">Get Started</Button>         
            </div>        
        </>
    )
}

export default CompleteStep