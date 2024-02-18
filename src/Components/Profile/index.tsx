/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button } from "symphony-ui"
import ContentCard from '../ContentCard';
import { BookMark } from '../__Modal__';
import { useAuth } from '../../hooks/useAuth';
import CropperBox from '../CropperBox/index';
import {Box, User} from '../../Model';
import { Outlet, useNavigate,useSearchParams } from 'react-router-dom';
// import { dragEnd, dragOver, dragStart, useConstructor} from '../../help';
import ShareContact from '../__Modal__/ShareContact';
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import { useConstructor } from '../../help';
import Share from '../../Api/Share';
import { Spinners } from '..';
import ToturialsBox from '../ToturialsBox';

interface ProfileProps {
  theme?: string;
}
const Profile: React.FC<ProfileProps> = ({theme}) => {
  const resolveMode = () => {
    switch(window.location.hash.replace('#/','').split('/')[0]){
      case '' :return 'profile'
      case 'share' :return 'share'
      case'?review=true' : return 'review'
    }
    return 'profile'
  }
  const [toturialStep,setTotorialStep] = useState(0)
  const [mode,setMode] = useState<'profile'|'review'|'share'>(resolveMode())
  const [isLoading,setIsLoading] = useState(mode == 'share'?true:false)
  const [showBookMark,setShowBookMark] = useState(false)
  const [showShareContact,setShowShareContact] = useState(false)
  const [avatarUrl,setAvatarUrl] = useState('')
  const [backgroundUrl,setBackgroundUrl] = useState('')
  const authContext = useAuth()
  const [showChangePhoto,setShowChangePhoto] = useState(false)
  // const [allowDrag,setAllowDrag] = useState(false)
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
  // const [draggedItem,setDraggedItem] = useState<any>();  
  const navigate = useNavigate();
  const [showToturial,setShowToturial] = useState(false)
  const [searchParams] = useSearchParams();
  useEffect(() => {
    setTimeout(() => {
        const el = document.getElementById('sortable');
        Sortable.create(el,{
          filter: ".ignore-elements"
        });      
    }, 500);
  })
  const [shareUser,setShareUser] = useState(authContext.currentUser)
  useConstructor(() => {
    if(mode == 'share') {
      Share.getShare(searchParams.get('user') as string ,(res,boxs) => {
        const shareUser = new User(res.information)
        setShareUser(shareUser)
        setShowToturial(true)
        setIsLoading(false)
        shareUser.setBox(boxs,{isShare:true})
      })      
    }
  })
  return (
    <>
    {isLoading ?
    <div className='h-dvh flex justify-center items-center'>
      <Spinners theme='Carbon'></Spinners>
    </div>
    :
    <div className={`${theme}-Profile-Container`}>
      <Outlet></Outlet>
      <div className={`${theme}-Profile-ProfileSection`}>
        <img className={`${theme}-Profile-Background`} src={shareUser.resolveBackImageUrl()} />
        <div className={`${theme}-Profile-Content`}>  
          {
            mode == 'profile' ?
              <div className={`${theme}-Profile-BtnContainer`}>
                <Button onClick={() => {
                  setMode('review')
                  }} theme="Carbon-Google" data-mode="profile-review-button">
                  <div className={`${theme}-Profile-PreviewProfileBtnVector`}></div>
                  <div>Preview Profile</div>
                </Button>
                <div className={`${theme}-Profile-ScanBarcode`}>
                  <Button onClick={() => {setShowShareContact(true)}} theme='Carbon-back'>
                    <div className={`${theme}-Profile-GalleryVector ${theme}-Profile-ScanBarcodeVector`}></div>
                  </Button> 
                </div>
              </div>
            :
            <>
              {
                mode == 'review' ?
                <Button onClick={() => {setMode('profile')}} theme='Carbon-back'>
                  <div className={`${theme}-Profile-closeIcon`}></div>
                </Button>
                :
                undefined 
              }
            </>
          }

          <div className={`${theme}-Profile-ProfilePictureSection`}>
            {/* <div className={`${theme}-Profile-ProfilePicture`}></div> */}
            <img className={`${theme}-Profile-ProfilePicture`} src={shareUser.resolveImageUrl()} alt="" />
            {mode == 'profile' ?
              <>
                <div className={`${theme}-Profile-GalleryVectorContainer`}>
                  <Button onClick={() => {setShowChangePhoto(true)}} theme='Carbon-back'>
                    <div className={`${theme}-Profile-GalleryVector ${theme}-Profile-EditGalleryVector`}></div>
                  </Button> 
                </div>
                {
                  showChangePhoto ?
                    <div ref={changePhotoRef} style={{boxShadow:'2px 2px 8px 0px rgba(114, 142, 171, 0.2)'}} className='bottom-[-80px] w-[215px] max-w-[215px] bg-gray-100 h-[100px] absolute left-0 rounded-[27px]'>
                      <div className='text-gray-700 relative cursor-pointer pt-4 pb-3 text-sm border-b border-white'>
                          {shareUser.isHaveProfileImage()} Profile Picture
                          <input onChange={getNewAvatarUrl} className='w-full cursor-pointer h-full rounded-full absolute z-10 opacity-0 top-0 left-0' type="file" id='profileUploader' accept="image/png, image/jpeg, image/jpg"/>
                        </div>
                      <div className='text-gray-700 relative cursor-pointer pt-4 pb-3 text-sm'>
                        {shareUser.isHaveBackImage()} Background Picture
                        <input onChange={getNewBackGroundUrl} className='w-full cursor-pointer h-full rounded-full absolute z-10 opacity-0 top-0 left-0' type="file" id='profileUploader' accept="image/png, image/jpeg, image/jpg"/>
                      </div>
                    </div>
                  :
                  undefined
                }
                {/* <div className={`${theme}-Profile-GalleryVectorContainer ${theme}-Profile-GalleryImport`}>
                  <div className={`${theme}-Profile-GalleryVector ${theme}-Profile-ImportGalleryVector`}></div>
                </div> */}

              </>
            :undefined}
          </div>

          <div>
            <h1 className={`${theme}-Profile-ProfileName`}>{shareUser.information?.firstName}</h1>
            <p className={`${theme}-Profile-SubTitle`}>{shareUser.information?.job}</p>
            <p className={`${theme}-Profile-SubTitle`}>{shareUser.information?.company}</p>
          </div>

          {mode == 'profile' ?
            <Button onClick={() => {
              navigate('/edit')
            }} theme="Carbon">
              <div className={`${theme}-Profile-EditProfileBtnVector`}></div>
              <div>
                Edit Profile
              </div>
            </Button>
          :
            <>
            <div className='flex gap-x-2 items-center w-full '>
              <div className={`${(showToturial && toturialStep == 0) ? 'relative z-50  bg-white p-2 rounded-[20px] ' :''} w-full`}>
                <Button onClick={!showToturial?() => {
                  navigate('/presentation')
                }:() =>{}} theme="Carbon">
                  <div className={`${theme}-Profile-StartPresentionBtnVector`}></div>
                  <div>
                    Start Presentation
                  </div>
                </Button>   
                {(showToturial && toturialStep == 0) ?
                 <ToturialsBox theme='Carbon' position='top' skip={() => {
                  setShowToturial(false)
                 }} next={() => setTotorialStep(1)} title='Presentation' content='By choosing this button, you can view the resume and ask your questions.'></ToturialsBox>
                :undefined}
              </div>
              <div className={`${(showToturial && toturialStep == 2) ? 'relative z-50  bg-white p-2 rounded-full ' :''}`}>
                <Button onClick={() => {setShowBookMark(true)}} data-mode="calendar" theme='Carbon-back'>
                  <div className={`${theme}-Profile-CalenderBtnVector`}></div>
                </Button>   
                {(showToturial && toturialStep == 2) ?
                 <ToturialsBox theme='Carbon' left='-240' position='top' skip={() => {
                  setShowToturial(false)
                 }} next={() => setTotorialStep(3)} title='Book a Meeting' content='By choosing this button, you can easily set an appointment.'></ToturialsBox>
                :undefined}                            
              </div>
            </div>
            </>
          }
          {mode == 'review' || mode == 'share' ?
            <div className='flex justify-between items-center w-full gap-x-4'>
              <div className={`${(showToturial && toturialStep == 3) ? 'relative z-50  bg-white p-2 rounded-[20px] ' :''} w-full`}>
                <div className='borderBox-Gray boxShadow-Gray h-11 flex justify-center items-center rounded-[27px] text-gray-700 text-sm font-semibold  w-full'>Save Contact</div>
                {(showToturial && toturialStep == 3) ?
                 <ToturialsBox theme='Carbon' left='32' position='top' skip={() => {
                  setShowToturial(false)
                 }} next={() => setTotorialStep(4)} title='Save Contact' content='You can save the contact information on your device by selecting the Button.'></ToturialsBox>
                :undefined}                 
              </div>
                <div className={`${(showToturial && toturialStep == 4) ? 'relative z-50  bg-white p-2 rounded-[20px] ' :''} w-full`}>
                  <div className='borderBox-Gray boxShadow-Gray h-11 flex justify-center items-center rounded-[27px] text-gray-700 text-sm font-semibold  w-full'>Exchange Contact</div>
                  {(showToturial && toturialStep == 4) ?
                  <ToturialsBox theme='Carbon' left='-80' isLast position='top' skip={() => {
                    setShowToturial(false)
                  }} next={() => setTotorialStep(4)} title='Exchange Contact' content='You can exchange your contact information by selecting the Button.'></ToturialsBox>
                  :undefined}                   
                </div>
            </div>
          :undefined}
          <ul style={{width:'100%'}} id="sortable"
          // onDragStart={(e: any) => {
          //   dragStart(e,allowDrag,setDraggedItem)
          // }} onDragEnd={(e:any) => {
          //   dragEnd(e,allowDrag,setAllowDrag)
          // }}
          // onDragOver={(e) => {
          //   dragOver(e,allowDrag,draggedItem)
          // }}
          >

            {shareUser.boxs?.map((item:Box) => {
              return (
                <ContentCard item={item} mod={mode} theme="Carbon" >
                </ContentCard>              
              )
            })}

          </ul>
        </div>
      </div>
      {mode == 'review' || mode == 'share' ?
        <div className=''>
          <Button onClick={() => {
            window.open('https://ar-card-eight.vercel.app/#detect1')
          }} data-mode={(showToturial && toturialStep == 1)?"toturials":''} theme='Carbon-Ar'>
            <div>
              <div className={`${theme}-Ar-Button-icon`}></div>
              <div className={`${theme}-Ar-Button-icon-text`}>AR</div>
            </div>
          </Button>
          {(showToturial && toturialStep == 1) ?
            <ToturialsBox theme='Carbon' position='bottom' skip={() => {
            setShowToturial(false)
            }} next={() => setTotorialStep(2)} title='AR' content='By choosing this button, you can use the AR display feature.'></ToturialsBox>
          :undefined}          
        </div>
      :undefined}
      <CropperBox url={avatarUrl} onResolve={(resolve: string | ArrayBuffer | null) => {
        shareUser.updateImageurl(resolve)
        setAvatarUrl('')
      }}></CropperBox>

      <CropperBox url={backgroundUrl} onResolve={(resolve: string | ArrayBuffer | null) => {
        shareUser.updateBackgroundurl(resolve)
        setBackgroundUrl('')
      }}></CropperBox>      
      <BookMark theme='Carbon' isOpen={showBookMark} onClose={() => {setShowBookMark(false)}}></BookMark>
      <ShareContact theme='Carbon' isOpen={showShareContact} onClose={() => {setShowShareContact(false)}}></ShareContact>
      {showToturial ?
        <div className='bg-slate-950/80 w-full h-dvh z-40 absolute top-0'></div>
      :undefined}
    </div>
    }
    </>
    
  );
};

export default Profile;
