import React , {useState , useEffect} from "react";
import { Button } from "symphony-ui";
import FooterPresentation from "../FooterPresentation";

interface PresentationProps {
  theme?: string;
}

const Presentation: React.FC<PresentationProps> = ({ theme }) => {
  const [mode,setMode] = useState<'profile'|'review'>('profile')
  // for question button 
  const [selectedOption, setSelectedOption] = useState<'question'|'answer'>('question')
  const [buttonText, setButtonText] = useState<string>(''); // State to store the text value of the clicked button

  const handleButtonClick = (text: string) => {
    setButtonText(text); // Set the text value when a button is clicked
    setSelectedOption('answer'); // Change the selected option to 'answer'
  };
  // for show with delay and fade
  const [showMoreInfoSection, setShowMoreInfoSection] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMoreInfoSection(true);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);
  //for give value from chat in footer component
  const [receivedValue, setReceivedValue] = useState('');

  // Callback function to receive the value from FooterComponent
  const handleSendVector = (value) => {
    setReceivedValue(value);
  };

  
  return (
    <>
    <div className={`${theme}-Presentation-Container`}>
      <div className={`${theme}-Presentation-PresentationSection`}>
        <div className={`${theme}-Presentation-Content`}>  
          <div className={`${theme}-Presentation-ArrowLeft ${theme}-Presentation-PictureSection`}>
            <div className={`${theme}-Presentation-ArrowLeftVector`}></div>
          </div>
          <div className={`${theme}-Presentation-PictureSection`}>
            <div className={`${theme}-Presentation-PresentationPicture`}></div>
          </div>
          <div>
            <h1 className={`${theme}-Presentation-PresentationName ${theme}-TextShadow`}>Farzin Azami</h1>
            <p className={`${theme}-Presentation-SubTitle`}>CoFounder & CEO</p>
          </div>
          {
            mode == 'profile' ?
              <Button onClick={() => {setMode('review')}} theme="Carbon" data-mode="profile-review-button">
                Start Presentation
              </Button>
            :
            ""
          }
      
          {mode == 'profile' ?
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
                  selectedOption == 'question' ?
                    <>
                    {/* footer chat value */}
                      <div>{receivedValue}</div>
                    {/* footer chat value */}

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
    </div>
    {
      mode == 'profile' ? "" : <FooterPresentation theme="Carbon" onSendVector={handleSendVector}/>
    }


    </>
  );
};

export default Presentation;