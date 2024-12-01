import { useEffect, useState } from "react";
import { Button } from "symphony-ui";

interface Toggle3Props {
  theme?: string;
  leftText: string;
  rightText: string;
  value:string;
  onButtonClick: (buttonText: string) => void;
}
const ToggleButton3: React.FC<Toggle3Props> = ({ theme,value, leftText, rightText, onButtonClick }) => {
  const [activeButton, setActiveButton] = useState(value);
  useEffect(() => {
    setActiveButton(value)
  },[value])
  const handleButtonClick = (buttonText: string) => {
    setActiveButton(buttonText);
    onButtonClick(buttonText);
  };
  const activeStyle = `${theme}-ToggleButton-ActiveButton `;
  return (
    <div className={`${theme}-ToggleButton-container px-1  `}>
      <div className={`${theme}-ToggleButton-notActiveButton   border border-solid border-transparent  ${activeButton === leftText ? activeStyle : ""} `}>
        <Button data-mode={activeButton == leftText ?'active':""} onClick={() => handleButtonClick(leftText)} theme="Carbon-grid-Toggle">
          <div className="flex justify-center items-center flex-col">
            {
                activeButton == leftText?
                <img className=" w-4 h-4" src="./Carbon/profile-circle.svg" />
                :
                <img src="./Carbon/userVector.svg" className=" w-4 h-4 "/>
            }
            {leftText}

          </div>
        </Button>
      </div>
      <div className={`${theme}-ToggleButton-notActiveButton border border-solid border-transparent   ${activeButton === rightText ? activeStyle : ""} `}>
        <Button data-mode={activeButton == rightText ?'active':""} onClick={() => handleButtonClick(rightText)} theme="Carbon-grid-Toggle">
          {/* <img src="./Carbon/chatVector.svg" className=" w-5 h-5 me-[6px]"/> */}
          <div className=" flex justify-center items-center flex-col" >
            <div className={`Carbon-icon-chatVector w-4 me-0  ${activeButton == rightText ? 'bg-white':'bg-[#8290a3]'}`}></div>
            {rightText}

          </div>
        </Button>
      </div>
    </div>
  );
};

export default ToggleButton3;
