import { Button } from "symphony-ui"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useReducer, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { SharingModType } from "../../../Types";

const SettingSharing =() => {
    const navigate = useNavigate();
    const auth = useAuth()
    const pelan = [
        {
            title:'Default Mode',
            isPro:false,
            content:'Collect contact info via a form, then share your details directly to your contact’s phone.'
        },
        {
            title:'Lead Mode',
            isPro:true,
            content:'Collect contact info via a form, then send an automated text and email with your details.'
        },
        {
            title:'Share Mode',
            isPro:true,
            content:'Share your contact details directly to your contact’s phone, without any forms or follow-up.'
        },
    ]
    // const [activePelan , setActivePelan] = useState(pelan[0])
    // toggles
    const [sendEmailActive, setSendEmailActive] = useState(true);
    const [sendSMSActive, setSendSMSActive] = useState(false);
    const [additionalSettingsActive, setAdditionalSettingsActive] = useState(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    console.log(auth)
    return (
        <>
        <div className={`Carbon-ChatDetails-container`}>
            <Outlet></Outlet>
            <div className="flex px-6 items-center space-x-4 absolute  top-8">
                <Button onClick={() => {navigate(-1)}} theme={`Carbon-back`}>
                    <div className={`Carbon-back-Button-vector`}></div>
                </Button>
                <p className={`Carbon-ChatDetails-title`}>Sharing</p>
            </div>            

            <div className="flex flex-col gap-y-5 px-6 mt-[96px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
                <div className="">
                    <div className="Carbon-Edit-title">Select Sharing Mode</div>
                    {pelan.map((item)=>{
                        return(
                            <div className="px-6 mt-24 Carbon-Setting-CardContainer flex items-center gap-2 text-justify" onClick={()=>{
                                auth.currentUser.setShareMode(item.title as SharingModType)
                                forceUpdate()
                                }}>
                                <div>
                                    <div className="font-medium text-sm flex gap-2 items-center mb-1">
                                        {item.title}
                                        {item.isPro ?
                                            <p className="flex justify-center items-center text-white leading-[20px] text-[12px] font-[400] bg-primary-color border border-white w-[47px] rounded-[47px] h-5 ">Pro</p>
                                        :
                                            undefined
                                        }
                                    </div>
                                    <p className="text-xs text-gray-400">{item.content}</p>
                                </div>
                                {auth.currentUser.getShareMode()==item.title ? 
                                    <div className="w-6 h-6 cursor-pointer boxShadow-Gray rounded-full border border-white bg-primary-color">
                                        <div className="w-6 h-6 flex items-center justify-center">
                                            <span className="text-white">✓</span>
                                        </div>
                                    </div>
                                :
                                    <div className=" flex items-center justify-center">
                                        <span className="w-6 h-6 cursor-pointer relative borderBox-Gray btnInnerShadowsDark rounded-full"></span>
                                    </div>
                                }
                            </div>
                        )
                    })}
                    <div className="mt-6 flex flex-col gap-4">
                        <div className="Carbon-Edit-title">Advanced Settings</div>
                        <div className="flex justify-between items-center ">
                            <div className="flex gap-2 items-center">
                                Send a follow-up email
                            </div>
                            <div className={`w-16 h-7 cursor-pointer rounded-[100px] btnInnerShadowsDark flex items-center ${ auth.currentUser.advancedSettings?.Sendafollowupemail == true ? 'justify-end' : 'justify-start'}`} onClick={() => {
                                auth.currentUser.advancedSettings.Sendafollowupemail = !auth.currentUser.advancedSettings.Sendafollowupemail 
                                forceUpdate()
                            }} >
                                <div className={`w-6 h-6 boxShadow-Gray rounded-full border border-white ${ auth.currentUser.advancedSettings.Sendafollowupemail == true ? 'bg-primary-color' : 'bg-white'}`}>
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <span className={auth.currentUser.advancedSettings?.Sendafollowupemail== true ? 'text-white' : 'text-primary-color'}>|</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center ">
                            <div className="flex gap-2 items-center">
                                Send a follow-up SMS
                            </div>
                            <div className={`w-16 h-7 cursor-pointer rounded-[100px] btnInnerShadowsDark flex items-center ${ sendSMSActive ? 'justify-end' : 'justify-start'}`} onClick={() => setSendSMSActive(!sendSMSActive)} >
                                <div className={`w-6 h-6 boxShadow-Gray rounded-full border border-white ${ sendSMSActive ? 'bg-primary-color' : 'bg-white'}`}>
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <span className={sendSMSActive ? 'text-white' : 'text-primary-color'}>|</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center ">
                            <div className="flex gap-2 items-center">
                                Additional Settings
                                <p className="flex justify-center items-center text-white leading-[20px] text-[12px] font-[400] bg-primary-color border border-white w-[47px] rounded-[47px] h-5 ">Pro</p>
                            </div>
                            <div className={`w-16 h-7 cursor-pointer rounded-[100px] btnInnerShadowsDark flex items-center ${ additionalSettingsActive ? 'justify-end' : 'justify-start'}`} onClick={() => setAdditionalSettingsActive(!additionalSettingsActive)} >
                                <button className={`w-6 h-6 boxShadow-Gray rounded-full border border-white ${ additionalSettingsActive ? 'bg-primary-color' : 'bg-white'}`}>
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <span className={additionalSettingsActive ? 'text-white' : 'text-primary-color'}>|</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SettingSharing