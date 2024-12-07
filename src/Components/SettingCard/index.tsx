import React from "react";
import { useNavigate } from "react-router-dom";
import { getOS } from "../../help";

interface Contenttype {
  name: string;
  icon: string;
}

interface SettingCardProps {
  theme?: string;
  content: Contenttype;
  linkTo: string;
}

const SettingCard: React.FC<SettingCardProps> = ({ theme, content, linkTo }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate(linkTo)
        }} aria-disabled={linkTo == ''? 'true': 'false'} className={`${theme}-Setting-CardContainer`} >
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            {content.icon!='' &&
              <div className={`${theme}-Card-icon`} style={{ maskImage: `url(/Carbon/${content.icon})`,WebkitMaskImage:`url(/Carbon/${content.icon})` }}></div>
            }
            <div data-os={getOS()} className=" Carbon-ContentCard-Title text-left ml-3">{content.name}</div>
          </div>
          <div className={`${theme}-Card-Vector`}></div>
        </div>
        {/* <div className="text-left text-sm text-gray-700 mt-2">{content.description}</div> */}
      </div>
    </>
  );
};

export default SettingCard;
