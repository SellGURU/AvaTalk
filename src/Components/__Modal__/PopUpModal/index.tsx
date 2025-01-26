/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { publish } from "../../../utils/event"
import { Button } from "symphony-ui"

interface PopUpModalProps {
    onClose:() => void
    languagesList:Array<any>
    selectedLang:any
    setSelectLang:(lan:any) =>void
    handleLanChange:(code:string) => void
}

const PopUpModal:React.FC<PopUpModalProps> = ({onClose,handleLanChange,languagesList,selectedLang,setSelectLang}) => {
    // const navigate = useNavigate()
    const [activelan,setActiveLan] = useState(selectedLang)
    useEffect(() => {
        // publish("profileIsReview",{})
        // publish("IncressFooter",{})
        return () => {
            // publish("profileIsProfile",{})
            // publish("DisIncressFooter",{})
        }
    },[])    
    return (
        <>
            <div className=" boxsInnerShadows slideupModal rounded-[27px] max-w-[32rem] h-auto pb-10 bottom-0 absolute borderBox-Gray w-full">
                <div className="flex mt-5 items-center px-5 justify-between">
                    <div className="invisible">
                        <Button data-mode="profile-review-button-2" theme="Carbon-Google">
                            <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors m-0"></div>
                        </Button>                    
                    </div>
                    <div className="text-[14px] font-semibold text-text-primary">More Languages</div>
                    <div>
                        <Button onClick={() => {
                            // publish("profileIsProfile",{})
                            onClose()
                        }} data-mode="profile-review-button-2" theme="Carbon-Google">
                            <div className="Carbon-Profile-closeIcon Carbon-Footer-Vectors m-0"></div>
                        </Button>
                    </div>
                </div>     
                <div className="min-h-[100px]">
                    <div className="flex justify-center items-start">
                        <div className="max-w-[420px] flex flex-wrap mx-auto px-6 justify-start  items-center mt-4 gap-2">
                            {languagesList.map((el) => {
                                return (
                                    <>
                                        <div onClick={() => {
                                            setActiveLan(el)
                                        }} className="w-[116px] flex justify-between items-center cursor-pointer h-10 borderBox-Gray px-2 boxShadow-Gray rounded-[27px]">
                                            <div className="flex justify-start items-center">
                                                <img src={el.icon} className="w-6 border-2 borderBox-Gray  rounded-full" alt="" />
                                                <div className="text-[#374151] text-[12px] ml-1">{el.lan}</div>

                                            </div>
                                            {el.lan == activelan.lan &&
                                                <div>
                                                    <div className="w-4 h-4 flex justify-center items-center rounded-full bg-primary-color">
                                                        <img className="w-2" src="./Carbon/tick-white.svg" alt="" />
                                                    </div>
                                                </div>                                            
                                            }
                                        </div>
                                    </>
                                )
                            })}

                        </div>

                    </div>
                    <div className="flex justify-center mt-8">
                        <div className="max-w-[420px] px-6 w-full">
                            <Button onClick={() => {
                                setSelectLang(activelan)
                                handleLanChange(activelan.code)
                                onClose()
                            }} theme="Carbon">
                                Confirm
                            </Button>

                        </div>

                    </div>
                </div>
                
            </div>        
        </>
    )
}

export default PopUpModal