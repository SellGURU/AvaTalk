import { useState } from "react";
import { Button } from "symphony-ui";

interface ToggleProps {
  theme?: string;
  leftText: string;
  rightText: string;
  value:string;
  onButtonClick: (buttonText: string) => void;
}
const ToggleButton2: React.FC<ToggleProps> = ({ theme,value, leftText, rightText, onButtonClick }) => {
  const [activeButton, setActiveButton] = useState(value);

  const handleButtonClick = (buttonText: string) => {
    setActiveButton(buttonText);
    onButtonClick(buttonText);
  };
  const activeStyle = `${theme}-ToggleButton-ActiveButton `;
  return (
    <div className={`${theme}-ToggleButton-container px-2 `}>
      <div className={`${theme}-ToggleButton-notActiveButton w-full justify-center flex border border-solid border-transparent px-2   ${activeButton === leftText ? activeStyle : ""} `}>
        <Button data-mode={activeButton == leftText ?'active':""} onClick={() => handleButtonClick(leftText)} theme="Carbon-Toggle">
          {
            activeButton == leftText?
            <img className=" w-5 h-5 me-[6px]" src="./Carbon/profile-circle.svg" />
            :
            <img src="./Carbon/userVector.svg" className=" w-5 h-5 me-[6px]"/>
          }
          {leftText}
        </Button>
      </div>
      <div className={`${theme}-ToggleButton-notActiveButton w-full justify-center flex border border-solid border-transparent px-2  ${activeButton === rightText ? activeStyle : ""} `}>
        <Button data-mode={activeButton == rightText ?'active':""} onClick={() => handleButtonClick(rightText)} theme="Carbon-Toggle">
          {/* <img src="./Carbon/chatVector.svg" className=" w-5 h-5 me-[6px]"/> */}
          <div className={`Carbon-icon-chatVector ${activeButton == rightText ? 'bg-white':'bg-[#8290a3]'}`}></div>
          {rightText}
        </Button>
      </div>
    </div>
  );
};

export default ToggleButton2;
