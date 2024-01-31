/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button } from "symphony-ui"
import ContentCard from '../ContentCard';
import { BookMark } from '../__Modal__';
import { useAuth } from '../../hooks/useAuth';
import CropperBox from '../CropperBox/index';
import {Box} from '../../Model';
import { useNavigate } from 'react-router-dom';
import { dragEnd, dragOver, dragStart} from '../../help';

interface ProfileProps {
  theme?: string;
}
const Profile: React.FC<ProfileProps> = ({theme}) => {
  const [mode,setMode] = useState<'profile'|'review'>('profile')
  const [showBookMark,setShowBookMark] = useState(false)
  const [avatarUrl,setAvatarUrl] = useState('')
  const [backgroundUrl,setBackgroundUrl] = useState('')
  const authContext = useAuth()
  const [showChangePhoto,setShowChangePhoto] = useState(false)
  const [allowDrag,setAllowDrag] = useState(false)
  const getNewAvatarUrl = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
      setShowChangePhoto(false)
    }
  };
  const getNewBackGroundUrl = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBackgroundUrl(URL.createObjectURL(e.target.files[0]));
      setShowChangePhoto(false)
    }
  };  
  const changePhotoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        changePhotoRef.current &&
        !changePhotoRef.current.contains(event.target as Node)
      ) {
        setShowChangePhoto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [changePhotoRef]);  
  const [draggedItem,setDraggedItem] = useState<any>();  
  const navigate = useNavigate();
  return (
    <>
    <div className={`${theme}-Profile-Container`}>
      <div className={`${theme}-Profile-ProfileSection`}>
        <img className={`${theme}-Profile-Background`} src={authContext.currentUser.resolveBackImageUrl()} />
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
            {/* <div className={`${theme}-Profile-ProfilePicture`}></div> */}
            <img className={`${theme}-Profile-ProfilePicture`} src={authContext.currentUser.resolveImageUrl()} alt="" />
            {mode == 'profile' ?
              <>
                <div onClick={() => {setShowChangePhoto(true)}} className={`${theme}-Profile-GalleryVectorContainer`}>
                  <div className={`${theme}-Profile-GalleryVector ${theme}-Profile-EditGalleryVector`}></div>
                </div>
                {
                  showChangePhoto ?
                    <div ref={changePhotoRef} style={{boxShadow:'2px 2px 8px 0px rgba(114, 142, 171, 0.2)'}} className='bottom-[-80px] w-[215px] max-w-[215px] bg-gray-100 h-[100px] absolute left-0 rounded-[27px]'>
                      <div className='text-gray-700 relative cursor-pointer pt-4 pb-3 text-sm border-b border-white'>
                          Change Profile Picture
                          <input onChange={getNewAvatarUrl} className='w-full cursor-pointer h-full rounded-full absolute z-10 opacity-0 top-0 left-0' type="file" id='profileUploader' accept="image/png, image/jpeg, image/jpg"/>
                        </div>
                      <div className='text-gray-700 relative cursor-pointer pt-4 pb-3 text-sm'>
                        Add Background Picture
                        <input onChange={getNewBackGroundUrl} className='w-full cursor-pointer h-full rounded-full absolute z-10 opacity-0 top-0 left-0' type="file" id='profileUploader' accept="image/png, image/jpeg, image/jpg"/>
                      </div>
                    </div>
                  :
                  undefined
                }
                {/* <div className={`${theme}-Profile-GalleryVectorContainer ${theme}-Profile-GalleryImport`}>
                  <div className={`${theme}-Profile-GalleryVector ${theme}-Profile-ImportGalleryVector`}></div>
                </div> */}
                <div className={`${theme}-Profile-ScanBarcode`}>
                  <div className={`${theme}-Profile-GalleryVector ${theme}-Profile-ScanBarcodeVector`}></div>
                </div>
              </>
            :undefined}
          </div>

          <div>
            <h1 className={`${theme}-Profile-ProfileName`}>{authContext.currentUser.information?.firstName}</h1>
            <p className={`${theme}-Profile-SubTitle`}>{authContext.currentUser.information?.job}</p>
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
              <Button onClick={() => {
                navigate('/presentation')
              }} theme="Carbon">
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
          <ul id="sortable" onDragStart={(e: any) => {
            dragStart(e,allowDrag,setDraggedItem)
          }} onDragEnd={(e:any) => {
            dragEnd(e,allowDrag,setAllowDrag)
          }}
          onDragOver={(e) => {
            dragOver(e,allowDrag,draggedItem)
          }}
          >

            {authContext.currentUser.boxs?.map((item:Box) => {
              return (
                <ContentCard mod={mode} setAllowDrag={setAllowDrag} theme="Carbon" title={item.getTitle()}>
                  {item.resolveRender('Carbon')}
                </ContentCard>              
              )
            })}

          </ul>
        </div>
       
      </div>
      <CropperBox url={avatarUrl} onResolve={(resolve: string | ArrayBuffer | null) => {
        authContext.currentUser.updateImageurl(resolve)
        setAvatarUrl('')
      }}></CropperBox>

      <CropperBox url={backgroundUrl} onResolve={(resolve: string | ArrayBuffer | null) => {
        authContext.currentUser.updateBackgroundurl(resolve)
        setBackgroundUrl('')
      }}></CropperBox>      
      <BookMark theme='Carbon' isOpen={showBookMark} onClose={() => {setShowBookMark(false)}}></BookMark>
    </div>
    </>
    
  );
};

export default Profile;
