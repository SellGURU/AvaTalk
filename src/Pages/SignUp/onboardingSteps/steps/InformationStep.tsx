import { useFormik } from "formik"
import { BissinesCard, Select, TextField } from "../../../../Components"
import * as Yup from "yup";
import { Button } from "symphony-ui";
import { useAuth } from "../../../../hooks/useAuth";
import { AuthContext } from "../../../../store/auth-context";
import { useContext } from "react";
interface InformationStepProps {
    onSubmit:(gender:string) => void
}

const InformationStep:React.FC<InformationStepProps> = ({onSubmit}) => {
    const context = useAuth() 
    const authContext = useContext(AuthContext)
    const resolveName = () => {
        if(context.siginUpOptions.firstName != ''){
            return context.siginUpOptions.firstName as string
        }else if(context.googleInformation){
            return context.googleInformation.given_name as string
        }
        return ''
    }

    const resolveFamilyName = () => {
        if(context.siginUpOptions.lastName != ''){
            return context.siginUpOptions.lastName as string
        }else if(context.googleInformation){
            return context.googleInformation.family_name as string
        }
        return ''
    }    
    const formik = useFormik({
        initialValues:{
            FirstName:resolveName(),
            LastName:resolveFamilyName(),
            gender:context.siginUpOptions.gender == ''? 'female':context.siginUpOptions.gender
        },
        validationSchema:Yup.object().shape({
            FirstName: Yup.string().required("First name is required."),
            LastName: Yup.string().required("Last name is required."),
        }),
        onSubmit:() =>{}
    })
    const GenderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
    ];   
    
    
    return (
        <>
            <div className="mt-0">
                <div className="text-text-primary font-semibold text-center">{authContext.linkedInSignup ? 'Sign up with LinkedIn ' : 'Create Your Account'}</div>
                <div className="flex justify-center">
                    <div className="text-[#6B7280] text-[14px] mt-2 text-center w-[256px]">
                    {authContext.linkedInSignup ? 'Please confirm your information' : 'Tell us more about yourself' }                  
                    </div>
                </div>      
                <div className="flex justify-center mt-6">
                    <div className="">
                        <BissinesCard></BissinesCard>
                    </div>
                </div>       

                <div className="mt-4">
                    <div>
                        <TextField
                        {...formik.getFieldProps("FirstName")}
                        label="First Name"
                        placeholder="Enter your first name..."
                        theme="Carbon"
                        name="FirstName"
                        type="text"
                        required
                        inValid={formik.errors.FirstName? true: false}
                        errorMessage={formik.errors.FirstName}
                        // inValid={formik.errors.FirstName && formik.touched.FirstName}
                        ></TextField>
                    </div>
                    <div className="my-4">
                        <TextField
                        {...formik.getFieldProps("LastName")}
                        label="Last Name"
                        placeholder="Enter your last name..."
                        theme="Carbon"
                        name="LastName"
                        type="text"
                        required
                        // inValid={false}
                        errorMessage={formik.errors.LastName}
                        inValid={formik.errors.LastName? true: false}
                        ></TextField>
                    </div>    
                    <div className="mb-6">
                        <Select
                        label="Gender"
                        required
                        valueElement={<div className="capitalize">{formik.values.gender}</div>}
                        placeholder="Select your gender ..."
                        theme="Carbon"
                        >
                        {GenderOptions.map((Gender, index: number) => (
                            <>
                            <div
                                key={Gender.value}
                                onClick={() => {
                                formik.setFieldValue("gender",Gender.value)
                                }}
                                onTouchEnd={() => {
                                formik.setFieldValue("gender",Gender.value)
                                }}
                                className="  capitalize ml-4 my-2 cursor-pointer font-normal text-[14px]"
                                // value={Gender.value}
                            >
                                {Gender.value}
                            </div>
                            {index <= GenderOptions.length - 2 ? <hr /> : undefined}
                            </>
                        ))}
                        
                        </Select>
                    </div>      
                    <Button onClick={() => {
                        context.siginupHandler({
                            firstName:formik.values.FirstName,
                            lastName:formik.values.LastName,
                            gender:formik.values.gender
                        })
                        onSubmit(formik.values.gender)
                    }} disabled={!formik.isValid || formik.values.FirstName == ''} theme="Carbon">Continue</Button>                              
                </div>                   
            </div>
        </>
    )
}

export default InformationStep