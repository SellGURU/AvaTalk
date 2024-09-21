/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Button } from "symphony-ui";
import { boxProvider, useConstructor } from "../../help";
import { Box, User } from "../../Model";
import Share from "../../Api/Share";
import { Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Auth, Contacts } from "../../Api";
import { useAuth } from "../../hooks/useAuth";
import ContentCard from "../ContentCard";
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import { publish } from "../../utils/event";
import ShareContact from "../__Modal__/ShareContact";
import Spinners from "../Spinner";
import ToggleButton2 from "../ToggleButton2";
import Presentition2 from "../Presentition2";
import AudioProvider from "../AudioProvider";
import { chat } from "../../Types";
import { ExchangeContact } from "../__Modal__";
import { toast } from "react-toastify";
import ShowUser from "../__Modal__/ShowUser";
import useModalAutoClose from "../../hooks/useModalAutoClose";
import Notification from "../Notification";
import { Notification as NotificationApi } from "../../Api"

interface ProfileProps {
  theme?: string;
}
const Profile2: React.FC<ProfileProps> = ({ theme }) => {
  const resolveMode = () => {
    switch(window.location.hash.replace('#/','').split('/')[0]){
      case '' :return 'profile'
      case 'share' :return 'share'
      case 'A' :return 'share'
      case'?review=true' : return 'review'
    }
    return 'profile'
  }  
  const isEditPage = () => {
    if(window.location.hash.includes('edit')){
      return true 
    }else{
      return false
    }
  }
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [VideoUrl, setVideoUrl] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement>(null)
  const ShowProfileRef =useRef<HTMLDivElement>(null)
  const [isShowProfileOpen,setShowIsProfileOpen] = useState(false)
  const [prisentMode,setPrisentMode] = useState('audio')
  const notificationRefrence =useRef<HTMLDivElement>(null)
  const [isHaveNewNotif,setIsHaveNewNotif] = useState(false)
  useModalAutoClose({
    refrence:ShowProfileRef,
    close:() => {
      setShowIsProfileOpen(false)
    }
  })     
  useModalAutoClose({
    refrence:notificationRefrence,
    close:() => {
      setShowNotification(false)
    }
  })    
  const resolveunRead= (data:any) => {
      let unreadCount = 0;
      for (const day in data) {
          unreadCount += data[day].filter((notification:any) => !notification.isRead).length;
      }
      return unreadCount;
  }     
  const [showExchangeContact,setShowExchangeContact] = useState(false)
  const [mode,setMode] = useState<'profile'|'review'|'share'>(resolveMode())
  const [,setShowMuiteController] = useState(false)
  const [panel,setPanel] = useState<'Profile'|'Chat'>('Profile')
  const [searchParams] = useSearchParams();
  const {id} = useParams();  
  const authContext = useAuth()
  const [shareUser,setShareUser] = useState(authContext.currentUser)
  const [isLoading,setIsLoading] = useState(mode == 'share'?true:false)
  const navigate = useNavigate();
  const [showShareContact,setShowShareContact] = useState(false)
  const [scrolled,setScrolled] = useState(false)
  const [isFirstScrol,setIsFirstScrol] = useState(false);
  const [isTalking,setIsTalking] = useState(false)
  const [startVideoTalk,setStartVideoTalk] = useState(false);
  const [chats,setChats] = useState<Array<chat>>([
  ])      
  // useEffect(() => {
  //   if(isTalking){
  //     if(videoRef2.current){
  //         // videoRef2.current.currentTime = 10
  //         const refren = videoRef2.current  as any   
  //         // setShowOpacity(true)
  //         refren.load()
  //         // refren.currentTime = 20 
  //     }             
  //     if(prisentMode == 'video'){
  //       const video:HTMLVideoElement = document.getElementById('dragAbleAi2') as  HTMLVideoElement
  //       video?.load()
  //     }
  //   }else {
  //     if(prisentMode == 'video'){
  //       const video:HTMLVideoElement = document.getElementById('dragAbleAi2') as  HTMLVideoElement
  //       video?.load()
  //     }
  //   }
  // },[isTalking])
  // useEffect(() => {
  //   NotificationApi.checkNotifManager(() => {
  //     getNotifs()
  //   })
  // })
  const checkNotif = () => {
    if(mode != 'share'){
      NotificationApi.checkNotification().then((res) => {
          if(res.data["New notification"] == true) {
            getNotifs(true)
          }
      })
    }
  }
  useEffect(() => {
    const nots = localStorage.getItem("notifs")
    if(nots){
      setNotify(JSON.parse(nots))
    }else{
      getNotifs()
    }
    const interval = setInterval(checkNotif, 15000);     
    return () => clearInterval(interval);
  },[])
  useEffect(() => {
    if(isTalking ){
      if(videoRef2.current){
          const refren = videoRef2.current  as any   
          // setShowOpacity(true)
          refren.load()
      }         
      if(prisentMode == 'video'){
        const video:HTMLVideoElement = document.getElementById('dragAbleAi2') as  HTMLVideoElement
        video?.play()
      }    
    }else {
      if(prisentMode == 'video'){
        const video:HTMLVideoElement = document.getElementById('dragAbleAi2') as  HTMLVideoElement
        video?.load()
      }
    }
  })  
  useEffect(() => {
    if(authContext.needReload){
      window.location.reload()
    }
  })
  // const [,forceUpdate] = useReducer(x => x+1,0)
  // const [loadPage,setLaodPage] = useState(false)
  // useEffect(() =>{
  //   if(shareUser.boxs.length == 0 && !loadPage){
  //     publish("refreshPage",{})
  //     forceUpdate()
  //     setLaodPage(true)
  //   }
  // })
  const [showNotification,setShowNotification] = useState(false)
  const [notifs,setNotify]= useState<Array<any>>([])
  useEffect(() => {
    localStorage.setItem("notifs",JSON.stringify(notifs))
  },[notifs])
  const getNotifs = (isNew?:boolean) => {
    if(mode != 'share'){
      NotificationApi.getAll((data) => {
          setNotify(data)
          localStorage.setItem("notifs",JSON.stringify(data))
          if(isNew){
            setIsHaveNewNotif(true)
            publish("playNotifSound",{})
          }
          // setIsHaveNewNotif(true)
      })    
    }
  }
  useConstructor(() => {
    // getNotifs()
    if(id){
      const resolveSocial: Array<Box> = [];
      Share.getShareData('/presentation_info/user='+id,(data) => {
            if(data.error){
              navigate('/login?nfc_id='+id)
                // window.open(window.location.hostname+'/#/login?nfc_id='+searchParams.get('user'))    
            }
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
                talk_video_avater:data.information.talking_video_avatar
            }
            const shareUser = new User(information)
            setShareUser(shareUser) 
            if(localStorage.getItem("showTotorial"+id)){
              // setShowToturial(false)
            }else{
              // setShowToturial(true)
              localStorage.setItem("showTotorial"+id,'true')
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
    }else if(mode == 'share') {
      // alert(mode)
      const resolveSocial: Array<Box> = [];
      Share.getShareData('/presentation_info/user='+searchParams.get('user'),(data) => {
            if(data.error){
              navigate('/login?nfc_id='+searchParams.get('user'))
                // window.open(window.location.hostname+'/#/login?nfc_id='+searchParams.get('user'))    
            }
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
                talk_video_avater:data.information.talking_video_avatar
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
      if(videoRef2.current && prisentMode== 'Video'){
            const video:HTMLVideoElement = document.getElementById('dragAbleAi2') as  HTMLVideoElement
            video?.play()
          const refren = videoRef2.current  as any   
          // setShowOpacity(true)
          refren.load()
      }        
  },[isTalking])      
  useEffect(() => {
    if(audioRef.current){
        const refren = audioRef.current  as any   
        refren.load()
    }           
  },[isTalking])  
  const [isMuted,setISMuted] = useState(false)
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
        {showNotification &&
          <div ref={notificationRefrence}>
            <Notification setNotifs={setNotify} notifs={notifs}></Notification>   

          </div>
        }
        <div className={`flex flex-col gap-3 justify-center items-center ${mode =='profile' ? 'mt-11':'mt-3'} sticky`}>
          {/* {mode == 'profile' ?
            <div className=" w-48 h-[40px] sticky z-20">
              <Button onClick={() => {
                setMode('review')
                publish('profileIsReview',{})
                window.history.replaceState(null, "", "/#/?review=true")                
              }} theme="Carbon-Google" data-mode="profile-review-button">
                <div className={`${theme}-Profile-PreviewProfileBtnVector ${theme}-Footer-Vectors`} ></div>
                <div className="text-[#8290a3]">Preview Profile</div>
              </Button>
            </div>
          :
              <>
                {mode == 'review' ?
                  <Button onClick={() => {
                    setMode('profile')
                    publish('profileIsProfile',{})
                    window.history.replaceState(null, "", "/#/")
                    }} theme='Carbon-back' style={{position:'sticky',zIndex:20}}>
                    <div className={`${theme}-Profile-closeIcon`}></div>
                  </Button>                  
                :<>
                  <Button onClick={() => {
                    setMode('profile')
                    publish('profileIsProfile',{})
                    window.history.replaceState(null, "", "/#/")
                    }} theme='Carbon-back' style={{position:'sticky',zIndex:20,visibility:'hidden'}}>
                    <div className={`${theme}-Profile-closeIcon`}></div>
                  </Button>                  
                </>}
              </>
          } */}
          {/* {!scrolled && */}
          {
            mode == 'profile' &&
              <div className="absolute top-4 left-6 z-20">
                <Button onClick={() => {
                  setShowNotification(true)
                  setIsHaveNewNotif(false)
                }} theme="Carbon-Google" data-mode="profile-review-button-2">
                  <div className={`${theme}-Profile-notificationVector ${theme}-Footer-Vectors m-0`} ></div>
                  {isHaveNewNotif &&
                    <div className="absolute animate-pulse flex justify-center items-center w-[12px] h-[12px] bg-primary-color top-[8px] rounded-full right-[10px]">
                      <div className="text-white text-[8px]">{resolveunRead(notifs)}</div>                      
                    </div>
                  }
                  {!isHaveNewNotif &&resolveunRead(notifs) > 0 &&
                    <div className="absolute flex justify-center items-center w-[12px] h-[12px] bg-primary-color top-[8px] rounded-full right-[10px]">
                      <div className="text-white text-[8px]">{resolveunRead(notifs)}</div>
                    </div>
                  }
                </Button>  
                        
              </div>          

          }
          {/* } */}
          {
            mode == 'profile' ?
            <>
              <div className="absolute top-4 right-6 z-20">
              <Button onClick={() => {
                setMode('review')
                publish('profileIsReview',{})
                window.history.replaceState(null, "", "/#/?review=true")                
              }} theme="Carbon-Google" data-mode="profile-review-button-2">
                <div className={`${theme}-Profile-PreviewProfileBtnVector ${theme}-Footer-Vectors m-0`} ></div>
              </Button>                
              </div>
            </>
            :
            <>
              {mode == "review"?
              <div className="absolute top-4 right-6 z-20">
              <Button onClick={() => {
                  setMode('profile')
                  publish('profileIsProfile',{})
                  window.history.replaceState(null, "", "/#/")             
              }} theme="Carbon-Google" data-mode="profile-review-button-2">
                <div className={`${theme}-Profile-closeIcon ${theme}-Footer-Vectors m-0`} ></div>
              </Button>                
              </div>            
              :
              <></>
              }
            </>
          }
          {
            mode != 'profile' ?
            <>
              {
                isMuted?
                  <div className="absolute top-16 right-6 z-20">
                    <Button onClick={() => {
                      const video:HTMLVideoElement = document.getElementById('dragAbleAi2') as  HTMLVideoElement
                      video?.pause()         
                      setIsTalking(false)            
                      setISMuted(false)
                    }} theme="Carbon-Google" data-mode="profile-review-button-2">
                      <div className={`${theme}-Profile-mutedVector`} ></div>
                    </Button>                
                  </div>       
                :
                  <div className="absolute top-16 right-6 z-20">
                    <Button onClick={() => {
                      const video:HTMLVideoElement = document.getElementById('dragAbleAi2') as  HTMLVideoElement
                      video?.pause()    
                      setIsTalking(false)                    
                      setISMuted(true)
                    }} theme="Carbon-Google" data-mode="profile-review-button-2">
                      <div className={`${theme}-Profile-VolumeHighVector`} ></div>
                    </Button>                
                  </div>  
              }
            </>
            :
            undefined
          }
                {/* {
                showMuiteController?
                  <div>
                  {isMuted  ?
                    <div onClick={() => {
                      setISMuted(false)
                  }} className={`${theme}-Profile-mutedVector`}></div>
                  :
                    <div onClick={() => {{isTalking &&
                      setISMuted(true)
                    }
                      setIsTalking(false)
                    }} className={`${theme}-Profile-VolumeHighVector`}></div>
                  }
                  </div>
                :undefined
                }     */}
            <div className={`w-full mt-[-320px] invisible py-4 px-4 pb-0 -mb-2  ${scrolled?'profileAimation3': isFirstScrol?'profileAimation3-backward':''} `}>
              <div className="w-full bg-[#E2E8F0] h-[148px] -mt-[16px] rounded-[16px] flex items-center justify-start boxShadow-Gray">
                <div className="ml-2 min-w-[129px]">
                  <img className="w-[129px] border-[8px] boxShadow-Gray border-white h-[129px] rounded-full object-cover object-[50% 50%]" src={shareUser.information?.imageurl} alt="" />
                </div>
                <div className="ml-3 max-w-[320px] overflow-hidden">
                  <h1 className={`${theme}-Profile-ProfileName`}>{shareUser.information?.firstName.substring(0,10)+' '+shareUser.information?.lastName.substring(0,10)}</h1>
                  <p className={`${theme}-Profile-SubTitle`}>
                    {shareUser.information?.job} {shareUser.information?.job && shareUser.information?.company ? "@" : ""} {shareUser.information?.company}
                  </p>                    
                </div>
              </div>
              {mode == 'profile' ?
                <div className="flex justify-evenly mt-4 gap-4 ">
                  <Button onClick={() => {
                    navigate('/edit')
                  }} theme="Carbon-Google" data-mode="profile-edit-button">
                    <div
                      className={`${theme}-Profile-EditProfileBtnVector2 ${theme}-Footer-Vectors2`}
                    ></div>
                    <div  className={`${theme}-text-layer1`}>Edit Profile</div>
                  </Button>
                  <Button onClick={() => {setShowShareContact(true)}} theme="Carbon-Google" data-mode="profile-edit-button">
                    <div
                      className={`${theme}-Profile-EditProfileBtnVector3 ${theme}-Footer-Vectors2
                      `}
                      style={{width:'1.25rem'}}
                    ></div>  
                    <span className={`${theme}-text-layer1`}>
                    Share Profile
                      </span>   
                  </Button>
                </div>
              :
                <>
                  <div className={`flex items-center mt-4  justify-around ${window.innerWidth>=500?'px-0':'px-2'}`}>
                    <div className="w-[75%] max-w-[85%] flex items-center justify-between">
                      <ToggleButton2 value={panel}  leftText="Profile" rightText="Chat" onButtonClick={(el) => {
                        setPanel(el as any)
                      }} theme="Carbon"></ToggleButton2>
                    </div>
                    <div className={`${theme}-Profile-Box`}>
                      <Button onClick={() => {
                        window.open('https://ar.avatalk.me/#detect7/?user='+shareUser.information?.userId+'&view='+mode)
                      }} theme='Carbon-back'>
                        <div className={`${theme}-Profile-BoxVector`}></div>
                      </Button> 
                    </div>
                  </div>
                </>
              }  
                        
            </div>
            <div className={`w-full ${mode!='share'?'mt-[88px] ':'mt-[88px] '} ${scrolled? 'profileAimation2-mobile md:profileAimation2:' :'profileAimation2-backward-mobile md:profileAimation2-backward'} h-[320px] md:h-[370px] bg-[#E2E8F0] rounded-3xl pb-4 gap-4 flex flex-col overflow-hidden`}>
              <div className="h-[300px] relative overflow-y-hidden">

                <video  id="dragAbleAi3" playsInline width={'100%'} className={`pk_video absolute ${isTalking?'visible':'invisible'} ${window.innerWidth>600?'mt-[0px]':'mt-[0px]'}`} preload="auto" muted  loop  >
                    <source id="videoPlayer3"  src={shareUser.information?.silent_video_avatar} type="video/mp4"></source>
                </video>                 

                {prisentMode == 'video' ?
                  <>
                    <video onEnded={() => {
                      if(prisentMode == 'video'){
                        setIsTalking(false)
                      }
                    }} id="dragAbleAi2" ref={videoRef2} playsInline width={'100%'} className={`pk_video absolute ${isTalking  ?'visible':'invisible'} ${window.innerWidth>600?'mt-[0px]':'mt-[0px]'}`} preload="auto" muted={prisentMode== 'video'?false:true} autoPlay={prisentMode== 'video'?false:true} loop={prisentMode== 'video'?false:true}  >
                        <source id="videoPlayer2"  src={prisentMode=='video'? VideoUrl :shareUser.information?.talk_video_avater} type="video/mp4"></source>
                    </video>      
                    <video id="dragAbleAi" ref={videoRef} playsInline width={'100%'} className={`pk_video absolute ${!isTalking ?'visible':'invisible'} ${window.innerWidth>600?'mt-[0px]':'mt-[0px]'}`} preload="auto"  autoPlay={true} loop muted >
                        <source id="videoPlayer"  src={shareUser.information?.silent_video_avatar} type="video/mp4"></source>
                    </video>                         
                  </>
                :
                    <>
                    <video id="dragAbleAi2" ref={videoRef2} playsInline width={'100%'} className={`pk_video absolute ${isTalking && startVideoTalk ?'visible':'invisible'} ${window.innerWidth>600?'mt-[0px]':'mt-[0px]'}`} preload="auto" muted={prisentMode== 'video'?false:true} autoPlay={prisentMode== 'video'?false:true} loop={prisentMode== 'video'?false:true}  >
                        <source id="videoPlayer2"  src={prisentMode=='video'? VideoUrl :shareUser.information?.talk_video_avater} type="video/mp4"></source>
                    </video>                 
                    <video id="dragAbleAi" ref={videoRef} playsInline width={'100%'} className={`pk_video absolute ${!isTalking || !startVideoTalk ?'visible':'invisible'} ${window.innerWidth>600?'mt-[0px]':'mt-[0px]'}`} preload="auto"  autoPlay={true} loop muted >
                        <source id="videoPlayer"  src={shareUser.information?.silent_video_avatar} type="video/mp4"></source>
                    </video>                      
                    </>
                }

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
                  {shareUser.information?.job} {shareUser.information?.job && shareUser.information?.company ? "@" : ""} {shareUser.information?.company}
                </p>
              </div>
              {mode == 'profile' ?
                <div className="flex justify-evenly gap-4 px-4 ">
                  <Button onClick={() => {
                    navigate('/edit')
                  }} theme="Carbon-Google" data-mode="profile-edit-button">
                    <div
                      className={`${theme}-Profile-EditProfileBtnVector2 ${theme}-Footer-Vectors2`}
                    ></div>
                    <div className={`${theme}-text-layer1`}>Edit Profile</div>
                  </Button>
                  <Button onClick={() => {setShowShareContact(true)}} theme="Carbon-Google" data-mode="profile-edit-button">
                    <div
                      className={`${theme}-Profile-EditProfileBtnVector3 ${theme}-Footer-Vectors2 text-[#8290a3]`}
                      style={{width:'1.25rem'}}
                    ></div>     
                    <div className={`${theme}-text-layer1`}>
                      Share Profile
                    </div>               
                  </Button>
                </div>
              :
              <>
                    <div className={`flex items-center mt-0  justify-around ${window.innerWidth>=500?'px-4':'px-2'}`}>
                      <div className="w-[75%] max-w-[85%] flex items-center justify-between">
                        <ToggleButton2 value={panel}  leftText="Profile" rightText="Chat" onButtonClick={(el) => {
                          setPanel(el as any)
                        }} theme="Carbon"></ToggleButton2>
                      </div>
                      <div className={`${theme}-Profile-Box`}>
                        <Button onClick={() => {
                          Auth.addEvent({
                            event_type:"ar_usage",
                            userid:shareUser.information?.userId as string,
                            sub_event_category:'view_link'
                          })
                          window.open('https://ar.avatalk.me/#detect7/?user='+shareUser.information?.userId+'&view='+mode)
                        }} theme='Carbon-back'>
                          <div className={`${theme}-Profile-BoxVector`}></div>
                        </Button> 
                      </div>
                    </div>
              </>
              }
            </div>
{/* 
          <Button  theme="Carbon-Show">
            Show more              
          </Button>  */}
        </div>
        {panel == 'Profile' || mode=='profile' ?
          <div id="scrollBoxProfile" onScroll={(event:any) => {
            if(event.nativeEvent.srcElement.scrollTop >= 100) {
              setScrolled(true)
              setIsFirstScrol(true)
            }else if(event.nativeEvent.srcElement.scrollTop == 0){
              setTimeout(() => {
                setScrolled(false)
              }, 50);
            }        
          }} className={`${theme}-Profile-ProfileSection`}>
            <div className={`${theme}-Profile-Content mt-4`}>
              {shareUser.boxs && shareUser.boxs.length > 0 ? (
                <ul style={{ width: '100%' }} >
                  {shareUser.boxs.sort((a,b) => a.getOrder() - b.getOrder())?.map((item: Box) => {
                    return (
                      <>
                        {item?.isShareAble() || mode=='profile' ?
                          <ContentCard userId={shareUser.information?.userId as string} item={item} mod={mode} theme="Carbon">
                          </ContentCard>
                          :undefined
                        }
                      </>
                    )
                  })}
                </ul>
              ) : (
                <>
                  <img src="/Carbon/Not-Found.svg" alt="Not Found" className="w-[97px] h-[96px]" />
                  <p className="text-sm	text-[#8290a3]">You haven't added any info yet.</p>
                </>
              )}
              {mode != 'profile' && shareUser.boxs.filter((el) =>el.isShareAble() == true).length > 0
              ?
              <div className=" flex px-5 py-6 flex-col gap-2 bg-white justify-start items-start text-xs w-full	">
                  <img onClick={() => {window.open('https://portal.avatalk.me/#/')}} className="w-20 h-8 cursor-pointer" src="/Carbon/splashImage.svg" alt="logo" />
                  <div className="text-[12px] text-text-primary">
                    Want your own Avatalk? Create your AI Avatar in less than 3 minutes!
                  </div>              
              </div>              
              :undefined}
            </div>
            {mode != 'profile' && !isEditPage()?
            <>
            <div className=" absolute w-full z-20 bottom-0">
              {mode == 'review' && shareUser.boxs.filter((el) =>el.isShareAble() == true).length == 0
              ?
              <div className=" flex px-5 py-6 flex-col gap-2 bg-white justify-start items-start text-xs w-full	">
                  <img onClick={() => {window.open('https://portal.avatalk.me/#/')}} className="w-20 h-8 cursor-pointer" src="/Carbon/splashImage.svg" alt="logo" />
                  {/* <p onClick={() => {window.open('https://portal.avatalk.me/#/')}} className="cursor-pointer" >Pricing</p>
                  <p onClick={() => {window.open('https://portal.avatalk.me/#/')}} className="cursor-pointer" >FAQ</p>
                  <p onClick={() => {window.open('https://portal.avatalk.me/#/')}} className="cursor-pointer" >Legals</p>
                  <div className="flex gap-3">
                    <img onClick={() => {window.open('https://portal.avatalk.me/#/')}}  className="w-4 h-4 cursor-pointer" src="/Carbon/Linkedinicon.svg" alt="Linkedin" />
                    <img onClick={() => {window.open('https://portal.avatalk.me/#/')}}  className="w-[18px] h-[18px] cursor-pointer" src="/Carbon/instagramicon.svg" alt="instagram" />
                    <img onClick={() => {window.open('https://portal.avatalk.me/#/')}}  className="w-4 h-4 cursor-pointer" src="/Carbon/facebookicon.svg" alt="facebook" />
                  </div> */}
                <div className="text-[12px] text-text-primary">
                  Want your own Avatalk? Create your AI Avatar in less than 3 minutes!
                </div>
              </div>              
              :undefined}
              <div className=" bg-[#E2E8F0]  px-5 pt-3 pb-6 rounded-t-2xl">
                <div className="flex justify-evenly gap-4 ">
                  <Button onClick={() => {
                    setShowExchangeContact(true)
                  }}  theme="Carbon-Google">Exchange Contact</Button>
                  <Button onClick={() => {
                    setShowIsProfileOpen(true)
                }} theme="Carbon">Show Contact</Button>
                </div>
              </div>
            </div>

            </>
            :undefined}
          </div>
        :
          <Presentition2 setPrisentMode={setPrisentMode} setVideoUrl={setVideoUrl} setShowMuiteController={setShowMuiteController} isSilent={isMuted} chats={chats} setChats={setChats} shareUser={shareUser} setAudioUrl={setAudioUrl} isTalking={isTalking} setIsTalking={setIsTalking} theme="Carbon"></Presentition2>
        }
        {showShareContact?
          <ShareContact theme='Carbon' isOpen={showShareContact} onClose={() => {setShowShareContact(false)}}></ShareContact>
        :undefined}
        {isShowProfileOpen?
        <>
          <div className="absolute z-40 left-0  bottom-[-20px] w-full flex justify-center items-center">
            <ShowUser user={shareUser} isOpen={true} onClose={() => {setShowIsProfileOpen(false)}} refEl={ShowProfileRef} theme="Carbon"></ShowUser>
          </div>      
          <div className="absolute w-full z-10 h-full bg-black opacity-60 top-0 left-0"></div>  
        </>
        :undefined
        }
      </div>
    }    

    <AudioProvider setStartVideoTalking={setStartVideoTalk} autoPlay={isTalking} onEnd={() => {
      setAudioUrl('')
      setShowMuiteController(false)
      setIsTalking(false)
      setStartVideoTalk(false)
    }} url={audioUrl} theme="Carbon" audioref={audioRef}></AudioProvider>    

    <ExchangeContact mode='add' onAddContact={(data) => {
        Contacts.addContact({
          email:data.email,
          full_name:data.fullName,
          phone:data.phone,
          note:data.note,
          adding_method:'exchange'
        }).then(() => {
          toast.success("contact is exchanged")
        })
    }} onEditContact={() => {}} theme='Carbon' isOpen={showExchangeContact} onClose={() => {setShowExchangeContact(false)}} title='Share your contact info with'></ExchangeContact>    
    </>
  );
};

export default Profile2;
