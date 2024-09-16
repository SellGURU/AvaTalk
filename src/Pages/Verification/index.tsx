/* eslint-disable @typescript-eslint/no-explicit-any */
import VerificationInput from "react-verification-input";
import './verification.css';
import { Auth } from "../../Api";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../store/auth-context';
import { useContext, useState } from "react";
import {  useConstructor } from "../../help";
import { Timer } from "../../Components";
import { toast } from "react-toastify";

const Verification = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext)
    const [completeTimer,setCompleteTimer] = useState(false)
    useConstructor(() => {
        // toast.info('your code : 12345')
        // if(authContext.varification.emailOrPhone.length == 0){
        // setTimeout(() => {
        //     navigate('/login')
        // }, 500);
        // }
    })    
    return (
        <>
        <div className="text-center px-4 text-gray-700 flex justify-center">
            <div className="container py-32">
            <img src="/Avatalk Logo.svg" alt="logo" className="w-[49px] h-[54px] mx-auto mb-[30px]" />
            <p className="font-semibold mb-4">Verification</p>
            <p className="text-gray-500 text-sm mb-1">Enter the 5-digit code we sent to</p>
            <p className="text-sm mb-6 font-medium">{authContext.varification.emailOrPhone}</p>
            <div>
            <VerificationInput
                onComplete={(value) => {
                    // let resolvePhoneOrEnail = null
                    Auth.check_login_code({
                        code_type:'reset',
                        email:authContext.varification.emailOrPhone,
                        entered_code:value
                    }).then((res) => {
                        if(res.data.check_code == true){
                            navigate("/resetPassword")
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
                    Auth.get_Login_code({
                        email:authContext.varification.emailOrPhone,
                        code_type:'verification'                        
                    }).then((res) => {
                        toast.info(res.data)
                    })
            }:undefined} className={`text-sm mt-8 flex justify-center items-center ${completeTimer?'cursor-pointer':'cursor-not-allowed'} flex justify-center text-violet-700 font-medium`}>I didn’t receive a code   
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