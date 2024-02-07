import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '../../Model';

interface ContentCardProps {
  theme?: string;
  item:Box
  children?: React.ReactNode;
  setAllowDrag?: (action:boolean) => void;
  mod?: 'profile'|'review'
}
const ContentCard: React.FC<ContentCardProps> = ({theme="default",item,mod,setAllowDrag}) => {
  const [activeDrag,setActiveDrag] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setActiveDrag(false)
    }, 6000);
  })
  const navigate = useNavigate();
  return (
    <>
    <li draggable className={`${theme}-ContentCard-Container ${!activeDrag ?'ignore-elements':''}`}>
        <div className={`${theme}-ContentCard-Section`}>
            <div className={`${theme}-ContentCard-Title`}>
                {item.getTitle()}
            </div>
            <div data-mode={mod} className={`${theme}-ContentCard-Vectors`}>
              <div onClick={() => {
                setActiveDrag(!activeDrag)
              }} onMouseDown={() => {
                if(setAllowDrag){
                  setAllowDrag(true)
                }
              }} className={`${theme}-ContentCard-CardVector`} style={{backgroundColor:activeDrag?'#8E69CE':'unset'}}>
                <div className={`${theme}-ContentCard-ArrowVector ${theme}-ContentCard-MaskVector`}></div>
              </div>
              <div className={`${theme}-ContentCard-CardVector`}>
                <div className={`${theme}-ContentCard-TrashVector ${theme}-ContentCard-MaskVector`}></div>
              </div>
              <div onClick={() => {
                navigate('/edit/'+item.getRouteAddress())
              }} className={`${theme}-ContentCard-CardVector`}>
                <div className={`${theme}-ContentCard-EditVector ${theme}-ContentCard-MaskVector`}></div>
              </div>
            </div>
        </div>

        <div className={`${theme}-ContentCard-Children`}>{item.resolveRender(theme)}</div>
        
    </li>
    </>
    
  );
};

export default ContentCard;
