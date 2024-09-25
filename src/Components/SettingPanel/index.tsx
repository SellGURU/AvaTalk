import { createRef, useEffect, useState } from "react";
// import { Button } from "symphony-ui";
import PackageJson from '../../../package.json';
import { Outlet } from "react-router-dom";
import SettingCard from "../SettingCard";
import { useAuth } from "../../hooks/useAuth";
import { Confirm } from "../__Modal__";
import PlanCard from "../PlanCard";

interface SettingPanelProps {
  theme?: string;
}

const SettingPanel: React.FC<SettingPanelProps> = ({theme}) => {
  //   const navigate = useNavigate();
  const confirmRef = createRef<HTMLDivElement>()
  const [showConfirm,setShowConfirm] = useState(false)
  const auth =useAuth()
  const [settingCards] = useState([
    {
      name: "Your Account",
      icon: "account.svg",
      link: "account",
    },

    // {
    //   name: "Sharing",
    //   icon: "share.svg",
    //   link: "sharing",
    // },
    {
      name: "Order NFC Card",
      icon: "OrderNFCCard.svg",
      link: "OrderNFCCard",
    },
    // {
    //   name: "Your Service",
    //   icon: "service.svg",
    //   link: "service",
    // },
    {
      name: "Refer and Get Rewards",
      icon: "Referandgetrewards.svg",
      link: "refer",
    },
    {
      name: "Your Plan",
      icon: "YourPlan.svg",
      link: "service",
    },
    // {
    //   name: "payment-subscription",
    //   icon: "payment.svg",
    //   link: "payment",
    // },
    {
      name: "Help",
      icon: "help.svg",
      link: "Help",
    },
    // {
    //   name: "Privacy Policy",
    //   icon: "policy.svg",
    //   link: "privacypolicy",
    // },
    // {
    //   name: "Terms of Service",
    //   icon: "security.svg",
    //   link: "termsservice",
    // },
    // {
    //   name: "Support",
    //   icon: "support.svg",
    //   link: "support",
    // },
    // {
    //   name: "Support",
    //   icon: "support.svg",
    //   link: "support",
    // },

    // {
    //   name: "Connected Accounts",
    //   icon: "connected.svg",
    //   link: "connectedaccount",
    // },

  ]);
  const [isShowPlanCard,setIsShowPalnCard] = useState(false)
  useEffect(() => {
    setTimeout(() => {
        if(auth.currentUser.type_of_account.getType() != 'Pro' || auth.currentUser.type_of_account.getDayremindToExpired() <= 7) {
          setIsShowPalnCard(true)
        }
      
    }, 2000);
  },[])
  return (
    <>
    
      <div className={`Carbon-ContactsView-Container `}>
        <Outlet></Outlet>
        <p className={`${theme}-Edit-title px-6 pb-[6px]`}>Setting</p>
        <div className="px-6 mt-0 hiddenScrollBar h-dvh  overflow-y-scroll pb-[300px]  ">
          {isShowPlanCard &&
            <div className="">
              <PlanCard onClose={() => {setIsShowPalnCard(false)}}></PlanCard>
            </div>
          }
          {settingCards.map((item) => {
            return <SettingCard key={item.link} linkTo={item.link} content={item} theme="Carbon"></SettingCard>
          })}
          <div className="mt-5 flex items-center justify-center cursor-pointer">
            <div className={`${theme}-Setting-LogoutVector`}></div>
            <p onClick={() =>setShowConfirm(true)} className="text-cyan-500 ms-2 text-sm	font-medium	">Log out</p>
          </div>

          <div className="flex items-center text-[#8290a3] text-sm mt-5 justify-center">Version:{"    "}{PackageJson.description}{PackageJson.version}</div>
        </div>
      </div>
        {showConfirm ?
        <>
            <div className='fixed top-0 left-0 z-[5000] w-full h-dvh flex justify-center items-center'>
                <Confirm confirmTitle="Log out" refrence={confirmRef} title={"Log out"} content={"Are you sure want to Log out your account?"} onClose={() => {setShowConfirm(false)}} onConfirm={() => {
                  auth.logout()
                }}></Confirm>
            </div>
            {/* <div className="absolute w-full z-30 h-full bg-black opacity-60 top-0 left-0"></div> */}
        </>
        :
        undefined
        }
    </>
  );
};
export default SettingPanel;
