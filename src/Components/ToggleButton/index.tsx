import { useState } from "react";
import { Button } from "symphony-ui";

interface ToggleProps {
  theme?: string;
  leftText: string;
  rightText: string;
  onButtonClick: (buttonText: string) => void;
}
const ToggleButton: React.FC<ToggleProps> = ({ theme, leftText, rightText, onButtonClick }) => {
  const [activeButton, setActiveButton] = useState(leftText);

  const handleButtonClick = (buttonText: string) => {
    setActiveButton(buttonText);
    onButtonClick(buttonText);
  };
  const activeStyle = `${theme}-ToggleButton-ActiveButton `;
  return (
    <div className={`${theme}-ToggleButton-container `}>
      <div className={`${theme}-ToggleButton-notActiveButton border border-solid border-transparent   ${activeButton === leftText ? activeStyle : ""} `}>
        <Button onClick={() => handleButtonClick(leftText)} theme="Carbon-Toggle">
          {leftText}
        </Button>
      </div>
      <div className={`${theme}-ToggleButton-notActiveButton border border-solid border-transparent  ${activeButton === rightText ? activeStyle : ""} `}>
        <Button onClick={() => handleButtonClick(rightText)} theme="Carbon-Toggle">
          {rightText}
        </Button>
      </div>
    </div>
  );
};

export default ToggleButton;
