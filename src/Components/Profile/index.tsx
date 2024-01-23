import React from 'react';
import { Button } from "symphony-ui"
import ContentCard from '../ContentCard';

interface ProfileProps {
  theme?: string;
}
const Profile: React.FC<ProfileProps> = ({theme}) => {
  return (
    <>
    <div className={`${theme}-Profile-Container`}>
      <div className={`${theme}-Profile-ProfileSection`}>
        <div className={`${theme}-Profile-Background`}></div>
        <div className={`${theme}-Profile-Content`}>  
          <div className={`${theme}-Profile-BtnContainer`}>
            <Button theme="Carbon-Google">
              <div className={`${theme}-Profile-PreviewProfileBtnVector`}></div>
              <div>
                Preview Profile
              </div>
            </Button>
          </div>

          <div className={`${theme}-Profile-ProfilePicture`}>
            <div className={`${theme}-Profile-ProfilePictureBorder`}></div>
            <div className={`${theme}-Profile-GalleryVectorContainer`}>
              <div className={`${theme}-Profile-GalleryVector ${theme}-Profile-EditGalleryVector`}></div>
            </div>
            <div className={`${theme}-Profile-GalleryVectorContainer ${theme}-Profile-GalleryImport`}>
              <div className={`${theme}-Profile-GalleryVector ${theme}-Profile-ImportGalleryVector`}></div>
            </div>
            <div className={`${theme}-Profile-GalleryVectorContainer ${theme}-Profile-ScanBarcode`}>
              <div className={`${theme}-Profile-GalleryVector ${theme}-Profile-ScanBarcodeVector`}></div>
            </div>
          </div>

          <div>
            <h1 className={`${theme}-Profile-ProfileName`}>Farzin Azami</h1>
            <p className={`${theme}-Profile-SubTitle`}>CoFounder & CEO</p>
          </div>

          <Button theme="Carbon">
            <div className={`${theme}-Profile-EditProfileBtnVector`}></div>
            <div>
              Edit Profile
            </div>
          </Button>

          <ContentCard theme="Carbon" title="Social">
            <div className={`${theme}-Profile-Vectors`}>
              <div className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector ${theme}-Profile-InstagramVector`}></div>
              </div>
              <div className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector ${theme}-Profile-LinkedinVector`}></div>
              </div>
            </div>
          </ContentCard>
          <ContentCard theme="Carbon" title="Links">
            <div className={`${theme}-Profile-Vectors`}>
              <div className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector`}>
                  <div className={`${theme}-ContentCard-CVector`}></div>
                </div>
              </div>
              <div className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector`}>
                  <div className={`${theme}-ContentCard-GlobalVector`}></div>
                </div>
              </div>
            </div>
          </ContentCard>
          <ContentCard theme="Carbon" title="About me">
            <h1>Creating has always been fascinating to me and I have found it in design. As a designer, I am always trying to create or improve a more useful and purposeful user experience to make it more profitable for businesses.</h1>
          </ContentCard>
        </div>
       
      </div>
    </div>
    </>
    
  );
};

export default Profile;
