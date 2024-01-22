import React from 'react';
import { Button } from "symphony-ui"
import ContentCard from '../ContentCard/ContentCard';
import Footer from '../Footer';

interface ProfileProps {
  theme?: string;
}
const Profile: React.FC<ProfileProps> = ({theme}) => {
  return (
    <>
    <div className={`${theme}-Profile-Container`}>
      <div className={`${theme}-Profile-ProfileSection`}>
        <img className={`${theme}-Profile-Background`} src='./profile-background.png' />
        <div className={`${theme}-Profile-Content`}>
          
          <Button theme="Carbon-Google">
            <img className="mr-2" src="./eye.svg" alt="" />
            <div>
              Preview Profile
            </div>
          </Button>

          <div className={`${theme}-Profile-ProfilePicture`}>
            <div className={`${theme}-Profile-ProfilePictureBorder`}></div>
            <div className={`${theme}-Profile-GalleryIcon`}>
              <img src="./gallery-edit.svg" alt="" />
            </div>
            <div className={`${theme}-Profile-GalleryIcon ${theme}-Profile-GalleryImport`}>
              <img src="./gallery-import.svg" alt="" />
            </div>
            <div className={`${theme}-Profile-GalleryIcon ${theme}-Profile-ScanBarcode`}>
              <img src="./scan-barcode.svg" alt="" />
            </div>
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

          <ContentCard theme="Carbon" title="Social">
            <div className={`${theme}-Profile-Icons`}>
              <div className={`${theme}-Profile-BackgroundIcons`}>
                <div className={`${theme}-ContentCard-CardIcon ${theme}-Profile-InstagramIcon`}></div>
              </div>
              <div className={`${theme}-Profile-BackgroundIcons`}>
                <div className={`${theme}-ContentCard-CardIcon ${theme}-Profile-LinkedinIcon`}></div>
              </div>
            </div>
          </ContentCard>
          <ContentCard theme="Carbon" title="Links">
            <div className={`${theme}-Profile-Icons`}>
              <div className={`${theme}-Profile-BackgroundIcons`}>
                <img className={`${theme}-ContentCard-CardIcon`} src="./Cicon.svg" alt="" />
              </div>
              <div className={`${theme}-Profile-BackgroundIcons`}>
                <img className={`${theme}-ContentCard-CardIcon`} src="./global.svg" alt="" />
              </div>
            </div>
          </ContentCard>
          <ContentCard theme="Carbon" title="About me">
            <h1>Creating has always been fascinating to me and I have found it in design. As a designer, I am always trying to create or improve a more useful and purposeful user experience to make it more profitable for businesses.</h1>
          </ContentCard>
        </div>
        <Footer activeItem='' theme="Carbon"/>
      </div>
    </div>
    </>
    
  );
};

export default Profile;
