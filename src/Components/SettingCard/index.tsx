import React from "react";
import { useNavigate } from "react-router-dom";

interface Contenttype {
  name: string;
  icon: string;
}

interface CardProps {
  theme?: string;
  content: Contenttype;
  linkTo: string;
}

const SettingCard: React.FC<CardProps> = ({ theme, content, linkTo }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate(linkTo);
        }}
        className={`${theme}-Setting-CardContainer`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <div className={`${theme}-Card-icon`} style={{ maskImage: `url(/Carbon/${content.icon})` }}></div>
            <div className="text-left text-sm ml-3 text-gray-700 font-semibold">{content.name}</div>
          </div>
          <div className={`${theme}-Card-Vector`}></div>
        </div>
        {/* <div className="text-left text-sm text-gray-700 mt-2">{content.description}</div> */}
      </div>
    </>
  );
};

export default SettingCard;
