import { Button } from "symphony-ui"
import { publish } from "../../../utils/event"
import { useEffect } from "react"
interface ReadyForMoreProps {
    onClose:() =>void
}

const NetworkError:React.FC<ReadyForMoreProps> = ({onClose}) => {
    useEffect(() => {
        publish("profileIsReview",{})
        publish("IncressFooter",{})
        return () => {
            publish("profileIsProfile",{})
            publish("DisIncressFooter",{})
        }
    },[])

    const resolveText = () => {
        return  `
            Oops! The total size of your files exceeds 4.5 MB. Please choose smaller files or reduce their size and try again. Thanks!
        `        
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
                    <div className="text-[14px] font-semibold text-text-primary">Upload Limit Exceeded</div>
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
                        onClose()
                    }} theme="Carbon">Got It</Button>

                </div>                
            </div>
        </>
    )
}

export default NetworkError