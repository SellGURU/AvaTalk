import { useState } from "react";
import { Button } from "symphony-ui";

interface ToggleProps {
  theme?: string;
  leftText: string;
  rightText: string;
  onButtonClick: (buttonText: string) => void;
}
const ToggleButton2: React.FC<ToggleProps> = ({ theme, leftText, rightText, onButtonClick }) => {
  const [activeButton, setActiveButton] = useState(leftText);

  const handleButtonClick = (buttonText: string) => {
    setActiveButton(buttonText);
    onButtonClick(buttonText);
  };
  const activeStyle = `${theme}-ToggleButton-ActiveButton `;
  return (
    <div className={`${theme}-ToggleButton-container px-2 `}>
      <div className={`${theme}-ToggleButton-notActiveButton border border-solid border-transparent px-7   ${activeButton === leftText ? activeStyle : ""} `}>
        <Button onClick={() => handleButtonClick(leftText)} theme="Carbon-Toggle">
          <img src="./Carbon/userVector.svg" className=" w-5 h-5 me-[6px]"/>
          {leftText}
        </Button>
      </div>
      <div className={`${theme}-ToggleButton-notActiveButton border border-solid border-transparent px-7  ${activeButton === rightText ? activeStyle : ""} `}>
        <Button onClick={() => handleButtonClick(rightText)} theme="Carbon-Toggle">
          <img src="./Carbon/chatVector.svg" className=" w-5 h-5 me-[6px]"/>
          {rightText}
        </Button>
      </div>
    </div>
  );
};

export default ToggleButton2;
