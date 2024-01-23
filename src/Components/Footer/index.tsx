import React from "react";
import { MenuType } from "../../Types";

interface FooterProps {
  theme?: string;
  activeItem: MenuType;
  onItemChange?: (item: MenuType) => void;
}

const Footer: React.FC<FooterProps> = ({ theme, activeItem, onItemChange }) => {
  const handleItemClick = (item: MenuType) => {
    if (onItemChange) {
      onItemChange(item);
    }
  };

  const activeStyle = `${theme}-Footer-ActiveIcon`;
  return (
    <div className={`${theme}-Footer-Container`}>
      <img onClick={() => handleItemClick("profile")} className={`${theme}-Footer-FooterIcon  ${activeItem === "profile" ? activeStyle : ""}`} src={activeItem === "profile" ? "./profile-circle.svg" : "./profile-circle-gray.svg"} alt="" />
      <img onClick={() => handleItemClick("contacts")} className={`${theme}-Footer-FooterIcon ${activeItem === "contacts" ? activeStyle : ""}`} src={activeItem === "contacts" ? "./public/book-color.svg" : "./book.svg"} alt="" />
      <img onClick={() => handleItemClick("status")} className={`${theme}-Footer-FooterIcon ${activeItem === "status" ? activeStyle : ""}`} src={activeItem === "status" ? "./status-up-color.svg" : "./status-up.svg"} alt="" />
      <img onClick={() => handleItemClick("settings")} className={`${theme}-Footer-FooterIcon ${activeItem === "settings" ? activeStyle : ""}`} src={activeItem === "settings" ? "./setting-2-color.svg" : "./setting.svg"} alt="" />
    </div>
  );
};

export default Footer;