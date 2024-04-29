import { useState } from "react";
import { Button } from "symphony-ui";
import { Card } from "..";
import { Outlet, useNavigate } from "react-router-dom";

interface EditProps {
  theme?: string;
}

const Edit: React.FC<EditProps> = ({ theme }) => {
  const navigate = useNavigate();
  const [editCards] = useState([
    {
      name: "AI Setting",
      icon: "aiSetting.svg",
      link: "ai-setting",
      description: "Customize AI settings.",
    },    
    {
      name: "Contact Info",
      icon: "book.svg",
      link: "contact-info",
      description: "Add the contact info you’d like to share others.",
    },
    {
      name: "About",
      icon: "info.svg",
      link: "about",
      description: "Share something about yourself.",
    },
    {
      name: "Gallery",
      icon: "gallery.svg",
      link: "gallery",
      description: "Add images to your profile.",
    },
    {
      name: "Socials",
      icon: "social.svg",
      link: "socials",
      description: "Share your social media profiles.",
    },
    {
      name: "Links",
      icon: "link.svg",
      link: "links",
      description: "Add websites to your profile.",
    },
    {
      name: "File",
      icon: "link.svg",
      link: "Files",
      description: "Add files to your profile.",
    },    
    {
      name: "Google Map",
      icon: "location2.svg",
      link: "googlemap",
      description: "Share a store or office location.",
    },
    {
      name: "Videos",
      icon: "video-play.svg",
      link: "",
      description: "Make your page come to life with a video.",
    },
  ]);
  return (
    <>
      <Outlet></Outlet>
      <div className={`${theme}-Edit-container`}>
        <div className="flex px-6 items-center space-x-4 absolute  top-16">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            theme={`${theme}-back`}
          >
            <div className={`${theme}-back-Button-vector`}></div>
          </Button>
          <p className={`${theme}-Edit-title`}>Edit Profile</p>
        </div>

        <div className="px-6 mt-[120px] hiddenScrollBar h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
          {editCards.map((item) => {
            return <Card linkTo={item.link} content={item} theme="Carbon"></Card>;
          })}
        </div>
      </div>
    </>
  );
};
export default Edit;
