import { useState } from "react";
// import { Button } from "symphony-ui";

import { Outlet } from "react-router-dom";
import SettingCard from "../SettingCard";
import { useAuth } from "../../hooks/useAuth";

interface SettingProps {
  theme?: string;
}

const Setting: React.FC<SettingProps> = ({theme}) => {
  //   const navigate = useNavigate();
  const auth =useAuth()
  const [settingCards] = useState([
    {
      name: "Your Account",
      icon: "account.svg",
      link: "account",
    },
    {
      name: "Connected Accounts",
      icon: "connected.svg",
      link: "",
    },
    {
      name: "Sharing",
      icon: "share.svg",
      link: "sharing",
    },
    {
      name: "Your Service",
      icon: "service.svg",
      link: "service",
    },
    {
      name: "payment-subscription",
      icon: "payment.svg",
      link: "",
    },
    {
      name: "Privacy Policy",
      icon: "policy.svg",
      link: "privacypolicy",
    },
    {
      name: "Terms of Service",
      icon: "security.svg",
      link: "termsservice",
    },
    {
      name: "Support",
      icon: "support.svg",
      link: "support",
    },
  ]);
  return (
    <>
    
      <div className={`Carbon-ContactsView-Container`}>
        <Outlet></Outlet>
        <p className={`${theme}-Edit-title px-6 pb-[6px]`}>Setting</p>
        <div className="px-6 mt-0 hiddenScrollBar  h-dvh overflow-y-scroll pb-[300px] ">
          {settingCards.map((item) => {
            return <SettingCard linkTo={item.link} content={item} theme="Carbon"></SettingCard>
          })}
          <div className="mt-5 flex items-center justify-center cursor-pointer">
            <div className={`${theme}-Setting-LogoutVector`}></div>
            <p onClick={() =>auth.logout()} className="text-cyan-500 ms-2">Log out</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Setting;
