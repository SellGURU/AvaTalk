// import { Button, TextField } from "symphony-ui"
import { BackIcon,TextArea } from "../../../Components"
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../../../hooks/useAuth";
import { AboutBox } from "../../../Model";
import { useNavigate } from "react-router";



const validationSchema = Yup.object().shape({
    title:Yup.string().required(),
    bio:Yup.string().required()
});

const SettingAccount =() => {
    const auth = useAuth()
     const navigate = useNavigate();
    const currentBox = auth.currentUser.boxs.filter((item) => item.getTypeName() == 'AboutBox')[0] as AboutBox
    const initialValue = {
        title:currentBox.getTitle(),
        bio:currentBox.getBio()
    };    
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: (values) => {
        console.log(values);
        },
    });   
    const submit = () => {
        auth.currentUser.addBox(
            new AboutBox(formik.values.title,formik.values.bio)
        )
        navigate('/')
    }
    return (
        <>
            <div className="absolute w-full hiddenScrollBar h-dvh top-[0px] bg-white z-[15]">
                <div className="relative top-4">
                    <BackIcon title="Your Account" theme="Carbon"></BackIcon>

                </div>
                <div className="mt-[120px] hiddenScrollBar h-full">
                    <div className="px-4">
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label ">
                                    First Name
                                    <span className="Carbon-TextField-label-required">*</span>
                                </label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="text" id="textfield76297" placeholder="Enter your first name..." name="FirstName" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label">
                                    Last Name
                                    <span className="Carbon-TextField-label-required">*</span>
                                </label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="text" id="textfield42095" placeholder="Enter your last name..." name="LastName" />

                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label" >Account Email</label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">

                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="email" id="textfield28972" placeholder="Enter your email address..." name="Email" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label" >Account Phone</label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <div className="Carbon-TextField-selectPhone-container">
                                        <img src="https://flagcdn.com/w20/us.png"/>
                                        <img className="Carbon-TextField-selectPhone-container-icon" src="./Carbon/bottomVector.svg" alt=""/>
                                    </div>
                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="phone" id="textfield28972" placeholder="Enter your phone number..." name="Phone" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label" >Language</label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <img className="Carbon-TextField-selectPhone-container-icon" src="./Carbon/bottomVector.svg" alt=""/>
                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="phone" id="textfield28972" placeholder="English" name="Phone" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 mb-4">
                            <button className="Carbon-Button-container">Save Changes</button>
                        </div>
                        <div className="mt-5 flex items-center cursor-pointer">
                            <p className="text-cyan-500 ms-2">Delete Your Account</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default SettingAccount;