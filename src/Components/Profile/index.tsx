import React, { useState } from 'react';
import { Button } from "symphony-ui"
import ContentCard from '../ContentCard';
import { BookMark } from '../__Modal__';

interface ProfileProps {
  theme?: string;
}
const Profile: React.FC<ProfileProps> = ({theme}) => {
  const [mode,setMode] = useState<'profile'|'review'>('profile')
  const [showBookMark,setShowBookMark] = useState(false)
  return (
    <>
    <div className={`${theme}-Profile-Container`}>
      <div className={`${theme}-Profile-ProfileSection`}>
        <div className={`${theme}-Profile-Background`}></div>
        <div className={`${theme}-Profile-Content`}>  
          {
            mode == 'profile' ?
              <div className={`${theme}-Profile-BtnContainer`}>
                <Button onClick={() => {setMode('review')}} theme="Carbon-Google" data-mode="profile-review-button">
                    <div className={`${theme}-Profile-PreviewProfileBtnVector`}></div>
                    <div>Preview Profile</div>
                </Button>
              </div>
            :
            <Button onClick={() => {setMode('profile')}} theme='Carbon-back'>
              <div className={`${theme}-Profile-closeIcon`}></div>
            </Button>
          }

          <div className={`${theme}-Profile-ProfilePictureSection`}>
            <div className={`${theme}-Profile-ProfilePicture`}></div>
            {mode == 'profile' ?
              <>
                <div className={`${theme}-Profile-GalleryVectorContainer`}>
                  <div className={`${theme}-Profile-GalleryVector ${theme}-Profile-EditGalleryVector`}></div>
                </div>
                <div className={`${theme}-Profile-GalleryVectorContainer ${theme}-Profile-GalleryImport`}>
                  <div className={`${theme}-Profile-GalleryVector ${theme}-Profile-ImportGalleryVector`}></div>
                </div>
                <div className={`${theme}-Profile-GalleryVectorContainer ${theme}-Profile-ScanBarcode`}>
                  <div className={`${theme}-Profile-GalleryVector ${theme}-Profile-ScanBarcodeVector`}></div>
                </div>
              </>
            :undefined}
          </div>

          <div>
            <h1 className={`${theme}-Profile-ProfileName`}>Farzin Azami</h1>
            <p className={`${theme}-Profile-SubTitle`}>CoFounder & CEO</p>
          </div>

          {mode == 'profile' ?
            <Button theme="Carbon">
              <div className={`${theme}-Profile-EditProfileBtnVector`}></div>
              <div>
                Edit Profile
              </div>
            </Button>
          :
            <>
            <div className='flex gap-x-2 items-center w-full'>
              <Button theme="Carbon">
                <div className={`${theme}-Profile-StartPresentionBtnVector`}></div>
                <div>
                  Start Presentation
                </div>
              </Button>     
              <Button onClick={() => {setShowBookMark(true)}} data-mode="calendar" theme='Carbon-back'>
                <div className={`${theme}-Profile-CalenderBtnVector`}></div>
              </Button>       
            </div>
            </>
          }

          <ContentCard mod={mode} theme="Carbon" title="Social">
            <div className={`${theme}-Profile-Vectors`}>
              <div className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector ${theme}-Profile-InstagramVector`}></div>
              </div>
              <div className={`${theme}-Profile-BackgroundVectors`}>
                <div className={`${theme}-ContentCard-CardVector ${theme}-Profile-LinkedinVector`}></div>
              </div>
            </div>
          </ContentCard>
          <ContentCard mod={mode} theme="Carbon" title="Links">
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
          <ContentCard mod={mode} theme="Carbon" title="About me">
            <h1>Creating has always been fascinating to me and I have found it in design. As a designer, I am always trying to create or improve a more useful and purposeful user experience to make it more profitable for businesses.</h1>
          </ContentCard>
        </div>
       
      </div>

      <BookMark theme='Carbon' isOpen={showBookMark} onClose={() => {setShowBookMark(false)}}></BookMark>
    </div>
    </>
    
  );
};

export default Profile;
