import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from 'symphony-ui';
import { useAuth } from '../../../hooks/useAuth';

interface ShareContactProps {
    isOpen : boolean
    onClose: () => void
    theme?:string
    onAfterOpen?:() =>void
}


const ShareContact:React.FC<ShareContactProps> = ({isOpen,onAfterOpen,onClose,theme}) => {
    const [mode,setMode] = useState<'mainSection'|'smsSection'|'emailSection'>('mainSection')
    const authContext = useAuth()
    return (
        <>
        <Modal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onClose}
            style={{content:{borderRadius:'24px',width:'100%',maxWidth:'360px',background:'rgba(243, 244, 246, 1)'},overlay:{backgroundColor:'rgba(0,0,0,0.7)'}}}
            contentLabel="Example Modal"
        >
            {
            mode == 'mainSection' ?
            <>
            <div className={`${theme}-ShareContact-Container`}>
                <div className={`${theme}-ShareContact-Title contactNameShadow`}>Share Contact</div>
                <Button onClick={onClose} theme='Carbon-back'>
                    <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
            </div>
            <div className={`${theme}-ShareContact-Body`}>
                <h1 className={`${theme}-Profile-ProfileName mb-1`}>{authContext.currentUser.information?.firstName}</h1>
                <p className={`${theme}-Profile-SubTitle`}>{authContext.currentUser.information?.job}</p>
                <div className={`${theme}-ShareContact-QrCodeVector`}></div>
                <div className={`${theme}-ShareContact-Cards`}>
                    <div className={`${theme}-ShareContact-CardItems`} onClick={() => {setMode('smsSection')}}>
                        <div className={`${theme}-ShareContact-VectorMainSection btnInnerShadowsDark`}>
                            <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-SmsVector`}></div>
                        </div>
                        Share via SMS 
                    </div>
                    <div className={`${theme}-ShareContact-CardItems`} onClick={() => {setMode('emailSection')}}>
                        <div className={`${theme}-ShareContact-VectorMainSection btnInnerShadowsDark`}>
                            <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-EmailVector`}></div>
                        </div>
                        Share via Email
                    </div>
                    <div className={`${theme}-ShareContact-CardItems`}>
                        <div className={`${theme}-ShareContact-VectorMainSection btnInnerShadowsDark`}>
                            <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-CopyVector`}></div>
                        </div>
                        Copy to Clipboard
                    </div>
                    <div className={`${theme}-ShareContact-CardItems`}>
                        <div className={`${theme}-ShareContact-VectorMainSection btnInnerShadowsDark`}>
                            <div className={`${theme}-ShareContact-MainVectors ${theme}-ShareContact-ImportVector`}></div>
                        </div>
                        Download QR Code
                    </div>
                    <div className={`${theme}-ShareContact-CardItems`}>
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
                <Button onClick={onClose} theme='Carbon-back'>
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
                        <div className="Carbon-TextField-container w-[100%]">
                            <label className="Carbon-TextField-label" >Phone</label>
                            <div data-testid="input-container" deta-selectbox="false" className=" w-[100%] Carbon-TextField-box ">
                                <div className="Carbon-TextField-selectPhone-container">
                                    <img src="https://flagcdn.com/w20/us.png"/>
                                    <img className="Carbon-TextField-selectPhone-container-icon" src="./Carbon/bottomVector.svg" alt=""/>
                                </div>
                            <input data-testid="input-id" deta-selectbox="true" className="Carbon-TextField-input" type="phone" id="textfield28972" placeholder="Enter your phone number..." name="Phone" />
                        </div>
                    </div>
                </div>
                <div className="mt-8 mb-4">
                    <button className="Carbon-Button-container">Share Contact</button>
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
                <Button onClick={onClose} theme='Carbon-back'>
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
                    <button className="Carbon-Button-container">Share Contact</button>
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