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

const SettingService =() => {
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
                    <BackIcon title="Your Service" theme="Carbon"></BackIcon>

                </div>
                <div className="mt-[120px] hiddenScrollBar h-full ">
                    <div className="flex flex-col justify-center items-center">
                        <img className={`Carbon-Splash-SplashIcon w-36 h-14 mb-6`} src="/Carbon/splashImage.svg" alt="" />
                        <p className="mb-4">You’re using our free plan</p>
                        <p className="text-gray-500 mb-2">Unlock the full networking experience with upgrade features</p>
                    </div>
                    <div className="px-6 mb-6 flex flex-col Carbon-Setting-CardContainer items-center ">
                        <div className="flex flex-col items-start gap-4">
                            <div className="flex justify-center items-center gap-2">
                                <div className="Carbon-Setting-TickCircle"></div>
                                Real-Time Analytics
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <div className="Carbon-Setting-TickCircle"></div>
                                Calendar Integration
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <div className="Carbon-Setting-TickCircle"></div>
                                Access to Pro Content
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <div className="Carbon-Setting-TickCircle"></div>
                                Customize settings
                            </div>
                        </div>
                    </div>
                    <div className="px-6 mb-4 flex flex-col Carbon-Setting-CardContainer ps-5 ">
                        Annually
                    </div>
                    <div className="px-6 mb-4 flex flex-col Carbon-Setting-CardContainer ps-5 ">
                        Monthly
                    </div>
                    <div className="mt-8 mb-4">
                        <button className="Carbon-Button-container">Continue to payment</button>
                    </div>
                    
                    
                </div>
            </div>
        </>
    )
}
export default SettingService