/* eslint-disable @typescript-eslint/no-explicit-any */
import React , {useState , useEffect, useRef} from "react";
import { Button, Suggestions } from "symphony-ui";
import FooterPresentation from "../FooterPresentation";
import { AiAvatar, AudioProvider, BackIcon } from "..";
import { useAuth } from "../../hooks/useAuth";
import { chat } from "../../Types";
import { sendToApi } from "../../help";
import { BeatLoader } from "react-spinners";

interface PresentationProps {
  theme?: string;
}

const Presentation: React.FC<PresentationProps> = ({ theme }) => {
  const [startChat,setStartChat] = useState(false)
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
      setShowSuggestions(true)
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);
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
    })
  };
  
  useEffect(() => {
    if(audioRef.current){
        const refren = audioRef.current  as any   
        refren.load()
    }           
  })

  return (
    <>
    <div className={`${theme}-Presentation-Container`}>
      <div className={`${theme}-Presentation-PresentationSection`}>
        <BackIcon theme="Carbon" title=""></BackIcon>
        <div className={`${theme}-Presentation-Content`}>  
    
          <div className={`${theme}-Presentation-PictureSection`}>
            {/* <div className={`${theme}-Presentation-PresentationPicture`}></div> */}
            <AiAvatar videoref={videoRef} videoUrl={videoUrl}></AiAvatar>    
          </div>
          <div>
            <h1 className={`${theme}-Presentation-PresentationName ${theme}-TextShadow`}>{user.currentUser.information?.firstName}</h1>
            <p className={`${theme}-Presentation-SubTitle`}>{user.currentUser.information?.job}</p>
          </div>
          {
            !startChat?
              <Button onClick={() => {setStartChat(true)}} theme="Carbon" data-mode="profile-review-button">
                Start Presentation
              </Button>
            :
            ""
          }
      
          {!startChat ?
            <div className={`${theme}-Presentation-InfoSection`}>
              <div className={`${theme}-Presentation-Info`}>
                <div className={`${theme}-Presentation-Vectors`}>
                  <div className={`${theme}-Presentation-CallVector`}></div>
                </div>
                <div>+44 (788)29 59 722</div>
              </div>
              <div className={`${theme}-Presentation-Info`}>
                <div className={`${theme}-Presentation-Vectors`}>
                  <div className={`${theme}-Presentation-EmailVector`}></div>
                </div>
                <div>Azami@codie.ai</div>
              </div>
              <div className={`${theme}-Presentation-Info`}>
                <div className={`${theme}-Presentation-Vectors`}>
                  <div className={`${theme}-Presentation-WebsiteVector`}></div>
                </div>
                <div>codie.ai</div>
              </div>
              <div className={`${theme}-Presentation-Info`}>
                <div className={`${theme}-Presentation-Vectors`}>
                  <div className={`${theme}-Presentation-LinkedinVector`}></div>
                </div>
                <div>LinkedIn</div>
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
                        <div className="  w-full px-4 flex justify-start items-center h-10 borderBox-Gray2 bg-slate-100 ">
                          <BeatLoader size={10} color="#702CDA" />
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
      </div>
    {
      startChat ? <FooterPresentation isRecording={isRecording} setIsRecording={setIsRecording} isLoading={isLoading} theme="Carbon" onSendVector={handleSendVector}/> : undefined
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