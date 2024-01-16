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
        <img className={`${theme}-Profile-BoxShadow`} src='../../public/profile-background.png' />
      </div>
      <div className={`${theme}-Profile-Content`}>
        <Button theme="Carbon-Google">
          <img className="mr-2" src="./eye.svg" alt="" />
          <div>
            Preview Profile
          </div>
        </Button>
        <div className={`${theme}-Profile-ProfilePicture ${theme}-Profile-BoxShadow`}>
          <div className={`${theme}-Profile-ProfilePictureBorder`}></div>
        </div>
        <div>
          <h1 className={`${theme}-Profile-ProfileName`}>Farzin Azami</h1>
          <p className={`${theme}-Profile-SubTitle`}>CoFounder & CEO</p>
        </div>

        <Button theme="Carbon">
          <img className="mr-2" src="./user-edit.svg" alt="" />
          <div>
            Edit Profile
          </div>
        </Button>
      </div>
      <div className={`${theme}-Profile-Footer`}>
        <img className={`${theme}-Profile-FooterIcon`} src="../../public/profile-circle.svg" alt="" />
        <img className={`${theme}-Profile-FooterIcon`} src="../../public/book.svg" alt="" />
        <img className={`${theme}-Profile-FooterIcon`} src="../../public/status-up.svg" alt="" />
        <img className={`${theme}-Profile-FooterIcon`} src="../../public/setting.svg" alt="" />
      </div>
    </div>
    </>
    
  );
};

export default Profile;
