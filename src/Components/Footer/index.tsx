import React from 'react';

interface FooterProps {
  theme?: string;
}
const Footer: React.FC<FooterProps> = ({theme}) => {
  return (
    <>
    <div className={`${theme}-Footer-Container`}>
      <img className={`${theme}-Footer-FooterIcon ${theme}-Footer-ActiveIcon`} src="../../public/profile-circle.svg" alt="" />
      <img className={`${theme}-Footer-FooterIcon`} src="../../public/book.svg" alt="" />
      <img className={`${theme}-Footer-FooterIcon`} src="../../public/status-up.svg" alt="" />
      <img className={`${theme}-Footer-FooterIcon`} src="../../public/setting.svg" alt="" />
    </div>
    </> 
  );
};

export default Footer;
