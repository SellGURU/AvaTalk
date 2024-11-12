import { Button } from "symphony-ui"
import { publish } from "../../../utils/event"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface ReadyForMoreProps {
    onClose:() =>void
    page:'link'|'AiSetting'| 'Gallery' | 'File' | 'Video' | 'Chat'
}

const ReadyForMore:React.FC<ReadyForMoreProps> = ({onClose,page}) => {
    const navigate = useNavigate()
    useEffect(() => {
        publish("profileIsReview",{})
        publish("IncressFooter",{})
        return () => {
            publish("profileIsProfile",{})
            publish("DisIncressFooter",{})
        }
    },[])

    const resolveText = () => {
        if(page == 'link'){
                return `
                You've reached the limit for links. Upgrade to Avatalk Pro to add unlimited links and maximize your profile's potential!
                `
        }
        if(page == 'AiSetting'){
            return `
                You've customized your AI persona once for free. To make further edits and keep your AI dynamic, upgrade to Avatalk Pro!            
            `
        }
        if(page == 'Gallery'){
            return `
                You've uploaded the maximum number of images. Upgrade to Avatalk Pro to upload up to 50 images and enhance your gallery!          
            `
        }        
        if(page == 'File'){
            return `
                You've reached the file upload limit. Upgrade to Avatalk Pro for up to 50 file uploads and expand your sharing capabilities!            
            `
        }
        if(page == 'Video'){
            return `
                You've reached the video upload limit. Upgrade to Avatalk Pro for more video uploads and enhance your profile!         
            `
        }      
        if(page == 'Chat'){
            return `
              You can't read the received messages in the free plan. Upgrade to Avatalk Pro to unlock full conversations with your Avatar and enhance your networking!
            `
        }                  
    }
    return (
        <>
            <div className=" boxsInnerShadows slideupModal rounded-[27px] max-w-[32rem] h-auto pb-10  borderBox-Gray w-full">
                <div className="flex mt-5 items-center px-5 justify-between">
                    <div className="invisible">
                        <Button data-mode="profile-review-button-2" theme="Carbon-Google">
                            <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors m-0"></div>
                        </Button>                    
                    </div>
                    <div className="text-[14px] font-semibold text-text-primary">Ready for More? Go Pro!</div>
                    <div>
                        <Button onClick={() => {
                            publish("profileIsProfile",{})
                            onClose()
                        }} data-mode="profile-review-button-2" theme="Carbon-Google">
                            <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors m-0"></div>
                        </Button>
                    </div>
                </div>
                <div className="px-5 mt-6 mb-8">
                    <div className="boxsInnerShadows p-6 text-[14px] w-full flex justify-center items-center text-[#374151] rounded-[27px] mt-4 py-4">
                      {resolveText()}
                    </div>
                </div>
                <div className="px-5">
                    <Button onClick={() => {
                        navigate('/settings/service')
                    }} theme="Carbon">Upgrade to Pro</Button>

                </div>
            </div>
        </>
    )
}

export default ReadyForMore