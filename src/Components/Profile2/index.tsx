import React from "react";
import { Button } from "symphony-ui";
import ContentCard from "../ContentCard";

interface ProfileProps {
  theme?: string;
}
const Profile2: React.FC<ProfileProps> = ({ theme }) => {
  return (
    <>
      <div className={`${theme}-Profile-Container`}>
        <div className={`${theme}-Profile-ProfileSection`}>
          <div className="relative flex flex-col gap-3 justify-center items-center mt-11 px-4 pb-20">
            <div className=" w-48 h-[40px] ">
              <Button theme="Carbon-Google" data-mode="profile-review-button">
                <div className={`${theme}-Profile-PreviewProfileBtnVector`} ></div>
                <div>Preview Profile</div>
              </Button>
            </div>

            <div className="w-full h-[398px] bg-[#E2E8F0] rounded-3xl pb-4 gap-4 flex flex-col overflow-hidden mb-4">
              <div
                className="relative w-full h-[261px] rounded-t-3xl boxShadow-Gray bg-no-repeat bg-center"
                style={{ backgroundImage: 'url("./Carbon/women.jpg")' }}
              >
                <div className="w-full h-8 absolute bg-black opacity-[32%] bottom-0 flex items-center justify-between px-5">
                  <div className={`${theme}-Profile-VolumeHighVector`}></div>
                  <div
                    className={`${theme}-Profile-LanguageSquareVector`}
                  ></div>
                </div>
              </div>
              <div>
                <h1 className={`${theme}-Profile-ProfileName`}>Ava Azami</h1>
                <p className={`${theme}-Profile-SubTitle`}>
                  CoFounder & CEO @ Codie
                </p>
              </div>
              <div className="flex gap-4 px-4">
                <Button theme="Carbon-Google" data-mode="profile-review-button">
                  <div
                    className={`${theme}-Profile-EditProfileBtnVector2`}
                  ></div>
                  <div>Edit Profile</div>
                </Button>
                <Button theme="Carbon-Google" data-mode="profile-review-button">
                  Share profile
                </Button>
              </div>
            </div>
            <ContentCard mod={"profile"} theme="Carbon" title={"Social"}>
              <div className=" flex gap-4">
                <div className={`${theme}-Profile-BackgroundVectors`}>
                  <div className={`${theme}-ContentCard-CardVector`}>
                    <div className={`${theme}-ContentCard-AddVector`}></div>
                  </div>
                </div>
                <div className={`${theme}-Profile-BackgroundVectors`}>
                  <div className={`${theme}-ContentCard-CardVector`}>
                    <div className={`${theme}-ContentCard-AddVector`}></div>
                  </div>
                </div>
              </div>
            </ContentCard>  
            <ContentCard mod={"profile"} theme="Carbon" title={"Links"}>
              <div className=" flex gap-4">
                <div className={`${theme}-Profile-BackgroundVectors`}>
                  <div className={`${theme}-ContentCard-CardVector`}>
                    <div className={`${theme}-ContentCard-AddVector`}></div>
                  </div>
                </div>
                <div className={`${theme}-Profile-BackgroundVectors`}>
                  <div className={`${theme}-ContentCard-CardVector`}>
                    <div className={`${theme}-ContentCard-AddVector`}></div>
                  </div>
                </div>
              </div>
            </ContentCard> 
            <ContentCard mod={"profile"} theme="Carbon" title={"File"}>
              <div className=" flex gap-4">
                <div className={`${theme}-Profile-BackgroundVectors`}>
                  <div className={`${theme}-ContentCard-CardVector`}>
                    <div className={`${theme}-ContentCard-AddVector`}></div>
                  </div>
                </div>
                <div className={`${theme}-Profile-BackgroundVectors`}>
                  <div className={`${theme}-ContentCard-CardVector`}>
                    <div className={`${theme}-ContentCard-AddVector`}></div>
                  </div>
                </div>
              </div>
            </ContentCard>  

            <Button  theme="Carbon-Show">
              Show more              
            </Button> 


          </div>
        </div>
      </div>
    </>
  );
};

export default Profile2;
