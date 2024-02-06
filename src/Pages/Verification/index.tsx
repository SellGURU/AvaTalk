import VerificationInput from "react-verification-input";
import './verification.css';
import { Auth } from "../../Api";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../store/auth-context';
import { useContext } from "react";
import { useConstructor } from "../../help";

const Verification = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext)
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
            <p className="text-gray-500 text-sm mb-1">Enter the 6-digit code we send to</p>
            <p className="text-sm mb-6 font-medium">{authContext.varification.emailOrPhone}</p>
            <div>
            <VerificationInput
                onComplete={(value) => {
                    Auth.login({mobile_number:'',code:value}).then((res) => {
                        authContext.login(res.data.token)
                        navigate("/register");
                    })
                }}
                classNames={{
                    container: "container",
                    character: "character",
                    characterInactive: "character--inactive",
                    characterSelected: "character--selected",
                    characterFilled: "character--filled",
                }}
                inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: "6", 
                }}
            />
            </div>
            <p className="text-sm mt-8 text-violet-700 font-medium">I didn’t receive a code   02:00</p>
            </div>

        </div>
        </>
    )
}

export default Verification;