import React, { useEffect, useState } from "react";
import { MenuType } from "../../Types";
import { subscribe } from "../../utils/event";
import { Chat } from "../../Api";

interface FooterProps {
  theme?: string;
  activeItem: MenuType;
  onItemChange?: (item: MenuType) => void;
}

const Footer: React.FC<FooterProps> = ({ theme, activeItem, onItemChange }) => {
  const handleItemClick = (item: MenuType) => {
    if (onItemChange) {
      setIsHaveNewChat(false)
      onItemChange(item);
    }
  };
  const [isHaveNewAnalyse,setIsHaveNewAnalyse] = useState(false)
  const [isHaveNewChat,setIsHaveNewChat] = useState(false)
  subscribe("isHaveNewAnalyse",() => {
    setIsHaveNewAnalyse(true)
  })
  const checkNotifChat = () => {
    Chat.checkHaveChats().then((res) => {
      if(res.data["New chat"] == true) {
        setIsHaveNewChat(true)
      }
    })
  }
  useEffect(() => {
    const interval = setInterval(checkNotifChat, 15000);     
    return () => clearInterval(interval);    
  },[])
  return (
    <div id="footerItem" className={`${theme}-Footer-Container`}>
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
        <div className="flex flex-col justify-center relative items-center">
          <div
            className={`${theme}-Footer-Vectors ${theme}-Footer-ChatVector ${
              activeItem === "chats" ? `${theme}-Footer-ActiveVectors ${theme}-Footer-ChatVector-active` : ""
            }`}
          ></div>
              {isHaveNewChat &&
                <div className="w-2 h-2 bg-primary-color rounded-full absolute top-[-6px] right-[-4px]"></div>
              }          
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
         <div className="flex flex-col justify-center relative items-center">
          <div
            className={`${theme}-Footer-Vectors ${theme}-Footer-StatusVector ${
              activeItem === "status" ? `${theme}-Footer-ActiveVectors` : ""
            }`}
          >
          </div>
              {isHaveNewAnalyse &&
                <div className="w-2 h-2 bg-primary-color rounded-full absolute top-[-6px] right-[-4px]"></div>
              }
              {activeItem!= 'status'?
                <div className={`${theme}-Footer-Text`}>Analytics</div>
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