/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button } from "symphony-ui";
import { boxProvider, useConstructor } from "../../help";
import { Box, User } from "../../Model";
import Share from "../../Api/Share";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Auth } from "../../Api";
import { useAuth } from "../../hooks/useAuth";
import ContentCard from "../ContentCard";
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import { publish } from "../../utils/event";
import ShareContact from "../__Modal__/ShareContact";
import Spinners from "../Spinner";
import ToggleButton2 from "../ToggleButton2";
import Presentition2 from "../Presentition2";

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
  const [panel,setPanel] = useState<'Profile'|'Chat'>('Profile')
  const [searchParams] = useSearchParams();
  const authContext = useAuth()
  const [shareUser,setShareUser] = useState(authContext.currentUser)
  const [isLoading,setIsLoading] = useState(mode == 'share'?true:false)
  const navigate = useNavigate();
  const [showShareContact,setShowShareContact] = useState(false)
  const [scrolled,setScrolled] = useState(false)
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
                userId:data.information.created_userid,
                silent_video_avatar:data.information.silent_video_url,
                talking_video_avatar:data.information.talking_video_avatar
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
    {isLoading ?
    <div className='h-dvh flex justify-center items-center'>
      <Spinners theme='Carbon'></Spinners>
    </div>
    :
      <div className="w-full h-svh relative flex justify-start text-gray-700 text-center flex-col">
        <Outlet></Outlet>

        <div className={`flex flex-col gap-3 justify-center items-center ${mode =='profile' ? 'mt-11':'mt-3'} px-4 sticky`}>
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
          {
            scrolled?
            <>
              <div className="w-full pb-4 bg-white">
                <div className="w-full bg-[#E2E8F0] h-[148px] rounded-[16px] flex items-center justify-start">
                  <div className="ml-2">
                    <img className="w-[129px] border-[8px] border-white h-[129px] rounded-full object-cover object-[50% 50%]" src={shareUser.information?.imageurl} alt="" />
                  </div>
                  <div className="ml-3">
                    <h1 className={`${theme}-Profile-ProfileName`}>{shareUser.information?.firstName+' '+shareUser.information?.lastName}</h1>
                    <p className={`${theme}-Profile-SubTitle`}>
                      {shareUser.information?.job} @ {shareUser.information?.company}
                    </p>                    
                  </div>
                </div>
                {mode == 'profile' ?
                  <div className="flex justify-evenly mt-4 gap-4 ">
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
                :
                  <>
                    <div className="flex items-center mt-4 justify-between px-8">
                      <div className="w-[65%] flex items-center">
                        <ToggleButton2 value={panel}  leftText="Profile" rightText="Chat" onButtonClick={(el) => {
                          setPanel(el as any)
                        }} theme="Carbon"></ToggleButton2>
                      </div>
                      <div className={`${theme}-Profile-Box`}>
                        <Button onClick={() => {
                          window.open('https://ar.avatalk.me/#detect4/?user='+shareUser.information?.userId+'&view='+mode)
                        }} theme='Carbon-back'>
                          <div className={`${theme}-Profile-BoxVector`}></div>
                        </Button> 
                      </div>
                    </div>
                  </>
                }                
              </div>
            </>
            :
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
              {mode == 'profile' ?
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
                    <div
                      className={`${theme}-Profile-EditProfileBtnVector3`}
                    ></div>     
                    <div>
                      Share profile
                    </div>               
                  </Button>
                </div>
              :
              <>
                <div className="flex items-center justify-between px-8">
                  <div className="w-[65%] flex items-center">
                    <ToggleButton2 value={panel}  leftText="Profile" rightText="Chat" onButtonClick={(el) => {
                      setPanel(el as any)
                    }} theme="Carbon"></ToggleButton2>
                  </div>
                  <div className={`${theme}-Profile-Box`}>
                    <Button onClick={() => {
                      window.open('https://ar.avatalk.me/#detect4/?user='+shareUser.information?.userId+'&view='+mode)
                    }} theme='Carbon-back'>
                      <div className={`${theme}-Profile-BoxVector`}></div>
                    </Button> 
                  </div>
                </div>
              </>
              }
            </div>

          }
{/* 
          <Button  theme="Carbon-Show">
            Show more              
          </Button>  */}
        </div>
        {panel == 'Profile' || mode=='profile' ?
          <div id="scrollBoxProfile" onScroll={(event:any) => {
            if(event.nativeEvent.srcElement.scrollTop >= 100) {
              setScrolled(true)
            }else if(event.nativeEvent.srcElement.scrollTop == 0){
              setScrolled(false)
            }        
          }} className={`${theme}-Profile-ProfileSection`}>
            <div className={`${theme}-Profile-Content mt-4`}>
              {shareUser.boxs && shareUser.boxs.length > 0 ? (
                <ul style={{ width: '100%' }} id="sortable">
                  {shareUser.boxs.map((item: Box) => {
                    return (
                      <ContentCard userId={shareUser.information?.userId as string} item={item} mod={mode} theme="Carbon">
                      </ContentCard>
                    )
                  })}
                </ul>
              ) : (
                <>
                  <img src="/Carbon/Not-Found.svg" alt="Not Found" className="w-[97px] h-[96px]" />
                  <p className="text-sm	">You haven't added any info yet.</p>
                </>
              )}
            </div>
            {mode != 'profile' ?
            <>
              <div className="flex px-5 py-6 flex-row gap-6 justify-between items-center text-xs w-full	">
                <img className="w-20 h-8" src="/Carbon/splashImage.svg" alt="logo" />
                <p>Pricing</p>
                <p>FAQ</p>
                <p>Legals</p>
                <div className="flex gap-3">
                  <img className="w-4 h-4 cursor-pointer" src="/Carbon/Linkedinicon.svg" alt="Linkedin" />
                  <img className="w-4 h-4 cursor-pointer" src="/Carbon/instagramicon.svg" alt="instagram" />
                  <img className="w-4 h-4 cursor-pointer" src="/Carbon/facebookicon.svg" alt="facebook" />


                </div>

              </div>
              <div className=" bg-[#E2E8F0] sticky bottom-0 px-5 pt-3 pb-6 rounded-t-2xl">
                <div className="flex justify-evenly gap-4 ">
                  <Button disabled  theme="Carbon-Google">Exchange Contact</Button>
                  <Button onClick={() => {
                      const contact = {
                        name: shareUser.information?.lastName as string,
                        phone: shareUser.information?.phone as string,
                        email: shareUser.information?.personlEmail as string };

                      // create a vcard file
                      const vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:" + contact.name + "\nTEL;TYPE=work,voice:" + contact.phone + "\nEMAIL:" + contact.email + "\nEND:VCARD";
                      const blob = new Blob([vcard], { type: "text/vcard" });
                      const url = URL.createObjectURL(blob);

                      const newLink = document.createElement('a');
                      newLink.download = contact.name + ".vcf";
                      newLink.textContent = contact.name;
                      newLink.href = url;
                      Auth.addEvent({
                        event_type:'add_contact',
                        sub_event_category:'share_link',
                        userid:shareUser.information?.userId as string
                      })
                      newLink.click();                  
                }} theme="Carbon">Save Contact</Button>
                </div>
              </div>
            </>
            :undefined}
          </div>
        :
          <Presentition2></Presentition2>
        }

        <ShareContact theme='Carbon' isOpen={showShareContact} onClose={() => {setShowShareContact(false)}}></ShareContact>
      </div>
    }    
    </>
  );
};

export default Profile2;
