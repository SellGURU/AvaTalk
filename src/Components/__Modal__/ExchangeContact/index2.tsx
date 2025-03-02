/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "symphony-ui"
import TextField from "../../TextField"
import { useFormik } from "formik"
import * as Yup from "yup";
import PhoneNumberInput from "../../PhoneSelectComponent";
import TextArea from "../../TextArea";
import { useRef, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { Auth, Contacts } from "../../../Api";
import { toast } from "react-toastify";
import useModalAutoClose from "../../../hooks/useModalAutoClose";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { validationYup } from "../../../utils/validationYup";
// import TooltipText from "../../TooltipText";

interface ExchangeContactProps {
    onClose:() =>void
    fullName:string
    mode?:string
    userId?:string
} 

const ExchangeContact:React.FC<ExchangeContactProps> =({onClose,fullName,mode,userId}) => {
    const theme ="Carbon"
    const [step,setStep] = useState(0)
    const validatePhoneNumber = (value:any) => {
      try {
        const phoneNumber = parsePhoneNumberFromString("+"+value);
        if (!phoneNumber || !phoneNumber.isValid()) {
          return "Invalid phone number for the selected country.";
        }
        return true;
      } catch (error) {
        return "Invalid phone number format.";
      }
    };    
    const formik = useFormik({
        initialValues:{
            fullName:'',
            email:'',
            phone:'',
            note:''
        },
        validationSchema:Yup.object().shape({
            fullName:validationYup("fullName"),
            email: Yup.string().email('Email address must be valid.').required('Email  is required'),
            phone:Yup.string().required('Phone  is required').test(
              "isValidPhoneNumber",
              "Invalid phone number for the selected country.",
              (value) => validatePhoneNumber(value) === true
            )
        }),
        onSubmit:() => {

        }
    })   
    const exchange =() => {
        Contacts.addContact({
          email:formik.values.email,
          full_name:formik.values.fullName,
          phone:formik.values.phone,
          note:formik.values.note,
          user_id:userId?userId:'',
          adding_method:'exchange'
        }).then(() => {
          toast.success("contact is exchanged")
          if(mode == 'share') {
            Auth.addEvent({
              event_type:'save_contact',
              sub_event_category:'view_link',
              userid:userId?userId:''
            })
          }
          setStep(step+1)
        })        
    }  
    const ShowProfileRef =useRef<HTMLDivElement>(null)
    useModalAutoClose({
        refrence:ShowProfileRef,
        close:() => {
            onClose()
        }
    })      
    return (
        <>
        <div ref={ShowProfileRef} className="rounded-[27px] px-6 py-6 max-w-[32rem] h-[93svh] max-h-[678px] pb-10 rounded-b-none slideupModal  bg-white w-full">
          {step == 0 ?
            <>
                <div className='flex w-full justify-between items-start'>
                    <div className="w-[100px]">
                      <Button onClick={onClose} theme="Carbon-back">
                          <div className={`${theme}-back-Button-vector`}></div>
                      </Button>
                    </div>
                    <div className="flex-grow text-center">
                        <div className='text-text-primary text-[14px] font-semibold w-full contactNameShadow'>Share your contact info with</div>
                        <div className='text-text-primary break-words text-center  text-xs  '>{fullName.length>3? fullName.substring(0,30)+"...":fullName}</div>
                    </div>
                    <div className="invisible w-[100px]">
                        <Button onClick={onClose} theme="Carbon-back">
                            <div className={`${theme}-back-Button-vector`}></div>
                        </Button>
                    </div>
                </div>     
                <div className="w-full overflow-y-scroll mt-4 hiddenScrollBar h-[85vh]">
                    <div className="my-4">
                        <TextField
                        value={formik.values.fullName}
                        onChange={(e) => {
                            // handleInputChange(e)
                            formik.setFieldValue("fullName",e.target.value)
                        }}
                        onBlur={() => {}}
                        label="Full Name"
                        placeholder="Enter your first and last name..."
                        theme="Carbon"
                        name="fullName"
                        type="text"
                        required
                        errorMessage={formik.errors.fullName || ''}
                        inValid={formik.errors.fullName != undefined}
                        />
                    </div>

                    <div className="mb-4">
                        <TextField
                        value={formik.values.email}
                        onChange={(e) => {
                            // handleInputChange(e)
                            formik.setFieldValue("email",e.target.value)
                        }}
                        onBlur={() => {}}
                        label="Email Address"
                        required
                        placeholder="Enter your email address..."
                        theme="Carbon"
                        name="email"
                        type="text"
                        errorMessage={formik.errors.email || ''}
                        inValid={formik.errors.email != undefined}
                        />
                    </div>

                    <div className="mb-4">
                        {/* <TextField
                        value={formData.phone}
                        onChange={(e) => {
                            handleInputChange(e)
                            formik.setFieldValue("phone",e.target.value)
                        }}
                        onBlur={() => {}}
                        required
                        label="Phone"
                        placeholder="Enter your phone number..."
                        theme="Carbon"
                        name="phone"
                        type="phone"
                        phoneCountry={country}
                        setPhoneCountry={setCountry}
                        errorMessage={formik.errors.phone || ''}
                        inValid={formik.errors.phone != undefined}
                        ></TextField> */}
                        <PhoneNumberInput 
                            value={formik.values.phone}
                            required
                            onChange={(e) => {
                            formik.setFieldValue("phone",e)
                            }}
                            label="Phone"
                            invalid={formik.errors.phone?true:false} 
                            errorMessage={formik.errors.phone}
                        ></PhoneNumberInput>                    
                    </div>

                    <div className="mt-4">
                        <TextArea inValid="" placeholder="Enter your note..." textAreaHeight="136px" name="note" value={formik.values.note} onBlur={() => {}} label="Note" theme="Carbon" onChange={(e) => {
                            formik.setFieldValue("note",e.target.value)
                        }} />
                    </div>
                    <div className="mt-10">
                        <Button disabled={formik.values.fullName=='' || formik.values.email == ''|| !formik.isValid} onClick={exchange} theme="Carbon">
                        <div >Exchange Contact</div>
                        </Button>
                        <div className="text-[12px] text-[#6B7280] text-center mt-2 mb-5">We don’t sell your contact details</div>
                    </div>
                </div>   
            </>
          :
          <>
        <div>
          <div className='flex w-full justify-between items-center'>
              <div className="invisible">
                <Button onClick={() => {
                  setStep(0)
                  onClose()
                  }} theme="Carbon-back">
                    <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
              </div>
              <div>
                  <div className='text-text-primary text-[14px] font-semibold contactNameShadow'>Contact Exchanged!</div>
              </div>
              <div className="z-30">
                <Button onClick={onClose} theme="Carbon-back">
                    <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
              </div>

          </div>
          <div className="text-[14px] font-medium mt-6 text-center text-text-primary">
            Keep the momentum going—create your Avatalk in minutes with our free trial."
          </div>
          <div className="w-full flex justify-center mt-5">
            <div className="w-[240px] h-[368px] bg-primary-color rounded-[30px]">
              <div className="w-full flex justify-center mt-4">
                <img className="ml-[-30px]" src="./icons/CardProf2.png" alt="" />
              </div>
              <div>
                <div className="text-white text-[18px] font-semibold overflow-hidden text-nowrap text-ellipsis  text-center">{formik.values.fullName}</div>
                <div className="text-white text-[12px] font-medium opacity-85  text-center">Job Title/ Company</div>
              </div>
              <div className="w-full flex justify-center mt-4">
                <img src="./icons/qrcode.png" alt="" />
              </div>
            </div>
            <ConfettiExplosion zIndex={40} />
          </div>
          <div className='absolute w-full flex justify-center pt-28 top-0 left-0'>
              <img className='' src="./icons/illo.png" alt="" />
          </div>          
          <div className="mt-20 mb-4">
            <Button disabled={mode!='share'} onClick={() => {
              onClose()
              setStep(0)
              window.open('https://portal.avatalk.me/')
              }} theme="Carbon">
              <div >Create Your Avatalk for Free</div>
            </Button>
            {/* <div className="text-[12px] text-[#6B7280] text-center mt-2 mb-5">We don’t sell your contact details</div> */}
          </div>
        </div>            
          </>
          }
        </div>
        </>
    )
}

export default ExchangeContact