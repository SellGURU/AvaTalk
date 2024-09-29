/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import {BissinesCard, Splash, TextField} from "../../Components";
import { Button } from "symphony-ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Auth } from "../../Api";
import { AuthContext } from "../../store/auth-context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useConstructor } from "../../help";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { BeatLoader } from "react-spinners";


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
    const [isLoading,setIsLoading] = useState(false)
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
        try {
            const userInfo =  axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                },
            });
            // console.log(userInfo)
            userInfo.then((value) => {
                console.log(value)
                Auth.check_user_existence({
                    google_json:value.data,
                }).then(res => {
                    if(res.data.check_user == true){
                        authContext.setGoogleInformation(value.data)
                        navigate('/createAccount')
                    }else {
                        toast.error("user exist")
                    }
                })
            })
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
        },
        onError: (error) => {
        console.log('Login Failed:', error);
        },
    });     
    setTimeout(() => {
        setshowSplash(false)
    }, 3000);    
    const handleSubmit = () => {
        setIsLoading(true)
        Auth.check_user_existence({
            email:formik.values.email,
            code_type:'verification'
        }).then((res) => {
            console.log(res)
            if(res.data.error){
                formik.setFieldError("email",res.data.error)
                setIsLoading(false)
            }
            if(res.data.check_user ==true){
                Auth.get_Login_code({
                    code_type:'verification',
                    email:formik.values.email
                }).then(() => {
                    authContext.verificationHandler({
                        emailOrPhone: formik.values.email,
                        googleJson:null
                    })
                    authContext.setGoogleInformation(null)
                    authContext.siginupHandler({
                        email:formik.values.email
                    })
                    setIsLoading(false)
                    console.log(parametr.get("referral"))
                    authContext.setReferalCode(parametr.get("referral") as string)
                    navigate('/RVerification')
                }).catch(() => {
                    setIsLoading(false)
                })                
            }
        }).catch(() => {
            setIsLoading(false)
        })
        // let resolvePhoneOrEnail = null
        // if(formik.values.email.includes('@')){
        //     resolvePhoneOrEnail = {
        //         email:formik.values.email
        //     }
        // }else {
        //     resolvePhoneOrEnail = {
        //         mobile_number:formik.values.email,
                
        //     }      
        // }
        // Auth.get_Login_code({
        //     password:""
        // }).then(() => {
        //     authContext.verificationHandler({
        //         emailOrPhone: formik.values.email,
        //         googleJson:{}
        //     })
        //     authContext.siginupHandler({
        //         email:formik.values.email
        //     })
        //     authContext.setReferalCode(parametr.get("referral") as string)
        //     navigate('/RVerification')
        // })
    }    
    useConstructor(() => {
        authContext.siginupHandler({
            firstName:'',
            gender:'',
            email:'',
            lastName:'',
            phone:'',
            job:'',
            company:'',
            avatar_pic_url:'',
            conFirmPassword:'',
            password:'',
            silent_video_avatar:''
        })          
    })
    useEffect(() => {
        const handleMessage = (event:any) => {
        if (event.data.type === 'linkedin-auth-success') {
            // Handle the received token
            const { info } = event.data;
            Auth.check_user_existence({
                google_json:info,
            }).then(res => {
                if(res.data.check_user == true){
                    authContext.setGoogleInformation(info)
                    navigate('/createAccount')
                }else {
                    toast.error("user exist")
                }
            })
        }
        };

        window.addEventListener('message', handleMessage);

        return () => {
        window.removeEventListener('message', handleMessage);
        };
    }, []);    
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
                            <Button  onClick={() => {
                                if(!isLoading){
                                    handleSubmit()
                                }
                                }} disabled={!formik.isValid || formik.values.email.length <= 4} theme="Carbon">
                                {isLoading?
                                <>
                                    <BeatLoader color="#FFFFFF" size={10}></BeatLoader>
                                </>   
                                :        
                                'Sign up'
                                }
                            </Button>
                        </div>
                        <div className="mt-4">
                            <div className="text-sm text-center text-text-primary">Already have an account?<span onClick={() => {
                                navigate('/login')
                            }} className="text-[#06B6D4] cursor-pointer"> Log in</span></div>
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
                            <div className="text-text-primary">Sign up with Google</div>
                            </Button>
                        </div>
                        <LinkedIn
                            clientId="786lwqvw2unoip"
                            redirectUri="https://linkedin-callback.vercel.app/"
                            // redirectUri={`http://localhost:5173/linkedin/callback`}
                            onSuccess={() => {}}
                            onError={() =>{}}
                            scope={"profile,email,openid"}
                            children={
                                ({linkedInLogin}) => <div className="mt-4">
                                    <Button theme="Carbon-Outline"
                                            onClick={linkedInLogin}
                                            className="flex justify-center boxShadow-Gray items-center borderBox-primary2 w-full disabled:cursor-not-allowed leading-[19.36px] text-[14px] font-[500]  rounded-[27px] h-[44px]">
                                        <img className="mr-2 w-5 h-5" src="./Carbon/linkedin.png" alt=""/>

                                        <div className="text-text-primary">Sign up LinkedIn</div>
                                    </Button>
                                </div>
                            }/>
                        <div className="mt-4">
                        {/* <Button theme="Carbon-Outline" className="flex justify-center boxShadow-Gray items-center borderBox-primary2 w-full disabled:cursor-not-allowed leading-[19.36px] text-[14px] font-[500]  rounded-[27px] h-[44px]">
                            <img className="mr-2 w-5 h-5" src="./Carbon/Apple.svg" alt="" />
                            <div className="text-text-primary">Sign up with Apple</div>
                        </Button> */}
                        </div>                        
                        <div className="text-[#374151] mt-4 text-center text-[14px]">
                            By signing up, you agree with our 
                        </div>                    
                        <div  className="text-center text-[14px] mt-1 cursor-pointer"><span onClick={() => {
                            // navigate('https://avatalk.me/termsofservice/')
                            window.open('https://avatalk.me/terms-of-service/')
                        }} className="text-[#06B6D4]">Terms & Conditions. </span></div>
                    </div>
                </>
            }  
        </>
    )
}

export default SignUp