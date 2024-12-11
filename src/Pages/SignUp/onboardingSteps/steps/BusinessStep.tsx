/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik"
import { BissinesCard, PhoneNumberInput, TextField } from "../../../../Components"
import React from "react";
import { Button } from "symphony-ui";
import { useAuth } from "../../../../hooks/useAuth";
import * as Yup from "yup";
import parsePhoneNumberFromString from "libphonenumber-js";

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
            job:Yup.string().min(3,'Job title must be between 3 and 15 characters.').max(15,'Job title must be between 3 and 15 characters.'),
            company:Yup.string().min(3,'Company name must be between 3 and 15 characters.').max(15,'Company name must be between 3 and 15 characters.'),
        }),
        onSubmit:() => {
            
        }
    })    
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
                    inValid={formik.errors?.job != undefined && (formik.touched?.job as boolean)}
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
                    inValid={formik.errors?.company != undefined && (formik.touched?.company as boolean)}
                    ></TextField>
                </div>  
                <div className="mt-4">
                    <PhoneNumberInput 
                        onChange={(e) => {
                            formik.setFieldValue("phone",e)
                        }}
                        value={formik.values.phone}
                        label="Account Phone"
                        invalid={formik.errors.phone?true:false} 
                        errorMessage={formik.errors.phone}
                    ></PhoneNumberInput>                 

                </div>
                <div className="mt-8">
                    <Button disabled={!formik.isValid} onClick={() => {
                        // console.log(formik.values.phone)
                        context.siginupHandler({
                            job:formik.values.job,
                            company:formik.values.company,
                            phone:formik.values.phone
                        })             
                        onSubmit()           
                    }}  theme="Carbon">Continue</Button>
                </div>                                                         
            </div>
        </>
    )
}

export default BusinessStep