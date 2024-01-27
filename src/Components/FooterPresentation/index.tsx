import React from "react";

interface FooterPresentationProps {
  theme?: string;
}
const FooterPresentation: React.FC<FooterPresentationProps> = ({ theme}) => {
  return (
    <div className={`${theme}-FooterPresentation-Container`}>
      <div className={`${theme}-FooterPresentation-BackgroundItems ${theme}-FooterPresentation-VectorSection`}>
        <div className={`${theme}-FooterPresentation-Vectors ${theme}-FooterPresentation-MicVector`}></div>
      </div>
      <div className={`${theme}-FooterPresentation-BackgroundItems`} >
      </div>
    </div>
  );
};

export default FooterPresentation;