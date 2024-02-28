import { Select, TextField } from "../../../Components"
import { Button } from "symphony-ui"
import { Outlet, useNavigate } from "react-router-dom"
import { useContext , useState } from "react";
import { AuthContext } from "../../../store/auth-context";
import { useFormik } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
});

const SettingAccount =() => {
    const navigate = useNavigate();
    const context=useContext(AuthContext)
    const initialValue = {
    firstname:context.currentUser.information?.firstName ,
    lastname:context.currentUser.information?.lastName ,
    personlEmail:context.currentUser.information?.personlEmail ,
    phone:context.currentUser.information?.phone ,

    
    };    
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: (values) => {
        console.log(values);
        },        
    })
    const [country, setCountry] = useState<any>({
        codeName: "us",
        codePhone: "+1",
    });
    
    // const [firstName,setFirstName] = useState(context.currentUser.information?.firstName as string);
    return (
        <>
        <div className={`Carbon-ChatDetails-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`Carbon-back`}>
                    <div className={`Carbon-back-Button-vector`}></div>
                </Button>
                <p className={`Carbon-ChatDetails-title`}>Your Account</p>
            </div>            

            <div className="flex flex-col  px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
                <div className="mb-4">
                    <div className="flex flex-col relative gap-y-4 w-[100%]">

                        <TextField {...formik.getFieldProps("firstname")} inValid={false} 
                        theme="Carbon" name="firstname" label="First Name"
                        type="text" 
                        ></TextField>
                        
                        <TextField {...formik.getFieldProps("lastname")} inValid={false} 
                        theme="Carbon" name="lastname" label="Last Name"
                        type="text" 
                        ></TextField>

                        <TextField label="Account Email" {...formik.getFieldProps("personlEmail")} inValid={false} 
                        theme="Carbon" name="personlEmail"
                        type="email" ></TextField>

                        <TextField label="Account Phone" {...formik.getFieldProps("phone")} inValid={false} 
                        theme="Carbon" name="phone"
                        phoneCountry={country}
                        setPhoneCountry={setCountry}
                        type="phone" ></TextField>

                        <Select label="Language" valueElement={<div></div>} placeholder="Select tag..." theme="Carbon">

                        </Select>

                    </div>
                </div>

                <div className="mt-8 mb-4">
                    <Button onClick={() => {
                        navigate(-1)
                        context.currentUser.updateInformation({
                            banelImage:context.currentUser.information?.banelImage as string,
                            company:'',
                            firstName: formik.values.firstname as string,
                            workPhone:'',
                            imageurl:'',
                            job:'',
                            lastName:formik.values.lastname as string,
                            location:{
                                lat:0,
                                lng:0
                            },
                            personlEmail:formik.values.personlEmail as string,
                            phone:formik.values.phone as string,
                            workEmail:''

                        })
                    }} className="Carbon-Button-container">Save Changes</Button>
                </div>
                <div className="mt-5 flex items-center cursor-pointer">
                    <p className="text-cyan-500 ms-2">Delete Your Account</p>
                </div>
            </div>         
        </div>

        </>
    )
}
export default SettingAccount;