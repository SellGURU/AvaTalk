/* eslint-disable @typescript-eslint/no-explicit-any */
import React , {useState , useEffect, useRef} from "react";
import { Button, Suggestions } from "symphony-ui";
import FooterPresentation from "../FooterPresentation";
import { AiAvatar, AudioProvider, BackIcon } from "..";
import { useAuth } from "../../hooks/useAuth";
import { chat } from "../../Types";
import { sendToApi } from "../../help";
import { BeatLoader } from "react-spinners";
import useModalAutoClose from "../../hooks/useModalAutoClose";
import Setting from '../Setting'
import { useNavigate } from "react-router-dom";

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
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('./videos/02.mp4');
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
  useEffect(() => {
      if(videoRef.current && !isRecording){
          const refren = videoRef.current  as any   
          // setShowOpacity(true)
          refren.load()
      }        
  })   
  useEffect(() => {
      if(isTalking){
        setVideoUrl('./videos/03.mp4')
      }else{
        setVideoUrl('./videos/02.mp4')
      }
  })
  const BLokedIdList =useRef<string[]>([]);
  const handleStop = (id: string) => {
    setIsLoading(false);
    const newChats = chats;
    newChats.pop();
    setChats(newChats);
    BLokedIdList.current = [...BLokedIdList.current, id];
  };  
  const [suggestionList] = useState([
    'Can you introduce yourself?',
    'Tell me more about your business',
    'What services do you provide in Codie?'
  ])
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
    },selectedLang.lan,BLokedIdList)
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
  return (
    <>
    <div className={`${theme}-Presentation-Container`}>
      <div className={`${theme}-Presentation-PresentationSection`}>
        <BackIcon action={() => {
          setShowSettingIcon(false)
          if(startChat){
            setStartChat(false)
          }else{
            navigate(-1)
          }
        }} theme="Carbon" title=""></BackIcon>
      
        <div className={`${theme}-Presentation-Content`}>  
    
          <div className={`${theme}-Presentation-PictureSection`}>
            {/* <div className={`${theme}-Presentation-PresentationPicture`}></div> */}
            <AiAvatar videoref={videoRef} videoUrl={videoUrl}></AiAvatar>    
          </div>
          <div>
            <h1 className={`${theme}-Presentation-PresentationName`}>{user.currentUser.information?.firstName}</h1>
            <p className={`${theme}-Presentation-SubTitle`}>{user.currentUser.information?.job}</p>
          </div>
          {
            !startChat?
              <Button onClick={() => {
                setStartChat(true)
                setShowSettingIcon(true)
                }} theme="Carbon" data-mode="profile-review-button">
                start to chat
              </Button>
            :
            ""
          }
      
          {!startChat ?
            <div className={`${theme}-Presentation-InfoSection`}>
              <div onClick={() => {
                window.open("+447882959722"); 
              }} className={`${theme}-Presentation-Info`}>
                <div className={`${theme}-Presentation-Vectors`}>
                  <div className={`${theme}-Presentation-CallVector`}></div>
                </div>
                <div className="cursor-pointer">+44 (788)29 59 722</div>
              </div>
              <div onClick={() => {
                window.open("mailto:Azami@codie.ai"); 
              }} className={`${theme}-Presentation-Info`}>
                <div className={`${theme}-Presentation-Vectors`}>
                  <div className={`${theme}-Presentation-EmailVector`}></div>
                </div>
                <div className="cursor-pointer">Azami@codie.ai</div>
              </div>
              <div onClick={() => {
                window.open("https://codie.ai/"); 
              }} className={`${theme}-Presentation-Info`}>
                <div className={`${theme}-Presentation-Vectors`}>
                  <div className={`${theme}-Presentation-WebsiteVector`}></div>
                </div>
                <div className="cursor-pointer">codie.ai</div>
              </div>
              <div onClick={() => {
                window.open('https://www.linkedin.com/in/dr-farzin-azami-0919712b/')
              }} className={`${theme}-Presentation-Info`}>
                <div className={`${theme}-Presentation-Vectors`}>
                  <div className={`${theme}-Presentation-LinkedinVector`}></div>
                </div>
                <div className="cursor-pointer">LinkedIn</div>
              </div>              
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