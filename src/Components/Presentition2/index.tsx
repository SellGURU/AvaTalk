/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState  } from "react"
import FooterPresentation from "../FooterPresentation"
import { sendToApi, useConstructor } from "../../help";
import { chat } from "../../Types";
import { User } from "../../Model";
import { Suggestions } from "symphony-ui";
import { BeatLoader } from "react-spinners";
import AccessNotifManager from "../AccessNotifManager";
import { useAuth } from "../../hooks/useAuth";
import { subscribe } from "../../utils/event";

interface PresentationProps {
  theme?: string;
  isTalking:boolean;
  setIsTalking:(action:boolean) =>void;
  setAudioUrl:(value:string) =>void;
  setVideoUrl:(value:string) =>void;
  setShowMuiteController: (action:boolean) =>void
  setPrisentMode:(mode:string) =>void
  shareUser:User
  chats:Array<chat>
  mode?:string
  setChats:(cat:Array<chat>) => void
  isSilent:boolean
  setIsSilent?:(action:boolean) => void
}

const convertToLinks = (text:string) => {
    // Regular expression to match links inside brackets
    // eslint-disable-next-line no-useless-escape
    const regex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;

    // Split the text by the regex and create React elements
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
    // Add text before the link
    if (lastIndex < match.index) {
        parts.push(text.substring(lastIndex, match.index));
    }
    // Add the link as an anchor tag
    parts.push(
        <a key={match[2]} href={match[2]} target="_blank" rel="noopener noreferrer">
        {match[1]}
        </a>
    );
    // Update lastIndex to the end of the match
    lastIndex = regex.lastIndex;
    }

    // Add remaining text after the last link
    if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
    }

    return parts;
};   
const Presentition2:React.FC<PresentationProps> = ({ theme,chats,mode,setIsSilent,setVideoUrl,setShowMuiteController,setChats,shareUser,setAudioUrl,setIsTalking,isSilent,setPrisentMode}) => {
    const context = useAuth()
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
    const [showAccessNotifManager,setShowAccessNotifManager] = useState(false)
    const BLokedIdList =useRef<string[]>([]);
    const [suggestionList] = useState([
        'Can you introduce yourself?',
        'Tell me more about your business',
        'What services do you provide in Codie?'
    ])    
    const [usedMoreVoice,setUsedMoreVoice] = useState(false)
    const resolveModeNotif =() => {
        if(usedMoreVoice){
            return "moreVoice"
        }
        return mode
    }
    subscribe("useMoreVoiceRecorder",() => {
        if(mode == 'review'){
            setUsedMoreVoice(true)
        }
    })    
    subscribe("voiceIsEnded",() => {
        setFirstComeSuggestion(true)
    })
    const [firstComeSuggestion,setFirstComeSuggestion] = useState(false)
    // const [firstComeSuggestion,setFirstComeSuggestion] = useState(false)
    // useEffect(() => {
    //     if(chats.length == 0 && firstComeSuggestion ) {
    //     setTimeout(() => {
    //         setShowSuggestions(true)
    //     }, 5000);
    //     }
    // },[chats])    
    const showSuggestionsAction =() => {
        setShowSuggestions(true)
    }
    useEffect(() => {
        if(chats.length == 0 && firstComeSuggestion){
            setTimeout(() => {
                showSuggestionsAction()
            
            }, 4000);
        }
    })
    useEffect(() => {

        setTimeout(() => {
            setShowAccessNotifManager(true)
        }, 500);
    })
    // const [,forceUpdate] = useReducer(x => x + 1, 0);
    useConstructor(() => {
        if(mode =='review'){
            setAudioUrl(context.prerecorded_voice)
            setPrisentMode('audio')
            setIsTalking(true)
        }else{
            setFirstComeSuggestion(true)
        }
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
            if(res.answer.audio_file != null){
                setAudioUrl(res.answer.audio_file)
                setPrisentMode('audio')
            }else{
                // alert('Video')
                setVideoUrl(res.answer.video_file)
                setPrisentMode('video')
            }
            if(!isSilent){
                setIsTalking(true)
            }
            if((chats.length ==3||chats.length==4) && context.currentUser.type_of_account.getType() == 'Free'){
                setIsSilent?setIsSilent(true):undefined
            }

            setShowMuiteController(true)
            setIsLoading(false)
        },() => {
        setIsLoading(false)
        },selectedLang.lan,BLokedIdList,shareUser?.information?.userId as string,isSilent)
    };    
    const handleStop = (id: string) => {
        setIsLoading(false);
        const newChats = chats;
        newChats.pop();
        setChats(newChats);
        BLokedIdList.current = [...BLokedIdList.current, id];
    };    
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }       
    useEffect(() => {
        scrollToBottom()
    }, [chats]);    
    return (
        <>
        <div  className={`${theme}-Presentation-MoreInfoSection px-4 pt-2 pb-36 ${theme}-Presentation-fadeIn`}>
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
                    <div className="flex w-full justify-end">
                        <div className={`${theme}-Presentation-AnswerTitle`}>{item.text}</div>
                    </div>
                    :
                    <div className="flex w-full justify-start">
                        <div className={`${theme}-Presentation-chatItem`}>
                            {convertToLinks(item.text)}
                        </div> 
                    </div>
                    }
                </>
                )
            })
            }
            {showAccessNotifManager && 
                <div className=" absolute bottom-14 bg-white py-4 mt-24  mb-[24px]">
                    <AccessNotifManager modeLimited={resolveModeNotif() as string} page="chatEndUser"></AccessNotifManager>

                </div>             
            }
            <div ref={messagesEndRef} />
            {
            isLoading ?
                <>
                <div className="  w-full px-4 flex justify-between items-center rounded-full h-10 borderBox-Gray2 bg-slate-100 ">
                    <BeatLoader size={10} color="#702CDA" />
                    <div className="cursor-pointer" onClick={() => handleStop(chats[chats.length -1].message_key)}>stop</div>
                </div>
                </>
            :
            undefined
            }
            </>
        }
        </div> 
        <FooterPresentation setShowSuggestions={setShowSuggestions} langCode={selectedLang.code} isRecording={isRecording} setIsRecording={setIsRecording} isLoading={isLoading} theme="Carbon" onSendVector={handleSendVector}/>
        </>
    )
}

export default Presentition2