/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button } from "symphony-ui";
import { boxProvider, useConstructor } from "../../help";
import { Box, User } from "../../Model";
import Share from "../../Api/Share";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Auth } from "../../Api";
import { useAuth } from "../../hooks/useAuth";
import ContentCard from "../ContentCard";
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import { publish } from "../../utils/event";
import ShareContact from "../__Modal__/ShareContact";

interface ProfileProps {
  theme?: string;
}
const Profile2: React.FC<ProfileProps> = ({ theme }) => {
  const resolveMode = () => {
    switch(window.location.hash.replace('#/','').split('/')[0]){
      case '' :return 'profile'
      case 'share' :return 'share'
      case'?review=true' : return 'review'
    }
    return 'profile'
  }  
  const [mode,setMode] = useState<'profile'|'review'|'share'>(resolveMode())
  const [searchParams] = useSearchParams();
  const authContext = useAuth()
  const [shareUser,setShareUser] = useState(authContext.currentUser)
  const [,setIsLoading] = useState(mode == 'share'?true:false)
  const navigate = useNavigate();
  const [showShareContact,setShowShareContact] = useState(false)
  useConstructor(() => {
    if(mode == 'share') {
      const resolveSocial: Array<Box> = [];
      Share.getShareData('/presentation_info/user='+searchParams.get('user'),(data) => {
            data.boxs.map((item:any) => {
                const newBox = boxProvider(item);
                resolveSocial.push(newBox);
            })
            const information = {
                firstName:data.information.first_name,
                lastName:data.information.last_name,
                phone:data.information.mobile_number,
                personlEmail:data.information.email,
                company:data.information.company_name,
                job:data.information.job_title,
                banelImage:data.information.back_ground_pic,
                imageurl:data.information.profile_pic,
                location:{
                    lat:33,
                    lng:33
                },
                workEmail:data.information.work_email,
                workPhone:data.information.work_mobile_number,
                userId:data.information.created_userid
            }
            const shareUser = new User(information)
            setShareUser(shareUser) 
            if(localStorage.getItem("showTotorial"+searchParams.get('user'))){
              // setShowToturial(false)
            }else{
              // setShowToturial(true)
              localStorage.setItem("showTotorial"+searchParams.get('user'),'true')
            }                       
            shareUser.setBox(resolveSocial,{isShare:true})
            console.log(searchParams.get('viewBy'))
            if(searchParams.get('viewBy')){
              Auth.addEvent({
                userid:shareUser.information?.userId as string,
                event_type:'page_view',
                sub_event_category:searchParams.get('viewBy') as any
              })   
            }else{
              Auth.addEvent({
                userid:shareUser.information?.userId as string,
                event_type:'page_view',
                sub_event_category:'view_link'
              })            
            }
            setIsLoading(false)
      })
    }
  })  
  useEffect(() => {
    setTimeout(() => {
        const el = document.getElementById('sortable');
        Sortable.create(el,{
          animation: 150,
          filter: ".ignore-elements"
        });      
    }, 500);
  })  
  return (
    <>
      <div className={`${theme}-Profile-Container`}>
        <div className={`${theme}-Profile-ProfileSection`}>
          <div className="relative flex flex-col gap-3 justify-center items-center mt-11 px-4">
            {mode == 'profile' ?
              <div className=" w-48 h-[40px] ">
                <Button onClick={() => {
                  setMode('review')
                  publish('profileIsReview',{})
                  window.history.replaceState(null, "", "/#/?review=true")                
                }} theme="Carbon-Google" data-mode="profile-review-button">
                  <div className={`${theme}-Profile-PreviewProfileBtnVector`} ></div>
                  <div>Preview Profile</div>
                </Button>
              </div>
            :
                <>
                  {mode == 'review' ?
                    <Button onClick={() => {
                      setMode('profile')
                      publish('profileIsProfile',{})
                      window.history.replaceState(null, "", "/#/")
                      }} theme='Carbon-back'>
                      <div className={`${theme}-Profile-closeIcon`}></div>
                    </Button>                  
                  :undefined}
                </>
            }

            <div className="w-full h-[398px] bg-[#E2E8F0] rounded-3xl pb-4 gap-4 flex flex-col overflow-hidden">
              <div className="h-[261px] relative overflow-y-hidden">
                <video id="dragAbleAi" playsInline width={'100%'} className="pk_video" preload="auto"  autoPlay={true} loop muted >
                    <source id="videoPlayer"  src={shareUser.information?.silent_video_avatar} type="video/mp4"></source>
                </video>           
                <div className="w-full h-8 absolute bg-black opacity-[32%] bottom-0 flex items-center justify-between px-5">
                  <div className={`${theme}-Profile-VolumeHighVector`}></div>
                  <div
                    className={`${theme}-Profile-LanguageSquareVector`}
                  ></div>
                </div>
              </div>
              {/* <div
                className="relative w-full h-[261px] rounded-t-3xl boxShadow-Gray bg-no-repeat bg-center"
                style={{ backgroundImage: 'url("./Carbon/women.jpg")' }}
              >
                <div className="w-full h-8 absolute bg-black opacity-[32%] bottom-0 flex items-center justify-between px-5">
                  <div className={`${theme}-Profile-VolumeHighVector`}></div>
                  <div
                    className={`${theme}-Profile-LanguageSquareVector`}
                  ></div>
                </div>
              </div> */}
              <div>
                <h1 className={`${theme}-Profile-ProfileName`}>{shareUser.information?.firstName+' '+shareUser.information?.lastName}</h1>
                <p className={`${theme}-Profile-SubTitle`}>
                  {shareUser.information?.job} @ {shareUser.information?.company}
                </p>
              </div>
              <div className="flex justify-evenly gap-4 ">
                <Button onClick={() => {
                  navigate('/edit')
                }} theme="Carbon-Google" data-mode="profile-review-button">
                  <div
                    className={`${theme}-Profile-EditProfileBtnVector2`}
                  ></div>
                  <div>Edit Profile</div>
                </Button>
                <Button onClick={() => {setShowShareContact(true)}} theme="Carbon-Google" data-mode="profile-review-button">
                  Share profile
                </Button>
              </div>
            </div>
{/* 
            <Button  theme="Carbon-Show">
              Show more              
            </Button>  */}
          </div>
          <div className={`${theme}-Profile-Content mt-4`}>
            <ul style={{width:'100%'}} id="sortable">

              {shareUser.boxs?.map((item:Box) => {
                return (
                  <ContentCard userId={shareUser.information?.userId as string} item={item} mod={mode} theme="Carbon" >
                  </ContentCard>              
                )
              })}

            </ul>        
          </div> 
        </div>
        <ShareContact theme='Carbon' isOpen={showShareContact} onClose={() => {setShowShareContact(false)}}></ShareContact>
      </div>
    </>
  );
};

export default Profile2;
