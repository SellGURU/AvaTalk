import { useAuth } from "../../hooks/useAuth"
import {useEffect, useState} from 'react';
import { subscribe } from "../../utils/event";
import {useNavigate} from "react-router-dom";

interface AccessNotifManager{
    page:string
    isLimited?:boolean
    modeLimited?:string
}

const AccessNotifManager:React.FC<AccessNotifManager> = ({page,isLimited,modeLimited}) => {
    const authContext = useAuth()
    const [showNotif,setShowNotif] = useState(false)
    const [isSkipped,setIsSkipped] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if(authContext.currentUser.type_of_account.getType() == 'Trial' && !isSkipped){
            setTimeout(() => {
                setShowNotif(true)
            }, 1000);
        }

        if(authContext.currentUser.type_of_account.getType() == 'Free' && !isSkipped){
            setTimeout(() => {
                setShowNotif(true)
            }, 1000);            
        }
        if(authContext.currentUser.type_of_account.getType() == 'Pro' && !isSkipped){
            if(authContext.currentUser.type_of_account.getDayremindToExpired() <= 7)
                setTimeout(() => {
                    setShowNotif(true)
                }, 1000);
        }
    })
    subscribe("useMoreVoiceRecorder",() => {
        setShowNotif(true)
    })
    subscribe("nextPage",() => {
        setShowNotif(false)
    })
    const resolveText = () => {     
        if(modeLimited == 'endUser') {
            return  "Impressed by what you heard? Imagine your voice here. Start your free Avatalk trial today!"
        }
        if(authContext.currentUser.type_of_account.getType() == 'Trial') {
            if(page == 'chatEndUser'){
                if(modeLimited =='review'){
                    return  "Hi, I am your Avatar. Your trial gives you full access to Avatalk's networking power, for a limited time. Keep your avatar active—upgrade to Pro!"
                }
                return "Impressed by what you heard? Imagine your voice here. Start your free Avatalk trial today!"

            }              
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
             if (page == "VideoSetting") {
               return `
               You're enjoying unlimited video uploads. Upgrade to Pro to keep this feature! after your trial.             `;
             }                                             
        }
        if(authContext.currentUser.type_of_account.getType() == 'Free') {
            if(page == 'chatEndUser'){
                if(modeLimited =='review'){
                    return "Unlock voice chat with your Avatar! Upgrade to Pro and make your AI persona even more interactive and engaging."
                }
                if(modeLimited =='moreVoice'){
                    return "You've reached the limit for voice chat. Upgrade to Avatalk Pro to unlock full voice chat capabilities and make your Al more interactive!"
                }                
                return 'Impressed by what you heard? Imagine your voice here. Start your free Avatalk trial today!'
            }            
            if(page == 'AiSetting'){
                if(isLimited){
                    return `
                       Unlock unlimited AI persona edits with Avatalk Pro. Make your AI work best for you, anytime you want. Upgrade now!      
                    `                    
                }
                return `
                   Personalize your AI once for free, with a 2000 character limit on provided info. Want more customizations later? Upgrade to Pro for unlimited edits!      
                `
            }
            if(page == 'GallerySetting'){
                if(isLimited){
                    return `Want to display more visuals? Upgrade to Avatalk Pro and get up to 50 image uploads!`
                }
                return `
                    Showcase up to 5 images in your gallery. Need more? Upgrade to Pro and upload up to 50 images!       
                `                
            }
            if(page == 'LinkSetting'){
                if(isLimited){
                    return `More links mean more connections. Upgrade to Pro for unlimited links and expand your reach!`
                }                
                return `
                    Add up to 2 links to your profile. Upgrade to Pro for unlimited link sharing and boost your networking!
                `                
            }        
            if(page == 'FileSetting'){
                if(modeLimited =='length'){
                    return `Share more with your connections. Upgrade to Avatalk Pro for up to 50 file uploads!`
                }     
                if(modeLimited =='fileSize'){
                    return `Want to upload files bigger than 10MB? Upgrade to Avatalk Pro for uploads up to 50MB and share more content!`
                }                                    
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
            if (page == "VideoSetting") {
                if(modeLimited=="length"){
                    return `Engage more with videos. Upgrade to Pro to captivate your audience!`
                }                     
              return `
                Add your first video for free. Want to showcase more? Upgrade to Avatalk Pro!                `;
            }                                             
        }        
        if(authContext.currentUser.type_of_account.getType() == 'Pro') {
            if(page == 'chatEndUser' && authContext.currentUser.type_of_account.getDayremindToExpired() <= 7){
                return "Voice chat will be limited soon. Renew to allow your followers to speak with you."
            }               
            if(page == 'AiSetting'){
                return `
                   Your custom AI settings will revert to default in ${authContext.currentUser.type_of_account.getDayremindToExpired()} days unless you renew your plan. Keep your Pro membership!    
                `
            }
            if(page == 'GallerySetting'){
                return `
                    Gallery capacity will be limited soon. Renew to maintain your extensive gallery. Tap to renew your Pro membership!
                `                
            }
            if(page == 'LinkSetting'){
                return `
                    Your profile will be restricted to 2 links soon. Tap to renew your Pro membership!
                `                
            }        
            if(page == 'FileSetting'){
                return `
                    File upload size and access will be limited soon. Renew to continue sharing all your files!
                `                
            }  
            if(page == 'AnalysePage'){
                return `
                    Your access to analytics is about to expire! Renew to keep tracking your progress.
                `                
            }   
            if(page == 'ChatPage'){
                return `
                    Access to review chats will be limited soon. Renew your subscription to keep seeing the content of your messages.
                `                
            }    
            if (page == "VideoSetting") {
              return `
                Video access will end soon. Renew to keep your profile dynamic.              `;
            }   
        }
        return ''
    }
    useEffect(() => {
        if(resolveText() == '' ){
            setShowNotif(false)
        }else {
            setShowNotif(true)
        }
    },[])
    return (
        <>
            {
                showNotif ?
                    <div className="w-full py-4 px-6 rounded-[27px] bg-white borderBox-primary3 ">
                        <div className="text-[14px] text-justify text-[#374151]">{resolveText()}</div>
                        {
                            authContext.currentUser.type_of_account.getType() == 'Trial' && page != 'chatEndUser'?
                                <>
                                    <div className="w-full h-2 relative rounded-[12px] bg-gray-200 border-[#FFFFFF80] border mt-4" style={{
                                        boxShadow: "inner 4px 4px 14px 2px #E2E8F0,inner -4px -4px 9px 2px #FFFFFF99"
                                    }}>
                                        <div className={`absolute left-0 h-[7px] top-0 rounded-[12px] bg-[#FBBF24] `} style={{width:authContext.currentUser.type_of_account.getPercentDayUsed()  +"%"}}></div>
                                    </div>
                                    <div className="text-[#94A3B8] text-xs text-left mt-2">
                                        {authContext.currentUser.type_of_account.getDayUsed()}/14 Days
                                    </div>
                                </>
                            :undefined
                        }
                        
                        <div className="flex w-full font-medium mt-2 gap-6 justify-end items-center">
                            {(modeLimited=="endUser" )&& page=="chatEndUser"?
                                  <div onClick={() => {
                                    window.open('https://portal.avatalk.me/#/signup')
                                    // navigate('https://portal.avatalk.me/#/login')
                                  }} className="text-[#FBBF24] cursor-pointer font-semibold text-[14px]">Create Your Avatalk</div>
                                :
                                // <Link to={"/settings/service"}>

                                <div onClick={() => {
                                    navigate('/settings/service')
                                }} className="text-[#FBBF24] font-semibold cursor-pointer text-[14px]">{authContext.currentUser.type_of_account.getType() == 'Pro'? 'Renew Your Plan':'Upgrade to Pro'}</div>
                                // </Link>
                            }
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