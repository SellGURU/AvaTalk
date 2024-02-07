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

  return (
    <div className={`${theme}-Footer-Container`}>
      <div
        onClick={() => handleItemClick("profile")}
        className={`${theme}-Footer-VectorSection ${
          activeItem === "profile" ? `${theme}-Footer-ActiveVectorSection btnInnerShadowsDark` : ""
        }`}
      >
        <div
          className={`${theme}-Footer-Vectors ${theme}-Footer-UserVector ${
            activeItem === "profile" ? `${theme}-Footer-ActiveVectors` : ""
          }`}
        ></div>
      </div>
      <div
        onClick={() => handleItemClick("contacts")}
        className={`${theme}-Footer-VectorSection ${
          activeItem === "contacts" ? `${theme}-Footer-ActiveVectorSection btnInnerShadowsDark` : ""
        }`}
      >
        <div
          className={`${theme}-Footer-Vectors ${theme}-Footer-BookVector ${
            activeItem === "contacts" ? `${theme}-Footer-ActiveVectors` : ""
          }`}
        ></div>
      </div>
      <div
        onClick={() => handleItemClick("chats")}
        className={`${theme}-Footer-VectorSection ${
          activeItem === "chats" ? `${theme}-Footer-ActiveVectorSection btnInnerShadowsDark` : ""
        }`}
      >
        <div
          className={`${theme}-Footer-Vectors ${theme}-Footer-ChatVector ${
            activeItem === "chats" ? `${theme}-Footer-ActiveVectors` : ""
          }`}
        ></div>
      </div>
      <div
        onClick={() => handleItemClick("status")}
        className={`${theme}-Footer-VectorSection ${
          activeItem === "status" ? `${theme}-Footer-ActiveVectorSection btnInnerShadowsDark` : ""
        }`}
      >
        <div
          className={`${theme}-Footer-Vectors ${theme}-Footer-StatusVector ${
            activeItem === "status" ? `${theme}-Footer-ActiveVectors` : ""
          }`}
        ></div>
      </div>
      <div
        onClick={() => handleItemClick("settings")}
        className={`${theme}-Footer-VectorSection ${
          activeItem === "settings" ? `${theme}-Footer-ActiveVectorSection btnInnerShadowsDark` : ""
        }`}
      >
        <div
          className={`${theme}-Footer-Vectors ${theme}-Footer-SettingVector ${
            activeItem === "settings" ? `${theme}-Footer-ActiveVectors` : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Footer;