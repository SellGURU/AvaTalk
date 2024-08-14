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

        if(authContext.currentUser.type_of_account.getType() == 'Free' && !isSkipped){
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
        if(authContext.currentUser.type_of_account.getType() == 'Free') {
            if(page == 'AiSetting'){
                return `
                   Personalize your AI once for free, with a 2000 character limit on provided info. Want more customizations later? Upgrade to Pro for unlimited edits!      
                `
            }
            if(page == 'GallerySetting'){
                return `
                    Showcase up to 5 images in your gallery. Need more? Upgrade to Pro and upload up to 50 images!       
                `                
            }
            if(page == 'LinkSetting'){
                return `
                    Add up to 2 links to your profile. Upgrade to Pro for unlimited link sharing and boost your networking!
                `                
            }        
            if(page == 'FileSetting'){
                return `
                    Upload your first file for free. Up to 10 MB. Need more space? Upgrade to Pro for 50 uploads up to 50MB!
                `                
            }  
            if(page == 'AnalysePage'){
                return `
                    Discover powerful insights with Avatalk Pro! Get detailed analytics and reports to grow your influence.
                `                
            }   
            if(page == 'ChatPage'){
                return `
                    Unlock full conversations with your Avatar by upgrading to Avatalk Pro. Enhance your networking experience!
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