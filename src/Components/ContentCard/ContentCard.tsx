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
            <div className={`${theme}-ContentCard-Icons`}>
                <img className={`${theme}-ContentCard-CardIcon`} src="./arrow-swap-horizontal.svg" alt="" />
                <img className={`${theme}-ContentCard-CardIcon`} src="./trash.svg" alt="" />
                <img className={`${theme}-ContentCard-CardIcon`} src="./edit.svg" alt="" />
            </div>
        </div>

        <div className={`${theme}-ContentCard-Children`}>{children}</div>
        
    </div>
    </>
    
  );
};

export default ContentCard;
