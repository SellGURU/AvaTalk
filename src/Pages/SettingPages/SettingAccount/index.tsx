/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, TextField } from "../../../Components"
import { Button } from "symphony-ui"
import { Outlet, useNavigate } from "react-router-dom"
import { useContext , useState } from "react";
import { AuthContext } from "../../../store/auth-context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Auth } from "../../../Api";
import { Location } from "../../../Types";
import { removeTokenFromLocalStorage } from "../../../Storage/Token";


const validationSchema = Yup.object().shape({
});
interface SettingAccount {
    value: any;
    label: string;
  }

const SettingAccount =() => {
    const navigate = useNavigate();
    const context=useContext(AuthContext)
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
    const [country, setCountry] = useState<any>({
        codeName: "us",
        codePhone: "+1",
    });

    const languageOptions = [
        { value: 'English', label: 'English' },
        { value: 'Spanish', label: 'Spanish' },
        { value: 'Turkish', label: 'Turkish' },
        { value: 'Arabic', label: 'Arabic' },
        { value: 'Persian', label: 'Persian'},
    ];
    const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
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

            <div className="flex flex-col  px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
                <div className="mb-4">
                    <div className="flex flex-col relative gap-y-4 w-[100%]">

                        <TextField {...formik.getFieldProps("firstname")} inValid={false} 
                        theme="Carbon" name="firstname" label="First Name"
                        type="text" 
                        ></TextField>
                        
                        <TextField {...formik.getFieldProps("lastname")} inValid={false} 
                        theme="Carbon" name="lastname" label="Last Name"
                        type="text" 
                        ></TextField>

                        <div className=" opacity-50">
                            <TextField label="Account Email" {...formik.getFieldProps("personlEmail")} inValid={false} 
                            theme="Carbon" name="personlEmail"
                            type="email" disabled></TextField>
                        </div>

                        <TextField label="Account Phone" {...formik.getFieldProps("phone")} inValid={false} 
                        theme="Carbon" name="phone"
                        phoneCountry={country}
                        setPhoneCountry={setCountry}
                        type="phone" ></TextField>

                        <Select label="Language" valueElement={<div>{selectedLanguage.label}</div>} placeholder="Select tag..." theme="Carbon">
                            {languageOptions.map((language,index:number) => (
                                <>
                                <option key={language.value} onClick={() => {
                                    setSelectedLanguage(language)
                                }} className="ml-4 cursor-pointer" value={language.value}>
                                    {language.label}
                                </option>
                                {index <= languageOptions.length -2 ?
                                    <hr />
                                :undefined}
                                </>
                            ))}
                        </Select>
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
                        context.currentUser.updateInformation({
                            banelImage:context.currentUser.information?.banelImage as string,
                            company:context.currentUser.information?.company as string,
                            firstName: formik.values.firstname as string,
                            workPhone:context.currentUser.information?.workEmail as string,
                            imageurl:context.currentUser.information?.imageurl as string,
                            job:context.currentUser.information?.job as string,
                            lastName:formik.values.lastname as string,
                            location:context.currentUser.information?.location as Location,
                            personlEmail:formik.values.personlEmail as string,
                            phone:formik.values.phone as string,
                            silent_video_avatar:context.currentUser.information?.silent_video_avatar,
                            talk_video_avater:context.currentUser.information?.talk_video_avater,
                            workEmail:context.currentUser.information?.workEmail as string,
                            userId:context.currentUser.information?.userId as string
                        })
                    }} className="Carbon-Button-container">Save Changes</Button>
                </div>
                <div onClick={() => {
                    Auth.updateYourAccount({
                        user_id:context.currentUser.information?.userId as string,
                        state:false
                    }).then(() => {
                        removeTokenFromLocalStorage()
                        navigate('/login')
                    })                    
                }} className="mt-4 flex items-center cursor-pointer">
                    <p className="text-cyan-500 ms-2 text-sm font-medium">Delete Your Account</p>
                </div>
            </div>         
        </div>

        </>
    )
}
export default SettingAccount;