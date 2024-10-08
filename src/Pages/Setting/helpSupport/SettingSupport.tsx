import { useNavigate } from "react-router-dom";
import { Button } from "symphony-ui";
import { SettingCard } from "../../../Components";

const HelpSupport = () => {
  const navigate = useNavigate();

  const SupportMenus = [
    {
      name: "Support Form",
      icon: "form.svg",
      link: "/settings/Help/form",
    },
    // {
    //   name: "User Manual",
    //   icon: "manual.svg",
    //   link:""
    //   // link: "/settings/Help/manual",
    // },
    // {
    //   name: "Tutorial Videos",
    //   icon: "tutorial.svg",
    //   link:""
    //   // link: "/settings/Help/tutorial",
    // },
    // {
    //   name: "Customer Service",
    //   icon: "costomer-service.svg",
    //   link: "customer-service",
    // },
  ];

  return (
    <div className={`Carbon-ChatDetails-container`}>
      <div className="flex px-6 items-center space-x-4 absolute top-8">
        <Button
          onClick={() => navigate(-1)}
          theme={`Carbon-back`}
        >
          <div className={`Carbon-back-Button-vector`}></div>
        </Button>
        <p className={`Carbon-ChatDetails-title`}>Support</p>
      </div>
      <div className="flex flex-col px-6 mt-[40px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
        {SupportMenus.map((item) => (
          <SettingCard
            key={item.name}
            linkTo={item.link}
            content={item}
            theme="Carbon"
          />
        ))}
      </div>
    </div>
  );
};

export default HelpSupport;