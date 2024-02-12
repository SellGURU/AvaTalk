import { Button, TextField } from "symphony-ui"
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

const SettingSharing =() => {
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
                    <BackIcon title="Sharing" theme="Carbon"></BackIcon>

                </div>
                <div className="px-4">
                    <div className="mt-[120px] hiddenScrollBar h-full">
                        <div className="Carbon-Edit-title">Select Sharing Mode</div>
                        <div className="px-6 mt-24 Carbon-Setting-CardContainer text-justify">
                            <div className="font-medium text-sm">Default Mode</div>
                            <p className="text-xs text-gray-400">Collect contact info via a form, then share your details directly to your contact’s phone.</p>
                        </div>
                        <div className="px-6 mt-24 Carbon-Setting-CardContainer text-justify">
                            <div className="font-medium text-sm">Lead Mode</div>
                            <p className="text-xs text-gray-400">Collect contact info via a form, then send an automated text and email with your details.</p>
                        </div>
                        <div className="px-6 mt-24 Carbon-Setting-CardContainer text-justify">
                            <div className="font-medium text-sm">Share Mode</div>
                            <p className="text-xs text-gray-400">Share your contact details directly to your contact’s phone, without any forms or follow-up.</p>
                        </div>
                        <div className="mt-6 flex flex-col gap-4">
                            <div className="Carbon-Edit-title">Advanced Settings</div>
                            <div>Send a follow-up email</div>
                            <div>Send a follow-up SMS</div>
                            <div>Additional Settings</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SettingSharing