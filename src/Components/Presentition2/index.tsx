/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState  } from "react"
import FooterPresentation from "../FooterPresentation"
import { sendToApi, useConstructor } from "../../help";
import { chat } from "../../Types";
import { User } from "../../Model";
import Suggestions from "../Suggestions";
// import { Suggestions } from "symphony-ui";
import { BeatLoader } from "react-spinners";
import AccessNotifManager from "../AccessNotifManager";
import { useAuth } from "../../hooks/useAuth";
import { subscribe } from "../../utils/event";
// import ChatNotifManager from "./ChatNotifManager";

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
  suggestions:Array<string>
  setChats:(cat:Array<chat>) => void
  isSilent:boolean
  setIsSilent?:(action:boolean) => void
}
type TextWithNewlinesAndLinksProps = {
    text: string;
  };
const TextWithNewlinesAndLinks: React.FC<TextWithNewlinesAndLinksProps> = ({ text }) => {
    // Regular expression to match links inside brackets
    // eslint-disable-next-line no-useless-escape
    const regex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  
    // Split the text into lines first
    return (
      <div>
        {text.split('\n').map((line, index) => {
          // Process each line to convert links
          const parts = [];
          let lastIndex = 0;
          let match;
  
          while ((match = regex.exec(line)) !== null) {
            // Add text before the link
            if (lastIndex < match.index) {
              parts.push(line.substring(lastIndex, match.index));
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
          if (lastIndex < line.length) {
            parts.push(line.substring(lastIndex));
          }
  
          return (
            <span key={index}>
              {parts}
              <br />
            </span>
          );
        })}
      </div>
    );
  };

const Presentition2:React.FC<PresentationProps> = ({ theme,chats,mode,suggestions,setIsSilent,setVideoUrl,setShowMuiteController,setChats,shareUser,setAudioUrl,setIsTalking,isSilent,setPrisentMode}) => {
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
    // const [showAccessNotifManager,setShowAccessNotifManager] = useState(false)
    const BLokedIdList =useRef<string[]>([]);
    // const [suggestionList,setSuggestionList] = useState(context.currentUser.sugesstions)   

    const [usedMoreVoice,setUsedMoreVoice] = useState(false)
    const resolveModeNotif =() => {
        if(usedMoreVoice){
            return "moreVoice"
        }
        if(mode != 'review') {
            return "endUser"
        }
        return mode
    }
    subscribe("useMoreVoiceRecorder",() => {
        if(mode == 'review'){
            setUsedMoreVoice(true)
        }
    })    
    subscribe("voiceIsEnded",() => {
        // setFirstComeSuggestion(true)
        // setShowAccessNotifManager(false)
    })
    subscribe("profileIsProfile",() => {
        setIsTalking(false)
        // setFirstComeSuggestion(true)
        // setShowAccessNotifManager(false)
    })    
    subscribe("useMoreVoiceRecorder",() => {
        // setShowAccessNotifManager(true)
    })    
    useEffect(() => {
        if(chats.length == 0 && mode=='review' && context.currentUser.type_of_account.getType() != 'Pro'){
            setTimeout(() => {
                setShowSuggestions(true)
            }, 15000);
        }else {
            setTimeout(() => {
                setShowSuggestions(true)
            }, 3000);
        }
    })
    useEffect(() => {
        if(mode =='review' && context.prerecorded_voice!=null){
            setTimeout(() => {
                // setShowAccessNotifManager(true)
            }, 500);
        }
        setTimeout(() => {
            if(!showSuggestions){
                // setShowAccessNotifManager(true)
            }
        },5000);
    },[])
    // const [,forceUpdate] = useReducer(x => x + 1, 0);
    useConstructor(() => {
        // if(context.currentUser.type_of_account.getType() == 'Pro' &&  context.currentUser.type_of_account.getDayremindToExpired() > 7){
        //     setFirstComeSuggestion(true)
        // }
        if(mode =='review' && context.prerecorded_voice!=null && chats.length ==0){
            // alert("this hear")
            // console.log(context.prerecorded_voice)
            setAudioUrl(context.prerecorded_voice)
            setPrisentMode('audio')
            setIsTalking(true)
            if(context.currentUser.type_of_account.getType() == 'Free' && mode=='review'){
                setIsSilent?setIsSilent(true):undefined
            }
        }else{
            if(context.currentUser.type_of_account.getType() == 'Pro' &&  context.currentUser.type_of_account.getDayremindToExpired() <= 7){
                // setTimeout(() => {
                //      setFirstComeSuggestion(true)
                // }, 100);
                // setShowAccessNotifManager(false)
                // setFirstComeSuggestion(true)
            }else {
                // setFirstComeSuggestion(true)
            }
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
            if(res.answer.audio_file == null && res.answer.video_file == null){
                setIsSilent?setIsSilent(true):undefined
            }
            if(res.mute ==true){
                setIsSilent?setIsSilent(true):undefined
            } 
            if(res.answer.audio_file != null){
                setAudioUrl(res.answer.audio_file)
                setPrisentMode('audio')
            }else if(res.answer.video_file != null){
                // alert('Video')
                setVideoUrl(res.answer.video_file)
                setPrisentMode('video')
            }
            if(!isSilent && !(res.answer.audio_file == null && res.answer.video_file == null)){
                setIsTalking(true)
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
            showSuggestions && suggestions.length>0  && chats.length ==0 ?
            <>
                <Suggestions title="Ask me more information" theme="Carbon"  onVSelectItem={(text:string|null) =>{handleSendVector(text as string)}} suggestions={suggestions}></Suggestions>
            </>
            :
            <>
            {
               ( chats.length==0  && mode== 'review') && (context.currentUser.type_of_account.getType() == 'Free' || context.currentUser.type_of_account.getType() == 'Trial' ) ?
                    <div className="flex w-full justify-start">
                        <div className={`${theme}-Presentation-chatItem`}>
                            {/* {convertToLinks(item.text)} */}
                            {context.currentUser.type_of_account.getType() == 'Trial' ?
                                <div>
                                    <TextWithNewlinesAndLinks text={`"Hi, I am your Avatar. Your trial gives you full access to Avatalk's networking power, for a limited time. Keep your avatar"`} />
                                    <div onClick={() => {}} className="flex cursor-pointer  mt-[16px] gap-2 items-center justify-end">
                                        <div className=" text-primary-color text-[14px]">Upgrade to Pro</div>
                                        <img src="./Carbon/arrow-right.svg" alt="" />
                                    </div>

                                </div>
                            :
                                <div>
                                    <TextWithNewlinesAndLinks text={`Hi, I am your Avatar. Unlock voice chat for your Avatalk with a Pro Subscription! Every new user can have a conversation up to 2 messages. Get Pro to let users interact with Avatalk as much as they want! Don't worry, Text chat is always unlimited!`} />
                                    {/* <div onClick={() => {}} className="flex cursor-pointer  mt-[16px] gap-2 items-center justify-end">
                                        <div className=" text-primary-color text-[14px]">Upgrade to Pro</div>
                                        <img src="./Carbon/arrow-right.svg" alt="" />
                                    </div> */}

                                </div>                            
                            }
                        </div> 
                    </div>                
                :
                undefined
            }
            {
            chats.map((item,index:number) => {
                
                return (
                <>
                    {item.from == 'user' ?
                    <>
                        {index == chats.length-1 &&
                            <div ref={messagesEndRef} />
                        }
                        <div className="flex w-full justify-end">
                            <div className={`${theme}-Presentation-AnswerTitle`}>{item.text}</div>
                        </div>
                    </>
                    :
                    <>
                    {index == chats.length-1 &&
                     <div ref={messagesEndRef} />
                    }
                    <div className="flex w-full justify-start">
                        <div className={`${theme}-Presentation-chatItem`}>
                            {/* {convertToLinks(item.text)} */}
                            <TextWithNewlinesAndLinks text={item.text} />
                        </div> 
                    </div>
                    </>
                    }
                </>
                )
            })
            }         
           
            {
            isLoading ?
                <>
                <div className="  w-full px-4 flex justify-between items-center rounded-full h-10 borderBox-Gray2 bg-slate-100 ">
                    <BeatLoader  size={10} color="#702CDA" />
                    <div className="cursor-pointer" onClick={() => handleStop(chats[chats.length -1].message_key)}>stop</div>
                </div>
                </>
            :
            undefined
            }
            </>
        }
        <div className=" absolute bottom-10 bg-white z-50 py-4 mt-24  mb-[24px]">
            <AccessNotifManager modeLimited={resolveModeNotif() as string} page="chatEndUser"></AccessNotifManager>
            {/* <ChatNotifManager></ChatNotifManager> */}
        </div>            
        </div> 
        <FooterPresentation setShowSuggestions={setShowSuggestions} langCode={selectedLang.code} isRecording={isRecording} setIsRecording={setIsRecording} isLoading={isLoading} theme="Carbon" onSendVector={handleSendVector}/>
        </>
    )
}

export default Presentition2