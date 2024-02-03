import React , {useState} from "react";
interface FooterPresentationProps {
  theme?: string;
  onSendVector ?: (value: string) => void;
}
const FooterPresentation: React.FC<FooterPresentationProps> = ({ theme , onSendVector}) => {
  const [mode,setMode] = useState<'profile'|'review'>('profile')

  // send chat input
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const handleSendClick = () => {
    // Call the callback function from the parent component with the input value
    if(onSendVector){
      onSendVector(inputValue);
    }

    // Clear the input field if needed
    setInputValue('');
  };

  return (
    <div className={`${theme}-FooterPresentation-Container`}>
      {
        mode == 'profile' ?
        <>
        <div onClick={() => {setMode('review')}} data-mode="profile-review-button" className={`${theme}-FooterPresentation-BackgroundItems ${theme}-FooterPresentation-VectorSection`}>
          <div className={`${theme}-FooterPresentation-Vectors ${theme}-FooterPresentation-MicVector`}></div>
        </div>
        <div className={`${theme}-FooterPresentation-BackgroundItems px-3 py-2`}>
          <input className={`${theme}-FooterPresentation-Input`} value={inputValue}
            onChange={handleInputChange} placeholder="Message..." type="text" />
          <div className={`${theme}-FooterPresentation-Vectors ${theme}-FooterPresentation-SendVector`}
            onClick={handleSendClick}></div>
        </div>
        </>
        :
        <>
        <div onClick={() => {setMode('profile')}} data-mode="profile-profile-button" className={`${theme}-FooterPresentation-BackgroundItems ${theme}-FooterPresentation-VectorSection`}>
          <div className={`${theme}-FooterPresentation-Vectors ${theme}-FooterPresentation-KeyboardVector`}></div>
        </div>
        <div className={`${theme}-FooterPresentation-SectionSelected`}>
          <div className={`${theme}-FooterPresentation-BackgroundItems ${theme}-FooterPresentation-VectorSectionSelected`}>
            <div className={`${theme}-FooterPresentation-Vectors ${theme}-FooterPresentation-MicVector`}></div>
          </div>
        </div>
        </>
      }

    </div>
  );
};

export default FooterPresentation;