import { useAuth } from "../../hooks/useAuth"
import {useEffect, useState} from 'react';
import { subscribe } from "../../utils/event";

interface AccessNotifManager{
    page:string
}

const AccessNotifManager:React.FC<AccessNotifManager> = ({page}) => {
    const authContext = useAuth()
    const [showNotif,setShowNotif] = useState(false)
    const [isSkipped,setIsSkipped] = useState(false)
    useEffect(() => {
        if(authContext.currentUser.type_of_account.getType() == 'Trial' && !isSkipped){
            setTimeout(() => {
                setShowNotif(true)
            }, 3000);

        }
    })
    subscribe("nextPage",() => {
        setShowNotif(false)
    })
    const resolveText = () => {      
        if(authContext.currentUser.type_of_account.getType() == 'Trial') {
            if(page == 'AiSetting'){
                return `
                    Enjoy full access to all settings during your trial for a limited time. Upgrade to Pro to keep this control forever!            
                `
            }
            if(page == 'GallerySetting'){
                return `
                    You're enjoying unlimited image uploads now. Don't lose this—upgrade to Pro!        
                `                
            }
            if(page == 'LinkSetting'){
                return `
                    Add all the links you need now., but post-trial, link options reduce. Keep your connectivity—upgrade to Pro!
                `                
            }        
            if(page == 'FileSetting'){
                return `
                    Access to upload multiple files is just a trial perk! Go Pro to maintain this advantage.
                `                
            }  
            if(page == 'AnalysePage'){
                return `
                    All metrics are visible now. Upgrade to Pro to retain and track your stats forever!
                `                
            }   
            if(page == 'ChatPage'){
                return `
                    Unlimited chats are open now! Post-trial, chats will be limited unless you upgrade to Pro.
                `                
            }                                             
        }
        return ''
    }
    return (
        <>
            {
                showNotif ?
                    <div className="w-full py-4 px-6 rounded-[27px] bg-white borderBox-primary3 ">
                        <div className="text-[14px] text-left text-[#374151]">{resolveText()}</div>
                        {
                            authContext.currentUser.type_of_account.getType() == 'Trial'?
                                <>
                                    <div className="w-full h-2 relative rounded-[12px] border-[#FFFFFF80] border mt-4" style={{
                                        boxShadow: "inner 4px 4px 14px 2px #E2E8F0,inner -4px -4px 9px 2px #FFFFFF99"
                                    }}>
                                        <div className={`absolute left-0 h-[7px] top-0 rounded-[12px] bg-[#FBBF24] `} style={{width:authContext.currentUser.type_of_account.getPercentDayUsed()+"%"}}></div>
                                    </div>
                                    <div className="text-[#94A3B8] text-xs text-left mt-2">
                                        {authContext.currentUser.type_of_account.getDayUsed()}/14 Days
                                    </div>
                                </>
                            :undefined
                        }
                        <div className="flex w-full font-medium mt-2 gap-6 justify-end items-center">
                            <div className="text-[#FBBF24] cursor-pointer text-[14px]">Upgrade to Pro</div>
                            <div onClick={() => {
                                setShowNotif(false)
                                setIsSkipped(true)
                            }} className="text-[#94A3B8] cursor-pointer text-[14px]">Skip Now</div>
                        </div>
                    </div>
                :undefined
            }
        </>
    )
}

export default AccessNotifManager