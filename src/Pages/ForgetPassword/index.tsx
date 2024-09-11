import { Button } from "symphony-ui"
import { TextField } from "../../Components"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../Api";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { BeatLoader } from "react-spinners";
const validateEmail = (email: string | undefined) => {
   return Yup.string().email().isValidSync(email)
};

const ForgetPassword = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext)
    const formik = useFormik({
        initialValues: {
            email:''
        },
        validationSchema:Yup.object().shape({
            email: Yup.string()
                .required('Email  is required')
                .test('email', 'Email  is invalid', (value) => {
                    return validateEmail(value) 
                })
        }),
        onSubmit: (values) => {
        console.log(values);
        },
    });   
    const [isLoading,setisLoading] = useState(false)
    function handleSubmit() {
      if(!isLoading){
        setisLoading(true)
        Auth.check_user_existence({
            email:formik.values.email,
            code_type:'reset'
        }).then(res => {
            if(res.data.check_user == true){
                Auth.get_Login_code({
                  code_type:'reset',
                  email:formik.values.email
                }).then(() => {
                  authContext.verificationHandler({
                      emailOrPhone: formik.values.email,
                      googleJson:{}
                  })                
                  setisLoading(false)
                  navigate('/Verification')
                })              
            }

        })

      }
    }     
    return (
        <>
              <div className="w-full px-4">
                <img src="/Avatalk Logo.svg" alt="logo" className="w-[49px] h-[54px] mx-auto mb-[30px]" />
                <div className="w-full flex justify-center">
                  <div className="text-base mb-6 text-gray-700 font-semibold max-w-[256px] text-center">Forgot Password</div>
                </div>

                <div className="text-[14px] mb-6 text-[#6B7280] text-center">Enter your E-mail and we'll sent you verification code.</div>

                <div className="mb-4">
                  <TextField  {...formik.getFieldProps("email")} theme="Carbon" name="email" errorMessage={formik.errors?.email} placeholder="Enter your email address" type="email" inValid={formik.errors?.email != undefined && (formik.touched?.email as boolean)}></TextField>
                </div> 
        
                <Button
                  onClick={handleSubmit}
                  disabled={!formik.isValid || formik.values.email == ''}
                  theme="Carbon"
                >
                  {isLoading?
                  <>
                    <BeatLoader color="#FFFFFF" size={10}></BeatLoader>
                  </>
                  :
                  'Get code'
                  }
                </Button>
                <div className="text-[14px] text-[#374151] text-center mt-4">
                  Don`t have an account? <span onClick={() => {
                    navigate('/signup')
                  }} className="text-[#06B6D4] cursor-pointer">Sign Up</span> 
                </div>
                {/* <div className="flex w-full items-center mt-6">
                  <div style={{ background: "linear-gradient(to left,rgba(227, 227, 238, 0.5) 0% ,rgba(255, 255, 255, 0.5) 95%,rgba(255, 255, 255, 0.5) 100%)" }} className="w-full h-[4px]">
                    <div style={{ background: "linear-gradient(to top,rgba(255, 255, 255, 1) 0% ,rgba(255, 255, 255, 0) 100%)" }} className="w-full h-[4px]"></div>
                  </div>
                  <div className="px-3 text-[#8290a3] text-sm font-medium">or</div>
                  <div style={{ background: "linear-gradient(to right,rgba(227, 227, 238, 0.5) 0% ,rgba(255, 255, 255, 0.5) 95%,rgba(255, 255, 255, 0.5) 100%)" }} className="w-full h-[4px]">
                    <div style={{ background: "linear-gradient(to bottom,rgba(255, 255, 255, 1) 0% ,rgba(255, 255, 255, 0) 100%)" }} className="w-full h-[4px]"></div>
                  </div>
                </div> */}
                
              </div>        
        </>
    )
}

export default ForgetPassword