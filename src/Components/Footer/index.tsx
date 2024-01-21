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
      <img onClick={() => handleItemClick("profile")} className={`${theme}-Footer-FooterIcon  ${activeItem === "profile" ? activeStyle : ""}`} src={activeItem === "profile" ? "../../public/profile-circle.svg" : "../../../public/profile-circle-gray.svg"} alt="" />
      <img onClick={() => handleItemClick("contacts")} className={`${theme}-Footer-FooterIcon ${activeItem === "contacts" ? activeStyle : ""}`} src={activeItem === "contacts" ? "../../../public/book-color.svg" : "../../public/book.svg"} alt="" />
      <img onClick={() => handleItemClick("status")} className={`${theme}-Footer-FooterIcon ${activeItem === "status" ? activeStyle : ""}`} src={activeItem === "status" ? "../../../public/status-up-color.svg" : "../../public/status-up.svg"} alt="" />
      <img onClick={() => handleItemClick("settings")} className={`${theme}-Footer-FooterIcon ${activeItem === "setting" ? activeStyle : ""}`} src={activeItem === "setting" ? "../../../public/setting-2-color.svg" : "../../public/setting.svg"} alt="" />
    </div>
  );
};

export default Footer;
