/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '../../Model';
import { useAuth } from '../../hooks/useAuth';
import { Auth } from '../../Api';

interface ContentCardProps {
  theme?: string;
  item:Box
  userId:string;
  children?: React.ReactNode;
  setAllowDrag?: (action:boolean) => void;
  mod?: 'profile'|'review'|'share'
}
const ContentCard: React.FC<ContentCardProps> = ({theme="default",item,mod,userId}) => {
  const [activeDrag,setActiveDrag] = useState(false)
  const os =navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) ? 'mobile':'desctop'
  
  // console.log(os)
  useEffect(() => {
    setTimeout(() => {
      setActiveDrag(false)
    }, 6000);
  })
  const auth = useAuth()
  const navigate = useNavigate();
  return (
    <>
    <li draggable onClick={() => {
      if(mod == 'share'){
        Auth.addEvent({
          userid:userId as string,
          event_type:'more_info',
          sub_event_category:item.getEventName() as any
        })         
      }
    }} className={`${theme}-ContentCard-Container ${!activeDrag ?'ignore-elements':''}`}>
        <div className={`${theme}-ContentCard-Section`}>
            <div className={`${theme}-ContentCard-Title`}>
                {item.getTitle()}
            </div>
            <div data-mode={mod} className={`${theme}-ContentCard-Vectors`}>
              <div onClick={() => {
                if(os == 'desctop'){
                  setActiveDrag(!activeDrag)
                }                
              }} onTouchStart={() => {
                if(os == 'mobile'){
                  setActiveDrag(!activeDrag)
                }
              }} className={`${theme}-ContentCard-CardVector`} data-active={activeDrag?'true':'false'}>
                <div className={`${theme}-ContentCard-ArrowVector ${theme}-ContentCard-MaskVector`}></div>
              </div>
              <div onClick={() => {
                auth.currentUser.removeBox(item)
                navigate('/')
              }}  onTouchStart={() => {
                auth.currentUser.removeBox(item)
                navigate('/')
              }} className={`${theme}-ContentCard-CardVector`}>
                <div className={`${theme}-ContentCard-TrashVector ${theme}-ContentCard-MaskVector`}></div>
              </div>
              <button onTouchStart={() => {
                navigate('/edit/'+item.getRouteAddress())
              }} onClick={() => {
                // alert('clicked')
                navigate('/edit/'+item.getRouteAddress())
              }} className={`${theme}-ContentCard-CardVector`}>
                <div className={`${theme}-ContentCard-EditVector ${theme}-ContentCard-MaskVector`}></div>
              </button>
            </div>
        </div>

        <div className={`${theme}-ContentCard-Children`}>{item.resolveRender(theme)}</div>
        
    </li>
    </>
    
  );
};

export default ContentCard;
