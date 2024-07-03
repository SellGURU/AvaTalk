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
          activeItem === "profile" ? `${theme}-Footer-ActiveVectorSection boxShadow-Gray` : ""
        }`}
      >
        <div className="flex flex-col justify-center items-center">
          <div
            className={`${theme}-Footer-Vectors ${theme}-Footer-UserVector ${
              activeItem === "profile" ? `${theme}-Footer-ActiveVectors` : ""
            }`}
          >

          </div>
          {activeItem!= 'profile'?
            <div className={`${theme}-Footer-Text`}>Profile</div>
          :
          undefined}
        </div>
      </div>
      <div
        onClick={() => handleItemClick("contacts")}
        className={`${theme}-Footer-VectorSection ${
          activeItem === "contacts" ? `${theme}-Footer-ActiveVectorSection boxShadow-Gray` : ""
        }`}
      >
        <div className="flex flex-col justify-center items-center">
          <div
            className={`${theme}-Footer-Vectors ${theme}-Footer-BookVector ${
              activeItem === "contacts" ? `${theme}-Footer-ActiveVectors` : ""
            }`}
          ></div>
          {activeItem!= 'contacts'?
            <div className={`${theme}-Footer-Text`}>Contact</div>
          :
          undefined}

        </div>
      </div>
      <div
        onClick={() => handleItemClick("chats")}
        className={`${theme}-Footer-VectorSection ${
          activeItem === "chats" ? `${theme}-Footer-ActiveVectorSection boxShadow-Gray` : ""
        }`}
      >
        <div className="flex flex-col justify-center items-center">
          <div
            className={`${theme}-Footer-Vectors ${theme}-Footer-ChatVector ${
              activeItem === "chats" ? `${theme}-Footer-ActiveVectors` : ""
            }`}
          ></div>
            {activeItem!= 'chats'?
              <div className={`${theme}-Footer-Text`}>Chats</div>
            :
            undefined}        
        </div>
      </div>
      <div
        onClick={() => handleItemClick("status")}
        className={`${theme}-Footer-VectorSection ${
          activeItem === "status" ? `${theme}-Footer-ActiveVectorSection boxShadow-Gray` : ""
        }`}
      >
         <div className="flex flex-col justify-center items-center">
          <div
            className={`${theme}-Footer-Vectors ${theme}-Footer-StatusVector ${
              activeItem === "status" ? `${theme}-Footer-ActiveVectors` : ""
            }`}
          ></div>
              {activeItem!= 'status'?
                <div className={`${theme}-Footer-Text`}>Analysis</div>
              :
              undefined}           
         </div>
      </div>
      <div
        onClick={() => handleItemClick("settings")}
        className={`${theme}-Footer-VectorSection ${
          activeItem === "settings" ? `${theme}-Footer-ActiveVectorSection boxShadow-Gray` : ""
        }`}
      >
        <div className="flex flex-col justify-center items-center">
          <div
            className={`${theme}-Footer-Vectors ${theme}-Footer-SettingVector ${
              activeItem === "settings" ? `${theme}-Footer-ActiveVectors` : ""
            }`}
          ></div>
            {activeItem!= 'settings'?
              <div className={`${theme}-Footer-Text`}>Setting</div>
            :
            undefined}            

        </div>
      </div>
    </div>
  );
};

export default Footer;