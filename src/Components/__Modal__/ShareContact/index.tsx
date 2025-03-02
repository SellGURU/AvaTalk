/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'symphony-ui';
import { useAuth } from '../../../hooks/useAuth';
// import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';
import { TextField } from '../..';
import { useFormik } from 'formik';
import "@bitjson/qr-code"
import * as Yup from "yup";
import html2canvas from 'html2canvas';
import { Auth } from '../../../Api';
import { useConstructor } from '../../../help';
import Share from '../../../Api/Share';
import { publish } from '../../../utils/event';
import useModalAutoClose from '../../../hooks/useModalAutoClose';
import TooltipText from '../../TooltipText';
// import TooltipText from '../../TooltipText';
interface ShareContactProps {
    isOpen : boolean
    onClose: () => void
    theme?:string
    onAfterOpen?:() =>void
}
const initialValue = {
  firstName:'',
  lastName:'',
  email:''
};
const initialValue2 = {
  firstName: "",
  lastName:"",
  phone:""
};

const validationSchema2 = Yup.object().shape({
  firstName: Yup.string().required('First name is required.').nonNullable().max(12),
  lastName:Yup.string().required('Last name is required.').max(12),
  phone:Yup.string().required('Phone is required.').min(8).max(15)
});

const ShareContact:React.FC<ShareContactProps> = ({onClose,theme}) => {
    const [mode,setMode] = useState<'mainSection'|'smsSection'|'emailSection'>('mainSection')
    const authContext = useAuth()

    const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required.').nonNullable().max(12),
    lastName:Yup.string().required('Last name is required.').max(12),
    email:Yup.string().required('Email address is required.').notOneOf([authContext.currentUser.information?.personlEmail], 'Oops! We can’t send your profile link to your email.').email()
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: (values) => {
        console.log(values);
        },
    });    
    const [country, setCountry] = useState<any>({
        codeName: "us",
        codePhone: "+1",
    });    
    const [qrcodeValue,setQrcodeValue] = useState('')
    useConstructor(() => {
        Share.getqrcode().then((res:any) => {
            setQrcodeValue(res.data)
        })
    })
    const formik2 = useFormik({
        initialValues:initialValue2,
        validationSchema:validationSchema2,
        onSubmit:() => {}
    })
    const ShowProfileRef =useRef<HTMLDivElement>(null)
    useModalAutoClose({
        refrence:ShowProfileRef,
        close:() => {
            onClose()
        }
    })     
    useEffect(() => {
        publish("profileIsReview",{})
        publish("IncressFooter",{})
        return () => {
            publish("profileIsProfile",{})
            publish("DisIncressFooter",{})
        }
    },[])       
    return (
        <>
        {/* <Modal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onClose}
            // className="hiddenScrollBar"
            style={{content:{borderRadius:'24px',overflowY:'scroll',maxHeight:'95svh',width:'100%',maxWidth:'360px',background:'rgba(243, 244, 246, 1)'},overlay:{backgroundColor:'rgba(0,0,0,0.7)'}}}
            contentLabel="Example Modal"
        > */}
        <div ref={ShowProfileRef} className="rounded-[27px] text-left px-6 py-6 max-w-[32rem] h-auto max-h-[678px] relative pb-10 rounded-b-none slideupModal  bg-white w-full">
                {
                mode == 'mainSection' ?
                <>
                <div className={`${theme}-ShareContact-Container`}>
                    <div className={`${theme}-ShareContact-Title contactNameShadow`}>Share Profile</div>
                    <Button onClick={() => {
                        setMode('mainSection')
                        onClose()
                        }} theme='Carbon-back'>
                        <div className={`${theme}-Profile-closeIcon`}></div>
                    </Button>
                </div>
                <div className={`${theme}-ShareContact-Body`}>
                    {/* <h1 className={`${theme}-Profile-ProfileName mb-1`}>{authContext.currentUser.information?.firstName}  {authContext.currentUser.information?.lastName}</h1>
                    <p className={`${theme}-Profile-SubTitle`}>{authContext.currentUser.information?.job}</p> */}
                    {/* <div className={`${theme}-ShareContact-QrCodeVector`}></div> */}
                    {/* <div id='qrCodeBox' className={`${theme}-ShareContact-QrCodeVector`}>
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={authContext.currentUser.resolveLink()+'&viewBy=view_qr_code'}
                            viewBox={`0 0 256 256`}
                            bgColor='#F3F4F6'
                            fgColor='#534496'
                            >
                            </QRCode>                      
                    </div> */}
                    <div className={`${theme}-ShareContact-Cards max-w-[85%] w-[300px] px-4 py-4 overflow-x-hidden`}>
                        <div id="qrcodeBox" className='w-full py-4 bg-gray-200 mt-11 relative btnInnerShadowsDark flex justify-center rounded-[27px] '>
                            <div className=' absolute w-[70px] h-[70px] p-[6px] top-[-45px] bg-gray-200 border border-gray-100 rounded-full'>
                            <img className={`${theme}-Profile-ProfilePicture`} src={authContext.currentUser.resolveImageUrl()} alt="" />
                            </div>   
                            <div className='  ' >
                                <div className='grid'>
                                    <div className=' text-center flex justify-center mt-2'>
                                        
                                        <TooltipText className=' w-[202px] z-50 text-[#374151] font-[600]'  tooltipValue={authContext.currentUser.information?.firstName +' '+authContext.currentUser.information?.lastName}>
                                            <>
                                                { authContext.currentUser.information?.firstName +' '+authContext.currentUser.information?.lastName}
                                            </>

                                        </TooltipText>

                                    </div>

                                    <div className=' text-center flex justify-center '>
                                        
                                        <TooltipText className='w-[202px] text-gray-700 opacity-80 font-poppins text-[11px] text-center'  tooltipValue={authContext.currentUser.information?.job as string}>
                                            <>
                                                {authContext.currentUser.information?.job}
                                            </>

                                        </TooltipText>

                                    </div>
                                    {authContext.currentUser.information?.company
                                     &&
                                        <div className=' text-center flex justify-center '>
                                            
                                            <TooltipText className=' w-[202px] text-gray-700 opacity-80 font-poppins text-[11px] text-center'  tooltipValue={authContext.currentUser.information?.company as string}>
                                                <>
                                                    {'@'+authContext.currentUser.information?.company}
                                                </>

                                            </TooltipText>

                                        </div>                                    
                                     }
                                    {/* {authContext.currentUser.information?.job && authContext.currentUser.information.company ?
                                    <div className='text-gray-700 opacity-80 font-poppins text-[11px] text-center'>{authContext.currentUser.information?.job +'@'+authContext.currentUser.information?.company}</div>
                                    :
                                    undefined
                                    } */}
                                </div>
                                <div  id='qrCodeBox'  className={`${theme}-ShareContact-QrCodeVector`}>
                                    <img src={qrcodeValue} alt="" className='mt-5 mb-6'/>
                                </div>

                            </div>
                        </div>
                        {/* <div onClick={() => {
                            setMode('smsSection')
                        }} className={`${theme}-ShareContact-CardItems `} >
                            <div className={`${theme}-ShareContact-VectorMainSection btnInnerShadowsDark`}>
                                <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-SmsVector`}></div>
                            </div>
                            Share via SMS 
                        </div> */}
                        <div onClick={() => {
                            setMode('emailSection')
                        }} className={`${theme}-ShareContact-CardItems `}>
                            <div className={`${theme}-ShareContact-VectorMainSection btnInnerShadowsDark`}>
                                <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-EmailVector`}></div>
                            </div>
                            Share via Email
                        </div>
                        <div onClick={() => {
                            navigator.clipboard.writeText(window.location.host+authContext.currentUser.resolveLink())
                            Auth.addEvent({event_type:'share_link','sub_event_category':'clipboard','userid':authContext.currentUser.information?.userId as string})
                            toast.success("Copied Successfully")
                        }} className={`${theme}-ShareContact-CardItems`}>
                            <div className={`${theme}-ShareContact-VectorMainSection btnInnerShadowsDark`}>
                                <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-CopyVector`}></div>
                            </div>
                            Copy to Clipboard
                        </div>
                        <div onClick={async () => {
                            const element = document.getElementById('qrCodeBox')
                            const canvas = await html2canvas(element as HTMLElement)
                            const data = canvas.toDataURL('image/jpg')
                            const link = document.createElement('a');

                            link.href = data;
                            link.download = 'downloaded-image.jpg';
                            Auth.addEvent({event_type:'share_link','sub_event_category':'qr_code','userid':authContext.currentUser.information?.userId as string})
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);                        
                            {/* toast.warn("The download was not successful") */}
                        }} className={`${theme}-ShareContact-CardItems`}>
                            <div className={`${theme}-ShareContact-VectorMainSection btnInnerShadowsDark`}>
                                <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-ImportVector`}></div>
                            </div>
                            Download QR Code
                        </div>
                        <div onClick={() => {
                            navigator.share({
                                title:'Contact',
                                text:authContext.currentUser.information?.lastName,
                                url:authContext.currentUser.resolveLink()+'/?viewBy=view_link'
                            }).then(() => {
                                Auth.addEvent({event_type:'share_link','sub_event_category':'share_link','userid':authContext.currentUser.information?.userId as string})
                                // toast.success("Successful share")
                            }).catch(() => {
                                // toast.error("Error sharing:"+err)
                            })
                        }} className={`${theme}-ShareContact-CardItems`}>
                            <div className={`${theme}-ShareContact-VectorMainSection btnInnerShadowsDark`}>
                                <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-LinkVector`}></div>
                            </div>
                            Share Link
                        </div>
                        {/* <div onClick={() => {
                            Auth.googleWallet().then(res => {
                            window.open(res? res.data:'', '_blank');
                            })
                        }} className={`${theme}-ShareContact-CardItems`}>
                            <div className={`${theme}-ShareContact-VectorMainSection btnInnerShadowsDark`}>
                                <img src="./icons/image 436.png" alt="" />
                            </div>
                        Google Wallet
                        </div>                     */}
                    </div>
                </div>
                </>
                :
                undefined
                }  
                { mode == 'smsSection' ?         
                <>
                <div className={`${theme}-ShareContact-Container`}>
                    <Button onClick={() => {setMode('mainSection')}} theme={`${theme}-back`} >
                        <div className={`${theme}-back-Button-vector`}></div>
                    </Button>
                    <Button onClick={() => {
                        setMode('mainSection')
                        onClose()
                    }} theme='Carbon-back'>
                        <div className={`${theme}-Profile-closeIcon`}></div>
                    </Button>
                </div>
                <div className={`${theme}-ShareContact-Body`}>
                    <div className={`${theme}-ShareContact-VectorMainSection ${theme}-ShareContact-VectorSection btnInnerShadowsDark`}>
                        <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-Vectors ${theme}-ShareContact-SmsVector`}></div>
                    </div>
                    <div className="text-gray-700 text-center font-semibold text-base mt-2">Share via SMS</div>
                    <div className="w-full flex justify-center items-center mt-2 mb-6">
                        <div className="text-sm text-gray-700 opacity-50 text-center">We will send a text message with your contact info and profile to:</div>
                    </div>
                </div>
                <div className="px-4">
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                {/* <label className="Carbon-TextField-label ">
                                    First Name
                                    <span className="Carbon-TextField-label-required">*</span>
                                </label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <input {...formik2.getFieldProps("firstName")} data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="text"  placeholder="Enter your first name..."  />
                                </div> */}
                                <TextField {...formik2.getFieldProps("firstName")} theme='Carbon' label='First Name' errorMessage={formik2.errors.firstName} placeholder='Enter your first name...' required type='text' inValid={formik2.errors.firstName?.length? true:false}></TextField>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                {/* <label className="Carbon-TextField-label">
                                    Last Name
                                    <span className="Carbon-TextField-label-required">*</span>
                                </label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <input {...formik2.getFieldProps("lastName")} data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="text"  placeholder="Enter your last name..."/>

                                </div> */}
                                <TextField {...formik2.getFieldProps("lastName")} theme='Carbon' label='Last Name' errorMessage={formik2.errors.lastName} placeholder='Enter your last name...' required type='text' inValid={formik2.errors.lastName?.length? true:false}></TextField>                            
                            </div>
                        </div>
                        <div className="mb-4">
                            {/* <div className="Carbon-TextField-container w-[100%]">
                                <label className="Carbon-TextField-label" >Phone</label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <div className="Carbon-TextField-selectPhone-container">
                                        <img src="https://flagcdn.com/w20/us.png"/>
                                        <img className="Carbon-TextField-selectPhone-container-icon" src="./Carbon/bottomVector.svg" alt=""/>
                                    </div>
                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="phone" id="textfield28972" placeholder="Enter your phone number..." name="Phone" />
                                </div>
                            </div> */}
                        <TextField required {...formik2.getFieldProps("phone")} label='Phone' phoneCountry={country}  setPhoneCountry={setCountry}  theme="Carbon"  errorMessage={formik2.errors?.phone} placeholder="Enter your phone " type="phone" inValid={formik2.errors.phone?.length?true:false}></TextField>
                        </div>
                    <div className="mt-8 mb-4">
                        <Button disabled={!formik2.isValid || (!formik2.touched.firstName)} onClick={() => {
                            setMode('mainSection')
                            Share.sharelink({
                                type:'sms',
                                first_name:formik2.values.firstName,
                                last_name:formik2.values.lastName,
                                recipient:formik2.values.phone
                            })
                            Auth.addEvent({event_type:'share_link','sub_event_category':'sms','userid':authContext.currentUser.information?.userId as string})
                            onClose()
                            }} theme="Carbon">Share Contact</Button>
                    </div>
                </div>
                </>
                :
                undefined
                }
                { mode == 'emailSection' ?
                
                <>
                <div className={`${theme}-ShareContact-Container`}>
                    <Button onClick={() => {setMode('mainSection')}} theme={`${theme}-back`} >
                        <div className={`${theme}-back-Button-vector`}></div>
                    </Button>
                    <Button onClick={() => {
                        setMode('mainSection')
                        onClose()
                    }} theme='Carbon-back'>
                        <div className={`${theme}-Profile-closeIcon`}></div>
                    </Button>
                </div>
                    <div className={`${theme}-ShareContact-Body`}>
                        <div className={`${theme}-ShareContact-VectorMainSection ${theme}-ShareContact-VectorSection btnInnerShadowsDark `}>
                            <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-Vectors ${theme}-ShareContact-EmailVector`}></div>
                        </div>
                        <div className="text-gray-700 text-center font-semibold text-base mt-2">Share via Email</div>
                        <div className="w-full flex justify-center items-center mt-2 mb-6">
                            <div className="text-sm text-gray-700 opacity-80 text-center">We will send an email with your contact info and profile to:</div>
                        </div>
                    </div>
                    <div className="px-4">
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                {/* <label className="Carbon-TextField-label ">
                                    First Name
                                    <span className="Carbon-TextField-label-required">*</span>
                                </label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="text" id="textfield76297" placeholder="Enter your first name..." name="FirstName" />
                                </div> */}
                                <TextField {...formik.getFieldProps("firstName")} theme='Carbon' label='First Name' errorMessage={formik.errors.firstName} placeholder='Enter your first name...' required type='text' inValid={formik.errors.firstName?.length? true:false}></TextField>                            
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                {/* <label className="Carbon-TextField-label">
                                    Last Name
                                    <span className="Carbon-TextField-label-required">*</span>
                                </label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="text" id="textfield42095" placeholder="Enter your last name..." name="LastName" />

                                </div> */}
                                <TextField {...formik.getFieldProps("lastName")} theme='Carbon' label='Last Name' errorMessage={formik.errors.lastName} placeholder='Enter your last name...' required type='text' inValid={formik.errors.lastName?.length? true:false}></TextField>                            
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="Carbon-TextField-container w-[100%]">
                                {/* <label className="Carbon-TextField-label" >Email</label>
                                <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">

                                    <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="email" id="textfield28972" placeholder="Enter your email address..." name="Email" />
                                </div> */}
                                <TextField required {...formik.getFieldProps("email")} theme='Carbon' label='Email' errorMessage={formik.errors.email} placeholder='Enter your email address...'  type='text' inValid={formik.errors.email?.length? true:false}></TextField>                            
                            </div>
                        </div>
                    <div className="mt-8 mb-4">
                        <Button disabled={!formik.isValid || (!formik.touched.firstName)} onClick={() => {
                            setMode('mainSection')
                            Share.sharelink({
                                type:'email',
                                email:formik.values.email
                            })
                            Auth.addEvent({event_type:'share_link','sub_event_category':'email','userid':authContext.currentUser.information?.userId as string})                        
                            onClose()
                            }} theme='Carbon'>Share Contact</Button>
                    </div>
                </div>

                </>
                :
                undefined
                }

        </div>

        {/* </Modal>         */}
        </>
    )
}

export default ShareContact