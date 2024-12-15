/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react"
import { publish } from "../../../utils/event"
import { Button } from "symphony-ui"
import TextField from "../../TextField"
import { useFormik } from "formik"
import * as Yup from "yup";
import { validationYup } from "../../../utils/validationYup"
import { PhoneNumberInput, TextArea } from "../.."
import { Contacts } from "../../../Api"
import { Contact } from "../../../Types"
import useModalAutoClose from "../../../hooks/useModalAutoClose"
import parsePhoneNumberFromString from "libphonenumber-js"

interface AddContactNewProps {
    onClose:() =>void
    title:string
    onAddContact:(formData: Contact) => void
}

const validatePhoneNumber = (value:any) => {
  try {
    if(value == '' || value== undefined){
      return true
    }
    const phoneNumber = parsePhoneNumberFromString("+"+value);
    if (!phoneNumber || !phoneNumber.isValid()) {
      return "Invalid phone number for the selected country.";
    }
    return true;
  } catch (error) {
    return "Invalid phone number format.";
  }
};

const AddContactNew:React.FC<AddContactNewProps> = ({onClose,title,onAddContact}) => {
    useEffect(() => {
        publish("IncressFooter",{})
        publish("profileIsReview",{})
        return () => {
            publish("profileIsProfile",{})
            publish("DisIncressFooter",{})
        }
    },[])    
    const theme ="Carbon"
    const formik = useFormik({
        initialValues:{
            fullName:'',
            email:'',
            phone:'',
            address:'',
            company:'',
            job:'',
            note:''
        },
        validationSchema:Yup.object().shape({
            fullName:validationYup("fullName"),
            email:Yup.string().required('Email address is required').email('Email is invalid'),
            phone:Yup.string().required('Phone is required').test(
                "isValidPhoneNumber",
                "Invalid phone number for the selected country.",
                (value) => validatePhoneNumber(value) === true
                ),
            job:validationYup("job"),
            company:validationYup("company"),    
        }),
        onSubmit:() =>{}
    })
    const refrrence = useRef(null)
    useModalAutoClose({
        refrence:refrrence,
        close:() => {
            onClose()
        }
    })      
    return (
        <>
            <div ref={refrrence} className="rounded-[27px] px-6 py-6 max-w-[32rem] h-[80vh] pb-10 rounded-b-none slideupModal  bg-white w-full">
                <div className="w-full">
                    <div className="w-full flex justify-between items-center">
                        <div className="relative">
                            <Button onClick={onClose} theme="Carbon-back">
                                <div className={`${theme}-back-Button-vector`}></div>
                            </Button>
                        </div>

                        <div className="text-text-primary text-[14px] font-semibold">{title}</div>
                        <div className="relative invisible">
                            <Button theme="Carbon-back">
                                <div className={`${theme}-back-Button-vector`}></div>
                            </Button>
                        </div>
                    </div>

                    <div className="w-full overflow-y-scroll mt-4 hiddenScrollBar h-[65vh]">
                        <div>
                            <TextField
                                {...formik.getFieldProps("fullName")}
                                label="Full Name"
                                placeholder="Enter your first and last name..."
                                theme="Carbon"
                                name="fullName"
                                type="text"
                                errorMessage={formik.errors.fullName}
                                inValid={formik.errors.fullName!= undefined}
                                required/>                            
                        </div>

                        <div className="mt-4">
                            <TextField
                                {...formik.getFieldProps("email")}
                                label="Email Address"
                                placeholder="Enter your email address ..."
                                theme="Carbon"
                                name="email"
                                type="text"
                                errorMessage={formik.errors.email}
                                inValid={formik.errors.email!= undefined}
                                required
                                />                            
                        </div>

                        <div className="mt-4">
                            <PhoneNumberInput 
                                onChange={(e) => {
                                    formik.setFieldValue("phone",e)
                                }}
                                value={formik.values.phone}
                                label="Phone"
                                invalid={formik.errors.phone?true:false} 
                                errorMessage={formik.errors.phone}
                            ></PhoneNumberInput>                            
                        </div>

                        <div className="mt-4">
                            <TextArea 
                                {...formik.getFieldProps("address")}
                                label="Address"
                                placeholder="Enter your address ..."
                                theme="Carbon"
                                textAreaHeight="136px"
                                name="address"
                                errorMessage={formik.errors.address}
                                inValid={formik.errors.address!= undefined}                            
                            ></TextArea>
                        </div>
                        <div className="mt-4">
                            <TextField
                                {...formik.getFieldProps("company")}
                                label="Company"
                                placeholder="Enter your company name..."
                                theme="Carbon"
                                name="company"
                                type="text"
                                errorMessage={formik.errors.company}
                                inValid={formik.errors.company!= undefined}
                                />                            
                        </div>     

                        <div className="mt-4">
                            <TextField
                                {...formik.getFieldProps("job")}
                                label="Job Title"
                                placeholder="Enter your job title..."
                                theme="Carbon"
                                name="job"
                                type="text"
                                errorMessage={formik.errors.job}
                                inValid={formik.errors.job!= undefined}
                                />                            
                        </div>  
                        <div className="mt-4">
                            <TextArea 
                                {...formik.getFieldProps("note")}
                                label="Note"
                                placeholder="Write a note..."
                                theme="Carbon"
                                textAreaHeight="136px"
                                name="note"
                                errorMessage={formik.errors.note}
                                inValid={formik.errors.note!= undefined}                            
                            ></TextArea>
                        </div>                             
                            <div className="mt-10 mb-6">
                            <Button
                                disabled={!formik.isValid || !formik.touched.fullName}
                                onClick={() => {
                                    Contacts.addContact({
                                        full_name: formik.values.fullName,
                                        email: formik.values.email,
                                        phone:formik.values.phone,
                                        company: formik.values.company,
                                        address: formik.values.address,
                                        job_title: formik.values.job,
                                        note: formik.values.note,
                                        tag: [],
                                    }).then((res: any) => {
                                        const id = res.data;
                                        const formDataWithId:Contact = {
                                            address:formik.values.address,
                                            company:formik.values.company,
                                            email:formik.values.email,
                                            fullName:formik.values.fullName,
                                            job:formik.values.job,
                                            note:formik.values.note,
                                            phone:formik.values.phone,
                                            id,
                                            mapLocation: { lat: 30, lng:30 },
                                            tags: [],
                                        };
                                        onAddContact(formDataWithId);
                                        onClose();
                                    });   
                                    onClose()                                 
                                }}
                                theme="Carbon"
                            >
                                <div>Add Contact</div>
                            </Button>
                            </div>                                                                      
                    </div>
                </div>                
            
            </div>
        </>
    )
}

export default AddContactNew