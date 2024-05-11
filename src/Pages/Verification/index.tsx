/* eslint-disable @typescript-eslint/no-explicit-any */
import VerificationInput from "react-verification-input";
import './verification.css';
import { Auth } from "../../Api";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../store/auth-context';
import { useContext, useState } from "react";
import { boxProvider, useConstructor } from "../../help";
import { Timer } from "../../Components";
import { Box } from "../../Model";
import { toast } from "react-toastify";

const Verification = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext)
    const [completeTimer,setCompleteTimer] = useState(false)
    useConstructor(() => {
        toast.info('your code : 12345')
        if(authContext.varification.emailOrPhone.length == 0){
        setTimeout(() => {
            navigate('/login')
        }, 500);
        }
    })    
    return (
        <>
        <div className="text-center px-4 text-gray-700 flex justify-center">
            <div className="container py-32">
            <img src="/Avatalk Logo.svg" alt="logo" className="w-[49px] h-[54px] mx-auto mb-[30px]" />
            <p className="font-semibold mb-4">verification</p>
            <p className="text-gray-500 text-sm mb-1">Enter the 5-digit code we send to</p>
            <p className="text-sm mb-6 font-medium">{authContext.varification.emailOrPhone}</p>
            <div>
            <VerificationInput
                onComplete={(value) => {
                    let resolvePhoneOrEnail = null
                    if(authContext.varification.emailOrPhone.includes('@')){
                    resolvePhoneOrEnail = {
                        email:authContext.varification.emailOrPhone,
                        entered_code:value
                    }
                    }else {
                    resolvePhoneOrEnail = {
                        mobile_number:authContext.varification.emailOrPhone,
                        entered_code:value
                    }      
                    }                    
                    Auth.login(resolvePhoneOrEnail).then((res) => {
                        console.log(res)
                        if(res.data == null){
                            navigate("/register");
                        }
                        if(res.data == 'Not Registered'){
                            navigate("/register");
                        }else{
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
                                    workEmail:data.information.work_email,
                                    workPhone:data.information.work_mobile_number,
                                    userId:data.information.created_userid
                                })
                                authContext.currentUser.setBox(resolveSocial)
                                navigate("/?splash=true");
                            })                            
                        }
                    })
                }}
                classNames={{
                    container: "container",
                    character: "character",
                    characterInactive: "character--inactive",
                    characterSelected: "character--selected",
                    characterFilled: "character--filled",
                }}
                length={5}
                inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: "5", 
                }}
            />
            </div>
            <p onClick={completeTimer ?() => {
                    setCompleteTimer(false) 
                    toast.info("code is 12345")
            }:undefined} className={`text-sm mt-8 ${completeTimer?'cursor-pointer':'cursor-not-allowed'} flex justify-center text-violet-700 font-medium`}>I didn’t receive a code   
                {
                    !completeTimer?
                        <span className="ml-2"><Timer oncomplete={() => {
                            setCompleteTimer(true)
                        }} initialMinute={2} initialSeconds={1}></Timer></span>
                    :undefined
                }
            </p>
            </div>
            
        </div>
        </>
    )
}

export default Verification;