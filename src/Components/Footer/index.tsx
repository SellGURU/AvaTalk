import React from "react";

interface FooterProps {
  theme?: string;
  activeItem: string;
  onItemChange?: (item: string) => void;
}

const Footer: React.FC<FooterProps> = ({ theme, activeItem, onItemChange }) => {
  const handleItemClick = (item: string) => {
    if (onItemChange) {
      onItemChange(item);
    }
  };
  const activeStyle = `${theme}-Footer-ActiveIcon`;
  return (
    <div className={`${theme}-Footer-Container`}>
      <img className={`${theme}-Footer-FooterIcon ${theme}-Footer-ActiveIcon`} src="../../public/profile-circle.svg" alt="" />
      <img className={`${theme}-Footer-FooterIcon`} src="../../public/book.svg" alt="" />
      <img className={`${theme}-Footer-FooterIcon`} src="../../public/status-up.svg" alt="" />
      <img className={`${theme}-Footer-FooterIcon`} src="../../public/setting.svg" alt="" />
    </div>
  );
};

export default Footer;
