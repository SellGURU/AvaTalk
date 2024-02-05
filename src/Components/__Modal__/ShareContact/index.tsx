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
                    <div className={`${theme}-TextField-input ${theme}-ShareContact-CardItems`}>
                        <div className={`${theme}-ShareContact-VectorSection`}>
                            <div className={`${theme}-ShareContact-Vectors ${theme}-ShareContact-SmsVector`}></div>
                        </div>
                        Share via SMS 
                    </div>
                    <div className={`${theme}-TextField-input ${theme}-ShareContact-CardItems`}>
                        <div className={`${theme}-ShareContact-VectorSection`}>
                            <div className={`${theme}-ShareContact-Vectors ${theme}-ShareContact-EmailVector`}></div>
                        </div>
                        Share via Email
                    </div>
                    <div className={`${theme}-TextField-input ${theme}-ShareContact-CardItems`}>
                        <div className={`${theme}-ShareContact-VectorSection`}>
                            <div className={`${theme}-ShareContact-Vectors ${theme}-ShareContact-CopyVector`}></div>
                        </div>
                        Copy to Clipboard
                    </div>
                    <div className={`${theme}-TextField-input ${theme}-ShareContact-CardItems`}>
                        <div className={`${theme}-ShareContact-VectorSection`}>
                            <div className={`${theme}-ShareContact-Vectors ${theme}-ShareContact-ImportVector`}></div>
                        </div>
                        Download QR Code
                    </div>
                    <div className={`${theme}-TextField-input ${theme}-ShareContact-CardItems`}>
                        <div className={`${theme}-ShareContact-VectorSection`}>
                            <div className={`${theme}-ShareContact-Vectors ${theme}-ShareContact-LinkVector`}></div>
                        </div>
                        Share Link
                    </div>
                </div>
            </div>
        </Modal>        
        </>
    )
}

export default ShareContact