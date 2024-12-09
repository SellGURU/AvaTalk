import { useNavigate } from "react-router-dom";
import { Button } from "symphony-ui";
import { SettingCard } from "../../../Components";

export const UserManual=()=>{
  const navigate = useNavigate();

    const SupportMenus = [
        {
            name: "Welcome to Avatalk",
            icon: "",
            link: "/settings/Help/ManualView/Welcome_to_Avatalk",
        },
        {
            name: "Profile Mastery",
            icon: "",
            link: "/settings/Help/ManualView/Profile_Mastery",
        },
        {
            name: "AI Persona Magic",
            icon: "",
            link: "/settings/Help/ManualView/AI_Persona_Magic",
        },
        {
            name: "Dynamic Galleries",
            icon: "",
            link: "/settings/Help/ManualView/Dynamic_Galleries",
        },
        {
            name: "Social Connections",
            icon: "",
            link: "/settings/Help/ManualView/Social_Connections",
        },
        {
            name: "Adding Links",
            icon: "",
            link: "/settings/Help/ManualView/Adding_Links",
        },
        {
            name: "File Sharing",
            icon: "",
            link: "/settings/Help/ManualView/File_Sharing",
        },
    ];

    return(
        <>
            <div className={`Carbon-ChatDetails-container`}>
            <div className="flex px-6 items-center space-x-4 absolute top-8">
                <Button
                onClick={() => navigate(-1)}
                theme={`Carbon-back`}
                >
                <div className={`Carbon-back-Button-vector`}></div>
                </Button>
                <p className={`Carbon-ChatDetails-title`}>User Manual</p>
            </div>
            <div className="flex flex-col px-6 mt-[60px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[4px]">
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
        </>
    )
}