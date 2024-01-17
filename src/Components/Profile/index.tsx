import React from 'react';
import { Button } from "symphony-ui"

interface ProfileProps {
  theme?: string;
}
const Profile: React.FC<ProfileProps> = ({theme}) => {
  return (
    <>
    <div className={`${theme}-Profile-Container`}>
      <div>
        <img className={`${theme}-Profile-Background`} src='../../public/profile-background.png' />
      </div>
      <div className={`${theme}-Profile-Content`}>
        <div className="w-48">
          <Button theme="Carbon-Google">
            <img className="mr-2" src="./eye.svg" alt="" />
            <div>
              Preview Profile
            </div>
          </Button>
        </div>
        <div className={`${theme}-Profile-ProfilePicture`}>
          <div className={`${theme}-Profile-ProfilePictureBorder`}></div>
        </div>
        <div className={`${theme}-Profile-GalleryIcon`}>
          <img src="../../public/gallery-edit.svg" alt="" />
        </div>
        <div className={`${theme}-Profile-GalleryIcon ${theme}-Profile-GalleryImport`}>
          <img src="../../public/gallery-import.svg" alt="" />
        </div>
        <div>
          <h1 className={`${theme}-Profile-ProfileName`}>Farzin Azami</h1>
          <p className={`${theme}-Profile-SubTitle`}>CoFounder & CEO</p>
        </div>
        <div className="w-80">
          <Button theme="Carbon">
            <img className="mr-2" src="./user-edit.svg" alt="" />
            <div>
              Edit Profile
            </div>
          </Button>
        </div>
      </div>
      <div className={`${theme}-Profile-Footer`}>
        <img className={`${theme}-Profile-FooterIcon ${theme}-Profile-ActiveIcon`} src="../../public/profile-circle.svg" alt="" />
        <img className={`${theme}-Profile-FooterIcon`} src="../../public/book.svg" alt="" />
        <img className={`${theme}-Profile-FooterIcon`} src="../../public/status-up.svg" alt="" />
        <img className={`${theme}-Profile-FooterIcon`} src="../../public/setting.svg" alt="" />
      </div>
    </div>
    </>
    
  );
};

export default Profile;
