/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik"
import { BissinesCard, TextField } from "../../../../Components"
import * as Yup from "yup";
import React, { useState } from "react";
import { Button } from "symphony-ui";
import { useAuth } from "../../../../hooks/useAuth";

interface ContactStepProps {
    onSubmit:() => void
}


const ContactStep:React.FC<ContactStepProps> = ({
    onSubmit
}) => {
    const context = useAuth()
    const validateEmail = (email: string | undefined) => {
    return Yup.string().email().isValidSync(email)
    };    
    const formik = useFormik({
        initialValues:{
            phone:context.siginUpOptions.phone,
            email:context.siginUpOptions.email
        },
        validationSchema:Yup.object().shape({
            phone: Yup.string(),
            email: Yup.string().required('Email is required').test('email', 'Email is invalid', (value) => {
                return validateEmail(value)
            })
        }),
        onSubmit:() => {

        }
    })
    const [country, setCountry] = useState<any>({
        codeName: "us",
        codePhone: "+1",
    });      
    return (
        <>
            <div className="mt-8">
                <div className="text-text-primary font-semibold text-center">Contact information</div>
                <div className="flex justify-center">
                    <div className="text-[#6B7280] text-[14px] mt-2 text-center w-[256px]">
                        Store and manage your phone number and E-mail  address.                                      
                    </div>
                </div> 
                <div className="flex justify-center mt-6">
                    <div className="">
                        <BissinesCard></BissinesCard>
                    </div>
                </div>   
                <div className="mt-8">
                <TextField 
                id="phoneBox"
                {...formik.getFieldProps("phone")} 
                phoneCountry={country} 
                setValue={(value) => {
                    formik.setFieldValue('phone',value)
                }}
                label="Phone"
                setPhoneCountry={setCountry} theme="Carbon" name="phone" errorMessage={formik.errors?.phone} placeholder="Enter your phone number..." type="phone" inValid={formik.errors?.phone != undefined && (formik.touched?.phone as boolean)}></TextField>
                </div> 
                <div className="mt-4">
                    <TextField 
                        id="email"
                        {...formik.getFieldProps("email")} 
                        label="E-mail Address"
                        required
                        setValue={(value) => {
                            formik.setFieldValue('email',value)
                        }} theme="Carbon" name="email" errorMessage={formik.errors?.email} placeholder="Enter your phone number or email..." type="email" inValid={formik.errors?.email != undefined && (formik.touched?.email as boolean)}></TextField>
                </div>      
                <div className="mt-8">
                    <Button onClick={() => {
                        console.log(formik.values.phone)
                        context.siginupHandler({
                            phone:formik.values.phone,
                            email:formik.values.email
                        })             
                        onSubmit()           
                    }} disabled={!formik.isValid || formik.values.email == ''} theme="Carbon">Continue</Button>
                </div>                                                         
            </div>
        </>
    )
}

export default ContactStep