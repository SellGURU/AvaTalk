/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState  } from "react"
import FooterPresentation from "../FooterPresentation"
import { sendToApi, useConstructor } from "../../help";
import { chat } from "../../Types";
import { User } from "../../Model";
import { Suggestions } from "symphony-ui";
import { BeatLoader } from "react-spinners";

interface PresentationProps {
  theme?: string;
  isTalking:boolean;
  setIsTalking:(action:boolean) =>void;
  setAudioUrl:(value:string) =>void;
  shareUser:User
  chats:Array<chat>
  setChats:(cat:Array<chat>) => void
}
const Presentition2:React.FC<PresentationProps> = ({ theme,chats,setChats,shareUser,setAudioUrl,setIsTalking}) => {
    // const user = useAuth()
    const languagesList = [
        { lan: "English", code: "en-US" },
        { lan: "German", code: "de" },
        { lan: "French", code: "fr" },
        { lan: "Persian", code: "fa" },
        { lan: "Turkish", code: "tr-TR" },
        { lan: "Chinese", code: "zh-cn" },
        { lan: "Arabic", code: "ar-AE" },
    ];      
    const [selectedLang] = useState(languagesList[0])
    // const [chats,setChats] = useState<Array<chat>>([
    // ])    

    // const [audioUrl, setAudioUrl] = useState<string>('');    
    // const [isTalking,setIsTalking] = useState(false)
    const [isLoading,setIsLoading] = useState(false);
    const [isRecording,setIsRecording] = useState(false)  
    const [showSuggestions,setShowSuggestions] = useState(false);     
    const BLokedIdList =useRef<string[]>([]);
    const [suggestionList] = useState([
        'Can you introduce yourself?',
        'Tell me more about your business',
        'What services do you provide in Codie?'
    ])    
    useEffect(() => {
        if(chats.length == 0) {
        setTimeout(() => {
            setShowSuggestions(true)
        }, 5000);
        }
    },[chats])    
    // const [,forceUpdate] = useReducer(x => x + 1, 0);
    useConstructor(() => {
        // const userid = searchParams.get('user')? searchParams.get('user') : user.currentUser.information?.userId
        // Share.getShareData('/presentation_info/user='+userid,(data) => {
        //     // const socials = data.boxs.filter((el:any) => el.type_name == 'SocialBox')[0]?.socialMedias
        //     // setSocials(socials)
        //     const information = {
        //         firstName:data.information.first_name,
        //         lastName:data.information.last_name,
        //         phone:data.information.mobile_number,
        //         personlEmail:data.information.email,
        //         company:data.information.company_name,
        //         job:data.information.job_title,
        //         banelImage:data.information.back_ground_pic,
        //         imageurl:data.information.profile_pic,
        //         location:{
        //             lat:33,
        //             lng:33
        //         },
        //         workEmail:data.information.work_email,
        //         workPhone:data.information.work_mobile_number,
        //         userId:data.information.created_userid,
        //         silent_video_avatar:data.information.silent_video_url,
        //         talk_video_avater:data.information.talking_video_avatar           
        //     }
        //     const shareUser = new User(information)
        //     setShareUser(shareUser) 
        //     setIsLoading(false)
        //     if(data.information.suggestion_list){
        //     setSuggestionList(data?.information?.suggestion_list)
        //     }
        //     setTimeout(() => {
        //     forceUpdate()
        //     }, 300);
        // })    
    })
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
    const handleStop = (id: string) => {
        setIsLoading(false);
        const newChats = chats;
        newChats.pop();
        setChats(newChats);
        BLokedIdList.current = [...BLokedIdList.current, id];
    };       
    return (
        <>
        <div  className={`${theme}-Presentation-MoreInfoSection pt-2 pb-24 ${theme}-Presentation-fadeIn`}>
        {
            showSuggestions  && chats.length ==0 ?
            <>
                <Suggestions  theme="Carbon"  onVSelectItem={(text:string|null) =>{handleSendVector(text as string)}} suggestions={suggestionList}></Suggestions>
            </>
            :
            <>
            {
            chats.map((item) => {
                return (
                <>
                    {item.from == 'user' ?
                    <div className={`${theme}-Presentation-AnswerTitle`}>{item.text}</div>
                    :
                    <div className={`${theme}-Presentation-chatItem`}>
                        {item.text}
                    </div> 
                    }
                </>
                )
            })
            }
            {
            isLoading ?
                <>
                <div className="  w-full px-4 flex justify-between items-center h-10 borderBox-Gray2 bg-slate-100 ">
                    <BeatLoader size={10} color="#702CDA" />
                    <div onClick={() => handleStop(chats[chats.length -1].message_key)}>stop</div>
                </div>
                </>
            :
            undefined
            }
            </>
        }
        </div> 
        <FooterPresentation langCode={selectedLang.code} isRecording={isRecording} setIsRecording={setIsRecording} isLoading={isLoading} theme="Carbon" onSendVector={handleSendVector}/>
        </>
    )
}

export default Presentition2