import { useState } from "react";
import { Button } from "symphony-ui";

interface ToggleProps {
  theme?: string;
  leftText: string;
  rightText: string;
}
const ToggleButton: React.FC<ToggleProps> = ({ theme, leftText, rightText }) => {
  const [activeButton, setActiveButton] = useState(leftText);

  const handleButtonClick = (buttonText: string) => {
    setActiveButton(buttonText);
  };
  const activeStyle = `${theme}-ToggleButton-ActiveButton `;
  return (
    <div className={`${theme}-ToggleButton-container `}>
      <div className={`${theme}-ToggleButton-notActiveButton  ${activeButton === leftText ? activeStyle : ""} `}>
        <Button onClick={() => handleButtonClick(leftText)} theme="Carbon-Toggle">
          {leftText}
        </Button>
      </div>
      <div className={`${theme}-ToggleButton-notActiveButton   ${activeButton === rightText ? activeStyle : ""} `}>
        <Button onClick={() => handleButtonClick(rightText)} theme="Carbon-Toggle">
          {rightText}
        </Button>
      </div>
    </div>
  );
};

export default ToggleButton;
