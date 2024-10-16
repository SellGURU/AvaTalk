/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik"
import { BissinesCard, PhoneNumberInput, TextField } from "../../../../Components"
import * as Yup from "yup";
import React from "react";
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
    // const validatePhone = (phone: number | undefined) => {
    // // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    // // return Yup.string().matches(phoneRegExp, 'Phone number is not valid').test(
    // //   (phone) => {
    // //     return 
    // //   }
    // // )
    // return Yup.number().integer().positive().test(
    //     (phone) => {
    //         return (phone && phone.toString().length >= 7 && phone.toString().length <= 15) ? true : false;
    //     }
    //     ).isValidSync(phone);
    // };    
    // const validatePhoneType = (phone: string ) => {
    //     console.log(phone?.split(" ").length )

    //     return Yup.string().test(
    //         (phone) => {
    //         return (phone && phone.split(" ").length == 2) ? true : false;
    //         }
    //     ).isValidSync(phone);
    // };    
    const resolveEmail = () => {
        if(context.siginUpOptions.email != ''){
            return context.siginUpOptions.email as string
        }else if(context.googleInformation.email){
            return context.googleInformation.email as string
        }
        return ''
    }
    console.log(resolveEmail());
    
    const formik = useFormik({
        initialValues:{
            phone:context.siginUpOptions.phone,
            email:resolveEmail()
        },
        validationSchema:Yup.object().shape({
            phone: Yup.string(),
            email: Yup.string().required('Email is required.').test('email', 'Email is invalid', (value) => {
                return validateEmail(value)
            })
        }),
        onSubmit:() => {

        }
    })
    // const [country, setCountry] = useState<any>({
    //     codeName: "us",
    //     codePhone: "+1",
    // });      
    return (
        <>
            <div className="mt-8">
                <div className="text-text-primary font-semibold text-center">Contact Information</div>
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
                {/* <TextField 
                id="phoneBox"
                {...formik.getFieldProps("phone")} 
                phoneCountry={country} 
                setValue={(value) => {
                    formik.setFieldValue('phone',value)
                }}
                label="Phone"
                setPhoneCountry={setCountry} theme="Carbon" name="phone" errorMessage={formik.errors?.phone} placeholder="Enter your phone number..." type="phone" inValid={formik.errors?.phone != undefined && (formik.touched?.phone as boolean)}></TextField> */}
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
                <div className={`mt-4 ${formik.values.email != '' && 'opacity-50'}`}>
                    <TextField 
                    disabled= {formik.values.email != ''}
                        id="email"
                        {...formik.getFieldProps("email")} 
                        label="E-mail Address"
                        required={formik.values.email == ''}
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