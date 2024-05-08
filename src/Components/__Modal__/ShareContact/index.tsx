/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Modal from 'react-modal';
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
interface ShareContactProps {
    isOpen : boolean
    onClose: () => void
    theme?:string
    onAfterOpen?:() =>void
}
const initialValue = {
  Phone: "",
};
const validationSchema = Yup.object().shape({
  Phone: Yup.string()
      .required('Phone is required')
});

const ShareContact:React.FC<ShareContactProps> = ({isOpen,onAfterOpen,onClose,theme}) => {
    const [mode,setMode] = useState<'mainSection'|'smsSection'|'emailSection'>('mainSection')
    const authContext = useAuth()
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
    return (
        <>
        <Modal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onClose}
            style={{content:{borderRadius:'24px',overflowY:'scroll',maxHeight:'90svh',width:'100%',maxWidth:'360px',background:'rgba(243, 244, 246, 1)'},overlay:{backgroundColor:'rgba(0,0,0,0.7)'}}}
            contentLabel="Example Modal"
        >
            {
            mode == 'mainSection' ?
            <>
            <div className={`${theme}-ShareContact-Container`}>
                <div className={`${theme}-ShareContact-Title contactNameShadow`}>Share Contact</div>
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
                <div className={`${theme}-ShareContact-Cards`}>
                    <div className='w-full py-4 bg-gray-200 mt-11 relative btnInnerShadowsDark flex justify-center rounded-[27px] '>
                        <div className=' absolute w-[70px] h-[70px] p-[6px] top-[-45px] bg-gray-200 border border-gray-100 rounded-full'>
                           <img className={`${theme}-Profile-ProfilePicture`} src={authContext.currentUser.resolveImageUrl()} alt="" />
                        </div>   
                        <div>
                            <div>
                                <div className='text-gray-700 mt-4 font-poppins text-sm text-center font-semibold'>{authContext.currentUser.information?.firstName +' '+authContext.currentUser.information?.lastName}</div>
                                {authContext.currentUser.information?.job && authContext.currentUser.information.company ?
                                 <div className='text-gray-700 opacity-80 font-poppins text-[11px] text-center'>{authContext.currentUser.information?.job +'@'+authContext.currentUser.information?.company}</div>
                                :
                                undefined
                                }
                            </div>
                            <div  id='qrCodeBox'  className={`${theme}-ShareContact-QrCodeVector`}>
                                <img src={qrcodeValue} alt="" className='mt-5 mb-6'/>
                            </div>

                        </div>
                    </div>
                    <div className={`${theme}-ShareContact-CardItems opacity-50 cursor-not-allowed`} >
                        <div className={`${theme}-ShareContact-VectorMainSection btnInnerShadowsDark`}>
                            <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-SmsVector`}></div>
                        </div>
                        Share via SMS 
                    </div>
                    <div className={`${theme}-ShareContact-CardItems opacity-50 cursor-not-allowed`}>
                        <div className={`${theme}-ShareContact-VectorMainSection btnInnerShadowsDark`}>
                            <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-EmailVector`}></div>
                        </div>
                        Share via Email
                    </div>
                    <div onClick={() => {
                        navigator.clipboard.writeText(authContext.currentUser.resolveLink())
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
                            url:authContext.currentUser.resolveLink()+'&viewBy=share_link'
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
                    <div className="text-sm text-gray-700 opacity-80 text-center">We will send a text message with your contact info and profile to:</div>
                </div>
            </div>
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
                    <TextField phoneCountry={country}  setPhoneCountry={setCountry} {...formik.getFieldProps("Phone")} theme="Carbon" name="Phone" errorMessage={formik.errors?.Phone} placeholder="Enter your phone " type="phone" inValid={false}></TextField>
                    </div>
                <div className="mt-8 mb-4">
                    <button onClick={() => {
                        setMode('mainSection')
                        onClose()
                        }} className="Carbon-Button-container">Share Contact</button>
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
                            <label className="Carbon-TextField-label" >Email</label>
                            <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">

                                <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="email" id="textfield28972" placeholder="Enter your email address..." name="Email" />
                            </div>
                        </div>
                    </div>
                <div className="mt-8 mb-4">
                    <button onClick={() => {
                        setMode('mainSection')
                        onClose()
                        }} className="Carbon-Button-container">Share Contact</button>
                </div>
            </div>

            </>
            :
            undefined
            }

        </Modal>        
        </>
    )
}

export default ShareContact