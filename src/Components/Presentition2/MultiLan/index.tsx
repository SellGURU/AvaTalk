/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react"
import useModalAutoClose from "../../../hooks/useModalAutoClose";
interface Langs {
    lan:string,
    code:string,
    icon:string
}

interface MultiLanProps {
    langs:Array<Langs>
    setShowMore:(action:boolean) =>void
    setSelectedLang:(val:Langs) => void
    selected:Langs
    handleLanChange:(code:string) => void
}

const MultiLan:React.FC<MultiLanProps> = ({langs,selected,handleLanChange,setShowMore,setSelectedLang}) =>{
    const [isOpen,setIsOpen] = useState(false);
    const refrence = useRef(null)
    const refrenceButton = useRef(null)
    useModalAutoClose({
        refrence:refrence,
        buttonRefrence:refrenceButton,
        close:() => {
            setIsOpen(false)
        }
    })
    const resolveLanSmallName =() => {
        switch(selected.lan){
            case "English" : return 'EN'
            case "German" : return 'DE'
            case "French" : return 'FR'
            case "Arabic" : return 'AR'
            case "Persian" : return 'FA'
            case "Chinese" : return 'ZH'
            case "Turkish" : return 'TR'
        }
        return "EN"
    }
    return (
        <div className="relative">
            <div ref={refrenceButton} onClick={() => {
                setIsOpen(!isOpen)
            }} className=" borderBox-Gray select-none relative flex justify-center items-center boxShadow-Gray cursor-pointer w-[56px] h-[56px] rounded-full  ">
                <img src="./Carbon/translate.svg" alt="" />
                <div className="absolute flex justify-center text-[12px] items-center text-white font-medium w-6 h-6 bg-primary-color rounded-full left-[-6px] top-[-4px]">
                   {resolveLanSmallName()}
                </div>
            </div>
            {isOpen &&
                <div ref={refrence} className="bg-white py-1 w-[115px] h-[170px] rounded-[16px] absolute right-2 boxShadow-Gray bottom-16 ">
                {langs.slice(0,4).map((el) => {
                        return (
                            <>
                                <div onClick={() => {
                                    setSelectedLang(el)
                                    setTimeout(() => {
                                        handleLanChange(el.code)
                                        setIsOpen(false)
                                    }, 400);
                                }} className="flex   px-2 items-center cursor-pointer border-b py-2 border-[#E5E7EB] justify-between gap-1 ">
                                    <div className="flex justify-start items-center gap-1">
                                        <img className="w-4" src={el.icon} />
                                        <div className="text-xs text-[#374151]">{el.lan}</div>
                                    </div>
                                    {selected.lan == el.lan &&
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
                <div onClick={() => {
                    setShowMore(true)
                }} className="text-[12px] cursor-pointer text-[#374151] px-2 py-2 text-start">
                    more
                </div>
                </div>
            }


  
        </div>
    )
}

export default MultiLan