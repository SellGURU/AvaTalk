import React, { useEffect, useState } from 'react';

interface ContentCardProps {
  theme?: string;
  children?: React.ReactNode;
  title?: string;
  setAllowDrag?: (action:boolean) => void;
  mod?: 'profile'|'review'
}
const ContentCard: React.FC<ContentCardProps> = ({theme="default",children, title,mod,setAllowDrag}) => {
  const [activeDrag,setActiveDrag] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setActiveDrag(false)
    }, 6000);
  })
  return (
    <>
    <li draggable className={`${theme}-ContentCard-Container ${!activeDrag ?'ignore-elements':''}`}>
        <div className={`${theme}-ContentCard-Section`}>
            <div className={`${theme}-ContentCard-Title`}>
                {title}
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
              <div className={`${theme}-ContentCard-CardVector`}>
                <div className={`${theme}-ContentCard-EditVector ${theme}-ContentCard-MaskVector`}></div>
              </div>
            </div>
        </div>

        <div className={`${theme}-ContentCard-Children`}>{children}</div>
        
    </li>
    </>
    
  );
};

export default ContentCard;
