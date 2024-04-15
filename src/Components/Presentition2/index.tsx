import { useRef, useState } from "react"
import FooterPresentation from "../FooterPresentation"
import { sendToApi } from "../../help";
import { chat } from "../../Types";
import { User } from "../../Model";

const Presentition2 = () => {
    const languagesList = [
        { lan: "English", code: "en-US" },
        { lan: "German", code: "de" },
        { lan: "French", code: "fr" },
        { lan: "Persian", code: "fa" },
        { lan: "Turkish", code: "tr-TR" },
        { lan: "Chinese", code: "zh-cn" },
        { lan: "Arabic", code: "ar-AE" },
    ];      
    const [selectedLang,setSelectedLang] = useState(languagesList[0])
    const [chats,setChats] = useState<Array<chat>>([
    ])    
    const audioRef = useRef<HTMLAudioElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [audioUrl, setAudioUrl] = useState<string>('');    
    const [isTalking,setIsTalking] = useState(false)
    const [isLoading,setIsLoading] = useState(false);
    const [isRecording,setIsRecording] = useState(false)  
    const [showSuggestions,setShowSuggestions] = useState(false);     
    const [shareUser,setShareUser] = useState<null | User>(null)
    const BLokedIdList =useRef<string[]>([]);
    const handleSendVector = (value: string) => {
        setShowSuggestions(false)
        setIsLoading(true)
        sendToApi(chats,setChats,value,(res) => {
        setAudioUrl(res.answer.audio_file)
        setIsTalking(true)
        setIsLoading(false)
        },() => {
        setIsLoading(false)
        },selectedLang.lan,BLokedIdList,shareUser?.information?.userId as string)
    };     
    return (
        <>
        <FooterPresentation langCode={selectedLang.code} isRecording={isRecording} setIsRecording={setIsRecording} isLoading={isLoading} theme="Carbon" onSendVector={handleSendVector}/>
        </>
    )
}

export default Presentition2