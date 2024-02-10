import { Button, TextField } from "symphony-ui";
import { BackIcon, Select } from "../../../Components";
import { useState } from "react";
const EditSocials = () => {
  const medias = [
    {
      name: "Linkedin",
      icon: "devicon_linkdin.svg",
    },
    {
      name: "Instagram",
      icon: "devicon_instagram.svg",
    },
    {
      name: "Facebook",
      icon: "devicon_facebook.svg",
    },
    {
      name: "Twitter/ X",
      icon: "devicon_twitter.svg",
    },
    {
      name: "Youtube",
      icon: "devicon_youtube.svg",
    },
  ];
  const [selectItem, setSelectedItem] = useState(medias[0]);
  return (
    <>
      <div className="w-full absolute h-screen top-[25px] bg-white z-[12]">
        <BackIcon title="Socials" theme="Carbon"></BackIcon>
        <div className="mt-24 px-6">
          <TextField theme="Carbon" label="Title" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="Enter title..."></TextField>
        </div>
        <div className="mt-3 px-6">
          <TextField theme="Carbon" label="Social Medias" inValid={false} name="title" onBlur={() => {}} onChange={() => {}} type="text" value="" placeholder="No Social"></TextField>
        </div>
        <div className="px-6 mt-3">
          {/* <Select valueElement="" label="Add Social Media" placeholder="Please select social media..." theme="Carbon" /> */}
          <Select
            valueElement={
              <div className={`cursor-pointer mt-[2px] flex justify-start items-center`}>
                <img className="h-4" src={"./icons/media/" + selectItem.icon} alt="" />
                <div className="ml-1 text-gray-700 text-sm">{selectItem.name}</div>
              </div>
            }
            theme="Carbon"
          >
            {medias.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedItem(item);
                  }}
                  className={`h-[50px] px-5 border-b border-[white] cursor-pointer flex justify-start items-center ${index == medias.length - 1 ? " border-none" : ""}`}
                >
                  <img className="h-4" src={"./icons/media/" + item.icon} alt="" />
                  <div className="ml-1 text-gray-700 text-sm">{item.name}</div>
                </div>
              );
            })}
          </Select>
        </div>
        <div className="px-6 mt-10">
          <Button theme="Carbon">Save Change</Button>
        </div>
      </div>
    </>
  );
};

export default EditSocials;
