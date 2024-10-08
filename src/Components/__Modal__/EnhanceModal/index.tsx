import { Button } from "symphony-ui"

interface EnhanceModalProps {
    onClose:() => void
    submit:() => void
}

const EnhanceModal:React.FC<EnhanceModalProps> = ({
    onClose,
    submit,
}) => {
    return (
        <>
            <div  className="absolute slideupModal p-6 borderBox-Gray boxShadow-purple w-full  bottom-0 z-50 rounded-[27px] bg-[#F3F4F6]">
                <div className="flex w-full justify-between items-center">
                    <div className="invisible">
                        <Button theme="Carbon-Google" data-mode="profile-review-button-2">
                            <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors m-0"></div>
                        </Button>   
                    </div>
                    <div className="text-[14px] text-[#374151] font-semibold">Enhance Your AI Experience!</div>
                    <Button onClick={onClose} theme="Carbon-Google" data-mode="profile-review-button-2">
                        <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors m-0"></div>
                    </Button>

                </div>
                <div className="boxsInnerShadows p-6 text-[14px] w-full mb-[60px] text-[#374151] rounded-[27px] mt-4">
                    It looks like your AI settings are incomplete. To unlock the full potential and ensure your AI delivers the best responses, please take a moment to complete your AI settings.
                </div>
                <div className="absolute w-full left-0 bottom-4 px-6">
                    <Button onClick={submit} theme="Carbon">Go to AI Setting</Button>
                </div>
            </div>
        </>
    )
}

export default EnhanceModal