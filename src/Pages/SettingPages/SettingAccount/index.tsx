/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhoneNumberInput, TextField } from "../../../Components"
import { Button } from "symphony-ui"
import { Outlet, useNavigate } from "react-router-dom"
import { createRef, useContext , useState } from "react";
import { AuthContext } from "../../../store/auth-context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Auth } from "../../../Api";
import { removeTokenFromLocalStorage } from "../../../Storage/Token";
import { Confirm } from "../../../Components/__Modal__";
import { publish } from "../../../utils/event";
import parsePhoneNumberFromString from "libphonenumber-js";
import { validationYup } from "../../../utils/validationYup";

// const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
//   const validatePhone = (phone: number | undefined) => {

//     return Yup.number().integer().positive().test(
//         (phone) => {
//           return (phone && phone.toString().length >= 7 && phone.toString().length <= 15) ? true : false;
//         }
//       ).isValidSync(phone);
//   };
//   const validatePhoneType = (phone: string ) => {
//     console.log(phone?.split(" ").length )

//     return Yup.string().test(
//         (phone) => {
//           return (phone && phone.split(" ").length == 2) ? true : false;
//         }
//       ).isValidSync(phone);
//   };

const validatePhoneNumber = (value:any) => {
  try {
    if(value == '' || value== undefined){
      return true
    }
    const phoneNumber = parsePhoneNumberFromString("+"+value);
    if (!phoneNumber || !phoneNumber.isValid()) {
      return "Invalid phone number for the selected country.";
    }
    return true;
  } catch (error) {
    return "Invalid phone number format.";
  }
}; 
const validationSchema = Yup.object().shape({
    phone:Yup.string().test(
    "isValidPhoneNumber",
    "Invalid phone number for the selected country.",
    (value) => validatePhoneNumber(value) === true
    ),
    firstname:validationYup("firstname"),
    lastname:validationYup("lastname"),
});
interface SettingAccount {
    value: any;
    label: string;
  }

