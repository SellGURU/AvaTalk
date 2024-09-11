/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox} from "symphony-ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Auth } from "../../Api";
import { AuthContext } from "../../store/auth-context";
import { useContext, useEffect, useState } from "react";
import Splash from "../../Components/Splash";
import { TextField } from "../../Components";
import { useGoogleLogin} from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import { Box } from "../../Model";
import { boxProvider, useConstructor } from "../../help";
import { toast } from "react-toastify";
import axios from "axios";
import {LinkedIn} from "react-linkedin-login-oauth2";

const initialValue = {
  email: "",
  password:""
};

const validateEmail = (email: string | undefined) => {
   return Yup.string().email().isValidSync(email)
};
const PosEnd = (id:string) => {
    const input:HTMLInputElement = document.getElementById(id)  as HTMLInputElement
    input?.focus()
    const val = input.value; //sttore the value of the element
    input.value = ''; //clear the value of the element
    input.value = val; //set that value back.      
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
      .required('Email  is required')
      .test('email', 'Email  is invalid', (value) => {
         return validateEmail(value) 
      }),
      password:Yup.string().min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),
  
});

const Login = () => {
  const navigate = useNavigate();
  const [parametr] = useSearchParams() 
  const [showSplash,setshowSplash] = useState(true);
  const authContext = useContext(AuthContext)
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  function handleSubmit() {
    // const resolvePhoneOrEnail = {
    //   email:formik.values.email
    // }
    Auth.login({
      password:formik.values.password,
      email:formik.values.email
    }).then((res) => {
      if(res.data.error){
        // toast.error(res.data.error)
        if(res.data.error == 'This user is not registered'){
          formik.setFieldError("email",res.data.error)
        }
        if(res.data.error == 'The password you have entered is wrong'){
          formik.setFieldError("password",res.data.error)
        }        
      }
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
                  workEmail:data.information.work_email,
                  workPhone:data.information.work_mobile_number,
                  userId:data.information.created_userid
              })
              authContext.currentUser.setBox(resolveSocial)
              navigate("/?splash=true");
          })          
      }
    })
    // Auth.get_Login_code(resolvePhoneOrEnail).then((res) => {
    //   toast.info(res.data)
    //   authContext.verificationHandler({
    //     emailOrPhone: formik.values.email,
    //     googleJson:{}
    //   })
    //   authContext.setReferalCode(parametr.get("referral") as string)
    //   navigate('/Verification')
    // })
  }
  const [isRememberMe,setIsRememberMe]= useState(false)
  setTimeout(() => {
    setshowSplash(false)
  }, 3000);
  useConstructor(() => {
    localStorage.clear()
    // localStorage.setItem("token",'')
    authContext.setNfc_id(parametr.get('nfc_id'))
  })
  useEffect(() => {
    if(document.getElementById("phoneField")){
      PosEnd("phoneField")
      // alert("posEnd")
    }
  })
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        Auth.loginWithGoogle(
          {
            google_json:userInfo.data
          },
        ).then((res) => {
          authContext.setReferalCode(parametr.get("referral") as string)
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
                    workEmail:data.information.work_email,
                    workPhone:data.information.work_mobile_number,
                    userId:data.information.created_userid
                })
                authContext.currentUser.setBox(resolveSocial)
                navigate("/?splash=true");
            })                                                   
          }else{
            toast.error(res.data)
          }
        });    
        console.log('User Info:', userInfo.data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    },
    onError: (error) => {
      console.log('Login Failed:', error);
    },
  });



    const [, setCode] = useState('');
    const [, setErrorMessage] = useState('');

    const handleSuccessLinkedIn = (data:any) => {
        setCode(data.code);
        console.log('Code: ', data.code);
    };

    const handleFailureLinkedIn = (error:any) => {
        setErrorMessage(error.errorMessage);
        console.log('Error: ', error.errorMessage);
    };

  return (
    <>
      {showSplash ?
              <Splash theme="Carbon"></Splash>
          :
        <>
              <div className="w-full px-4">
                <img src="/Avatalk Logo.svg" alt="logo" className="w-[49px] h-[54px] mx-auto mb-[30px]" />
                <div className="w-full flex justify-center">
                  <div className="text-base mb-6 text-gray-700 font-semibold max-w-[256px] text-center">Enter Your Email Address and Password to Login</div>
                </div>

                <div className="mb-2">
                  <TextField  {...formik.getFieldProps("email")} theme="Carbon" name="email" errorMessage={formik.errors?.email} placeholder="Enter your email address" type="email" inValid={formik.errors?.email != undefined && (formik.touched?.email as boolean)}></TextField>
                </div>
                <div className="mb-4">
                  <TextField  {...formik.getFieldProps("password")} theme="Carbon" name="password" errorMessage={formik.errors?.password} placeholder="Enter your password" type="password" inValid={formik.errors?.password != undefined && (formik.touched?.password as boolean)}></TextField>
                </div>    

                <div className="flex justify-between w-full px-2 mb-4 ">
                  <div>
                    <Checkbox theme="Carbon" label={'Remember me'} checked={isRememberMe} onChange={() => {setIsRememberMe(!isRememberMe)}}></Checkbox>
                  </div>

                  <div onClick={() => {
                    navigate("/forgetPassword")
                  }} className="text-[14px] text-[#06B6D4] cursor-pointer">
                    Forgot Password?
                  </div>
                </div>            
                <Button
                  onClick={handleSubmit}
                  //     () => {
                  //     navigate("/Verification");
                  //   }
                  // }
                  disabled={!formik.isValid || formik.values.password.length <= 4}
                  theme="Carbon"
                >
                  Login
                </Button>
                <div className="text-[14px] text-[#374151] text-center mt-4">
                 Don't have an account? <span onClick={() => {
                    navigate('/signup')
                  }} className="text-[#06B6D4] cursor-pointer">Sign Up</span> 
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
                
                <div className="flex items-center justify-center mt-4">
                
                    <Button onClick={() => handleGoogleLogin()} theme="Carbon-google" className="flex justify-center boxShadow-Gray items-center borderBox-primary2 w-full disabled:cursor-not-allowed leading-[19.36px] text-[14px] font-[500]  rounded-[27px] h-[44px]">
                      <img className="mr-2 w-5 h-5" src="./Carbon/Google.svg" alt="" />
                      <div className="text-text-primary">Login with Google</div>
                    </Button>
                </div>
                  <LinkedIn
                      clientId="786lwqvw2unoip"
                      redirectUri="https://linkedin-callback.vercel.app/"
                      // redirectUri={`http://localhost:5173/linkedin/callback`}
                      onSuccess={handleSuccessLinkedIn}
                      onError={handleFailureLinkedIn}
                      scope={"profile,email"}
                      children={
                          ({linkedInLogin}) => <div className="mt-4">
                              <Button theme="Carbon-Outline"
                                      onClick={linkedInLogin}
                                      className="flex justify-center boxShadow-Gray items-center borderBox-primary2 w-full disabled:cursor-not-allowed leading-[19.36px] text-[14px] font-[500]  rounded-[27px] h-[44px]">
                                  <img className="mr-2 w-5 h-5" src="./Carbon/linkedin.png" alt=""/>

                                  <div className="text-text-primary">Login with LinkedIn</div>
                              </Button>
                          </div>
                      }/>

                  <div className="mt-4">
                      <Button theme="Carbon-Outline"
                              className="flex justify-center boxShadow-Gray items-center borderBox-primary2 w-full disabled:cursor-not-allowed leading-[19.36px] text-[14px] font-[500]  rounded-[27px] h-[44px]">
                          <img className="mr-2 w-5 h-5" src="./Carbon/Apple.svg" alt=""/>
                          <div className="text-text-primary">Login with Apple</div>
                      </Button>
                  </div>
              </div>
        </>
      }
    </>
  );
};
export default Login;
