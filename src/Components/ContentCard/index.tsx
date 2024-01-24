import React from 'react';

interface ContentCardProps {
  theme?: string;
  children?: React.ReactNode;
  title?: string;
}
const ContentCard: React.FC<ContentCardProps> = ({theme="default",children, title}) => {
  return (
    <>
    <div className={`${theme}-ContentCard-Container`}>
        <div className={`${theme}-ContentCard-Section`}>
            <div className={`${theme}-ContentCard-Title`}>
                {title}
            </div>
            <div className={`${theme}-ContentCard-Vectors`}>
              <div className={`${theme}-ContentCard-CardVector`}>
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
        
    </div>
    </>
    
  );
};

export default ContentCard;
