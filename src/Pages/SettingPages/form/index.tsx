import {BackIcon} from "../../../Components";
import TextField from "../../../Components/TextField";

import {useFormik} from "formik";
import * as Yup from "yup";
import {Button} from "symphony-ui";
import SupportForm from "../../../Api/suportForm.ts";
import {useState} from "react";
import TextArea from "../../../Components/TextArea";

export const FormPage = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')  // Ensures a valid email format
            .required('Email is required'),
        fullname: Yup.string().required('Full name is required'),
    });
    const initialValue = {
        message:"" ,
        email:"" ,
        fullname:"",
    };
    const formik = useFormik({
        initialValues:initialValue,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    })
    // first_name:formik.values.firstname as string,
    //
    // const [res,setRes]=useState<any>()
    const [,setIsLoading]=useState<boolean>(true);
    const getData = async () => {
        setIsLoading(true)
        const res = await SupportForm.SupportFormApi(formik.values.fullname,formik.values.email,formik.values.message);
        console.log(res)
        setIsLoading(false);
    }
    return (
        <>
            <div className=" w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
                <div className=" top-4">
                    <BackIcon title="Support Form" theme="Carbon"></BackIcon>

                </div>
                <div>

                </div>
                <div
                    className="flex flex-col  px-6 mt-[40px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
                    <div className="mb-4">
                        <div className="flex flex-col relative gap-y-4 w-[100%]">

                            <h1 className={" font-bold text-[14px]"}>Get in touch with us! Have any questions? Let us know, we're here to help!</h1>
                        </div>
                        <div className={"flex flex-col items-center justify-center gap-4"}>
                            <TextField errorMessage={formik.errors.fullname}  inValid={formik.errors.fullname as string}  {...formik.getFieldProps("fullname")} theme="Carbon" label={"Full Name"} placeholder={"Enter your first and last name..."}
                                        type={"text"} required={true}/>
                            <TextField errorMessage={formik.errors.email}  {...formik.getFieldProps("email")} theme="Carbon" label={"Email Address"} placeholder={"Enter your Email address..."}
                                        type={"text"} inValid={formik.errors.email as string} required={true}/>
                            <TextArea textAreaHeight="136px" {...formik.getFieldProps("message")} theme="Carbon" label={"Message"} placeholder={"Write your message..."}
                                         inValid={""} />
                            <Button onClick={() => {
                                console.log(formik.isValid )
                                console.log(!formik.touched.email)
                                getData()
                            }} disabled={!formik.isValid || !formik.touched.email} theme={'Carbon'}>Send</Button>
                        </div>

                    </div>
                </div>


            </div>
        </>
    )
}