import { Button } from "symphony-ui"
import { publish } from "../../../utils/event"
import { useEffect } from "react"

interface ReadyForMoreProps {
    onClose:() =>void
    page:'link'
}

const ReadyForMore:React.FC<ReadyForMoreProps> = ({onClose,page}) => {

    useEffect(() => {
        publish("profileIsReview",{})
        return () => {
            publish("profileIsProfile",{})
        }
    },[])

    const resolveText = () => {
        if(page == 'link'){
                return `
                You've reached the limit for links. Upgrade to Avatalk Pro to add unlimited links and maximize your profile's potential!
                `
        }
    }
    return (
        <>
            <div className=" boxsInnerShadows rounded-[27px] max-w-xl h-auto pb-10  borderBox-Gray w-full">
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
                <div className="px-5 mt-4 mb-6">
                    <div className="Carbon-TextArea-input h-[63px]">
                      {resolveText()}
                    </div>
                </div>
                <div className="px-5">
                    <Button theme="Carbon">Upgrade to Pro</Button>

                </div>
            </div>
        </>
    )
}

export default ReadyForMore