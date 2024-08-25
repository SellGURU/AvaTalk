import { useContext, useState } from "react";
import {BissinesCard, Splash, TextField} from "../../Components";
import { Button } from "symphony-ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Auth } from "../../Api";
import { AuthContext } from "../../store/auth-context";
import { useNavigate, useSearchParams } from "react-router-dom";

const initialValue = {
  email: "",
};

const validateEmail = (email: string | undefined) => {
   return Yup.string().email().isValidSync(email)
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
      .required('Email is required')
      .test('email', 'Email is invalid', (value) => {
         return validateEmail(value)
      })
});

const SignUp = () => {
    const [showSplash, setshowSplash] = useState(true);
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const [parametr] = useSearchParams()     
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });    
    setTimeout(() => {
        setshowSplash(false)
    }, 3000);    
    const handleSubmit = () => {
        let resolvePhoneOrEnail = null
        if(formik.values.email.includes('@')){
            resolvePhoneOrEnail = {
                email:formik.values.email
            }
        }else {
            resolvePhoneOrEnail = {
                mobile_number:formik.values.email
            }      
        }
        Auth.get_Login_code(resolvePhoneOrEnail).then(() => {
            authContext.verificationHandler({
                emailOrPhone: formik.values.email,
                googleJson:{}
            })
            authContext.siginupHandler({
                email:formik.values.email
            })
            authContext.setReferalCode(parametr.get("referral") as string)
            navigate('/RVerification')
        })
    }    
    return (
        <>
            {showSplash ?
                    <Splash theme="Carbon"></Splash>
                :      
                <>
                    <div className="w-full px-4">
                        <div className="text-text-primary text-base font-semibold text-center">Create Your Avatalk</div>
                        <div className="flex justify-center mt-6">
                            <div className="">
                                <BissinesCard></BissinesCard>
                            </div>
                        </div>

                        <div className="mt-6">
                            <TextField  {...formik.getFieldProps("email")} errorMessage={formik.errors?.email}  placeholder="Enter your email address..." inValid={formik.errors?.email != undefined && (formik.touched?.email as boolean)} name="email"  type="email"  theme="Carbon"></TextField>
                        </div>
                        <div className="mt-4">
                            <Button onClick={handleSubmit} disabled={!formik.isValid || formik.values.email.length <= 4} theme="Carbon">Sign up</Button>
                        </div>
                        <div className="mt-4">
                            <div className="text-sm text-center text-text-primary">Already have an account?<span className="text-[#06B6D4] cursor-pointer"> Login</span></div>
                        </div>

                        <div className="flex w-full items-center mt-6">
                        <div style={{ background: "linear-gradient(to left,rgba(227, 227, 238, 0.5) 0% ,rgba(255, 255, 255, 0.5) 95%,rgba(255, 255, 255, 0.5) 100%)" }} className="w-full h-[4px]">
                            <div style={{ background: "linear-gradient(to top,rgba(255, 255, 255, 1) 0% ,rgba(255, 255, 255, 0) 100%)" }} className="w-full h-[4px]"></div>
                        </div>
                        <div className="px-3 text-[#8290a3] text-sm font-medium">or</div>
                        <div style={{ background: "linear-gradient(to right,rgba(227, 227, 238, 0.5) 0% ,rgba(255, 255, 255, 0.5) 95%,rgba(255, 255, 255, 0.5) 100%)" }} className="w-full h-[4px]">
                            <div style={{ background: "linear-gradient(to bottom,rgba(255, 255, 255, 1) 0% ,rgba(255, 255, 255, 0) 100%)" }} className="w-full h-[4px]"></div>
                        </div>
                        </div>                        
                    </div>
                </>
            }  
        </>
    )
}

export default SignUp