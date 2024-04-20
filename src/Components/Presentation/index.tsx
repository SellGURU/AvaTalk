/* eslint-disable @typescript-eslint/no-explicit-any */
import React , {useState , useEffect, useRef, useReducer} from "react";
import { Button, Suggestions } from "symphony-ui";
import FooterPresentation from "../FooterPresentation";
import { AiAvatar, AudioProvider, BackIcon } from "..";
import { useAuth } from "../../hooks/useAuth";
import { chat } from "../../Types";
import { sendToApi, useConstructor } from "../../help";
import { BeatLoader } from "react-spinners";
import useModalAutoClose from "../../hooks/useModalAutoClose";
import Setting from '../Setting'
import { useNavigate, useSearchParams } from "react-router-dom";
import Share from "../../Api/Share";
import { User } from "../../Model";

interface PresentationProps {
  theme?: string;
}

const Presentation: React.FC<PresentationProps> = ({ theme }) => {
  const [startChat,setStartChat] = useState(false)
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
  // for question button 
  // const [selectedOption, setSelectedOption] = useState<'question'|'answer'>('question')
  const [showSuggestions,setShowSuggestions] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isTalking,setIsTalking] = useState(false)
  const [isLoading,setIsLoading] = useState(false);
  const [isRecording,setIsRecording] = useState(false)
  const [chats,setChats] = useState<Array<chat>>([
  ])
  const user = useAuth()
  // const handleButtonClick = (text: string) => {
    //   setShowSuggestions(false)
    //   sendToApi(chats,setChats,text,(res) => {
      
      //   })
      // };
  const [shareUser,setShareUser] = useState<null | User>(null)
  const [,setVideoUrl] = useState<string>(shareUser? shareUser.information?.silent_video_avatar as string:'');
  useEffect(() => {
      if(videoRef.current && !isRecording && !isTalking &&!showSuggestions ){
          const refren = videoRef.current  as any   
          // setShowOpacity(true)
          refren.load()
      }        
  },[shareUser])   
  useEffect(() => {
    if(videoRef2.current && !isRecording && !isTalking &&!showSuggestions ){
        const refren = videoRef2.current  as any   
        // setShowOpacity(true)
        refren.load()
    }        
  })   
  useEffect(() => {
    console.log(shareUser)
    // console.log(shareUser.information?.talk_video_avater)
      if(isTalking){
        setVideoUrl(shareUser?.information?.talk_video_avater as string)
      }else{
        setVideoUrl(shareUser?.information?.silent_video_avatar as string)
      }
  },[shareUser])
  const BLokedIdList =useRef<string[]>([]);
  const handleStop = (id: string) => {
    setIsLoading(false);
    const newChats = chats;
    newChats.pop();
    setChats(newChats);
    BLokedIdList.current = [...BLokedIdList.current, id];
  };  
  const [suggestionList,setSuggestionList] = useState([
    'Can you introduce yourself?',
    'Tell me more about your business',
    'What services do you provide in Codie?'
  ])
  const [,forceUpdate] = useReducer(x => x + 1, 0);
  // for show with delay and fade
  const [showMoreInfoSection, setShowMoreInfoSection] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMoreInfoSection(true);
      // setShowSuggestions(true)
    }, 10000);
    return () => clearTimeout(timeoutId);
  }, []);
  useEffect(() => {
    if(startChat && chats.length == 0) {
      setTimeout(() => {
        setShowSuggestions(true)
      }, 5000);
    }
  },[startChat,chats])
  //for give value from chat in footer component
  // Callback function to receive the value from FooterComponent
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
  
  useEffect(() => {
    if(audioRef.current){
        const refren = audioRef.current  as any   
        refren.load()
    }           
  },[isTalking,chats])
  const settingRef = useRef<HTMLDivElement>(null)
  const [showSetting,setShowSetting] = useState(false)
  const [showSettingIcon,setShowSettingIcon] = useState(false)
  const navigate = useNavigate();
  useModalAutoClose({
    refrence:settingRef,
    close:() => {
      setShowSetting(false)
    }
  })
  const [searchParams] = useSearchParams();
  
  const [socials,setSocials] = useState([])
  useConstructor(() => {
    const userid = searchParams.get('user')? searchParams.get('user') : user.currentUser.information?.userId
    Share.getShareData('/presentation_info/user='+userid,(data) => {
        const socials = data.boxs.filter((el:any) => el.type_name == 'SocialBox')[0]?.socialMedias
        setSocials(socials)
        const information = {
            firstName:data.information.first_name,
            lastName:data.information.last_name,
            phone:data.information.mobile_number,
            personlEmail:data.information.email,
            company:data.information.company_name,
            job:data.information.job_title,
            banelImage:data.information.back_ground_pic,
            imageurl:data.information.profile_pic,
            location:{
                lat:33,
                lng:33
            },
            workEmail:data.information.work_email,
            workPhone:data.information.work_mobile_number,
            userId:data.information.created_userid,
            silent_video_avatar:data.information.silent_video_url,
            talk_video_avater:data.information.talking_video_avatar           
        }
        const shareUser = new User(information)
        setShareUser(shareUser) 
        setIsLoading(false)
        if(data.information.suggestion_list){
          setSuggestionList(data?.information?.suggestion_list)
        }
        setTimeout(() => {
          forceUpdate()
        }, 300);
    })    
  })
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }       
  useEffect(() => {
      scrollToBottom()
  }, [chats]); 
  return (
    <>
    <div className={`${theme}-Presentation-Container`}>
      <div className={`${theme}-Presentation-PresentationSection`}>
        <BackIcon action={() => {
          setIsTalking(false)
          setAudioUrl('')
          setShowSettingIcon(false)
          if(startChat){
            setStartChat(false)
          }else{
            navigate(-1)
          }
        }} theme="Carbon" title=""></BackIcon>

        <div className={`${theme}-Presentation-Content`}>  

          <div className={`${theme}-Presentation-PictureSection relative`}>
            <div className={`${theme}-Presentation-PictureSection absolute left-0  overflow-hidden `}>
              {/* <div className={`${theme}-Presentation-PresentationPicture`}></div> */}
              <AiAvatar videoref={videoRef2} videoUrl={shareUser? shareUser.information?.talk_video_avater as string:''}></AiAvatar>    
            </div>          
            <div className={`${theme}-Presentation-PictureSection absolute left-0 ${!isTalking?'visible':'invisible'} overflow-hidden`}>
              {/* <div className={`${theme}-Presentation-PresentationPicture`}></div> */}
              <AiAvatar videoref={videoRef} videoUrl={shareUser? shareUser.information?.silent_video_avatar as string:''}></AiAvatar>    
            </div>
          </div>
          <div>
            <h1 className={`${theme}-Presentation-PresentationName`}>{shareUser?.information?.firstName +'  '+shareUser?.information?.lastName}</h1>
            <p className={`${theme}-Presentation-SubTitle`}>{shareUser?.information?.job}</p>
          </div>
          {
            !startChat?
              <Button onClick={() => {
                setStartChat(true)
                setShowSettingIcon(false)
                }} theme="Carbon" data-mode="profile-review-button">
                start to chat
              </Button>
            :
            ""
          }
      
          {!startChat && shareUser?
            <div className={`${theme}-Presentation-InfoSection`}>
              {shareUser.information?.phone ?
              <div onClick={() => {
                window.open(shareUser?.information?.phone); 
              }} className={`${theme}-Presentation-Info`}>
                <div className={`${theme}-Presentation-Vectors`}>
                  <div className={`${theme}-Presentation-CallVector`}></div>
                </div>
                <div className="cursor-pointer">{shareUser?.information?.phone}</div>
              </div>
              :undefined}
              {shareUser.information?.personlEmail ?
                <div onClick={() => {
                  window.open("mailto:"+shareUser?.information?.personlEmail); 
                }} className={`${theme}-Presentation-Info`}>
                  <div className={`${theme}-Presentation-Vectors`}>
                    <div className={`${theme}-Presentation-EmailVector`}></div>
                  </div>
                  <div className="cursor-pointer">{shareUser?.information?.personlEmail}</div>
                </div>
              :undefined}
              {/* <div onClick={() => {
                window.open(); 
              }} className={`${theme}-Presentation-Info`}>
                <div className={`${theme}-Presentation-Vectors`}>
                  <div className={`${theme}-Presentation-WebsiteVector`}></div>
                </div>
                <div className="cursor-pointer">codie.ai</div>
              </div> */}
              {socials?.map((item:any) => {
                return (
                  <>
                    <div onClick={() => {
                        window.open(item.value)
                      }} className={`${theme}-Presentation-Info`}>
                        <div className={`${theme}-Presentation-Vectors`}>
                          <div className={`${theme}-Presentation-LinkedinVector`}></div>
                        </div>
                        <div className="cursor-pointer">{item.type}</div>
                    </div>                 
                  </>
                )
              })}
              {/* <div onClick={() => {
                window.open()
              }} className={`${theme}-Presentation-Info`}>
                <div className={`${theme}-Presentation-Vectors`}>
                  <div className={`${theme}-Presentation-LinkedinVector`}></div>
                </div>
                <div className="cursor-pointer">LinkedIn</div>
              </div>               */}
            </div>
          :
            <div className={`${theme}-Presentation-MoreInfoSection ${showMoreInfoSection ? `${theme}-Presentation-fadeIn` : "" }`}>
            {showMoreInfoSection  && (
              <>
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
                   <div ref={messagesEndRef} />
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
              </> 
            )}
            </div>
          }

        </div>

        {showSetting &&
          <Setting 
          theme="Carbon"
          selectedLang={selectedLang}
          languagesList={languagesList} 
          onChangeLanguage={(lan) =>{
            setIsTalking(false)
            setSelectedLang(lan)
            setChats([...[]])
          }} 
          onLogout={() =>{}} 
          onClearHistory={() => {
            setChats([...[]])
            setIsTalking(false)
          }} 
          settingRef={settingRef}></Setting>
        }
        {showSettingIcon &&
            <div
            onClick={() => {
              setShowSetting((prev) => !prev);
            }}
            className={`${theme}-Presentation-setting-icon`}
          /> 
        }
         
      </div>
    {
      startChat ? <FooterPresentation langCode={selectedLang.code} isRecording={isRecording} setIsRecording={setIsRecording} isLoading={isLoading} theme="Carbon" onSendVector={handleSendVector}/> : undefined
    }
      <AudioProvider autoPlay={isTalking} onEnd={() => {
        setAudioUrl('')
        setIsTalking(false)
      }} url={audioUrl} theme="Carbon" audioref={audioRef}></AudioProvider>     
    </div>


    </>
  );
};

export default Presentation;