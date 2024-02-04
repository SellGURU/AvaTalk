import React from "react";
import { Button } from "symphony-ui";

interface ChatDetailsProps {
  theme?: string;
}

const ChatDetails: React.FC<ChatDetailsProps> = ({ theme }) => {
  
  return (
    <>
    <div className={`${theme}-Presentation-Container`}>
      <div className={`${theme}-Presentation-PresentationSection`}>
        <div className={`${theme}-Presentation-Content`}>  
          <div className={`${theme}-Presentation-ArrowLeft ${theme}-Presentation-PictureSection`}>
            <div className={`${theme}-Presentation-ArrowLeftVector`}></div>
            
          </div>

            <div>12 Jan 2024</div>
            <Button theme="Carbon" data-mode="profile-review-button">
            Can you introduce yourself?
            </Button>
            <div>Of course! I am Farzin Azami. the CoFounder of Codie. How can I help you?</div>
            <Button theme="Carbon" data-mode="profile-review-button">
            Can you introduce yourself?
            </Button>
            <div>Of course! I am Farzin Azami. the CoFounder of Codie. How can I help you?</div>
            <Button theme="Carbon" data-mode="profile-review-button">
            Can you introduce yourself?
            </Button>
            <div>Of course! I am Farzin Azami. the CoFounder of Codie. How can I help you?</div>
            <Button theme="Carbon" data-mode="profile-review-button">
            Can you introduce yourself?
            </Button>
            <div>Of course! I am Farzin Azami. the CoFounder of Codie. How can I help you?</div>
          
            
        </div>
      </div>
    </div>



    </>
  );
};

export default ChatDetails;