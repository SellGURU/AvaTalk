/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik"
import { BissinesCard, TextField } from "../../../../Components"
import React from "react";
import { Button } from "symphony-ui";
import { useAuth } from "../../../../hooks/useAuth";

interface BusinessStepProps {
    onSubmit:() => void
}


const BusinessStep:React.FC<BusinessStepProps> = ({
    onSubmit
}) => {
    const context = useAuth()
    const formik = useFormik({
        initialValues:{
            job:context.siginUpOptions.job,
            company:context.siginUpOptions.company
        },
        onSubmit:() => {

        }
    })    
    return (
        <>
            <div className="mt-8">
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
                    inValid={false}
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
                    inValid={false}
                    ></TextField>
                </div>  
                <div className="mt-8">
                    <Button onClick={() => {
                        // console.log(formik.values.phone)
                        context.siginupHandler({
                            job:formik.values.job,
                            company:formik.values.company
                        })             
                        onSubmit()           
                    }}  theme="Carbon">Continue</Button>
                </div>                                                         
            </div>
        </>
    )
}

export default BusinessStep