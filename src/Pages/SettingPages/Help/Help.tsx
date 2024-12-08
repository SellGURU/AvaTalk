import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Button } from "symphony-ui";
import { SettingCard } from "../../../Components";
import { useConstructor } from "../../../help";
import { Auth } from "../../../Api";
import { useAuth } from "../../../hooks/useAuth";

const SettingHelp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useAuth()
  const helpMenus = [
    {
      name: "Privacy Policy",
      icon: "privacy.svg",
      link: "privacy",
    },
    {
      name: "Terms of Service",
      icon: "terms.svg",
      link: "terms",
    },
    {
      name: "Support",
      icon: "support.svg",
      link: "support",
    },
  ];
  useConstructor(() => {
      Auth.addEvent({
          event_type:'user_act',
          sub_event_category:'help_section_usage_count',
          userid:context.currentUser.information?.userId as string
      })    
  })
  const isRootHelpPath = location.pathname === "/settings/Help";

  return (
    <div className={`Carbon-ChatDetails-container`}>
      <Outlet />
      {isRootHelpPath && (
        <>
          <div className="flex px-6 items-center space-x-4 absolute top-8">
            <Button
              onClick={() => navigate(-1)}
              theme={`Carbon-back`}
            >
              <div className={`Carbon-back-Button-vector`}></div>
            </Button>
            <p className={`Carbon-ChatDetails-title`}>Help</p>
          </div>
          <div className="flex flex-col px-6 mt-[66px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] ">
            {helpMenus.map((item) => (
              <SettingCard
                key={item.name}
                linkTo={item.link}
                content={item}
                theme="Carbon"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SettingHelp;