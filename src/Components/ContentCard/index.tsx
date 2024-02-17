import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '../../Model';
import { useAuth } from '../../hooks/useAuth';

interface ContentCardProps {
  theme?: string;
  item:Box
  children?: React.ReactNode;
  setAllowDrag?: (action:boolean) => void;
  mod?: 'profile'|'review'|'share'
}
const ContentCard: React.FC<ContentCardProps> = ({theme="default",item,mod}) => {
  const [activeDrag,setActiveDrag] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setActiveDrag(false)
    }, 6000);
  })
  const auth = useAuth()
  const navigate = useNavigate();
  return (
    <>
    <li draggable className={`${theme}-ContentCard-Container ${!activeDrag ?'ignore-elements':''}`}>
        <div className={`${theme}-ContentCard-Section`}>
            <div className={`${theme}-ContentCard-Title`}>
                {item.getTitle()}
            </div>
            <div data-mode={mod} className={`${theme}-ContentCard-Vectors`}>
              <div onTouchStart={() => {
                setActiveDrag(!activeDrag)
              }} onClick={() => {
                // setActiveDrag(!activeDrag)
              }}  className={`${theme}-ContentCard-CardVector`} data-active={activeDrag?'true':'false'}>
                <div className={`${theme}-ContentCard-ArrowVector ${theme}-ContentCard-MaskVector`}></div>
              </div>
              <div onClick={() => {
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
