import React , {useState} from "react";
import { Button } from "symphony-ui";
import FooterPresentation from "../FooterPresentation";

interface PresentationProps {
  theme?: string;
}

const Presentation: React.FC<PresentationProps> = ({ theme }) => {
  const [mode,setMode] = useState<'profile'|'review'>('profile')
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
            <>
            <div className={`${theme}-Presentation-MoreInfoSection`}>
              <div className={`${theme}-Presentation-MoreInfoTitle ${theme}-TextShadow`}>Ask me more information</div>
              <Button onClick={() => {setMode('review')}} theme="Carbon" data-mode="profile-review-button">
              Can you introduce yourself?
              </Button>
              <Button onClick={() => {setMode('review')}} theme="Carbon" data-mode="profile-review-button">
              Tell me more about your business
              </Button>  
              <Button onClick={() => {setMode('review')}} theme="Carbon" data-mode="profile-review-button">
              What services do you provide in Codie?
              </Button>  
            </div>
            </>
          }



        </div>
      </div>
    </div>
    {
      mode == 'profile' ?
        ""
      :
        <FooterPresentation theme="Carbon"/>
    }


    </>
  );
};

export default Presentation;