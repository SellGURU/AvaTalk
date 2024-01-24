import React from "react";
import { Button } from "symphony-ui";

interface PresentationProps {
  theme?: string;
}

const Presentation: React.FC<PresentationProps> = ({ theme }) => {


  return (
    <div className={`${theme}-Presentation-Container`}>
        <div className={`${theme}-Presentation-PresentationSection`}>
            <div className={`${theme}-Presentation-Content`}>  

                <div className={`${theme}-Presentation-PresentationPictureSection`}>
                    <div className={`${theme}-Presentation-PresentationPicture`}></div>
                </div>

                <div>
                    <h1 className={`${theme}-Presentation-PresentationName`}>Farzin Azami</h1>
                    <p className={`${theme}-Presentation-SubTitle`}>CoFounder & CEO</p>
                </div>

                <Button theme="Carbon">
                    Start Presentation
                </Button>
            </div>
        </div>
    </div>
  );
};

export default Presentation;