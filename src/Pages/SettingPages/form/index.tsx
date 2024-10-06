import {BackIcon} from "../../../Components";
import TextField from "../../../Components/TextField";
import Modal from "react-modal";
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
    const [isOpen, setIsOpen] = useState(false);
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
        SupportForm.SupportFormApi(formik.values.fullname,formik.values.email,formik.values.message).then(() => {
            // toast.success(res.data)
            
        });
        setIsOpen(true)

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

                            <div className={" font-bold mb-4 text-[14px]"}>Get in touch with us! Have any questions? Let us know, we're here to help!</div>
                        </div>
                        <div className={"flex flex-col items-center justify-center gap-4"}>
                            <TextField errorMessage={formik.errors.fullname}  inValid={formik.errors.fullname as string}  {...formik.getFieldProps("fullname")} theme="Carbon" label={"Full Name"} placeholder={"Enter your first and last name..."}
                                        type={"text"} required={true}/>
                            <TextField errorMessage={formik.errors.email}  {...formik.getFieldProps("email")} theme="Carbon" label={"Email Address"} placeholder={"Enter your email address..."}
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
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                setIsOpen(false)}
        }
            style={{ content: { borderRadius: "24px", width: "100%", maxWidth: "380px", background: "rgba(243, 244, 246, 1)" }, overlay: { backgroundColor: "rgba(0,0,0,0.7)" } }}
            contentLabel=" Modal"
        >
            <div className={" relative pb-5 pt-6"}>
                <div className={"absolute right-0 top-0"}>
                    <Button onClick={() => {
                        setIsOpen(false)
                    }} data-mode="profile-review-button-2" theme="Carbon-Google">
                        <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors m-0 "></div>
                    </Button>
                </div>
            <div className={"flex flex-col items-center justify-center"}>

                <img src={"/Carbon/tick-circle.svg"}/>
                <h1 className={"text-lg font-medium text-[#374151]"}>Thank you!</h1>
                <p className={"text-lg text-center font-medium text-[#374151]"}>
Your request has been successfully submitted. Our team will review it and get back to you shortly.</p>
            </div>
            </div>
        </Modal>                   
        </>
    )
}