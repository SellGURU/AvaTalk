import React , {useState , useEffect} from "react";
import { Button } from "symphony-ui";
import FooterPresentation from "../FooterPresentation";
import { BackIcon } from "..";

interface PresentationProps {
  theme?: string;
}

const Presentation: React.FC<PresentationProps> = ({ theme }) => {
  const [startChat,setStartChat] = useState(false)
  // for question button 
  // const [selectedOption, setSelectedOption] = useState<'question'|'answer'>('question')
  const [showSuggestions,setShowSuggestions] = useState(false);
  const [buttonText, setButtonText] = useState<string>(''); // State to store the text value of the clicked button
  const [chats,setChats] = useState([])
  const handleButtonClick = (text: string) => {
    setButtonText(text); 
    setShowSuggestions(false)
  };
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
  const [, setText] = useState('');

  // Callback function to receive the value from FooterComponent
  const handleSendVector = (value: React.SetStateAction<string>) => {
    setText(value);
  };
  
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
            <h1 className={`${theme}-Presentation-PresentationName ${theme}-TextShadow`}>Farzin Azami</h1>
            <p className={`${theme}-Presentation-SubTitle`}>CoFounder & CEO</p>
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
                      <div className={`${theme}-Presentation-MoreInfoTitle ${theme}-TextShadow`}>Ask me more information</div>
                      <Button onClick={() => handleButtonClick('Can you introduce yourself?')} theme="Carbon" data-mode="question-answer-button">
                      Can you introduce yourself?
                      </Button>
                      <Button onClick={() => handleButtonClick('Tell me more about your business')} theme="Carbon" data-mode="question-answer-button">
                      Tell me more about your business
                      </Button>  
                      <Button onClick={() => handleButtonClick('What services do you provide in Codie?')} theme="Carbon" data-mode="question-answer-button">
                      What services do you provide in Codie?
                      </Button> 
                    </>
                  :
                  <>
                  <div className={`${theme}-Presentation-AnswerTitle`}>{buttonText}</div>
                  <Button theme="Carbon" data-mode="presentation-answer-button">
                    Of course! I am Farzin Azami. the CoFounder of Codie. How can I help you?
                  </Button> 
                  
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
    </div>


    </>
  );
};

export default Presentation;