/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from "react";
import NumberSeparator from "../../utils/NumberSeparator";
import {useAuth} from "../../hooks/useAuth.tsx";
// import { useAuth } from "../../hooks/useAuth";

interface Props {
  theme?: string;
  data:Array<any>
}

const AnalyticsSummary: React.FC<Props> = ({ theme ,data}) => {
  const context = useAuth()
  const [isVisible,] = useState(context.currentUser.type_of_account.getType() == 'Free'?false:true)
  return (
    <div className={`${theme}-AnalyticsSummary-container`}>
      <div className={`${theme}-AnalyticsSummary-rowContainer`}>
        <div className={`${theme}-AnalyticsSummary-cardContainer relative`}>
          <p className={`${theme}-AnalyticsSummary-text`}>Page Views</p>
          <p className={`${theme}-AnalyticsSummary-number ${isVisible?'opacity-100':'opacity-5'}`}>
            {data.length >0 ?
             <NumberSeparator number={data.filter(el => el.name == 'Page View')[0].value} />
            :
            <NumberSeparator number={0} />
            }
          </p>
          {
            !isVisible &&
            <div className="w-full h-full bg-[#5B21B626] absolute z-30 rounded-[25px] left-0 top-0"></div>
          }
        </div>
        <div className={`${theme}-AnalyticsSummary-cardContainer relative`}>
          <p className={`${theme}-AnalyticsSummary-text`}>AR Usage</p>
          <p className={`${theme}-AnalyticsSummary-number ${isVisible?'opacity-100':'opacity-5'}`}>{data.length> 0? data.filter(el => el.name == 'َAR Usage')[0].value:'0'}</p>
          {
            !isVisible &&
            <div className="w-full h-full bg-[#5B21B626] absolute z-30 rounded-[25px] left-0 top-0"></div>
          }
        </div>
        <div className={`${theme}-AnalyticsSummary-cardContainer relative`}>
          <p className={`${theme}-AnalyticsSummary-text`}>Chat Count</p>
          <p className={`${theme}-AnalyticsSummary-number ${isVisible?'opacity-100':'opacity-5'}`}>{data.length> 0?data.filter(el => el.name == 'Chat Count')[0].value:'0'}</p>
          {
            !isVisible &&
            <div className="w-full h-full bg-[#5B21B626] absolute z-30 rounded-[25px] left-0 top-0"></div>
          }
        </div>        
      </div>
      <div className={`${theme}-AnalyticsSummary-rowContainer`}>
        <div className={`${theme}-AnalyticsSummary-cardContainer relative`}>
          <p className={`${theme}-AnalyticsSummary-text`}>Save Contact</p>
          {/* <div className="text-[10px] md:text-[12px] mt-[-8px] w-full text-center">(Click-Through Rate)</div> */}
          <p className={`${theme}-AnalyticsSummary-number ${isVisible?'opacity-100':'opacity-5'}`}>{data.length> 0?data.filter(el => el.name == 'Save Contact')[0].value:'0'}</p>
          {
            !isVisible &&
            <div className="w-full h-full bg-[#5B21B626] absolute z-30 rounded-[25px] left-0 top-0"></div>
          }
        </div>
        <div className={`${theme}-AnalyticsSummary-cardContainer relative`}>
          <p className={`${theme}-AnalyticsSummary-text`}>Link Click</p>
          <p className={`${theme}-AnalyticsSummary-number ${isVisible?'opacity-100':'opacity-5'}`}>{data.length> 0?data.filter(el => el.name == 'Link Click')[0].value:'0'}</p>
          {
            !isVisible &&
            <div className="w-full h-full bg-[#5B21B626] absolute z-30 rounded-[25px] left-0 top-0"></div>
          }
        </div>
        <div className={`${theme}-AnalyticsSummary-cardContainer relative`}>
          <p className={`${theme}-AnalyticsSummary-text`}>File Click</p>
          <p className={`${theme}-AnalyticsSummary-number ${isVisible?'opacity-100':'opacity-5'}`}>{data.length> 0?data.filter(el => el.name == 'File Click')[0].value:'0'}</p>
          {
            !isVisible &&
            <div className="w-full h-full bg-[#5B21B626] absolute z-30 rounded-[25px] left-0 top-0"></div>
          }
        </div>        
      </div>
    </div>
  );
};

export default AnalyticsSummary;