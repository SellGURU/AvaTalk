import React , {useState} from "react";
interface FooterPresentationProps {
  theme?: string;
}

const FooterPresentation: React.FC<FooterPresentationProps> = ({ theme}) => {
  const [mode,setMode] = useState<'profile'|'review'>('profile')

  return (
    <div className={`${theme}-FooterPresentation-Container`}>
      {
        mode == 'profile' ?
        <>
        <div onClick={() => {setMode('review')}} data-mode="profile-review-button" className={`${theme}-FooterPresentation-BackgroundItems ${theme}-FooterPresentation-VectorSection`}>
          <div className={`${theme}-FooterPresentation-Vectors ${theme}-FooterPresentation-MicVector`}></div>
        </div>
        <div className={`${theme}-FooterPresentation-BackgroundItems px-3 py-2`}>
          <input className={`${theme}-FooterPresentation-Input`} placeholder="Message..." type="text" />
          <div className={`${theme}-FooterPresentation-Vectors ${theme}-FooterPresentation-SendVector`}></div>
        </div>
        </>
        :
        <>
        <div onClick={() => {setMode('profile')}} data-mode="profile-profile-button" className={`${theme}-FooterPresentation-BackgroundItems ${theme}-FooterPresentation-VectorSection`}>
          <div className={`${theme}-FooterPresentation-Vectors ${theme}-FooterPresentation-SendVector`}></div>
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