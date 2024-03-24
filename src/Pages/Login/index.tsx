/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button} from "symphony-ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../Api";
import { AuthContext } from "../../store/auth-context";
import { useContext, useState } from "react";
import Splash from "../../Components/Splash";
import { TextField } from "../../Components";

const initialValue = {
  emailOrPhone: "",
};

const validateEmail = (email: string | undefined) => {
   return Yup.string().email().isValidSync(email)
};

const validatePhone = (phone: number | undefined) => {
   return Yup.number().integer().positive().test(
      (phone) => {
        return (phone && phone.toString().length >= 8 && phone.toString().length <= 14) ? true : false;
      }
    ).isValidSync(phone);
};

const validationSchema = Yup.object().shape({
  emailOrPhone: Yup.string()
      .required('Email / Phone is required')
      .test('email_or_phone', 'Email / Phone is invalid', (value) => {
         return validateEmail(value) || validatePhone(parseInt(value.replace('+','').replace(' ','') ?? '0'));
      })
});

const Login = () => {
  const navigate = useNavigate();
  const [showSplash,setshowSplash] = useState(true);
  const authContext = useContext(AuthContext)
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [country, setCountry] = useState<any>({
    codeName: "us",
    codePhone: "+1",
  });  
  function handleSubmit() {
    Auth.get_Login_code({ mobile_number: formik.values.emailOrPhone }).then(() => {
      authContext.verificationHandler({
        emailOrPhone: formik.values.emailOrPhone
      })
      navigate('/Verification')
    })
  }
  const handleGoogleLogin = () => {
    Auth.login({mobile_number:'',code:'1254368'}).then((res) => {
        authContext.verificationHandler({
          emailOrPhone: 'email@email.com'
        })      
        authContext.login(res.data.token)
        navigate("/register");
    })    
  }
  setTimeout(() => {
    setshowSplash(false)
  }, 3000);
  return (
    <>
      {showSplash ?
              <Splash theme="Carbon"></Splash>
          :
        <>
              <div className="w-full px-4">
                <div className="w-full flex justify-center">
                  <div className="text-base mb-6 text-gray-700 font-semibold max-w-[256px] text-center">Enter Your Phone Number or Email Address to Login</div>
                </div>

                {
                  formik.values.emailOrPhone[0] == '+'?
                  <div className="mb-8">
                    <TextField 
                    {...formik.getFieldProps("emailOrPhone")} 
                    // value={country.codePhone + formik.values.emailOrPhone}
                    phoneCountry={country} 
                    setValue={(value) => {
                      formik.setFieldValue('emailOrPhone',value)
                    }}
                    setPhoneCountry={setCountry} theme="Carbon" name="emailOrPhone" errorMessage={formik.errors?.emailOrPhone} placeholder="Enter your phone number or email..." type="phone" inValid={formik.errors?.emailOrPhone != undefined && (formik.touched?.emailOrPhone as boolean)}></TextField>
                  </div>                
                  :
                  <div className="mb-8">
                    <TextField {...formik.getFieldProps("emailOrPhone")} theme="Carbon" name="emailOrPhone" errorMessage={formik.errors?.emailOrPhone} placeholder="Enter your phone number or email..." type="email" inValid={formik.errors?.emailOrPhone != undefined && (formik.touched?.emailOrPhone as boolean)}></TextField>
                  </div>
                }
                <Button
                  onClick={handleSubmit}
                  //     () => {
                  //     navigate("/Verification");
                  //   }
                  // }
                  disabled={!formik.isValid || formik.values.emailOrPhone.length <= 4}
                  theme="Carbon"
                >
                  Continue
                </Button>
                <div className="flex w-full items-center mt-11">
                  <div style={{ background: "linear-gradient(to left,rgba(227, 227, 238, 0.5) 0% ,rgba(255, 255, 255, 0.5) 95%,rgba(255, 255, 255, 0.5) 100%)" }} className="w-full h-[4px]">
                    <div style={{ background: "linear-gradient(to top,rgba(255, 255, 255, 1) 0% ,rgba(255, 255, 255, 0) 100%)" }} className="w-full h-[4px]"></div>
                  </div>
                  <div className="px-3 text-slate-800 text-sm font-medium">or</div>
                  <div style={{ background: "linear-gradient(to right,rgba(227, 227, 238, 0.5) 0% ,rgba(255, 255, 255, 0.5) 95%,rgba(255, 255, 255, 0.5) 100%)" }} className="w-full h-[4px]">
                    <div style={{ background: "linear-gradient(to bottom,rgba(255, 255, 255, 1) 0% ,rgba(255, 255, 255, 0) 100%)" }} className="w-full h-[4px]"></div>
                  </div>
                </div>

                <div className="mt-11">
                  <Button onClick={handleGoogleLogin} theme="Carbon-Google">
                    <img className="mr-2" src="./Carbon/Google.png" alt="" />
                    <div>Continue with Google</div>
                  </Button>
                </div>
              </div>
        </>
      }
    </>
  );
};
export default Login;