const SettingAccount =() => {
    const navigate = useNavigate();
    const context=useContext(AuthContext)
    const [showConfirm,setShowConfirm] = useState(false)
    const confirmRef = createRef<HTMLDivElement>()
    const initialValue = {
    firstname:context.currentUser.information?.firstName ,
    lastname:context.currentUser.information?.lastName ,
    personlEmail:context.currentUser.information?.personlEmail ,
    phone:context.currentUser.information?.phone ,
    };    
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: (values) => {
        console.log(values);
        },        
    })
    // const [country, setCountry] = useState<any>({
    //     codeName: "us",
    //     codePhone: "+1",
    // });

    const languageOptions = [
        { value: 'English', label: 'English' },
        { value: 'Spanish', label: 'Spanish' },
        { value: 'Turkish', label: 'Turkish' },
        { value: 'Arabic', label: 'Arabic' },
        { value: 'Persian', label: 'Persian'},
    ];
    const [selectedLanguage, ] = useState(languageOptions[0]);
    // const handleLanguageChange = (event: any) => {
    //     setSelectedLanguage(event.target.value);
    // };


    // const [firstName,setFirstName] = useState(context.currentUser.information?.firstName as string);
    return (
        <>
        <div className={`Carbon-ChatDetails-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`Carbon-back`}>
                    <div className={`Carbon-back-Button-vector`}></div>
                </Button>
                <p className={`Carbon-ChatDetails-title`}>Your Account</p>
            </div>            

            <div className="flex flex-col  px-6 mt-[86px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px]">
                <div className="mb-4">
                    <div className="flex flex-col relative gap-y-4 w-[100%]">

                        <TextField {...formik.getFieldProps("firstname")} inValid={formik.errors.firstname!= undefined} 
                        theme="Carbon" required errorMessage={formik.errors.firstname} name="firstname" label="First Name"
                        type="text" 
                        ></TextField>
                        
                        <TextField {...formik.getFieldProps("lastname")} inValid={formik.errors.lastname!= undefined} 
                        theme="Carbon" required errorMessage={formik.errors.lastname} name="lastname" label="Last Name"
                        type="text" 
                        ></TextField>

                        <div >
                            <TextField label="Account Email" {...formik.getFieldProps("personlEmail")} inValid={false} 
                            theme="Carbon" name="personlEmail"
                            type="email" disabled></TextField>
                        </div>

                        <PhoneNumberInput 
                            onChange={(e) => {
                                formik.setFieldValue("phone",e)
                            }}
                            value={formik.values.phone}
                            label="Account Phone"
                            invalid={formik.errors.phone?true:false} 
                            errorMessage={formik.errors.phone}
                        ></PhoneNumberInput>
                        {/* <TextField label="Account Phone" {...formik.getFieldProps("phone")} inValid={formik.errors.phone?true:false} 
                        theme="Carbon" name="phone"
                        phoneCountry={country}
                        setPhoneCountry={setCountry}
                        errorMessage={formik.errors.phone}
                        type="phone" ></TextField> */}

                        {/*<Select label="Language" valueElement={<div>{selectedLanguage.label}</div>} placeholder="Select tag..." theme="Carbon">*/}
                        {/*    {languageOptions.map((language,index:number) => (*/}
                        {/*        <>*/}
                        {/*        <option key={language.value} onClick={() => {*/}
                        {/*            setSelectedLanguage(language)*/}
                        {/*        }} className="ml-4 cursor-pointer" value={language.value}>*/}
                        {/*            {language.label}*/}
                        {/*        </option>*/}
                        {/*        {index <= languageOptions.length -2 ?*/}
                        {/*            <hr />*/}
                        {/*        :undefined}*/}
                        {/*        </>*/}
                        {/*    ))}*/}
                        {/*</Select>*/}
{/* 

                        <Select
                        label="Language"
                        valueElement={<div></div>}
                        placeholder="Select Language..."
                        theme="Carbon"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                    >
                        {languageOptions.map((language) => (
                            <option key={language.value} value={language.value}>
                                {language.label}
                            </option>
                        ))}
                    </Select> */}

                    </div>
                </div>

                <div className="mt-4">
                    <Button onClick={() => {
                        navigate(-1)
                        Auth.updateYourAccount({
                            user_id:context.currentUser.information?.userId as string,
                            email:context.currentUser.information?.personlEmail as string,
                            first_name:formik.values.firstname as string,
                            last_name:formik.values.lastname as string,
                            mobile_number:formik.values.phone as string,
                            language:selectedLanguage.value,
                            state:true
                        })
                        
                        context.currentUser.updateCustomInformation({
                            firstName: formik.values.firstname as string,
                            lastName:formik.values.lastname as string,
                            phone:formik.values.phone as string,
                        })
                        publish("refreshPage",{})
                    }} disabled={!formik.isValid} theme={'Carbon'}>Save Changes</Button>
                </div>
                <div  className="mt-10 flex items-center ">
                    <p onClick={() => {
                        setShowConfirm(true)
                    // Auth.updateYourAccount({
                    //     user_id:context.currentUser.information?.userId as string,
                    //     state:false
                    // }).then(() => {
                    //     removeTokenFromLocalStorage()
                    //     navigate('/login')
                    // })                    
                }} className="text-cyan-500 ms-2 cursor-pointer text-sm font-medium">Delete Your Account</p>
                </div>
            </div>         
        </div>
        {showConfirm ?
        <>
            <div className='fixed top-0 left-0 z-[5000] w-full h-dvh flex justify-center items-center'>
                <Confirm refrence={confirmRef} title={"Delete Your Account"} content={"Are you sure you want to delete your account?"} onClose={() => {setShowConfirm(false)}} onConfirm={() => {
                    Auth.updateYourAccount({
                        user_id:context.currentUser.information?.userId as string,
                        state:false
                    }).then(() => {
                        context.logout()
                        localStorage.clear()
                        removeTokenFromLocalStorage()
                        navigate('/login')
                    })  
                }}></Confirm>
            </div>
            {/* <div className="absolute w-full z-30 h-full bg-black opacity-60 top-0 left-0"></div> */}
        </>
        :
        undefined
        }
        </>
    )
}
export default SettingAccount;