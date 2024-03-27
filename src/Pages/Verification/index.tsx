import VerificationInput from "react-verification-input";
import './verification.css';
import { Auth } from "../../Api";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../store/auth-context';
import { useContext, useState } from "react";
import { useConstructor } from "../../help";
import { Timer } from "../../Components";

const Verification = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext)
    const [completeTimer,setCompleteTimer] = useState(false)
    useConstructor(() => {
        if(authContext.varification.emailOrPhone.length == 0){
        setTimeout(() => {
            navigate('/login')
        }, 200);
        }
    })    
    return (
        <>
        <div className="text-center px-4 text-gray-700 flex justify-center">
            <div className="container py-32">
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
                        if(res.data == 'Not Registered'){
                            navigate("/register");
                        }else{
                            authContext.login(res.data.access_token)
                            setTimeout(() => {
                                navigate("/?splash=false");
                            }, 300);
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
            <p onClick={() => {
                completeTimer ? setCompleteTimer(false) : undefined
            }} className={`text-sm mt-8 ${completeTimer?'cursor-pointer':'cursor-not-allowed'} flex justify-center text-violet-700 font-medium`}>I didn’t receive a code   
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