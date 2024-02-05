/* eslint-disable @typescript-eslint/no-explicit-any */
import React , {useState , useEffect, useRef} from "react";
import { Button, Suggestions } from "symphony-ui";
import FooterPresentation from "../FooterPresentation";
import { AudioProvider, BackIcon } from "..";
import { useAuth } from "../../hooks/useAuth";
import { chat } from "../../Types";
import { sendToApi } from "../../help";

interface PresentationProps {
  theme?: string;
}

const Presentation: React.FC<PresentationProps> = ({ theme }) => {
  const [startChat,setStartChat] = useState(false)
  // for question button 
  // const [selectedOption, setSelectedOption] = useState<'question'|'answer'>('question')
  const [showSuggestions,setShowSuggestions] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isTalking,setIsTalking] = useState(false)
  const [chats,setChats] = useState<Array<chat>>([
  ])
  const user = useAuth()
  // const handleButtonClick = (text: string) => {
  //   setShowSuggestions(false)
  //   sendToApi(chats,setChats,text,(res) => {

  //   })
  // };
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
    }, 10000);
    return () => clearTimeout(timeoutId);
  }, []);
  //for give value from chat in footer component
  // Callback function to receive the value from FooterComponent
  const handleSendVector = (value: string) => {
    setShowSuggestions(false)
    sendToApi(chats,setChats,value,(res) => {
      setAudioUrl(res.answer.audio_file)
      setIsTalking(true)
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
            <div className={`${theme}-Presentation-PresentationPicture`}></div>
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
                  
                  </>
                }
              </> 
            )}
            </div>
          }

        </div>
      </div>
    {
      startChat ? <FooterPresentation theme="Carbon" onSendVector={handleSendVector}/> : undefined
    }
      <AudioProvider autoPlay={isTalking} onEnd={() => {
        setAudioUrl('')
        setIsTalking(false)
      }} url={audioUrl} audioref={audioRef}></AudioProvider>     
    </div>


    </>
  );
};

export default Presentation;