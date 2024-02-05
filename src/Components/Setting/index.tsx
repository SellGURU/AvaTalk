import { useState } from "react";
// import { Button } from "symphony-ui";

import { Outlet } from "react-router-dom";
import SettingCard from "../SettingCard";

interface SettingProps {
  theme?: string;
}

const Setting: React.FC<SettingProps> = ({ theme }) => {
  //   const navigate = useNavigate();
  const [editCards] = useState([
    {
      name: "Your Account",
      icon: "account.svg",
      link: "account",
    },
    {
      name: "Connected Accounts",
      icon: "connected.svg",
      link: "connected-account",
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
      link: "payment",
    },
    {
      name: "Privacy Policy",
      icon: "policy.svg",
      link: "privacy-policy",
    },
    {
      name: "Terms of Service",
      icon: "security.svg",
      link: "terms-service",
    },
    {
      name: "Support",
      icon: "support.svg",
      link: "support",
    },
  ]);
  return (
    <>
      {/* <div className={`${theme}-Edit-container`}> */}
      <div className="h-screen">
        <Outlet></Outlet>
        {/* <div className="flex px-6 items-center space-x-4 absolute  top-8">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            theme={`${theme}-back`}
          >
            <div className={`${theme}-back-Button-vector`}></div>
          </Button>
          <p className={`${theme}-Edit-title`}>Edit Profile</p>
        </div> */}

        <div className="px-6 mt-[200px] hiddenScrollBar h-[-webkit-fill-available] overflow-y-scroll pb-[300px] pt-[32px]">
          {editCards.map((item) => {
            return <SettingCard linkTo={item.link} content={item} theme="Carbon"></SettingCard>;
          })}
        </div>
      </div>
    </>
  );
};
export default Setting;
