import { TextArea, TextField} from "../../../Components"
import { Button } from "symphony-ui"
import { Outlet, useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext  } from "react";
import { AuthContext } from "../../../store/auth-context";


const validationSchema = Yup.object().shape({
});
const SettingSupport =() => {  
    const navigate = useNavigate();
    const context=useContext(AuthContext)
    const initialValue = {
    firstname:context.currentUser.information?.firstName ,
    personlEmail:context.currentUser.information?.personlEmail ,
    bio: context.currentUser.information?.company


    
    };   
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: (values) => {
        console.log(values);
        },        
    })


    return (
        <>
        <div className={`Carbon-ChatDetails-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`Carbon-back`}>
                    <div className={`Carbon-back-Button-vector`}></div>
                </Button>
                <p className={`Carbon-ChatDetails-title`}>Support</p>
            </div>            

            <div className="flex flex-col gap-y-5 px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
                <p className="mb-4 ">Get in touch with us! Have any questions? Let us know, we're here to help!</p>
                    <TextField {...formik.getFieldProps("firstname")} inValid={false} 
                        theme="Carbon" name="firstname" label="Name"
                        placeholder="Enter your full name..."
                        type="text" required
                        ></TextField>
                        
                        <TextField label="Email" {...formik.getFieldProps("personlEmail")} inValid={false} 
                        theme="Carbon" name="personlEmail"
                        placeholder="Enter your email address..."
                        type="email" required></TextField>
                        
                        <TextArea
                        {...formik.getFieldProps("bio")}
                        errorMessage={formik.errors?.bio}
                        placeholder="Write your message ..."
                        inValid={formik.errors?.bio != undefined && (formik.touched?.bio as boolean)}
                        textAreaHeight="136px"
                        theme="Carbon"
                        label="Message"
                        name="bio"
                        ></TextArea>
                {/* <div className="mb-4 text-left">
                    <TextField onBlur={() => {}} onChange={() =>{}}  value="" name="Name"  theme="Carbon" label="Name" inValid={false}  type="text" placeholder="Enter your full name..."></TextField>
                </div>
                <div className="mb-4 text-left">
                    <TextField onBlur={() => {}} onChange={() =>{}}  value="" name="Email"  theme="Carbon" label="Email" inValid={false}  type="email" placeholder="Enter your email address..."></TextField>
                </div>
                <div className="mt-4 text-left">
                    <TextArea inValid={false} onBlur={() => { } } onChange={() => { } } placeholder="Write your message ..." textAreaHeight="136px" theme="Carbon" label="Message" name="Message" value={""} ></TextArea>
                </div> */}
                <div className="mt-8">
                    <button className="Carbon-Button-container">Send</button>
                </div>
            </div>
        </div>
            
        </>
    )
}
export default SettingSupport