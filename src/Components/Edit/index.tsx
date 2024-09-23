import { useState } from "react";
import { Button } from "symphony-ui";
import { Card } from "..";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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
      name: "Appointment",
      icon: "calendar-2.svg",
      link: "availability",
      description: "Share something about your availability.",
    },
    {
      name: "Gallery",
      icon: "gallery.svg",
      link: "gallery",
      description: "Add images to your profile.",
    },
    {
      name: "Social",
      icon: "social.svg",
      link: "socials",
      description: "Share your social media profiles.",
    },
    {
      name: "Link",
      icon: "link.svg",
      link: "links",
      description: "Add websites to your profile.",
    },
    {
      name: "File",
      icon: "copy.svg",
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
      name: "Video",
      icon: "video-play.svg",
      link: "Videos",
      description: "Make your page come to life with a video.",
    },
  ]);
  const authContext = useAuth()
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
        <div className="px-6 mt-[120px]  h-dvh overflow-y-scroll pb-[300px] pt-[32px]">
          <div className="w-full flex justify-center mb-5">
            <div className="text-center relative">
                <div onClick={() => {
                  navigate('/edit/avatars')
                }} className={`${
                    "absolute rounded-full w-[32px] h-[32px] bg-gray-100  flex justify-center items-center border border-white borderBox-Gray  cursor-pointer -right-2 -top-2"
                  }`}>
                  <div className={`${theme}-Profile-EditProfileBtnVector7 ${theme}-Footer-Vectors
                         text-[#8290a3] w-[20px] h-[20px]
                          m-auto`}></div>
                {/* <img
                  className="w-[20px] h-[20px]"
                  src="./icons/gallery-edit.svg"
                  alt=""
                /> */}
              </div>              
              <img onClick={() => {
                  navigate('/edit/avatars')
                }} className="w-[120px] m-auto rounded-[8px] border border-gray-100" src={authContext.currentUser.information?.imageurl} alt="" />
              <div onClick={() => {
                  navigate('/edit/avatars')
                }} className="text-gray-700 cursor-pointer mt-3 font-medium text-sm font-poppins">Edit Your Avatar</div>
            </div>
          </div>
          {editCards.map((item) => {
            return <Card linkTo={item.link} content={item} theme="Carbon"></Card>;
          })}
        </div>
      </div>
    </>
  );
};
export default Edit;
