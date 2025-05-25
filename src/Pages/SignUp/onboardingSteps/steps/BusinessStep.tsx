/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik"
import { BissinesCard, PhoneNumberInput, TextField } from "../../../../Components"
import React from "react";
import { Button } from "symphony-ui";
import { useAuth } from "../../../../hooks/useAuth";
import * as Yup from "yup";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Auth } from "../../../../Api";
import { validationYup } from "../../../../utils/validationYup";

interface BusinessStepProps {
    onSubmit:() => void
}
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

const BusinessStep:React.FC<BusinessStepProps> = ({
    onSubmit
}) => {
    const context = useAuth()
    const resolveEmail = () => {
        if(context.siginUpOptions.email != ''){
            return context.siginUpOptions.email as string
        }else if(context.googleInformation.email){
            return context.googleInformation.email as string
        }
        return ''
    }    
    const formik = useFormik({
        initialValues:{
            job:context.siginUpOptions.job,
            phone:context.siginUpOptions.phone,
            company:context.siginUpOptions.company
        },
        validationSchema:Yup.object().shape({
            phone: Yup.string().test(
                "isValidPhoneNumber",
                "Invalid phone number for the selected country.",
                (value) => validatePhoneNumber(value) === true
                ),
            job:validationYup("job"),
            company:validationYup("company"),
        }),
        validateOnChange:true, 
        onSubmit:() => {
            
        }
    })    
    const checkEmail = () => {
        return Auth.check_user_existence({
            code_type:'verification',
            mobile_number:formik.values.phone
        })
    }
    // useEffect(() => {
    //     if(validatePhoneNumber(formik.values.phone) == true && formik.values.phone!=''){
    //         checkEmail()
    //     }
    // },[formik.values.phone])
    return (
        <>
            <div className="mt-0">
                <div className="text-text-primary font-semibold text-center">Business Information</div>
                <div className="flex justify-center">
                    <div className="text-[#6B7280] text-[14px] mt-2 text-center w-[256px]">
                        Tell us a bit about your professional background.                            
                    </div>
                </div> 
                <div className="flex justify-center mt-6">
                    <div className="">
                        <BissinesCard></BissinesCard>
                    </div>
                </div>   
                <div className="mt-8">
                    <TextField
                    {...formik.getFieldProps("job")}
                    label="Job Title"
                    placeholder="Enter your job title..."
                    theme="Carbon"
                    name="job"
                    type="text"
                    inValid={formik.errors.job? true: false}
                    errorMessage={formik.errors.job}
                    ></TextField>
                </div>

                <div className="mt-4">
                    <TextField
                    {...formik.getFieldProps("company")}
                    label="Company Name"
                    placeholder="Enter your company name..."
                    theme="Carbon"
                    name="company"
                    type="text"
                    errorMessage={formik.errors?.company}
                    inValid={formik.errors?.company?true:false}
                    ></TextField>
                </div>  
                <div className="mt-4">
                    <PhoneNumberInput 
                        onChange={(e) => {
                            formik.setFieldValue("phone",e)
                        }}
                        required
                        value={formik.values.phone}
                        label="Account Phone"
                        invalid={formik.errors.phone?true:false} 
                        errorMessage={formik.errors.phone}
                    ></PhoneNumberInput>                 

                </div>
                <div className="mt-8">
                    <Button disabled={!formik.isValid} onClick={() => {
                        // console.log(formik.values.phone)
                        checkEmail().then(() => {
                            context.siginupHandler({
                                job:formik.values.job,
                                company:formik.values.company,
                                phone:formik.values.phone,
                                email:resolveEmail()
                            })             
                            onSubmit()           
                        }).catch((err) => {
                            console.log(err)
                           formik.setFieldError("phone",err.detail)
                        })
                    }}  theme="Carbon">Continue</Button>
                </div>                                                         
            </div>
        </>
    )
}

export default BusinessStep