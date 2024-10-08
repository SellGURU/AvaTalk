/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '../../Model';
import { useAuth } from '../../hooks/useAuth';
import { Auth } from '../../Api';
import { Confirm } from '../__Modal__';
import { getOS } from '../../help';

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
  // const os =navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) ? 'mobile':'desctop'
  const context = useAuth()
  // console.log(os)
  const confirmRef = createRef<HTMLDivElement>()
  useEffect(() => {
    setTimeout(() => {
      setActiveDrag(false)
    }, 6000);
  })
  const auth = useAuth()
  const navigate = useNavigate();
  console.log(item)
  const [showConfirm,setShowConfirm] = useState(false)
  return (
    <>
    <li  onClick={() => {
      if(mod == 'share'){
        Auth.addEvent({
          userid:userId as string,
          event_type:'more_info',
          sub_event_category:item.getEventName() as any
        })         
      }
    }} data-mame={item.getTypeName()}  onDragEnd={() => {
        const element = document.getElementById('sortable')?.children
        // console.log(element?.item(0)?.attributes[1].value)
        const resolve =Array(element?.length).fill(1).map((_el,index) => {
          return element?.item(index)?.attributes[1].value
        } )
        resolve.forEach((el,ind) => {
          if(item.getTypeName() == el){
            item.setOrder(ind)
          }
        })
        context.currentUser.updateBoxs(resolve as Array<string>)
        }} className={`${theme}-ContentCard-Container ${!activeDrag ?'ignore-elements':''}`}>
        <div className={`${theme}-ContentCard-Section`}>
            <div data-os={getOS()} className={`${theme}-ContentCard-Title`}>
                {item.getTitle()}
            </div>
            <div data-mode={mod} className={`${theme}-ContentCard-Vectors`}>
              {/* <div onClick={() => {
                // if(os == 'desctop'){
                  // setActiveDrag(!activeDrag)
                // }                
              }}  className={`${theme}-ContentCard-CardVector`} data-active={activeDrag?'true':'false'}>
                <div className={`${theme}-ContentCard-ArrowVector ${theme}-ContentCard-MaskVector`}></div>
              </div> */}
              <div onClick={() => {
                setShowConfirm(true)
                // auth.currentUser.removeBox(item)
                // navigate('/')
              }}  className={`${theme}-ContentCard-CardVector`}>
                <div className={`${theme}-ContentCard-TrashVector ${theme}-ContentCard-MaskVector`}></div>
              </div>
              <button onClick={() => {
                // alert('clicked')
                navigate('/edit/'+item.getRouteAddress())
              }} className={`${theme}-ContentCard-CardVector`}>
                <div className={`${theme}-ContentCard-EditVector ${theme}-ContentCard-MaskVector`}></div>
              </button>
            </div>
        </div>

        <div className={`${theme}-ContentCard-Children`}>{item.resolveRender(theme,mod,{userId:userId})}</div>
        
    </li>
    {showConfirm ?
      <div className='fixed top-0 left-0 z-[5000] w-full h-dvh flex justify-center items-center'>
        <Confirm refrence={confirmRef} title={"Delete "+item.getCardName()} content={"Are you sure want to delete this card?"} onClose={() => {setShowConfirm(false)}} onConfirm={() => {
          auth.currentUser.removeBox(item)
          setShowConfirm(false)
          navigate('/')
        }}></Confirm>
      </div>
    :
     undefined
    }
    </>
    
  );
};

export default ContentCard;
